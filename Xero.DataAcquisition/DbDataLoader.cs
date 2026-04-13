using Dapper;
using Microsoft.Extensions.Logging;

namespace Xero.DataAcquisition;

/// <summary>
/// Loads both sides of an NRT comparison from any ADO.NET-compatible database
/// using the injected <see cref="IDbConnectionFactory"/>.
/// Both sides run concurrently so total wall-clock time equals the slower load,
/// not the sum of the two.
/// </summary>
/// <example>
/// // SQL Server (same engine on both sides)
/// var loader = new DbDataLoader&lt;VarRow&gt;(SqlServerConnectionFactory.Instance);
///
/// // Mixed: production on SQL Server, UAT on PostgreSQL
/// var loader = new DbDataLoader&lt;VarRow&gt;(SqlServerConnectionFactory.Instance,
///                                         PostgreSqlConnectionFactory.Instance);
/// </example>
public sealed class DbDataLoader<T> : IDataLoader<T>
{
    private readonly IDbConnectionFactory  _refFactory;
    private readonly IDbConnectionFactory  _tgtFactory;
    private readonly ILogger<DbDataLoader<T>>? _logger;

    /// <summary>Use a single factory for both sides (most common case).</summary>
    public DbDataLoader(IDbConnectionFactory factory, ILogger<DbDataLoader<T>>? logger = null)
        : this(factory, factory, logger) { }

    /// <summary>Use different factories when reference and target run on different engines.</summary>
    public DbDataLoader(
        IDbConnectionFactory referenceFactory,
        IDbConnectionFactory targetFactory,
        ILogger<DbDataLoader<T>>? logger = null)
    {
        _refFactory = referenceFactory;
        _tgtFactory = targetFactory;
        _logger     = logger;
    }

    public async Task<(IReadOnlyList<T> Reference, IReadOnlyList<T> Target)> LoadAsync(
        DataLoadOptions options,
        CancellationToken ct = default)
    {
        _logger?.LogInformation(
            "Loading '{Scenario}' (Ref={RefDialect}, Tgt={TgtDialect}) in parallel",
            options.ScenarioName, _refFactory.Dialect, _tgtFactory.Dialect);

        var sw = System.Diagnostics.Stopwatch.StartNew();

        var refTask = LoadSideAsync(
            _refFactory, options.ReferenceConnectionString,
            options.ReferenceSql, options.ReferenceParams,
            options.CommandTimeoutSeconds, "Reference", _logger, ct);

        var tgtTask = LoadSideAsync(
            _tgtFactory, options.TargetConnectionString,
            options.TargetSql, options.TargetParams,
            options.CommandTimeoutSeconds, "Target", _logger, ct);

        await Task.WhenAll(refTask, tgtTask);

        sw.Stop();
        _logger?.LogInformation(
            "Data load complete in {Elapsed:F2}s — Reference: {RefRows:N0} rows | Target: {TgtRows:N0} rows",
            sw.Elapsed.TotalSeconds, refTask.Result.Count, tgtTask.Result.Count);

        return (refTask.Result, tgtTask.Result);
    }

    private static async Task<IReadOnlyList<T>> LoadSideAsync(
        IDbConnectionFactory factory,
        string connectionString,
        string sql,
        object? parameters,
        int timeoutSeconds,
        string side,
        ILogger? logger,
        CancellationToken ct)
    {
        var sw = System.Diagnostics.Stopwatch.StartNew();

        using var conn = factory.CreateConnection(connectionString);
        var cmd  = new CommandDefinition(sql, parameters,
                       commandTimeout: timeoutSeconds, cancellationToken: ct);

        var rows = await conn.QueryAsync<T>(cmd);
        var list = rows.AsList();

        sw.Stop();
        logger?.LogInformation(
            "  {Side} loaded {Count:N0} rows in {Elapsed:F2}s",
            side, list.Count, sw.Elapsed.TotalSeconds);

        return list;
    }
}
