using System.Text.Json;
using Dapper;
using Xero.DataAcquisition;
using Xero.SmartComparer;
using Xero.WebApi.Models;

namespace Xero.WebApi.Data;

/// <summary>
/// CRUD operations for <c>nrt_run_definitions</c>.
/// Uses Dapper + JSONB for nested config objects.
/// </summary>
public sealed class NrtRunDefinitionRepository
{
    private readonly IDbConnectionFactory _factory;
    private readonly string               _connectionString;

    private static readonly JsonSerializerOptions JsonOpts =
        new() { PropertyNameCaseInsensitive = true };

    public NrtRunDefinitionRepository(IDbConnectionFactory factory, string connectionString)
    {
        _factory          = factory;
        _connectionString = connectionString;
    }

    // ── Queries ───────────────────────────────────────────────────────────────

    public async Task<IReadOnlyList<NrtRunDefinitionSummary>> GetAllAsync(CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var rows = await conn.QueryAsync<NrtRunDefinitionSummary>(new CommandDefinition(
            @"SELECT definition_id      AS DefinitionId,
                     name               AS Name,
                     description        AS Description,
                     scope              AS Scope,
                     scenario_name      AS ScenarioName,
                     reference_version  AS ReferenceVersion,
                     target_version     AS TargetVersion,
                     ref_commandline    AS RefCommandLine,
                     target_commandline AS TargetCommandLine,
                     created_at         AS CreatedAt,
                     updated_at         AS UpdatedAt,
                     is_active          AS IsActive
              FROM   nrt_run_definitions
              WHERE  is_active = true
              ORDER  BY name",
            cancellationToken: ct));
        return rows.AsList();
    }

    public async Task<NrtRunDefinitionDto?> GetByIdAsync(Guid id, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var row = await conn.QuerySingleOrDefaultAsync<RawDefinitionRow>(new CommandDefinition(
            @"SELECT definition_id      AS DefinitionId,
                     name               AS Name,
                     description        AS Description,
                     scope              AS Scope,
                     scenario_name      AS ScenarioName,
                     reference_version  AS ReferenceVersion,
                     target_version     AS TargetVersion,
                     ref_commandline    AS RefCommandLine,
                     target_commandline AS TargetCommandLine,
                     created_at         AS CreatedAt,
                     updated_at         AS UpdatedAt,
                     is_active          AS IsActive,
                     reference_db::text AS ReferenceDbJson,
                     target_db::text    AS TargetDbJson,
                     compare_settings::text AS CompareSettingsJson,
                     output_settings::text  AS OutputSettingsJson,
                     column_schema::text    AS ColumnSchemaJson
              FROM   nrt_run_definitions
              WHERE  definition_id = @Id",
            new { Id = id },
            cancellationToken: ct));

        if (row is null) return null;

        return new NrtRunDefinitionDto
        {
            DefinitionId      = row.DefinitionId,
            Name              = row.Name,
            Description       = row.Description,
            Scope             = row.Scope,
            ScenarioName      = row.ScenarioName,
            ReferenceVersion  = row.ReferenceVersion,
            TargetVersion     = row.TargetVersion,
            RefCommandLine    = row.RefCommandLine,
            TargetCommandLine = row.TargetCommandLine,
            CreatedAt         = row.CreatedAt,
            UpdatedAt         = row.UpdatedAt,
            IsActive          = row.IsActive,
            Reference    = Deserialize<DbSettingsDto>(row.ReferenceDbJson)         ?? new DbSettingsDto(),
            Target       = Deserialize<DbSettingsDto>(row.TargetDbJson)            ?? new DbSettingsDto(),
            Compare      = Deserialize<CompareSettingsDto>(row.CompareSettingsJson) ?? new CompareSettingsDto(),
            Output       = Deserialize<OutputSettingsDto>(row.OutputSettingsJson)   ?? new OutputSettingsDto(),
            ColumnSchema = Deserialize<ColumnDef[]>(row.ColumnSchemaJson)           ?? Array.Empty<ColumnDef>(),
        };
    }

    private sealed class RawDefinitionRow
    {
        public Guid      DefinitionId      { get; init; }
        public string    Name              { get; init; } = "";
        public string?   Description       { get; init; }
        public string?   Scope             { get; init; }
        public string    ScenarioName      { get; init; } = "";
        public string    ReferenceVersion  { get; init; } = "";
        public string    TargetVersion     { get; init; } = "";
        public string?   RefCommandLine    { get; init; }
        public string?   TargetCommandLine { get; init; }
        public DateTime  CreatedAt         { get; init; }
        public DateTime  UpdatedAt         { get; init; }
        public bool      IsActive          { get; init; }
        public string?   ReferenceDbJson   { get; init; }
        public string?   TargetDbJson      { get; init; }
        public string?   CompareSettingsJson { get; init; }
        public string?   OutputSettingsJson  { get; init; }
        public string?   ColumnSchemaJson    { get; init; }
    }

    // ── Mutations ─────────────────────────────────────────────────────────────

    public async Task<Guid> CreateAsync(SaveNrtRunDefinitionRequest req, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        return await conn.ExecuteScalarAsync<Guid>(new CommandDefinition(
            @"INSERT INTO nrt_run_definitions
                  (name, description, scope, scenario_name, reference_version, target_version,
                   ref_commandline, target_commandline,
                   reference_db, target_db, compare_settings, output_settings, column_schema)
              VALUES
                  (@Name, @Description, @Scope, @ScenarioName, @ReferenceVersion, @TargetVersion,
                   @RefCommandLine, @TargetCommandLine,
                   @ReferenceDb::jsonb, @TargetDb::jsonb,
                   @CompareSettings::jsonb, @OutputSettings::jsonb, @ColumnSchema::jsonb)
              RETURNING definition_id",
            new
            {
                req.Name,
                req.Description,
                req.Scope,
                req.ScenarioName,
                req.ReferenceVersion,
                req.TargetVersion,
                req.RefCommandLine,
                req.TargetCommandLine,
                ReferenceDb     = Serialize(req.Reference),
                TargetDb        = Serialize(req.Target),
                CompareSettings = Serialize(req.Compare),
                OutputSettings  = Serialize(req.Output),
                ColumnSchema    = Serialize(req.ColumnSchema),
            },
            cancellationToken: ct));
    }

    public async Task<bool> UpdateAsync(Guid id, SaveNrtRunDefinitionRequest req, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var affected = await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_definitions
              SET name               = @Name,
                  description        = @Description,
                  scope              = @Scope,
                  scenario_name      = @ScenarioName,
                  reference_version  = @ReferenceVersion,
                  target_version     = @TargetVersion,
                  ref_commandline    = @RefCommandLine,
                  target_commandline = @TargetCommandLine,
                  reference_db       = @ReferenceDb::jsonb,
                  target_db          = @TargetDb::jsonb,
                  compare_settings   = @CompareSettings::jsonb,
                  output_settings    = @OutputSettings::jsonb,
                  column_schema      = @ColumnSchema::jsonb
              WHERE definition_id = @Id AND is_active = true",
            new
            {
                Id               = id,
                req.Name,
                req.Description,
                req.Scope,
                req.ScenarioName,
                req.ReferenceVersion,
                req.TargetVersion,
                req.RefCommandLine,
                req.TargetCommandLine,
                ReferenceDb     = Serialize(req.Reference),
                TargetDb        = Serialize(req.Target),
                CompareSettings = Serialize(req.Compare),
                OutputSettings  = Serialize(req.Output),
                ColumnSchema    = Serialize(req.ColumnSchema),
            },
            cancellationToken: ct));
        return affected > 0;
    }

    /// <summary>Soft-deletes by setting <c>is_active = false</c>.</summary>
    public async Task<bool> SoftDeleteAsync(Guid id, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var affected = await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_definitions
              SET is_active = false
              WHERE definition_id = @Id AND is_active = true",
            new { Id = id },
            cancellationToken: ct));
        return affected > 0;
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static string Serialize<T>(T obj) => JsonSerializer.Serialize(obj);

    private static T? Deserialize<T>(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return default;
        try { return JsonSerializer.Deserialize<T>(json, JsonOpts); }
        catch { return default; }
    }
}
