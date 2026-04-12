using Dapper;

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
    private readonly IDbConnectionFactory _refFactory;
    private readonly IDbConnectionFactory _tgtFactory;

    /// <summary>Use a single factory for both sides (most common case).</summary>
    public DbDataLoader(IDbConnectionFactory factory) : this(factory, factory) { }

    /// <summary>Use different factories when reference and target run on different engines.</summary>
    public DbDataLoader(IDbConnectionFactory referenceFactory, IDbConnectionFactory targetFactory)
    {
        _refFactory = referenceFactory;
        _tgtFactory = targetFactory;
    }

    public async Task<(IReadOnlyList<T> Reference, IReadOnlyList<T> Target)> LoadAsync(
        DataLoadOptions options,
        CancellationToken ct = default)
    {
        Console.WriteLine($"[DataAcquisition] Loading '{options.ScenarioName}' " +
                          $"(Ref={_refFactory.Dialect}, Tgt={_tgtFactory.Dialect}) in parallel…");

        var refTask = LoadSideAsync(
            _refFactory, options.ReferenceConnectionString,
            options.ReferenceSql, options.ReferenceParams,
            options.CommandTimeoutSeconds, "Reference", ct);

        var tgtTask = LoadSideAsync(
            _tgtFactory, options.TargetConnectionString,
            options.TargetSql, options.TargetParams,
            options.CommandTimeoutSeconds, "Target", ct);

        await Task.WhenAll(refTask, tgtTask);

        Console.WriteLine($"[DataAcquisition] Reference: {refTask.Result.Count:N0} rows  " +
                          $"|  Target: {tgtTask.Result.Count:N0} rows");

        return (refTask.Result, tgtTask.Result);
    }

    private static async Task<IReadOnlyList<T>> LoadSideAsync(
        IDbConnectionFactory factory,
        string connectionString,
        string sql,
        object? parameters,
        int timeoutSeconds,
        string side,
        CancellationToken ct)
    {
        using var conn = factory.CreateConnection(connectionString);
        var cmd  = new CommandDefinition(sql, parameters,
                       commandTimeout: timeoutSeconds, cancellationToken: ct);

        var rows = await conn.QueryAsync<T>(cmd);
        var list = rows.AsList();

        Console.WriteLine($"[DataAcquisition]   {side}: {list.Count:N0} rows loaded");
        return list;
    }
}
