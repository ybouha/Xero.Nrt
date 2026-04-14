using System.Diagnostics;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Text.Json;
using Dapper;
using Microsoft.Extensions.Logging;
using Xero.DataAcquisition;
using Xero.SmartComparer;

namespace Xero.ResultSaver;

/// <summary>
/// Persists every comparison outcome from a <see cref="CompareResult{T}"/> to a relational table.
///
/// Schema (auto-created on first run):
/// <code>
///   NrtDiffResults
///   ├── Id               SERIAL / INT IDENTITY  – surrogate PK
///   ├── RunTimestamp     TIMESTAMPTZ / DATETIMEOFFSET
///   ├── ScenarioName     TEXT / NVARCHAR(200)
///   ├── ReferenceVersion TEXT / NVARCHAR(100)
///   ├── TargetVersion    TEXT / NVARCHAR(100)
///   ├── &lt;KeyProp1&gt;       TEXT / NVARCHAR(500)   – one column per key property
///   ├── &lt;KeyProp2&gt;       …
///   ├── DiffType         TEXT  – "InBothButDiff" | "OnlyInReference" | "OnlyInTarget"
///   ├── Diffs            JSONB / NVARCHAR(MAX)  – {"Delta":{"Ref":1.0,"Tgt":1.1},…}
///   └── CompareItems     JSONB / NVARCHAR(MAX)  – [refItem, tgtItem] or [item]
/// </code>
///
/// All three comparison outcomes are persisted:
///   • InBothButDiff  — rows present in both sides with at least one field difference
///   • OnlyInReference — rows present only in the reference dataset
///   • OnlyInTarget    — rows present only in the target dataset
///
/// Works with both SQL Server and PostgreSQL via the injected <see cref="IDbConnectionFactory"/>.
/// Rows are inserted in batches of <see cref="BatchSize"/> for throughput.
/// </summary>
public sealed class DbDiffSaver<T> : IResultSaver<T> where T : class, new()
{
    private const int BatchSize = 500;

    private readonly IDbConnectionFactory                     _factory;
    private readonly string                                   _connectionString;
    private readonly string                                   _tableName;
    private readonly string[]                                 _keyProperties;
    private readonly Dictionary<string, Func<T, object?>>    _keyGetters;
    private readonly ILogger<DbDiffSaver<T>>?                 _logger;

    private static readonly JsonSerializerOptions _jsonOpts = new()
    {
        WriteIndented = false
    };

    /// <param name="factory">Connection factory — determines SQL dialect.</param>
    /// <param name="connectionString">Target database connection string.</param>
    /// <param name="tableName">Table to write into (created automatically if absent).</param>
    /// <param name="keyProperties">
    /// Names of the properties that form the composite key.
    /// Each becomes its own column so they are individually queryable and indexable.
    /// </param>
    /// <param name="logger">Optional structured logger.</param>
    public DbDiffSaver(
        IDbConnectionFactory     factory,
        string                   connectionString,
        string                   tableName,
        string[]                 keyProperties,
        ILogger<DbDiffSaver<T>>? logger = null)
    {
        _factory          = factory;
        _connectionString = connectionString;
        _tableName        = tableName;
        _keyProperties    = keyProperties;
        _logger           = logger;

        // Pre-compile property getters for key columns — used when persisting
        // OnlyInReference / OnlyInTarget rows that don't go through the diff dict path.
        _keyGetters = keyProperties.Distinct().ToDictionary(
            name => name,
            name => CompileGetter(name));
    }

    public async Task SaveAsync(
        CompareResult<T> result,
        SaveOptions      options,
        CancellationToken ct = default)
    {
        int diffCount    = result.Count;
        int onlyRefCount = result.OnlyInReference?.Count ?? 0;
        int onlyTgtCount = result.OnlyInTarget?.Count    ?? 0;

        if (diffCount == 0 && onlyRefCount == 0 && onlyTgtCount == 0)
        {
            _logger?.LogInformation("Nothing to write — all sides matched perfectly");
            return;
        }

        _logger?.LogInformation(
            "Saving to {Table} ({Dialect}) — InBothButDiff: {Diff:N0}, OnlyInRef: {OnlyRef:N0}, OnlyInTgt: {OnlyTgt:N0}",
            _tableName, _factory.Dialect, diffCount, onlyRefCount, onlyTgtCount);

        var sw = Stopwatch.StartNew();

        using var conn = _factory.CreateConnection(_connectionString);
        await EnsureTableAsync(conn, ct);

        var insertSql = BuildInsertSql();
        int written   = 0;

        // ── InBothButDiff ─────────────────────────────────────────────────────
        foreach (var batch in result.Chunk(BatchSize))
        {
            var paramBatch = batch
                .Select(row => BuildDiffParams(row, options))
                .ToList();
            await conn.ExecuteAsync(new CommandDefinition(insertSql, paramBatch, cancellationToken: ct));
            written += paramBatch.Count;
        }

        // ── OnlyInReference ───────────────────────────────────────────────────
        if (onlyRefCount > 0)
        {
            foreach (var batch in result.OnlyInReference!.Chunk(BatchSize))
            {
                var paramBatch = batch
                    .Select(item => BuildSingleItemParams(item, options, "OnlyInReference"))
                    .ToList();
                await conn.ExecuteAsync(new CommandDefinition(insertSql, paramBatch, cancellationToken: ct));
                written += paramBatch.Count;
            }
        }

        // ── OnlyInTarget ──────────────────────────────────────────────────────
        if (onlyTgtCount > 0)
        {
            foreach (var batch in result.OnlyInTarget!.Chunk(BatchSize))
            {
                var paramBatch = batch
                    .Select(item => BuildSingleItemParams(item, options, "OnlyInTarget"))
                    .ToList();
                await conn.ExecuteAsync(new CommandDefinition(insertSql, paramBatch, cancellationToken: ct));
                written += paramBatch.Count;
            }
        }

        sw.Stop();
        _logger?.LogInformation(
            "Saved {Written:N0} rows to {Table} in {Elapsed:F2}s",
            written, _tableName, sw.Elapsed.TotalSeconds);
    }

    // ── DDL ───────────────────────────────────────────────────────────────────

    private async Task EnsureTableAsync(System.Data.IDbConnection conn, CancellationToken ct)
    {
        var ddl = _factory.Dialect == DbDialect.PostgreSql
            ? BuildPostgreSqlDdl()
            : BuildSqlServerDdl();

        await conn.ExecuteAsync(new CommandDefinition(ddl, cancellationToken: ct));
    }

    private string BuildSqlServerDdl()
    {
        var sb = new StringBuilder();
        sb.AppendLine($"IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = '{_tableName}')");
        sb.AppendLine("BEGIN");
        sb.AppendLine($"    CREATE TABLE {_tableName} (");
        sb.AppendLine("        Id               INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_{_tableName} PRIMARY KEY,");
        sb.AppendLine("        RunId            INT               NULL,");
        sb.AppendLine("        RunTimestamp     DATETIMEOFFSET    NOT NULL,");
        sb.AppendLine("        ScenarioName     NVARCHAR(200)     NOT NULL,");
        sb.AppendLine("        ReferenceVersion NVARCHAR(100)     NOT NULL,");
        sb.AppendLine("        TargetVersion    NVARCHAR(100)     NOT NULL,");
        foreach (var key in _keyProperties.Distinct())
            sb.AppendLine($"        {key}            NVARCHAR(500)     NULL,");
        sb.AppendLine("        DiffType         NVARCHAR(50)      NULL,");
        sb.AppendLine("        Diffs            NVARCHAR(MAX)     NULL,");
        sb.AppendLine("        CompareItems     NVARCHAR(MAX)     NULL");
        sb.AppendLine("    )");
        sb.AppendLine("END");
        return sb.ToString();
    }

    private string BuildPostgreSqlDdl()
    {
        var sb = new StringBuilder();
        sb.AppendLine($"CREATE TABLE IF NOT EXISTS \"{_tableName}\" (");
        sb.AppendLine("    \"Id\"               SERIAL          NOT NULL PRIMARY KEY,");
        sb.AppendLine("    \"RunId\"            INTEGER         NULL,");
        sb.AppendLine("    \"RunTimestamp\"     TIMESTAMPTZ     NOT NULL,");
        sb.AppendLine("    \"ScenarioName\"     TEXT            NOT NULL,");
        sb.AppendLine("    \"ReferenceVersion\" TEXT            NOT NULL,");
        sb.AppendLine("    \"TargetVersion\"    TEXT            NOT NULL,");
        foreach (var key in _keyProperties.Distinct())
            sb.AppendLine($"    \"{key}\"             TEXT,");
        sb.AppendLine("    \"DiffType\"         TEXT,");
        sb.AppendLine("    \"Diffs\"            JSONB,");
        sb.AppendLine("    \"CompareItems\"     JSONB");
        sb.AppendLine(")");
        return sb.ToString();
    }

    // ── DML ───────────────────────────────────────────────────────────────────

    private string BuildInsertSql()
    {
        bool pg = _factory.Dialect == DbDialect.PostgreSql;

        string Q(string name) => pg ? $"\"{name}\"" : name;

        var cols = new List<string>
        {
            Q("RunId"), Q("RunTimestamp"), Q("ScenarioName"),
            Q("ReferenceVersion"), Q("TargetVersion")
        };
        cols.AddRange(_keyProperties.Distinct().Select(Q));
        cols.Add(Q("DiffType"));
        cols.Add(Q("Diffs"));
        cols.Add(Q("CompareItems"));

        var vals = new List<string>
        {
            "@RunId", "@RunTimestamp", "@ScenarioName",
            "@ReferenceVersion", "@TargetVersion"
        };
        vals.AddRange(_keyProperties.Distinct().Select(k => $"@{k}"));
        vals.Add("@DiffType");
        // PostgreSQL: cast text parameters to JSONB at INSERT time
        vals.Add(pg ? "@Diffs::jsonb"         : "@Diffs");
        vals.Add(pg ? "@CompareItems::jsonb"   : "@CompareItems");

        var table = pg ? $"\"{_tableName}\"" : _tableName;
        return $"INSERT INTO {table} ({string.Join(", ", cols)}) VALUES ({string.Join(", ", vals)})";
    }

    // ── Row mapping — InBothButDiff ───────────────────────────────────────────

    private DynamicParameters BuildDiffParams(
        PooledDictionary<string, object> row,
        SaveOptions options)
    {
        var p = new DynamicParameters();
        p.Add("RunId",            options.RunId);
        p.Add("RunTimestamp",     options.RunTimestamp);
        p.Add("ScenarioName",     options.ScenarioName);
        p.Add("ReferenceVersion", options.ReferenceVersion);
        p.Add("TargetVersion",    options.TargetVersion);

        foreach (var key in _keyProperties.Distinct())
            p.Add(key, row.TryGetValue($"Key_{key}", out var val) ? val?.ToString() : null);

        p.Add("DiffType",     "InBothButDiff");
        p.Add("Diffs",        BuildDiffsJson(row));
        p.Add("CompareItems", BuildCompareItemsJson(row));

        return p;
    }

    // ── Row mapping — OnlyInReference / OnlyInTarget ──────────────────────────

    private DynamicParameters BuildSingleItemParams(
        T           item,
        SaveOptions options,
        string      diffType)
    {
        var p = new DynamicParameters();
        p.Add("RunId",            options.RunId);
        p.Add("RunTimestamp",     options.RunTimestamp);
        p.Add("ScenarioName",     options.ScenarioName);
        p.Add("ReferenceVersion", options.ReferenceVersion);
        p.Add("TargetVersion",    options.TargetVersion);

        foreach (var key in _keyProperties.Distinct())
            p.Add(key, _keyGetters.TryGetValue(key, out var getter) ? getter(item)?.ToString() : null);

        p.Add("DiffType",     diffType);
        p.Add("Diffs",        null);            // no field-level diff for single-side rows
        p.Add("CompareItems", JsonSerializer.Serialize(new[] { item }, _jsonOpts));

        return p;
    }

    // ── JSON helpers ──────────────────────────────────────────────────────────

    /// <summary>
    /// Builds the Diffs JSON object: {"FieldName":{"Ref":val,"Tgt":val}, …}
    /// </summary>
    private string BuildDiffsJson(PooledDictionary<string, object> row)
    {
        var diffNames = row.Keys
            .Where(k => k.StartsWith("Reference_", StringComparison.Ordinal))
            .Select(k => k[10..])
            .ToList();

        using var ms     = new System.IO.MemoryStream();
        using var writer = new Utf8JsonWriter(ms);

        writer.WriteStartObject();
        foreach (var name in diffNames)
        {
            writer.WritePropertyName(name);
            writer.WriteStartObject();
            if (row.TryGetValue($"Reference_{name}", out var refVal)) WriteValue(writer, "Ref", refVal);
            if (row.TryGetValue($"Target_{name}",    out var tgtVal)) WriteValue(writer, "Tgt", tgtVal);
            writer.WriteEndObject();
        }
        writer.WriteEndObject();
        writer.Flush();

        return Encoding.UTF8.GetString(ms.ToArray());
    }

    /// <summary>
    /// Builds the CompareItems JSON array: [referenceItem, targetItem]
    /// Extracts the <see cref="CoupleItem{T}"/> stored under the "ComparedItems" key.
    /// </summary>
    private static string BuildCompareItemsJson(PooledDictionary<string, object> row)
    {
        if (row.TryGetValue("ComparedItems", out var raw) && raw is CoupleItem<T> couple)
            return JsonSerializer.Serialize(new[] { couple.ReferenceItem, couple.TargetItem }, _jsonOpts);

        return "[]";
    }

    private static void WriteValue(Utf8JsonWriter w, string propName, object? val)
    {
        w.WritePropertyName(propName);
        switch (val)
        {
            case null:               w.WriteNullValue();                      break;
            case bool b:             w.WriteBooleanValue(b);                  break;
            case int i:              w.WriteNumberValue(i);                   break;
            case long l:             w.WriteNumberValue(l);                   break;
            case float f:            w.WriteNumberValue(f);                   break;
            case double d:           w.WriteNumberValue(d);                   break;
            case decimal dm:         w.WriteNumberValue(dm);                  break;
            case DateTime dt:        w.WriteStringValue(dt.ToString("O"));    break;
            case DateTimeOffset dto: w.WriteStringValue(dto.ToString("O"));   break;
            default:                 w.WriteStringValue(val.ToString());      break;
        }
    }

    // ── Reflection helper ─────────────────────────────────────────────────────

    private static Func<T, object?> CompileGetter(string propertyName)
    {
        var prop  = typeof(T).GetProperty(propertyName, BindingFlags.Instance | BindingFlags.Public)
                   ?? throw new ArgumentException($"Property '{propertyName}' not found on {typeof(T).Name}");
        var param = Expression.Parameter(typeof(T), "x");
        var body  = Expression.Convert(Expression.Property(param, prop), typeof(object));
        return Expression.Lambda<Func<T, object?>>(body, param).Compile();
    }
}
