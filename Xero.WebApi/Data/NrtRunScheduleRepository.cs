using Dapper;
using Xero.DataAcquisition;
using Xero.WebApi.Models;

namespace Xero.WebApi.Data;

/// <summary>
/// CRUD operations for <c>nrt_run_schedules</c>.
/// The table is created idempotently at startup via <see cref="EnsureSchemaAsync"/>
/// (mirrors the V4 migration) so the feature is self-contained.
/// </summary>
public sealed class NrtRunScheduleRepository
{
    private readonly IDbConnectionFactory _factory;
    private readonly string               _connectionString;

    private const string SelectColumns = @"
        s.schedule_id      AS ScheduleId,
        s.definition_id    AS DefinitionId,
        s.name             AS Name,
        s.cron_expression  AS CronExpression,
        s.time_zone        AS TimeZone,
        s.valuation_date::text AS ValuationDate,
        s.is_enabled       AS IsEnabled,
        s.last_run_at      AS LastRunAt,
        s.last_run_id      AS LastRunId,
        s.last_status      AS LastStatus,
        s.last_error       AS LastError,
        s.created_at       AS CreatedAt,
        s.updated_at       AS UpdatedAt,
        d.name             AS DefinitionName";

    public NrtRunScheduleRepository(IDbConnectionFactory factory, string connectionString)
    {
        _factory          = factory;
        _connectionString = connectionString;
    }

    // ── Schema ──────────────────────────────────────────────────────────────────

    public async Task EnsureSchemaAsync(CancellationToken ct = default)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"CREATE TABLE IF NOT EXISTS nrt_run_schedules (
                  schedule_id     UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
                  definition_id   UUID         NOT NULL REFERENCES nrt_run_definitions (definition_id),
                  name            TEXT         NOT NULL,
                  cron_expression TEXT         NOT NULL,
                  time_zone       TEXT,
                  valuation_date  DATE,
                  is_enabled      BOOLEAN      NOT NULL DEFAULT true,
                  last_run_at     TIMESTAMPTZ,
                  last_run_id     INT,
                  last_status     TEXT,
                  last_error      TEXT,
                  created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
                  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
              );
              CREATE INDEX IF NOT EXISTS ix_nrt_run_schedules_definition
                  ON nrt_run_schedules (definition_id);
              CREATE INDEX IF NOT EXISTS ix_nrt_run_schedules_enabled
                  ON nrt_run_schedules (is_enabled) WHERE is_enabled = true;
              CREATE OR REPLACE FUNCTION fn_update_nrt_run_schedules_ts()
              RETURNS TRIGGER AS $$
              BEGIN
                  NEW.updated_at = now();
                  RETURN NEW;
              END;
              $$ LANGUAGE plpgsql;
              DROP TRIGGER IF EXISTS trg_nrt_run_schedules_ts ON nrt_run_schedules;
              CREATE TRIGGER trg_nrt_run_schedules_ts
                  BEFORE UPDATE ON nrt_run_schedules
                  FOR EACH ROW EXECUTE FUNCTION fn_update_nrt_run_schedules_ts();",
            cancellationToken: ct));
    }

    // ── Queries ───────────────────────────────────────────────────────────────

    public async Task<IReadOnlyList<NrtRunScheduleDto>> GetAllAsync(CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var rows = await conn.QueryAsync<NrtRunScheduleDto>(new CommandDefinition(
            $@"SELECT {SelectColumns}
               FROM   nrt_run_schedules s
               JOIN   nrt_run_definitions d ON d.definition_id = s.definition_id
               ORDER  BY s.name",
            cancellationToken: ct));
        return rows.AsList();
    }

    public async Task<IReadOnlyList<NrtRunScheduleDto>> GetEnabledAsync(CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var rows = await conn.QueryAsync<NrtRunScheduleDto>(new CommandDefinition(
            $@"SELECT {SelectColumns}
               FROM   nrt_run_schedules s
               JOIN   nrt_run_definitions d ON d.definition_id = s.definition_id
               WHERE  s.is_enabled = true",
            cancellationToken: ct));
        return rows.AsList();
    }

    public async Task<NrtRunScheduleDto?> GetByIdAsync(Guid id, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        return await conn.QuerySingleOrDefaultAsync<NrtRunScheduleDto>(new CommandDefinition(
            $@"SELECT {SelectColumns}
               FROM   nrt_run_schedules s
               JOIN   nrt_run_definitions d ON d.definition_id = s.definition_id
               WHERE  s.schedule_id = @Id",
            new { Id = id },
            cancellationToken: ct));
    }

    // ── Mutations ─────────────────────────────────────────────────────────────

    public async Task<Guid> CreateAsync(SaveNrtRunScheduleRequest req, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        return await conn.ExecuteScalarAsync<Guid>(new CommandDefinition(
            @"INSERT INTO nrt_run_schedules
                  (definition_id, name, cron_expression, time_zone, valuation_date, is_enabled)
              VALUES
                  (@DefinitionId, @Name, @CronExpression, @TimeZone, @ValuationDate::date, @IsEnabled)
              RETURNING schedule_id",
            new
            {
                req.DefinitionId,
                req.Name,
                req.CronExpression,
                req.TimeZone,
                req.ValuationDate,
                req.IsEnabled,
            },
            cancellationToken: ct));
    }

    public async Task<bool> UpdateAsync(Guid id, SaveNrtRunScheduleRequest req, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var affected = await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_schedules
              SET definition_id   = @DefinitionId,
                  name            = @Name,
                  cron_expression = @CronExpression,
                  time_zone       = @TimeZone,
                  valuation_date  = @ValuationDate::date,
                  is_enabled      = @IsEnabled
              WHERE schedule_id = @Id",
            new
            {
                Id = id,
                req.DefinitionId,
                req.Name,
                req.CronExpression,
                req.TimeZone,
                req.ValuationDate,
                req.IsEnabled,
            },
            cancellationToken: ct));
        return affected > 0;
    }

    public async Task<bool> SetEnabledAsync(Guid id, bool enabled, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var affected = await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_schedules SET is_enabled = @Enabled WHERE schedule_id = @Id",
            new { Id = id, Enabled = enabled },
            cancellationToken: ct));
        return affected > 0;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var affected = await conn.ExecuteAsync(new CommandDefinition(
            @"DELETE FROM nrt_run_schedules WHERE schedule_id = @Id",
            new { Id = id },
            cancellationToken: ct));
        return affected > 0;
    }

    /// <summary>Records the outcome of a fired run for display in the UI.</summary>
    public async Task SetLastRunAsync(
        Guid id, int? runId, string status, string? error, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_schedules
              SET last_run_at = now(),
                  last_run_id = @RunId,
                  last_status = @Status,
                  last_error  = @Error
              WHERE schedule_id = @Id",
            new { Id = id, RunId = runId, Status = status, Error = error },
            cancellationToken: ct));
    }
}
