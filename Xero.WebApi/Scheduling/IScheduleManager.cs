using Xero.WebApi.Models;

namespace Xero.WebApi.Scheduling;

/// <summary>
/// Keeps the in-memory Quartz scheduler in sync with the persisted
/// <c>nrt_run_schedules</c> table. Every CRUD/toggle on a schedule funnels through
/// here so Quartz and the database never diverge.
/// </summary>
public interface IScheduleManager
{
    /// <summary>Registers (or replaces) the cron job+trigger for an enabled schedule.</summary>
    Task ScheduleAsync(NrtRunScheduleDto schedule, CancellationToken ct = default);

    /// <summary>Removes any job+trigger registered for the schedule.</summary>
    Task UnscheduleAsync(Guid scheduleId, CancellationToken ct = default);

    /// <summary>Fires the schedule's job immediately, independent of its cron trigger.</summary>
    Task TriggerNowAsync(NrtRunScheduleDto schedule, CancellationToken ct = default);

    /// <summary>Seeds Quartz from all enabled DB schedules (called at startup).</summary>
    Task SyncAllAsync(IEnumerable<NrtRunScheduleDto> schedules, CancellationToken ct = default);

    /// <summary>Computes the next fire time for the schedule's trigger, if registered.</summary>
    Task<DateTimeOffset?> GetNextFireTimeAsync(Guid scheduleId, CancellationToken ct = default);
}
