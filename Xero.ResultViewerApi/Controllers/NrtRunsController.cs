using Microsoft.AspNetCore.Mvc;
using Xero.ResultViewerApi.Models;
using Xero.ResultViewerApi.Services;

namespace Xero.ResultViewerApi.Controllers;

/// <summary>
/// Browse and inspect NRT execution history.
/// </summary>
[ApiController]
[Route("api/runs")]
[Produces("application/json")]
public sealed class NrtRunsController : ControllerBase
{
    private readonly INrtResultService _resultService;

    public NrtRunsController(INrtResultService resultService)
        => _resultService = resultService;

    /// <summary>
    /// Returns a paginated list of all NRT runs ordered by most recent first.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<NrtRunDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<NrtRunDto>>> GetRuns(
        [FromQuery] int page     = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken ct     = default)
    {
        if (page < 1)       page     = 1;
        if (pageSize < 1)   pageSize = 20;
        if (pageSize > 200) pageSize = 200;

        var result = await _resultService.GetRunsAsync(page, pageSize, ct);
        return Ok(result);
    }

    /// <summary>
    /// Returns details for a specific NRT run.
    /// </summary>
    [HttpGet("{runId:int}")]
    [ProducesResponseType(typeof(NrtRunDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<NrtRunDto>> GetRun(int runId, CancellationToken ct)
    {
        var run = await _resultService.GetRunAsync(runId, ct);
        if (run is null)
            return NotFound($"Run {runId} not found.");
        return Ok(run);
    }

    /// <summary>
    /// Returns paginated diff results for a specific run.
    /// Supports filtering by DiffType, TradeId, Book, and Desk.
    /// </summary>
    /// <param name="runId">The run identifier.</param>
    /// <param name="diffType">Optional: InBothButDiff | OnlyInReference | OnlyInTarget</param>
    /// <param name="tradeId">Optional: filter by a specific trade ID.</param>
    /// <param name="book">Optional: filter by book.</param>
    /// <param name="desk">Optional: filter by desk.</param>
    /// <param name="page">1-based page number.</param>
    /// <param name="pageSize">Items per page (max 200).</param>
    [HttpGet("{runId:int}/diffs")]
    [ProducesResponseType(typeof(PagedResult<DiffResultDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PagedResult<DiffResultDto>>> GetDiffsForRun(
        int    runId,
        [FromQuery] string? diffType = null,
        [FromQuery] string? tradeId  = null,
        [FromQuery] string? book     = null,
        [FromQuery] string? desk     = null,
        [FromQuery] int     page     = 1,
        [FromQuery] int     pageSize = 50,
        CancellationToken   ct       = default)
    {
        var run = await _resultService.GetRunAsync(runId, ct);
        if (run is null)
            return NotFound($"Run {runId} not found.");

        if (page < 1)       page     = 1;
        if (pageSize < 1)   pageSize = 50;
        if (pageSize > 200) pageSize = 200;

        var filter = new DiffFilter
        {
            DiffType = diffType,
            TradeId  = tradeId,
            Book     = book,
            Desk     = desk,
            Page     = page,
            PageSize = pageSize,
        };

        var result = await _resultService.GetDiffsForRunAsync(runId, filter, ct);
        return Ok(result);
    }
}
