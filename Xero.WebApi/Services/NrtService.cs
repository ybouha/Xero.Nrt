using System.Diagnostics;
using System.Text.Json;
using Xero.SmartComparer;
using Xero.WebApi.Data;
using Xero.WebApi.Models;

namespace Xero.WebApi.Services;

/// <summary>
/// Orchestrates the NRT pipeline with full per-phase status tracking.
///
/// Flow:
///   0. Merge definition fields (if DefinitionId provided).
///   1. Create execution record with status=<c>pending</c>.
///   2. Run ref + target pre-execution commands in parallel (status=<c>running_commands</c>).
///   3. Run Load → Compare → Save pipeline (status transitions via onPhase callback).
///   4. Finalise — status=<c>completed</c> with row counts.
///   On any failure: status=<c>failed</c>, error_message populated.
/// </summary>
public sealed class NrtService : INrtService
{
    private readonly RunExecutionRepository       _runRepository;
    private readonly NrtRunDefinitionRepository   _definitionRepository;
    private readonly ICommandRunner               _commandRunner;
    private readonly ILogger<NrtService>          _logger;
    private readonly ILoggerFactory               _loggerFactory;

    public NrtService(
        RunExecutionRepository     runRepository,
        NrtRunDefinitionRepository definitionRepository,
        ICommandRunner             commandRunner,
        ILogger<NrtService>        logger,
        ILoggerFactory             loggerFactory)
    {
        _runRepository        = runRepository;
        _definitionRepository = definitionRepository;
        _commandRunner        = commandRunner;
        _logger               = logger;
        _loggerFactory        = loggerFactory;
    }

    public async Task<RunExecutionResponse> ExecuteRunAsync(
        NrtRunRequest request, CancellationToken ct)
    {
        var sw           = Stopwatch.StartNew();
        var runTimestamp = DateTimeOffset.UtcNow;

        // ── 0. Merge definition fields ────────────────────────────────────────
        if (request.DefinitionId.HasValue)
        {
            var def = await _definitionRepository.GetByIdAsync(request.DefinitionId.Value, ct);
            if (def is not null)
            {
                // ValuationDate is always from the caller; everything else comes from the definition
                request.ScenarioName      = def.ScenarioName;
                request.ReferenceVersion  = def.ReferenceVersion;
                request.TargetVersion     = def.TargetVersion;
                request.Reference         = def.Reference;
                request.Target            = def.Target;
                request.Compare           = def.Compare;
                request.Output            = def.Output;
                request.ColumnSchema      = def.ColumnSchema;
                request.RefCommandLine    ??= def.RefCommandLine;
                request.TargetCommandLine ??= def.TargetCommandLine;
            }
        }

        _logger.LogInformation(
            "NRT run starting — scenario={Scenario} valDate={ValDate} schema={ColCount} columns",
            request.ScenarioName, request.ValuationDate, request.ColumnSchema.Length);

        // ── 1. Create execution record (status = 'pending') ───────────────────
        var runId = await _runRepository.CreateRunAsync(request, runTimestamp, ct);
        _logger.LogInformation("Run execution record created: RunId={RunId}", runId);

        try
        {
            // ── 2. Pre-execution commands ─────────────────────────────────────
            bool hasRefCmd = !string.IsNullOrWhiteSpace(request.RefCommandLine);
            bool hasTgtCmd = !string.IsNullOrWhiteSpace(request.TargetCommandLine);

            if (hasRefCmd || hasTgtCmd)
            {
                await _runRepository.SetStatusAsync(runId, "running_commands", ct: ct);

                var refCmdTask = hasRefCmd
                    ? RunCommandWithTrackingAsync(runId, "ref", request.RefCommandLine!, ct)
                    : Task.FromResult(true);

                var tgtCmdTask = hasTgtCmd
                    ? RunCommandWithTrackingAsync(runId, "tgt", request.TargetCommandLine!, ct)
                    : Task.FromResult(true);

                await Task.WhenAll(refCmdTask, tgtCmdTask);

                bool refOk = await refCmdTask;
                bool tgtOk = await tgtCmdTask;

                if (!refOk || !tgtOk)
                {
                    var message = "Pre-execution command(s) failed — see ref_cmd_error / tgt_cmd_error for details.";
                    await _runRepository.SetStatusAsync(runId, "failed", message, ct);
                    throw new InvalidOperationException(message);
                }
            }

            // ── 3. Resolve row type ───────────────────────────────────────────
            if (request.ColumnSchema.Length == 0)
                throw new InvalidOperationException(
                    "ColumnSchema must contain at least one column.");

            var rowType = DynamicTypeBuilder.Build(request.ColumnSchema);
            _logger.LogInformation(
                "Dynamic row type '{TypeName}' resolved from schema", rowType.Name);

            // ── 4. Instantiate NrtPipelineRunner<T> via reflection ────────────
            var runnerType = typeof(NrtPipelineRunner<>).MakeGenericType(rowType);
            var runner     = (INrtPipelineRunner)Activator.CreateInstance(runnerType)!;

            // ── 5. Execute the pipeline with phase callbacks ───────────────────
            await _runRepository.SetStatusAsync(runId, "running_comparison", ct: ct);

            Func<string, Task> onPhase = async phase =>
            {
                if (phase == "running_comparison")
                    await _runRepository.SetComparisonStartedAsync(runId, ct);
                else if (phase == "saving_results")
                    await _runRepository.SetSavingStartedAsync(runId, ct);
            };

            var (refCount, tgtCount, diffCount, onlyRefCount, onlyTgtCount) =
                await runner.RunAsync(request, runId, runTimestamp, _loggerFactory, onPhase, ct);

            // ── 6. Finalise ───────────────────────────────────────────────────
            bool passed = diffCount == 0 && onlyRefCount == 0 && onlyTgtCount == 0;

            await _runRepository.SetCompletedAsync(
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

            return new RunExecutionResponse
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
                Status           = "completed",
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "NRT run {RunId} failed", runId);
            // Best-effort status update — ignore secondary exceptions
            try { await _runRepository.SetStatusAsync(runId, "failed", ex.Message, ct); }
            catch { /* swallow */ }
            throw;
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /// <summary>
    /// Runs a shell command and persists per-command status columns.
    /// Returns <c>true</c> if the command succeeded.
    /// </summary>
    private async Task<bool> RunCommandWithTrackingAsync(
        int               runId,
        string            side,        // "ref" or "tgt"
        string            commandLine,
        CancellationToken ct)
    {
        var startedAt = DateTimeOffset.UtcNow;

        if (side == "ref")
            await _runRepository.SetRefCommandStatusAsync(
                runId, "running", startedAt, null, null, null, ct);
        else
            await _runRepository.SetTgtCommandStatusAsync(
                runId, "running", startedAt, null, null, null, ct);

        var result     = await _commandRunner.RunAsync(commandLine, ct);
        var finishedAt = DateTimeOffset.UtcNow;
        var status     = result.Succeeded ? "completed" : "failed";
        var error      = result.Succeeded ? null : result.Stderr;

        if (side == "ref")
            await _runRepository.SetRefCommandStatusAsync(
                runId, status, startedAt, finishedAt, result.ExitCode, error, ct);
        else
            await _runRepository.SetTgtCommandStatusAsync(
                runId, status, startedAt, finishedAt, result.ExitCode, error, ct);

        return result.Succeeded;
    }
}
