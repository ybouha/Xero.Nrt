using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Xero.DataAcquisition;

/// <summary>
/// Loads both sides of an NRT comparison from SQL Server using Dapper.
/// Both queries run concurrently so the total wall-clock time equals
/// the slower of the two loads rather than their sum.
/// </summary>
/// <remarks>
/// Prefer <see cref="DbDataLoader{T}"/> with <see cref="SqlServerConnectionFactory"/>
/// which supports the abstract factory pattern and can target any ADO.NET provider.
/// </remarks>
[Obsolete("Use DbDataLoader<T>(SqlServerConnectionFactory.Instance) instead.")]
public sealed class SqlDataLoader<T> : IDataLoader<T>
{
    public async Task<(IReadOnlyList<T> Reference, IReadOnlyList<T> Target)> LoadAsync(
        DataLoadOptions options,
        CancellationToken ct = default)
    {
        Console.WriteLine($"[DataAcquisition] Loading '{options.ScenarioName}' from both environments in parallel…");

        var refTask = LoadSideAsync(
            options.ReferenceConnectionString,
            options.ReferenceSql,
            options.ReferenceParams,
            options.CommandTimeoutSeconds,
            "Reference",
            ct);

        var tgtTask = LoadSideAsync(
            options.TargetConnectionString,
            options.TargetSql,
            options.TargetParams,
            options.CommandTimeoutSeconds,
            "Target",
            ct);

        await Task.WhenAll(refTask, tgtTask);

        Console.WriteLine($"[DataAcquisition] Reference: {refTask.Result.Count:N0} rows  |  Target: {tgtTask.Result.Count:N0} rows");
        return (refTask.Result, tgtTask.Result);
    }

    private static async Task<IReadOnlyList<T>> LoadSideAsync(
        string connectionString,
        string sql,
        object? parameters,
        int timeoutSeconds,
        string side,
        CancellationToken ct)
    {
        using var connection = new SqlConnection(connectionString);
        var cmd = new CommandDefinition(sql, parameters, commandTimeout: timeoutSeconds, cancellationToken: ct);

        var rows = await connection.QueryAsync<T>(cmd);
        var list = rows.AsList();

        Console.WriteLine($"[DataAcquisition]   {side}: {list.Count:N0} rows loaded");
        return list;
    }
}
