using Dapper;
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
            NrtRunRequest      request,
            int                runId,
            DateTimeOffset     runTimestamp,
            ILoggerFactory     loggerFactory,
            Func<string, Task>? onPhase,       // null = no status tracking
            CancellationToken  ct);
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
            NrtRunRequest      request,
            int                runId,
            DateTimeOffset     runTimestamp,
            ILoggerFactory     loggerFactory,
            Func<string, Task>? onPhase,
            CancellationToken  ct)
    {
        var logger = loggerFactory.CreateLogger<NrtPipelineRunner<T>>();

        // ── 1. Load data ───────────────────────────────────────────────────────
        var loadOptions = new DataLoadOptions
        {
            ReferenceConnectionString = request.Reference.ConnectionString,
            TargetConnectionString    = request.Target.ConnectionString,
            ReferenceSql              = request.Reference.Query,
            TargetSql                 = request.Target.Query,
            ReferenceParams           = BuildParams(request.ValuationDate, request.Reference.Parameters),
            TargetParams              = BuildParams(request.ValuationDate, request.Target.Parameters),
            CommandTimeoutSeconds     = Math.Max(
                request.Reference.TimeoutSeconds, request.Target.TimeoutSeconds),
            ScenarioName              = request.ScenarioName,
        };

        logger.LogInformation(
            "[RunId={RunId}] Reference SQL ({Provider}):\n{Sql}",
            runId, request.Reference.Provider, request.Reference.Query);
        logger.LogInformation(
            "[RunId={RunId}] Target SQL ({Provider}):\n{Sql}",
            runId, request.Target.Provider, request.Target.Query);

        IDataLoader<T> loader = RequiresCouchbase(request.Reference.Provider, request.Target.Provider)
            ? new CouchbaseDataLoader<T>(loggerFactory.CreateLogger<CouchbaseDataLoader<T>>())
            : new DbDataLoader<T>(
                ResolveFactory(request.Reference.Provider),
                ResolveFactory(request.Target.Provider),
                loggerFactory.CreateLogger<DbDataLoader<T>>());

        var (reference, target) = await loader.LoadAsync(loadOptions, ct);

        logger.LogInformation(
            "[RunId={RunId}] Rows loaded — Reference={RefCount}  Target={TgtCount}",
            runId, reference.Count, target.Count);

        // ── 2. Compare ─────────────────────────────────────────────────────────
        if (onPhase != null) await onPhase("running_comparison");

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

        int diffCount    = result.Count;
        int onlyRefCount = result.OnlyInReference?.Count ?? 0;
        int onlyTgtCount = result.OnlyInTarget?.Count    ?? 0;
        int identicalCount = reference.Count - diffCount - onlyRefCount;

        logger.LogInformation(
            "[RunId={RunId}] Comparison results — " +
            "Identical={Identical}  Diffs={Diffs}  OnlyInRef={OnlyRef}  OnlyInTgt={OnlyTgt}",
            runId, identicalCount, diffCount, onlyRefCount, onlyTgtCount);

        // ── 3. Save diff rows ──────────────────────────────────────────────────
        if (onPhase != null) await onPhase("saving_results");

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
            var saver = new DbDiffSaver<T>(
                PostgreSqlConnectionFactory.Instance,
                request.Output.DiffDb.ConnectionString,
                request.Output.DiffDb.TableName,
                loggerFactory.CreateLogger<DbDiffSaver<T>>());

            await saver.SaveAsync(result, saveOptions, ct);
        }

        return (reference.Count, target.Count, diffCount, onlyRefCount, onlyTgtCount);
    }

    /// <summary>
    /// Merges the run's valuation date with this side's script-resolved parameters into a
    /// Dapper <see cref="DynamicParameters"/> bag. List-valued parameters (e.g. <c>JobIds</c>)
    /// are expanded by Dapper for <c>IN @JobIds</c> clauses. Script params win on a key clash
    /// except for <c>ValuationDate</c>, which is always the run's value.
    /// </summary>
    private static DynamicParameters BuildParams(
        string valuationDate, IReadOnlyDictionary<string, object?> scriptParams)
    {
        var p = new DynamicParameters();
        p.Add("ValuationDate", valuationDate);
        foreach (var kv in scriptParams)
            if (!string.Equals(kv.Key, "ValuationDate", StringComparison.OrdinalIgnoreCase))
                p.Add(kv.Key, kv.Value);
        return p;
    }

    private static bool RequiresCouchbase(DbProvider reference, DbProvider target)
    {
        if (reference != DbProvider.Couchbase && target != DbProvider.Couchbase) return false;
        if (reference == DbProvider.Couchbase && target == DbProvider.Couchbase) return true;

        throw new InvalidOperationException(
            "Reference and Target must both use Couchbase when either side does — mixed Couchbase/SQL pairing is not supported.");
    }

    private static IDbConnectionFactory ResolveFactory(DbProvider provider) => provider switch
    {
        DbProvider.PostgreSql => PostgreSqlConnectionFactory.Instance,
        DbProvider.SqlServer  => SqlServerConnectionFactory.Instance,
        _ => throw new InvalidOperationException($"No SQL connection factory available for provider '{provider}'."),
    };
}
