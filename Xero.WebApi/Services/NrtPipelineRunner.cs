using Microsoft.Extensions.Logging;
using Xero.DataAcquisition;
using Xero.ResultSaver;
using Xero.SmartComparer;
using Xero.WebApi.Data;
using Xero.WebApi.Models;
using DbProvider = Xero.WebApi.Models.DbProvider;

namespace Xero.WebApi.Services;

/// <summary>
/// Non-generic interface so <see cref="NrtService"/> can invoke
/// <see cref="NrtPipelineRunner{T}"/> without knowing <typeparamref name="T"/> at compile time.
/// </summary>
public interface INrtPipelineRunner
{
    Task<(int RefCount, int TgtCount, int DiffCount, int OnlyRefCount, int OnlyTgtCount)>
        RunAsync(
            NrtRunRequest     request,
            int               runId,
            DateTimeOffset    runTimestamp,
            ILoggerFactory    loggerFactory,
            CancellationToken ct);
}

/// <summary>
/// Generic four-step NRT pipeline: Load → Compare → Save diffs → Return counts.
/// <typeparamref name="T"/> is a runtime-emitted type matching the run's <c>ColumnSchema</c>.
/// </summary>
public sealed class NrtPipelineRunner<T> : INrtPipelineRunner where T : class, new()
{
    private static readonly string[] DefaultKeyProperties =
        ["TradeId", "Book", "Desk", "RiskFactor", "ValuationDate"];

    public async Task<(int RefCount, int TgtCount, int DiffCount, int OnlyRefCount, int OnlyTgtCount)>
        RunAsync(
            NrtRunRequest     request,
            int               runId,
            DateTimeOffset    runTimestamp,
            ILoggerFactory    loggerFactory,
            CancellationToken ct)
    {
        // ── 1. Load data ───────────────────────────────────────────────────────
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

        var loader = new DbDataLoader<T>(
            refFactory, tgtFactory,
            loggerFactory.CreateLogger<DbDataLoader<T>>());

        var (reference, target) = await loader.LoadAsync(loadOptions, ct);

        // ── 2. Compare ─────────────────────────────────────────────────────────
        var keyProps = request.Compare.KeyProperties.Length > 0
            ? request.Compare.KeyProperties.ToList()
            : DefaultKeyProperties.ToList();

        var ignoreProps = request.Compare.CompareProperties.Length > 0
            ? typeof(T).GetProperties()
                .Select(p => p.Name)
                .Where(n => !keyProps.Contains(n)
                         && !request.Compare.CompareProperties.Contains(n))
                .ToList()
            : [];

        var comparer = new ListComparer<T>(
            keyProps, ignoreProps,
            loggerFactory.CreateLogger<ListComparer<T>>());

        var result = await comparer.CompareList(reference.ToList(), target.ToList());

        // ── 3. Save diff rows ──────────────────────────────────────────────────
        var saveOptions = new SaveOptions
        {
            OutputPath       = Path.GetTempPath(),
            ScenarioName     = request.ScenarioName,
            RunId            = runId,
            RunTimestamp     = runTimestamp,
            ReferenceVersion = request.ReferenceVersion,
            TargetVersion    = request.TargetVersion,
        };

        if (request.Output.DiffDb.Enabled
            && !string.IsNullOrWhiteSpace(request.Output.DiffDb.ConnectionString))
        {
            var diffFactory = ResolveFactory(request.Output.DiffDb.Provider);
            var saver = new DbDiffSaver<T>(
                diffFactory,
                request.Output.DiffDb.ConnectionString,
                request.Output.DiffDb.TableName,
                keyProps.ToArray(),
                loggerFactory.CreateLogger<DbDiffSaver<T>>());

            await saver.SaveAsync(result, saveOptions, ct);
        }

        return (
            reference.Count,
            target.Count,
            result.Count,
            result.OnlyInReference?.Count ?? 0,
            result.OnlyInTarget?.Count    ?? 0);
    }

    private static IDbConnectionFactory ResolveFactory(DbProvider provider) => provider switch
    {
        DbProvider.PostgreSql => PostgreSqlConnectionFactory.Instance,
        _                     => SqlServerConnectionFactory.Instance,
    };
}
