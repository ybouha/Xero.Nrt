using System.Text.Json;
using Dapper;
using Xero.DataAcquisition;
using Xero.WebApi.Models;

namespace Xero.WebApi.Data;

/// <summary>
/// Manages <c>nrt_run_executions</c> header rows.
/// Creates a record before the run starts and provides targeted update methods
/// for each phase of the pipeline so callers can track progress in real time.
/// </summary>
public sealed class RunExecutionRepository
{
    private readonly IDbConnectionFactory _factory;
    private readonly string               _connectionString;

    private const string SelectColumns = @"
        run_id                        AS RunId,
        run_timestamp                 AS RunTimestamp,
        scenario_name                 AS ScenarioName,
        reference_version             AS ReferenceVersion,
        target_version                AS TargetVersion,
        valuation_date::text          AS ValuationDate,
        ref_row_count                 AS RefRowCount,
        tgt_row_count                 AS TgtRowCount,
        diff_row_count                AS DiffRowCount,
        only_in_ref_count             AS OnlyInRefCount,
        only_in_tgt_count             AS OnlyInTgtCount,
        passed                        AS Passed,
        column_schema::text           AS ColumnSchemaJson,
        status                        AS Status,
        error_message                 AS ErrorMessage,
        ref_cmd_status                AS RefCmdStatus,
        ref_cmd_started_at            AS RefCmdStartedAt,
        ref_cmd_finished_at           AS RefCmdFinishedAt,
        ref_cmd_exit_code             AS RefCmdExitCode,
        ref_cmd_error                 AS RefCmdError,
        tgt_cmd_status                AS TgtCmdStatus,
        tgt_cmd_started_at            AS TgtCmdStartedAt,
        tgt_cmd_finished_at           AS TgtCmdFinishedAt,
        tgt_cmd_exit_code             AS TgtCmdExitCode,
        tgt_cmd_error                 AS TgtCmdError,
        comparison_started_at         AS ComparisonStartedAt,
        saving_started_at             AS SavingStartedAt,
        finished_at                   AS FinishedAt,
        definition_id                 AS DefinitionId";

    public RunExecutionRepository(IDbConnectionFactory factory, string connectionString)
    {
        _factory          = factory;
        _connectionString = connectionString;
    }

    // ── Schema ────────────────────────────────────────────────────────────────

    /// <summary>
    /// No-op after V2 migration has been applied; kept for startup safety.
    /// The V2 migration script handles all DDL changes.
    /// </summary>
    public Task EnsureSchemaAsync(CancellationToken ct = default) => Task.CompletedTask;

    // ── Create ────────────────────────────────────────────────────────────────

    /// <summary>Inserts a new execution header with status=<c>pending</c> and returns the run_id.</summary>
    public async Task<int> CreateRunAsync(
        NrtRunRequest     request,
        DateTimeOffset    runTimestamp,
        CancellationToken ct)
    {
        var schemaJson = request.ColumnSchema.Length > 0
            ? JsonSerializer.Serialize(request.ColumnSchema)
            : null;

        using var conn = _factory.CreateConnection(_connectionString);
        return await conn.ExecuteScalarAsync<int>(new CommandDefinition(
            @"INSERT INTO nrt_run_executions
                  (run_timestamp, scenario_name, reference_version, target_version,
                   valuation_date, column_schema, status, definition_id)
              VALUES
                  (@RunTimestamp, @ScenarioName, @ReferenceVersion, @TargetVersion,
                   @ValuationDate::date, @ColumnSchema::jsonb, 'pending', @DefinitionId)
              RETURNING run_id",
            new
            {
                RunTimestamp     = runTimestamp,
                ScenarioName     = request.ScenarioName,
                ReferenceVersion = request.ReferenceVersion,
                TargetVersion    = request.TargetVersion,
                ValuationDate    = request.ValuationDate,
                ColumnSchema     = schemaJson,
                DefinitionId     = request.DefinitionId,
            },
            cancellationToken: ct));
    }

    // ── Status updates ────────────────────────────────────────────────────────

    /// <summary>Updates the overall workflow status (and optionally an error message).</summary>
    public async Task SetStatusAsync(
        int               runId,
        string            status,
        string?           errorMessage  = null,
        CancellationToken ct            = default)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_executions
              SET status        = @Status,
                  error_message = @ErrorMessage
              WHERE run_id = @RunId",
            new { RunId = runId, Status = status, ErrorMessage = errorMessage },
            cancellationToken: ct));
    }

    /// <summary>Updates the ref pre-execution command tracking columns.</summary>
    public async Task SetRefCommandStatusAsync(
        int               runId,
        string            status,
        DateTimeOffset?   startedAt,
        DateTimeOffset?   finishedAt,
        int?              exitCode,
        string?           error,
        CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_executions
              SET ref_cmd_status      = @Status,
                  ref_cmd_started_at  = @StartedAt,
                  ref_cmd_finished_at = @FinishedAt,
                  ref_cmd_exit_code   = @ExitCode,
                  ref_cmd_error       = @Error
              WHERE run_id = @RunId",
            new { RunId = runId, Status = status, StartedAt = startedAt,
                  FinishedAt = finishedAt, ExitCode = exitCode, Error = error },
            cancellationToken: ct));
    }

    /// <summary>Updates the target pre-execution command tracking columns.</summary>
    public async Task SetTgtCommandStatusAsync(
        int               runId,
        string            status,
        DateTimeOffset?   startedAt,
        DateTimeOffset?   finishedAt,
        int?              exitCode,
        string?           error,
        CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_executions
              SET tgt_cmd_status      = @Status,
                  tgt_cmd_started_at  = @StartedAt,
                  tgt_cmd_finished_at = @FinishedAt,
                  tgt_cmd_exit_code   = @ExitCode,
                  tgt_cmd_error       = @Error
              WHERE run_id = @RunId",
            new { RunId = runId, Status = status, StartedAt = startedAt,
                  FinishedAt = finishedAt, ExitCode = exitCode, Error = error },
            cancellationToken: ct));
    }

    /// <summary>Records the moment the comparison phase begins.</summary>
    public async Task SetComparisonStartedAsync(int runId, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_executions
              SET status                = 'running_comparison',
                  comparison_started_at = now()
              WHERE run_id = @RunId",
            new { RunId = runId },
            cancellationToken: ct));
    }

    /// <summary>Records the moment the save-results phase begins.</summary>
    public async Task SetSavingStartedAsync(int runId, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_executions
              SET status            = 'saving_results',
                  saving_started_at = now()
              WHERE run_id = @RunId",
            new { RunId = runId },
            cancellationToken: ct));
    }

    /// <summary>
    /// Finalises the execution record with row counts, pass/fail, and finished timestamp.
    /// Sets status to <c>completed</c>.
    /// </summary>
    public async Task SetCompletedAsync(
        int               runId,
        int               refCount,
        int               tgtCount,
        int               diffCount,
        int               onlyRefCount,
        int               onlyTgtCount,
        bool              passed,
        CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_run_executions
              SET status            = 'completed',
                  finished_at       = now(),
                  ref_row_count     = @RefCount,
                  tgt_row_count     = @TgtCount,
                  diff_row_count    = @DiffCount,
                  only_in_ref_count = @OnlyRefCount,
                  only_in_tgt_count = @OnlyTgtCount,
                  passed            = @Passed
              WHERE run_id = @RunId",
            new { RunId = runId, RefCount = refCount, TgtCount = tgtCount,
                  DiffCount = diffCount, OnlyRefCount = onlyRefCount,
                  OnlyTgtCount = onlyTgtCount, Passed = passed },
            cancellationToken: ct));
    }

    // ── Queries ───────────────────────────────────────────────────────────────

    public async Task<IReadOnlyList<RunExecutionSummary>> GetRunsAsync(
        int page, int pageSize, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var rows = await conn.QueryAsync<RunExecutionSummary>(new CommandDefinition(
            $@"SELECT {SelectColumns}
               FROM   nrt_run_executions
               ORDER  BY run_timestamp DESC
               LIMIT  @PageSize OFFSET @Offset",
            new { PageSize = pageSize, Offset = (page - 1) * pageSize },
            cancellationToken: ct));
        return rows.AsList();
    }

    public async Task<RunExecutionSummary?> GetRunAsync(int runId, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        return await conn.QuerySingleOrDefaultAsync<RunExecutionSummary>(new CommandDefinition(
            $@"SELECT {SelectColumns}
               FROM   nrt_run_executions
               WHERE  run_id = @RunId",
            new { RunId = runId },
            cancellationToken: ct));
    }
}

