using Couchbase.Query;
using Dapper;
using Microsoft.Extensions.Logging;

namespace Xero.DataAcquisition;

/// <summary>
/// Loads both sides of an NRT comparison from Couchbase using N1QL, via the
/// official Couchbase .NET SDK. Both sides run concurrently so total
/// wall-clock time equals the slower load, not the sum of the two.
/// </summary>
public sealed class CouchbaseDataLoader<T> : IDataLoader<T>
{
    private readonly ILogger<CouchbaseDataLoader<T>>? _logger;

    public CouchbaseDataLoader(ILogger<CouchbaseDataLoader<T>>? logger = null)
    {
        _logger = logger;
    }

    public async Task<(IReadOnlyList<T> Reference, IReadOnlyList<T> Target)> LoadAsync(
        DataLoadOptions options,
        CancellationToken ct = default)
    {
        _logger?.LogInformation("Loading '{Scenario}' from Couchbase in parallel", options.ScenarioName);

        var sw = System.Diagnostics.Stopwatch.StartNew();

        var refTask = LoadSideAsync(
            options.ReferenceConnectionString, options.ReferenceSql, options.ReferenceParams,
            options.CommandTimeoutSeconds, "Reference", _logger, ct);

        var tgtTask = LoadSideAsync(
            options.TargetConnectionString, options.TargetSql, options.TargetParams,
            options.CommandTimeoutSeconds, "Target", _logger, ct);

        await Task.WhenAll(refTask, tgtTask);

        sw.Stop();
        _logger?.LogInformation(
            "Data load complete in {Elapsed:F2}s — Reference: {RefRows:N0} rows | Target: {TgtRows:N0} rows",
            sw.Elapsed.TotalSeconds, refTask.Result.Count, tgtTask.Result.Count);

        return (refTask.Result, tgtTask.Result);
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private static async Task<IReadOnlyList<T>> LoadSideAsync(
        string connectionString,
        string n1ql,
        object? parameters,
        int timeoutSeconds,
        string side,
        ILogger? logger,
        CancellationToken ct)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();

        var cluster = await CouchbaseClusterProvider.GetAsync(connectionString);

        var queryOptions = new QueryOptions()
            .Timeout(TimeSpan.FromSeconds(timeoutSeconds))
            .CancellationToken(ct);

        ApplyParameters(queryOptions, parameters);

        var result = await cluster.QueryAsync<T>(n1ql, queryOptions);

        var list = new List<T>();
        await foreach (var row in result.Rows.WithCancellation(ct))
            list.Add(row);

        sw.Stop();
        logger?.LogInformation(
            "  {Side} loaded {Count:N0} rows in {Elapsed:F2}s",
            side, list.Count, sw.Elapsed.TotalSeconds);

        return list;
    }

    /// <summary>
    /// Binds named N1QL parameters from either a Dapper <see cref="DynamicParameters"/>
    /// bag (used by <c>Xero.WebApi</c>) or a plain/anonymous object (used by
    /// <c>Xero.NrtRunner</c>) — the same shapes <see cref="DbDataLoader{T}"/> accepts.
    /// </summary>
    private static void ApplyParameters(QueryOptions queryOptions, object? parameters)
    {
        switch (parameters)
        {
            case null:
                return;

            case DynamicParameters dynamicParams:
                foreach (var name in dynamicParams.ParameterNames)
                    queryOptions.Parameter(name, dynamicParams.Get<object?>(name));
                return;

            default:
                foreach (var prop in parameters.GetType().GetProperties())
                    queryOptions.Parameter(prop.Name, prop.GetValue(parameters));
                return;
        }
    }
}
