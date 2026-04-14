using Xero.WebApi.Models;

namespace Xero.WebApi.Services;

public interface INrtResultService
{
    Task<PagedResult<RunExecutionDto>>    GetRunsAsync(int page, int pageSize, CancellationToken ct);
    Task<RunExecutionDto?>                GetRunAsync(int runId, CancellationToken ct);
    Task<PagedResult<DiffResultDto>> GetDiffsAsync(DiffFilter filter, CancellationToken ct);
    Task<PagedResult<DiffResultDto>> GetDiffsForRunAsync(int runId, DiffFilter filter, CancellationToken ct);
    Task<DiffResultDto?>            GetDiffAsync(int id, CancellationToken ct);
}
