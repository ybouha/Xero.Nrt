using System.Diagnostics;
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
///   ├── RunId            INT                    – FK to nrt_run_executions
///   ├── RunTimestamp     TIMESTAMPTZ / DATETIMEOFFSET
///   ├── ScenarioName     TEXT / NVARCHAR(200)
///   ├── ReferenceVersion TEXT / NVARCHAR(100)
///   ├── TargetVersion    TEXT / NVARCHAR(100)
///   ├── DiffType         TEXT  – "InBothButDiff" | "OnlyInReference" | "OnlyInTarget"
///   ├── Diffs            JSONB / NVARCHAR(MAX)  – {"FieldName":{"Ref":val,"Tgt":val},…}
///   └── CompareItems     JSONB / NVARCHAR(MAX)  – [refItem, tgtItem] or [item]
/// </code>
///
/// Key column values are stored inside <c>CompareItems</c> — the table has no
/// schema-specific columns so it works with any run's <c>ColumnSchema</c>.
///
/// All three comparison outcomes are persisted:
///   • InBothButDiff     — rows present in both sides with at least one field difference
///   • OnlyInReference   — rows present only in the reference dataset
///   • OnlyInTarget      — rows present only in the target dataset
///
/// Works with both SQL Server and PostgreSQL via the injected <see cref="IDbConnectionFactory"/>.
/// Rows are inserted in batches of <see cref="BatchSize"/> for throughput.
/// </summary>
public sealed class DbDiffSaver<T> : IResultSaver<T> where T : class, new()
{
    private const int BatchSize = 500;

    private readonly IDbConnectionFactory    _factory;
    private readonly string                  _connectionString;
    private readonly string                  _tableName;
    private readonly ILogger<DbDiffSaver<T>>? _logger;

    private static readonly JsonSerializerOptions _jsonOpts = new()
    {
        WriteIndented = false
    };

    /// <param name="factory">Connection factory — determines SQL dialect.</param>
    /// <param name="connectionString">Target database connection string.</param>
    /// <param name="tableName">Table to write into (created automatically if absent).</param>
    /// <param name="logger">Optional structured logger.</param>
    public DbDiffSaver(
        IDbConnectionFactory      factory,
        string                    connectionString,
        string                    tableName,
        ILogger<DbDiffSaver<T>>?  logger = null)
    {
        _factory          = factory;
        _connectionString = connectionString;
        _tableName        = tableName;
        _logger           = logger;
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

    private string BuildSqlServerDdl() =>
        $@"IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = '{_tableName}')
           BEGIN
               CREATE TABLE {_tableName} (
                   Id               INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_{_tableName} PRIMARY KEY,
                   RunId            INT               NULL,
                   RunTimestamp     DATETIMEOFFSET    NOT NULL,
                   ScenarioName     NVARCHAR(200)     NOT NULL,
                   ReferenceVersion NVARCHAR(100)     NOT NULL,
                   TargetVersion    NVARCHAR(100)     NOT NULL,
                   DiffType         NVARCHAR(50)      NULL,
                   Diffs            NVARCHAR(MAX)     NULL,
                   CompareItems     NVARCHAR(MAX)     NULL
               )
           END";

    private string BuildPostgreSqlDdl() =>
        $@"CREATE TABLE IF NOT EXISTS ""{_tableName}"" (
               ""Id""               SERIAL      NOT NULL PRIMARY KEY,
               ""RunId""            INTEGER     NULL,
               ""RunTimestamp""     TIMESTAMPTZ NOT NULL,
               ""ScenarioName""     TEXT        NOT NULL,
               ""ReferenceVersion"" TEXT        NOT NULL,
               ""TargetVersion""    TEXT        NOT NULL,
               ""DiffType""         TEXT,
               ""Diffs""            JSONB,
               ""CompareItems""     JSONB
           )";

    // ── DML ───────────────────────────────────────────────────────────────────

    private string BuildInsertSql()
    {
        bool pg = _factory.Dialect == DbDialect.PostgreSql;
        string Q(string name) => pg ? $"\"{name}\"" : name;
        string table = pg ? $"\"{_tableName}\"" : _tableName;

        var cols = string.Join(", ",
            Q("RunId"), Q("RunTimestamp"), Q("ScenarioName"),
            Q("ReferenceVersion"), Q("TargetVersion"),
            Q("DiffType"), Q("Diffs"), Q("CompareItems"));

        var vals = pg
            ? "@RunId, @RunTimestamp, @ScenarioName, @ReferenceVersion, @TargetVersion, @DiffType, @Diffs::jsonb, @CompareItems::jsonb"
            : "@RunId, @RunTimestamp, @ScenarioName, @ReferenceVersion, @TargetVersion, @DiffType, @Diffs, @CompareItems";

        return $"INSERT INTO {table} ({cols}) VALUES ({vals})";
    }

    // ── Row mapping ───────────────────────────────────────────────────────────

    private static DynamicParameters BuildDiffParams(
        PooledDictionary<string, object> row,
        SaveOptions options)
    {
        var p = new DynamicParameters();
        p.Add("RunId",            options.RunId);
        p.Add("RunTimestamp",     options.RunTimestamp);
        p.Add("ScenarioName",     options.ScenarioName);
        p.Add("ReferenceVersion", options.ReferenceVersion);
        p.Add("TargetVersion",    options.TargetVersion);
        p.Add("DiffType",         "InBothButDiff");
        p.Add("Diffs",            BuildDiffsJson(row));
        p.Add("CompareItems",     BuildCompareItemsJson(row));
        return p;
    }

    private static DynamicParameters BuildSingleItemParams(
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
        p.Add("DiffType",         diffType);
        p.Add("Diffs",            null);
        p.Add("CompareItems",     JsonSerializer.Serialize(new[] { item }, _jsonOpts));
        return p;
    }

    // ── JSON helpers ──────────────────────────────────────────────────────────

    private static string BuildDiffsJson(PooledDictionary<string, object> row)
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
}
