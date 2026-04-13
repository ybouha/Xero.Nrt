using System.Diagnostics;
using Xero.DataAcquisition;
using Xero.WebApi.Data;
using Xero.WebApi.Models;
using Xero.ResultSaver;
using Xero.SmartComparer;
using DbProvider = Xero.WebApi.Models.DbProvider;

namespace Xero.WebApi.Services;

/// <summary>
/// Orchestrates the four-step NRT pipeline:
///   1. Load reference and target data in parallel
///   2. Compare using SmartComparer
///   3. Save diff rows to the configured database table
///   4. Update the nrt_runs audit header with result counts
/// </summary>
public sealed class NrtService : INrtService
{
    private static readonly string[] DefaultKeyProperties =
        ["TradeId", "Book", "Desk", "RiskFactor", "ValuationDate"];

    private readonly NrtRunRepository    _runRepository;
    private readonly ILogger<NrtService> _logger;

    public NrtService(NrtRunRepository runRepository, ILogger<NrtService> logger)
    {
        _runRepository = runRepository;
        _logger        = logger;
    }

    public async Task<NrtRunResponse> ExecuteRunAsync(NrtRunRequest request, CancellationToken ct)
    {
        var sw           = Stopwatch.StartNew();
        var runTimestamp = DateTimeOffset.UtcNow;

        _logger.LogInformation("NRT run starting — scenario={Scenario} valDate={ValDate}",
            request.ScenarioName, request.ValuationDate);

        // ?? 1. Insert audit header ????????????????????????????????????????????
        var runId = await _runRepository.CreateRunAsync(request, runTimestamp, ct);
        _logger.LogInformation("Run header created: RunId={RunId}", runId);

        try
        {
            // ?? 2. Load data ??????????????????????????????????????????????????
            var refFactory = ResolveFactory(request.Reference.Provider);
            var tgtFactory = ResolveFactory(request.Target.Provider);

            var loadOptions = new DataLoadOptions
            {
                ReferenceConnectionString = request.Reference.ConnectionString,
                TargetConnectionString    = request.Target.ConnectionString,
                ReferenceSql              = request.Reference.Query,
                TargetSql                 = request.Target.Query,
                ReferenceParams           = new { ValuationDate = request.ValuationDate },
                TargetParams              = new { ValuationDate = request.ValuationDate },
                CommandTimeoutSeconds     = Math.Max(
                    request.Reference.TimeoutSeconds, request.Target.TimeoutSeconds),
                ScenarioName              = request.ScenarioName,
            };

            var loader = new DbDataLoader<VarTradeRow>(refFactory, tgtFactory);
            var (reference, target) = await loader.LoadAsync(loadOptions, ct);

            // ?? 3. Compare ????????????????????????????????????????????????????
            var keyProps = request.Compare.KeyProperties.Length > 0
                ? request.Compare.KeyProperties.ToList()
                : DefaultKeyProperties.ToList();

            // ignoreProperties = all non-key props NOT in CompareProperties
            var ignoreProps = request.Compare.CompareProperties.Length > 0
                ? typeof(VarTradeRow).GetProperties()
                    .Select(p => p.Name)
                    .Where(n => !keyProps.Contains(n)
                             && !request.Compare.CompareProperties.Contains(n))
                    .ToList()
                : [];

            var comparer = new ListComparer<VarTradeRow>(keyProps, ignoreProps);
            var result   = await comparer.CompareList(reference.ToList(), target.ToList());

            // ?? 4. Save diff rows ?????????????????????????????????????????????
            var saveOptions = new SaveOptions
            {
                OutputPath       = Path.GetTempPath(),
                ScenarioName     = request.ScenarioName,
                RunTimestamp     = runTimestamp,
                ReferenceVersion = request.ReferenceVersion,
                TargetVersion    = request.TargetVersion,
            };

            if (request.Output.DiffDb.Enabled
                && !string.IsNullOrWhiteSpace(request.Output.DiffDb.ConnectionString))
            {
                var diffFactory = ResolveFactory(request.Output.DiffDb.Provider);
                var saver = new DbDiffSaver<VarTradeRow>(
                    diffFactory,
                    request.Output.DiffDb.ConnectionString,
                    request.Output.DiffDb.TableName,
                    keyProps.ToArray());

                await saver.SaveAsync(result, saveOptions, ct);
            }

            // ?? 5. Update audit header ????????????????????????????????????????
            int diffCount    = result.Count;
            int onlyRefCount = result.OnlyInReference?.Count ?? 0;
            int onlyTgtCount = result.OnlyInTarget?.Count    ?? 0;
            bool passed      = diffCount == 0 && onlyRefCount == 0 && onlyTgtCount == 0;

            await _runRepository.UpdateRunAsync(
                runId,
                reference.Count, target.Count,
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
                RefRowCount      = reference.Count,
                TgtRowCount      = target.Count,
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

    private static IDbConnectionFactory ResolveFactory(DbProvider provider) => provider switch
    {
        DbProvider.PostgreSql => PostgreSqlConnectionFactory.Instance,
        _                     => SqlServerConnectionFactory.Instance,
    };
}
