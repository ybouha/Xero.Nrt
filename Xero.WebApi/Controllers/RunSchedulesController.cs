using Microsoft.AspNetCore.Mvc;
using Quartz;
using Xero.WebApi.Data;
using Xero.WebApi.Models;
using Xero.WebApi.Scheduling;

namespace Xero.WebApi.Controllers;

/// <summary>
/// Management of cron run schedules. Each schedule binds a Quartz cron expression to a
/// saved run definition; the API keeps the in-memory Quartz scheduler in sync with the
/// <c>nrt_run_schedules</c> table on every mutation.
/// </summary>
[ApiController]
[Route("api/run-schedules")]
[Produces("application/json")]
public sealed class RunSchedulesController : ControllerBase
{
    private readonly NrtRunScheduleRepository   _repository;
    private readonly NrtRunDefinitionRepository _definitionRepository;
    private readonly IScheduleManager           _manager;

    public RunSchedulesController(
        NrtRunScheduleRepository   repository,
        NrtRunDefinitionRepository definitionRepository,
        IScheduleManager           manager)
    {
        _repository           = repository;
        _definitionRepository = definitionRepository;
        _manager              = manager;
    }

    /// <summary>Returns all schedules with their joined definition name and next fire time.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<NrtRunScheduleDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<NrtRunScheduleDto>>> GetAll(CancellationToken ct)
    {
        var items = await _repository.GetAllAsync(ct);
        foreach (var s in items)
            s.NextFireTime = await _manager.GetNextFireTimeAsync(s.ScheduleId, ct);
        return Ok(items);
    }

    /// <summary>Returns a single schedule by id.</summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(NrtRunScheduleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<NrtRunScheduleDto>> GetById(Guid id, CancellationToken ct)
    {
        var schedule = await _repository.GetByIdAsync(id, ct);
        if (schedule is null)
            return NotFound($"Schedule {id} not found.");
        schedule.NextFireTime = await _manager.GetNextFireTimeAsync(id, ct);
        return Ok(schedule);
    }

    /// <summary>Creates a schedule and, if enabled, registers it with Quartz.</summary>
    [HttpPost]
    [ProducesResponseType(typeof(object), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] SaveNrtRunScheduleRequest req, CancellationToken ct)
    {
        var error = await ValidateAsync(req, ct);
        if (error is not null)
            return BadRequest(error);

        var id = await _repository.CreateAsync(req, ct);

        if (req.IsEnabled)
        {
            var created = await _repository.GetByIdAsync(id, ct);
            await _manager.ScheduleAsync(created!, ct);
        }

        return CreatedAtAction(nameof(GetById), new { id }, new { scheduleId = id });
    }

    /// <summary>Updates a schedule and re-syncs its Quartz registration.</summary>
    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] SaveNrtRunScheduleRequest req, CancellationToken ct)
    {
        var error = await ValidateAsync(req, ct);
        if (error is not null)
            return BadRequest(error);

        var updated = await _repository.UpdateAsync(id, req, ct);
        if (!updated)
            return NotFound($"Schedule {id} not found.");

        var current = await _repository.GetByIdAsync(id, ct);
        if (current!.IsEnabled)
            await _manager.ScheduleAsync(current, ct);
        else
            await _manager.UnscheduleAsync(id, ct);

        return NoContent();
    }

    /// <summary>Enables or disables a schedule, syncing Quartz accordingly.</summary>
    [HttpPatch("{id:guid}/enabled")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SetEnabled(Guid id, [FromQuery] bool enabled, CancellationToken ct)
    {
        var changed = await _repository.SetEnabledAsync(id, enabled, ct);
        if (!changed)
            return NotFound($"Schedule {id} not found.");

        if (enabled)
        {
            var schedule = await _repository.GetByIdAsync(id, ct);
            await _manager.ScheduleAsync(schedule!, ct);
        }
        else
        {
            await _manager.UnscheduleAsync(id, ct);
        }

        return NoContent();
    }

    /// <summary>Deletes a schedule and removes it from Quartz.</summary>
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct)
    {
        var deleted = await _repository.DeleteAsync(id, ct);
        if (!deleted)
            return NotFound($"Schedule {id} not found.");

        await _manager.UnscheduleAsync(id, ct);
        return NoContent();
    }

    /// <summary>Fires the schedule's NRT run immediately, regardless of its cron trigger.</summary>
    [HttpPost("{id:guid}/trigger")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Trigger(Guid id, CancellationToken ct)
    {
        var schedule = await _repository.GetByIdAsync(id, ct);
        if (schedule is null)
            return NotFound($"Schedule {id} not found.");

        await _manager.TriggerNowAsync(schedule, ct);
        return Accepted();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private async Task<string?> ValidateAsync(SaveNrtRunScheduleRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Name))
            return "Name is required.";
        if (string.IsNullOrWhiteSpace(req.CronExpression))
            return "CronExpression is required.";
        if (!CronExpression.IsValidExpression(req.CronExpression))
            return $"Invalid cron expression: '{req.CronExpression}'.";
        if (req.DefinitionId == Guid.Empty)
            return "DefinitionId is required.";

        var def = await _definitionRepository.GetByIdAsync(req.DefinitionId, ct);
        if (def is null)
            return $"Definition {req.DefinitionId} not found.";

        if (!string.IsNullOrWhiteSpace(req.TimeZone))
        {
            try { _ = TimeZoneInfo.FindSystemTimeZoneById(req.TimeZone); }
            catch (TimeZoneNotFoundException) { return $"Unknown time zone: '{req.TimeZone}'."; }
        }

        return null;
    }
}
