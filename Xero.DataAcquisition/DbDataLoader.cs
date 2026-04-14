using System.Collections.Concurrent;
using System.Reflection;
using Dapper;
using Microsoft.Extensions.Logging;

namespace Xero.DataAcquisition;

/// <summary>
/// Loads both sides of an NRT comparison from any ADO.NET-compatible database
/// using the injected <see cref="IDbConnectionFactory"/>.
/// Both sides run concurrently so total wall-clock time equals the slower load,
/// not the sum of the two.
/// </summary>
public sealed class DbDataLoader<T> : IDataLoader<T>
{
    private readonly IDbConnectionFactory     _refFactory;
    private readonly IDbConnectionFactory     _tgtFactory;
    private readonly ILogger<DbDataLoader<T>>? _logger;

    // column-name (lowercase, no underscores) → PropertyInfo, built once per T
    private static readonly Lazy<Dictionary<string, PropertyInfo>> _propMap =
        new(() => BuildPropertyMap(), LazyThreadSafetyMode.ExecutionAndPublication);

    public DbDataLoader(IDbConnectionFactory factory, ILogger<DbDataLoader<T>>? logger = null)
        : this(factory, factory, logger) { }

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

    // ── Private helpers ───────────────────────────────────────────────────────

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
        var cmd = new CommandDefinition(sql, parameters,
                      commandTimeout: timeoutSeconds, cancellationToken: ct);

        // QueryAsync (untyped) returns IDictionary<string,object> per row — avoids
        // Dapper's Convert.ChangeType path which fails for types that do not implement
        // IConvertible (e.g. Npgsql's DateOnly for PostgreSQL date columns).
        var rawRows = await conn.QueryAsync(cmd);

        var propMap = _propMap.Value;
        var list = rawRows
            .Select(row =>
            {
                var item = Activator.CreateInstance<T>();
                foreach (var (colName, rawVal) in (IDictionary<string, object>)row)
                {
                    if (rawVal is null or System.DBNull) continue;
                    if (!propMap.TryGetValue(Normalize(colName), out var prop)) continue;
                    var converted = CoerceValue(rawVal, prop.PropertyType);
                    if (converted is not null)
                        prop.SetValue(item, converted);
                }
                return item;
            })
            .ToList();

        sw.Stop();
        logger?.LogInformation(
            "  {Side} loaded {Count:N0} rows in {Elapsed:F2}s",
            side, list.Count, sw.Elapsed.TotalSeconds);

        return list;
    }

    /// <summary>
    /// Builds a lookup: normalised column name → PropertyInfo.
    /// Normalised = lowercase with underscores removed so both "TradeId"
    /// and "trade_id" map to the same key.
    /// </summary>
    private static Dictionary<string, PropertyInfo> BuildPropertyMap()
    {
        var map = new Dictionary<string, PropertyInfo>(StringComparer.Ordinal);
        foreach (var prop in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
            map[Normalize(prop.Name)] = prop;
        return map;
    }

    /// <summary>Lowercase + strip underscores for column → property matching.</summary>
    private static string Normalize(string name) =>
        name.Replace("_", "", StringComparison.Ordinal).ToLowerInvariant();

    /// <summary>
    /// Converts a raw DB value to the target property type.
    /// Handles types that do not implement IConvertible (e.g. DateOnly).
    /// </summary>
    private static object? CoerceValue(object value, Type targetType)
    {
        var underlying = Nullable.GetUnderlyingType(targetType) ?? targetType;

        // Already the right type (or assignable)
        if (underlying.IsInstanceOfType(value))
            return value;

        // DateOnly (Npgsql returns this for PostgreSQL `date` columns)
        if (value is DateOnly dateOnly)
        {
            if (underlying == typeof(DateTime))   return dateOnly.ToDateTime(TimeOnly.MinValue);
            if (underlying == typeof(string))     return dateOnly.ToString("yyyy-MM-dd");
            if (underlying == typeof(DateOnly))   return dateOnly;   // already covered above
        }

        // TimeOnly (Npgsql returns this for PostgreSQL `time` columns)
        if (value is TimeOnly timeOnly)
        {
            if (underlying == typeof(TimeSpan)) return timeOnly.ToTimeSpan();
            if (underlying == typeof(string))   return timeOnly.ToString("O");
        }

        // Generic fallback — works for numeric types, booleans, strings, etc.
        if (underlying == typeof(string))
            return value.ToString();

        try
        {
            return Convert.ChangeType(value, underlying);
        }
        catch
        {
            // Best-effort: leave property at default rather than crash the run
            return null;
        }
    }
}
