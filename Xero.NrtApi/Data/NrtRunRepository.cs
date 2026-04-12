using Dapper;
using Xero.DataAcquisition;
using Xero.NrtApi.Models;

namespace Xero.NrtApi.Data;

/// <summary>
/// Manages <c>nrt_runs</c> header rows: creates a record before the run starts
/// and updates it with result counts and pass/fail status once the run completes.
/// </summary>
public sealed class NrtRunRepository
{
    private readonly IDbConnectionFactory _factory;
    private readonly string               _connectionString;

    public NrtRunRepository(IDbConnectionFactory factory, string connectionString)
    {
        _factory          = factory;
        _connectionString = connectionString;
    }

    /// <summary>Inserts a new run header and returns the generated run_id.</summary>
    public async Task<int> CreateRunAsync(
        NrtRunRequest   request,
        DateTimeOffset  runTimestamp,
        CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        return await conn.ExecuteScalarAsync<int>(new CommandDefinition(
            @"INSERT INTO nrt_runs
                  (run_timestamp, scenario_name, reference_version, target_version, valuation_date)
              VALUES
                  (@RunTimestamp, @ScenarioName, @ReferenceVersion, @TargetVersion, @ValuationDate::date)
              RETURNING run_id",
            new
            {
                RunTimestamp     = runTimestamp,
                ScenarioName     = request.ScenarioName,
                ReferenceVersion = request.ReferenceVersion,
                TargetVersion    = request.TargetVersion,
                ValuationDate    = request.ValuationDate,
            },
            cancellationToken: ct));
    }

    /// <summary>Fills in the summary counters and pass/fail flag after the run completes.</summary>
    public async Task UpdateRunAsync(
        int  runId,
        int  refCount,
        int  tgtCount,
        int  diffCount,
        int  onlyRefCount,
        int  onlyTgtCount,
        bool passed,
        CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        await conn.ExecuteAsync(new CommandDefinition(
            @"UPDATE nrt_runs
              SET ref_row_count      = @RefCount,
                  tgt_row_count      = @TgtCount,
                  diff_row_count     = @DiffCount,
                  only_in_ref_count  = @OnlyRefCount,
                  only_in_tgt_count  = @OnlyTgtCount,
                  passed             = @Passed
              WHERE run_id = @RunId",
            new { RunId = runId, RefCount = refCount, TgtCount = tgtCount,
                  DiffCount = diffCount, OnlyRefCount = onlyRefCount,
                  OnlyTgtCount = onlyTgtCount, Passed = passed },
            cancellationToken: ct));
    }

    public async Task<IReadOnlyList<NrtRunSummary>> GetRunsAsync(
        int page, int pageSize, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        var rows = await conn.QueryAsync<NrtRunSummary>(new CommandDefinition(
            @"SELECT run_id              AS RunId,
                     run_timestamp      AS RunTimestamp,
                     scenario_name      AS ScenarioName,
                     reference_version  AS ReferenceVersion,
                     target_version     AS TargetVersion,
                     valuation_date::text AS ValuationDate,
                     ref_row_count      AS RefRowCount,
                     tgt_row_count      AS TgtRowCount,
                     diff_row_count     AS DiffRowCount,
                     only_in_ref_count  AS OnlyInRefCount,
                     only_in_tgt_count  AS OnlyInTgtCount,
                     passed             AS Passed
              FROM   nrt_runs
              ORDER  BY run_timestamp DESC
              LIMIT  @PageSize OFFSET @Offset",
            new { PageSize = pageSize, Offset = (page - 1) * pageSize },
            cancellationToken: ct));
        return rows.AsList();
    }

    public async Task<NrtRunSummary?> GetRunAsync(int runId, CancellationToken ct)
    {
        using var conn = _factory.CreateConnection(_connectionString);
        return await conn.QuerySingleOrDefaultAsync<NrtRunSummary>(new CommandDefinition(
            @"SELECT run_id              AS RunId,
                     run_timestamp      AS RunTimestamp,
                     scenario_name      AS ScenarioName,
                     reference_version  AS ReferenceVersion,
                     target_version     AS TargetVersion,
                     valuation_date::text AS ValuationDate,
                     ref_row_count      AS RefRowCount,
                     tgt_row_count      AS TgtRowCount,
                     diff_row_count     AS DiffRowCount,
                     only_in_ref_count  AS OnlyInRefCount,
                     only_in_tgt_count  AS OnlyInTgtCount,
                     passed             AS Passed
              FROM   nrt_runs
              WHERE  run_id = @RunId",
            new { RunId = runId },
            cancellationToken: ct));
    }
}
