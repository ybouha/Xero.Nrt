using Xero.NrtApi.Models;

namespace Xero.NrtApi.Services;

public interface INrtService
{
    /// <summary>
    /// Executes the full NRT pipeline: load → compare → save → audit.
    /// Returns a summary of the run including pass/fail status and diff counts.
    /// </summary>
    Task<NrtRunResponse> ExecuteRunAsync(NrtRunRequest request, CancellationToken ct);
}
