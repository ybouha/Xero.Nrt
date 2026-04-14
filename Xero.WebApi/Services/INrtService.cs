using Xero.WebApi.Models;

namespace Xero.WebApi.Services;

public interface INrtService
{
    /// <summary>
    /// Executes the full NRT pipeline: load → compare → save → audit.
    /// Returns a summary of the run including pass/fail status and diff counts.
    /// </summary>
    Task<RunExecutionResponse> ExecuteRunAsync(NrtRunRequest request, CancellationToken ct);
}
