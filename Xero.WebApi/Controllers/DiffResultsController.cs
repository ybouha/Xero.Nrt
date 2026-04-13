using Microsoft.AspNetCore.Mvc;
using Xero.WebApi.Models;
using Xero.WebApi.Services;

namespace Xero.WebApi.Controllers;

/// <summary>
/// Query and inspect individual diff results across all runs.
/// </summary>
[ApiController]
[Route("api/diffs")]
[Produces("application/json")]
public sealed class DiffResultsController : ControllerBase
{
    private readonly INrtResultService _resultService;

    public DiffResultsController(INrtResultService resultService)
        => _resultService = resultService;

    /// <summary>
    /// Returns paginated diff results across all runs.
    /// Supports filtering by DiffType, TradeId, Book, and Desk.
    /// </summary>
    /// <param name="diffType">Optional: InBothButDiff | OnlyInReference | OnlyInTarget</param>
    /// <param name="tradeId">Optional: filter by a specific trade ID.</param>
    /// <param name="book">Optional: filter by book.</param>
    /// <param name="desk">Optional: filter by desk.</param>
    /// <param name="page">1-based page number.</param>
    /// <param name="pageSize">Items per page (max 200).</param>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<DiffResultDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResult<DiffResultDto>>> GetDiffs(
        [FromQuery] string? diffType = null,
        [FromQuery] string? tradeId  = null,
        [FromQuery] string? book     = null,
        [FromQuery] string? desk     = null,
        [FromQuery] int     page     = 1,
        [FromQuery] int     pageSize = 50,
        CancellationToken   ct       = default)
    {
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

        var result = await _resultService.GetDiffsAsync(filter, ct);
        return Ok(result);
    }

    /// <summary>
    /// Returns a single diff result by its primary key.
    /// </summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(DiffResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DiffResultDto>> GetDiff(int id, CancellationToken ct)
    {
        var diff = await _resultService.GetDiffAsync(id, ct);
        if (diff is null)
            return NotFound($"Diff result {id} not found.");
        return Ok(diff);
    }
}
