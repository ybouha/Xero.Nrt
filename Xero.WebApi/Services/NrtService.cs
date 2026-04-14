using System.Diagnostics;
using System.Text.Json;
using Xero.SmartComparer;
using Xero.WebApi.Data;
using Xero.WebApi.Models;

namespace Xero.WebApi.Services;

/// <summary>
/// Orchestrates the NRT pipeline without knowing the row type at compile time.
///
/// Flow:
///   1. Build a runtime CLR type from <see cref="NrtRunRequest.ColumnSchema"/> using IL Emit.
///   2. Instantiate <see cref="NrtPipelineRunner{T}"/> via reflection (MakeGenericType).
///   3. Delegate Load → Compare → Save to the generic runner.
///   4. Persist the audit header before and after the run.
/// </summary>
public sealed class NrtService : INrtService
{
    private readonly NrtRunRepository    _runRepository;
    private readonly ILogger<NrtService> _logger;
    private readonly ILoggerFactory      _loggerFactory;

    public NrtService(
        NrtRunRepository    runRepository,
        ILogger<NrtService> logger,
        ILoggerFactory      loggerFactory)
    {
        _runRepository = runRepository;
        _logger        = logger;
        _loggerFactory = loggerFactory;
    }

    public async Task<NrtRunResponse> ExecuteRunAsync(NrtRunRequest request, CancellationToken ct)
    {
        var sw           = Stopwatch.StartNew();
        var runTimestamp = DateTimeOffset.UtcNow;

        _logger.LogInformation(
            "NRT run starting — scenario={Scenario} valDate={ValDate} schema={ColCount} columns",
            request.ScenarioName, request.ValuationDate, request.ColumnSchema.Length);

        // ── 1. Insert audit header ────────────────────────────────────────────
        var runId = await _runRepository.CreateRunAsync(request, runTimestamp, ct);
        _logger.LogInformation("Run header created: RunId={RunId}", runId);

        try
        {
            // ── 2. Resolve row type from schema ───────────────────────────────
            Type rowType;
            if (request.ColumnSchema.Length > 0)
            {
                rowType = DynamicTypeBuilder.Build(request.ColumnSchema);
                _logger.LogInformation(
                    "Dynamic row type '{TypeName}' resolved from schema",
                    rowType.Name);
            }
            else
            {
                throw new InvalidOperationException(
                    "ColumnSchema must contain at least one column. " +
                    "Define the data schema in the run request.");
            }

            // ── 3. Instantiate NrtPipelineRunner<T> via reflection ────────────
            var runnerType = typeof(NrtPipelineRunner<>).MakeGenericType(rowType);
            var runner     = (INrtPipelineRunner)Activator.CreateInstance(runnerType)!;

            // ── 4. Execute the pipeline ───────────────────────────────────────
            var (refCount, tgtCount, diffCount, onlyRefCount, onlyTgtCount) =
                await runner.RunAsync(request, runId, runTimestamp, _loggerFactory, ct);

            // ── 5. Update audit header ────────────────────────────────────────
            bool passed = diffCount == 0 && onlyRefCount == 0 && onlyTgtCount == 0;

            await _runRepository.UpdateRunAsync(
                runId,
                refCount, tgtCount,
                diffCount, onlyRefCount, onlyTgtCount,
                passed, ct);

            sw.Stop();
            _logger.LogInformation(
                "NRT run {RunId} finished in {Duration:F1}s — {Status}  " +
                "[Diff={Diff}  OnlyRef={OnlyRef}  OnlyTgt={OnlyTgt}]",
                runId, sw.Elapsed.TotalSeconds, passed ? "PASS" : "FAIL",
                diffCount, onlyRefCount, onlyTgtCount);

            return new NrtRunResponse
            {
                RunId            = runId,
                ScenarioName     = request.ScenarioName,
                ReferenceVersion = request.ReferenceVersion,
                TargetVersion    = request.TargetVersion,
                ValuationDate    = request.ValuationDate,
                RunTimestamp     = runTimestamp,
                RefRowCount      = refCount,
                TgtRowCount      = tgtCount,
                DiffRowCount     = diffCount,
                OnlyInRefCount   = onlyRefCount,
                OnlyInTgtCount   = onlyTgtCount,
                Passed           = passed,
                DurationSeconds  = sw.Elapsed.TotalSeconds,
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "NRT run {RunId} failed", runId);
            throw;
        }
    }
}
