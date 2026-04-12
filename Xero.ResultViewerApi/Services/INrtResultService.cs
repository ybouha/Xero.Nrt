using Xero.ResultViewerApi.Models;

namespace Xero.ResultViewerApi.Services;

public interface INrtResultService
{
    Task<PagedResult<NrtRunDto>>    GetRunsAsync(int page, int pageSize, CancellationToken ct);
    Task<NrtRunDto?>                GetRunAsync(int runId, CancellationToken ct);
    Task<PagedResult<DiffResultDto>> GetDiffsAsync(DiffFilter filter, CancellationToken ct);
    Task<PagedResult<DiffResultDto>> GetDiffsForRunAsync(int runId, DiffFilter filter, CancellationToken ct);
    Task<DiffResultDto?>            GetDiffAsync(int id, CancellationToken ct);
}
