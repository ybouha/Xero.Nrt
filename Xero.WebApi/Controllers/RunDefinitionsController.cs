using Microsoft.AspNetCore.Mvc;
using Xero.WebApi.Models;
using Xero.WebApi.Services;

namespace Xero.WebApi.Controllers;

/// <summary>
/// CRUD for reusable NRT run definitions, plus an execute endpoint that creates a run execution from a definition.
/// </summary>
[ApiController]
[Route("api/run-definitions")]
[Produces("application/json")]
public sealed class RunDefinitionsController : ControllerBase
{
    private readonly INrtRunDefinitionService _definitionService;
    private readonly INrtService              _nrtService;

    public RunDefinitionsController(
        INrtRunDefinitionService definitionService,
        INrtService              nrtService)
    {
        _definitionService = definitionService;
        _nrtService        = nrtService;
    }

    /// <summary>
    /// Returns all active run definitions (summary view, no nested DB config).
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<NrtRunDefinitionSummary>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<NrtRunDefinitionSummary>>> GetAll(CancellationToken ct)
    {
        var items = await _definitionService.GetAllAsync(ct);
        return Ok(items);
    }

    /// <summary>
    /// Returns the full detail for a single run definition, including DB connection settings and column schema.
    /// </summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(NrtRunDefinitionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<NrtRunDefinitionDto>> GetById(Guid id, CancellationToken ct)
    {
        var def = await _definitionService.GetByIdAsync(id, ct);
        if (def is null)
            return NotFound($"Definition {id} not found.");
        return Ok(def);
    }

    /// <summary>
    /// Creates a new run definition.
    /// </summary>
    /// <response code="201">Definition created. Location header points to the new resource.</response>
    [HttpPost]
    [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(
        [FromBody] SaveNrtRunDefinitionRequest req,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Name))
            return BadRequest("Name is required.");

        var id = await _definitionService.CreateAsync(req, ct);
        return CreatedAtAction(nameof(GetById), new { id }, new { definitionId = id });
    }

    /// <summary>
    /// Updates an existing run definition.
    /// </summary>
    /// <response code="204">Definition updated successfully.</response>
    /// <response code="404">Definition not found or has been deleted.</response>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] SaveNrtRunDefinitionRequest req,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Name))
            return BadRequest("Name is required.");

        var updated = await _definitionService.UpdateAsync(id, req, ct);
        if (!updated)
            return NotFound($"Definition {id} not found.");
        return NoContent();
    }

    /// <summary>
    /// Soft-deletes a run definition (sets <c>is_active = false</c>).
    /// Linked run executions are preserved.
    /// </summary>
    /// <response code="204">Definition deleted.</response>
    /// <response code="404">Definition not found or already deleted.</response>
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var deleted = await _definitionService.DeleteAsync(id, ct);
        if (!deleted)
            return NotFound($"Definition {id} not found.");
        return NoContent();
    }

    /// <summary>
    /// Executes the NRT pipeline from a saved definition.
    /// Only <c>ValuationDate</c> is required from the caller — all other parameters come from the definition.
    /// Returns a full <see cref="RunExecutionResponse"/> with status, counts, and pass/fail result.
    /// </summary>
    /// <response code="200">Run completed — inspect <c>Passed</c> and diff counts.</response>
    /// <response code="404">Definition not found.</response>
    [HttpPost("{id:guid}/execute")]
    [ProducesResponseType(typeof(RunExecutionResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<RunExecutionResponse>> Execute(
        Guid id,
        [FromBody] ExecuteFromDefinitionRequest req,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.ValuationDate))
            return BadRequest("ValuationDate is required.");

        // Build a minimal NrtRunRequest — NrtService will merge definition fields
        var runRequest = new NrtRunRequest
        {
            DefinitionId  = id,
            ValuationDate = req.ValuationDate,
        };

        var result = await _nrtService.ExecuteRunAsync(runRequest, ct);
        return Ok(result);
    }
}
