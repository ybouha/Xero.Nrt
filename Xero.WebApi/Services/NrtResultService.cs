using System.Data;
using System.Text;
using Dapper;
using Xero.WebApi.Models;

namespace Xero.WebApi.Services;

/// <summary>
/// Queries <c>nrt_run_executions</c> and <c>NrtDiffResults</c> directly using Dapper.
/// Diffs are correlated to runs via the <c>RunId</c> FK column written by
/// <see cref="Xero.ResultSaver.DbDiffSaver{T}"/> at save time.
/// </summary>
public sealed class NrtResultService : INrtResultService
{
    private const string RunSelect = @"
        SELECT run_id                    AS RunId,
               run_timestamp            AS RunTimestamp,
               scenario_name            AS ScenarioName,
               reference_version        AS ReferenceVersion,
               target_version           AS TargetVersion,
               valuation_date::text     AS ValuationDate,
               ref_row_count            AS RefRowCount,
               tgt_row_count            AS TgtRowCount,
               diff_row_count           AS DiffRowCount,
               only_in_ref_count        AS OnlyInRefCount,
               only_in_tgt_count        AS OnlyInTgtCount,
               passed                   AS Passed,
               column_schema::text      AS ColumnSchemaJson,
               status                   AS Status,
               error_message            AS ErrorMessage,
               ref_cmd_status           AS RefCmdStatus,
               ref_cmd_started_at       AS RefCmdStartedAt,
               ref_cmd_finished_at      AS RefCmdFinishedAt,
               ref_cmd_exit_code        AS RefCmdExitCode,
               ref_cmd_error            AS RefCmdError,
               tgt_cmd_status           AS TgtCmdStatus,
               tgt_cmd_started_at       AS TgtCmdStartedAt,
               tgt_cmd_finished_at      AS TgtCmdFinishedAt,
               tgt_cmd_exit_code        AS TgtCmdExitCode,
               tgt_cmd_error            AS TgtCmdError,
               comparison_started_at    AS ComparisonStartedAt,
               saving_started_at        AS SavingStartedAt,
               finished_at              AS FinishedAt,
               definition_id            AS DefinitionId
        FROM   nrt_run_executions";

    private const string DiffSelect = @"
        SELECT d.""Id""               AS Id,
               d.""RunTimestamp""     AS RunTimestamp,
               d.""ScenarioName""     AS ScenarioName,
               d.""ReferenceVersion"" AS ReferenceVersion,
               d.""TargetVersion""    AS TargetVersion,
               d.""DiffType""         AS DiffType,
               d.""Diffs""::text      AS Diffs,
               d.""CompareItems""::text AS CompareItems
        FROM   ""NrtDiffResults"" d";

    private readonly IDbConnection _connection;

    public NrtResultService(IDbConnection connection) => _connection = connection;

    // ── Runs ──────────────────────────────────────────────────────────────────

    public async Task<PagedResult<RunExecutionDto>> GetRunsAsync(
        int page, int pageSize, CancellationToken ct)
    {
        var totalCount = await _connection.ExecuteScalarAsync<int>(
            new CommandDefinition("SELECT COUNT(*) FROM nrt_run_executions", cancellationToken: ct));

        var items = await _connection.QueryAsync<RunExecutionDto>(
            new CommandDefinition(
                RunSelect + " ORDER BY run_timestamp DESC LIMIT @PageSize OFFSET @Offset",
                new { PageSize = pageSize, Offset = (page - 1) * pageSize },
                cancellationToken: ct));

        return new PagedResult<RunExecutionDto>
        {
            Items      = items.AsList(),
            TotalCount = totalCount,
            Page       = page,
            PageSize   = pageSize,
        };
    }

    public async Task<RunExecutionDto?> GetRunAsync(int runId, CancellationToken ct)
        => await _connection.QuerySingleOrDefaultAsync<RunExecutionDto>(
            new CommandDefinition(
                RunSelect + " WHERE run_id = @RunId",
                new { RunId = runId },
                cancellationToken: ct));

    // ── Diffs – global ────────────────────────────────────────────────────────

    public async Task<PagedResult<DiffResultDto>> GetDiffsAsync(
        DiffFilter filter, CancellationToken ct)
    {
        var (whereSql, parameters) = BuildDiffWhere(filter, runId: null);
        return await QueryDiffsPagedAsync(whereSql, parameters, filter, ct);
    }

    // ── Diffs – scoped to a single run ────────────────────────────────────────

    public async Task<PagedResult<DiffResultDto>> GetDiffsForRunAsync(
        int runId, DiffFilter filter, CancellationToken ct)
    {
        var (whereSql, parameters) = BuildDiffWhere(filter, runId);
        return await QueryDiffsPagedAsync(whereSql, parameters, filter, ct);
    }

    public async Task<DiffResultDto?> GetDiffAsync(int id, CancellationToken ct)
        => await _connection.QuerySingleOrDefaultAsync<DiffResultDto>(
            new CommandDefinition(
                DiffSelect + @" WHERE d.""Id"" = @Id",
                new { Id = id },
                cancellationToken: ct));

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static (string Sql, DynamicParameters Parameters) BuildDiffWhere(
        DiffFilter filter, int? runId)
    {
        var conditions = new List<string>();
        var p          = new DynamicParameters();

        if (runId.HasValue)
        {
            conditions.Add(@"d.""RunId"" = @RunId");
            p.Add("RunId", runId.Value);
        }

        if (!string.IsNullOrWhiteSpace(filter.DiffType))
        {
            conditions.Add(@"d.""DiffType"" = @DiffType");
            p.Add("DiffType", filter.DiffType);
        }

        var whereSql = conditions.Count > 0
            ? " WHERE " + string.Join(" AND ", conditions)
            : string.Empty;

        return (whereSql, p);
    }

    private async Task<PagedResult<DiffResultDto>> QueryDiffsPagedAsync(
        string            whereSql,
        DynamicParameters parameters,
        DiffFilter        filter,
        CancellationToken ct)
    {
        var countParams = Clone(parameters);
        var totalCount  = await _connection.ExecuteScalarAsync<int>(
            new CommandDefinition(
                $@"SELECT COUNT(*) FROM ""NrtDiffResults"" d {whereSql}",
                countParams,
                cancellationToken: ct));

        var dataParams = Clone(parameters);
        dataParams.Add("PageSize", filter.PageSize);
        dataParams.Add("Offset",   (filter.Page - 1) * filter.PageSize);

        var items = await _connection.QueryAsync<DiffResultDto>(
            new CommandDefinition(
                DiffSelect + whereSql + @" ORDER BY d.""Id"" LIMIT @PageSize OFFSET @Offset",
                dataParams,
                cancellationToken: ct));

        return new PagedResult<DiffResultDto>
        {
            Items      = items.AsList(),
            TotalCount = totalCount,
            Page       = filter.Page,
            PageSize   = filter.PageSize,
        };
    }

    /// <summary>Shallow-clones a <see cref="DynamicParameters"/> so the same base
    /// parameters can be reused for count + data queries without interference.</summary>
    private static DynamicParameters Clone(DynamicParameters source)
    {
        var clone = new DynamicParameters();
        clone.AddDynamicParams(source);
        return clone;
    }
}
