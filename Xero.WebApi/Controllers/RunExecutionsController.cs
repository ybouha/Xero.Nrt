using Microsoft.AspNetCore.Mvc;
using Xero.WebApi.Data;
using Xero.WebApi.Models;
using Xero.WebApi.Services;

namespace Xero.WebApi.Controllers;

/// <summary>
/// Manages NRT run executions — trigger ad-hoc runs and query execution history.
/// </summary>
[ApiController]
[Route("api/run-executions")]
[Produces("application/json")]
public sealed class RunExecutionsController : ControllerBase
{
    private readonly INrtService           _nrtService;
    private readonly RunExecutionRepository _runRepository;

    public RunExecutionsController(INrtService nrtService, RunExecutionRepository runRepository)
    {
        _nrtService    = nrtService;
        _runRepository = runRepository;
    }

    /// <summary>
    /// Executes a full NRT pipeline: load reference + target data, compare, and save results.
    /// The call is synchronous and returns once all steps complete.
    /// Optionally pass a <c>DefinitionId</c> to run from a saved definition (only <c>ValuationDate</c> is required from the body in that case).
    /// </summary>
    /// <response code="200">Run completed — inspect <c>Passed</c> and diff counts.</response>
    /// <response code="400">Request body is invalid or required fields are missing.</response>
    /// <response code="500">An unexpected error occurred during the run.</response>
    [HttpPost]
    [ProducesResponseType(typeof(RunExecutionResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<RunExecutionResponse>> ExecuteRun(
        [FromBody] NrtRunRequest request,
        CancellationToken ct)
    {
        // When running ad-hoc (no definition), validate the connection strings are present
        if (!request.DefinitionId.HasValue)
        {
            if (string.IsNullOrWhiteSpace(request.Reference.ConnectionString))
                return BadRequest("Reference.ConnectionString is required.");

            if (string.IsNullOrWhiteSpace(request.Reference.Query))
                return BadRequest("Reference.Query is required.");

            if (string.IsNullOrWhiteSpace(request.Target.ConnectionString))
                return BadRequest("Target.ConnectionString is required.");

            if (string.IsNullOrWhiteSpace(request.Target.Query))
                return BadRequest("Target.Query is required.");
        }

        var result = await _nrtService.ExecuteRunAsync(request, ct);
        return Ok(result);
    }

    /// <summary>
    /// Returns a paginated list of past NRT run executions ordered by most recent first.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<RunExecutionSummary>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<RunExecutionSummary>>> GetRuns(
        [FromQuery] int page     = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken ct     = default)
    {
        if (page < 1)       page     = 1;
        if (pageSize < 1)   pageSize = 20;
        if (pageSize > 200) pageSize = 200;

        var runs = await _runRepository.GetRunsAsync(page, pageSize, ct);
        return Ok(runs);
    }

    /// <summary>
    /// Returns the summary for a single NRT run execution.
    /// </summary>
    [HttpGet("{runId:int}")]
    [ProducesResponseType(typeof(RunExecutionSummary), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RunExecutionSummary>> GetRun(int runId, CancellationToken ct)
    {
        var run = await _runRepository.GetRunAsync(runId, ct);
        if (run is null)
            return NotFound($"Run execution {runId} not found.");
        return Ok(run);
    }
}
