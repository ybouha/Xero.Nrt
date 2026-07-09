using Quartz;
using Xero.WebApi.Models;

namespace Xero.WebApi.Scheduling;

/// <inheritdoc />
public sealed class ScheduleManager : IScheduleManager
{
    private const string Group = "nrt";

    private readonly ISchedulerFactory      _schedulerFactory;
    private readonly ILogger<ScheduleManager> _logger;

    public ScheduleManager(ISchedulerFactory schedulerFactory, ILogger<ScheduleManager> logger)
    {
        _schedulerFactory = schedulerFactory;
        _logger           = logger;
    }

    private static JobKey     JobKeyFor(Guid id)     => new(id.ToString(), Group);
    private static TriggerKey TriggerKeyFor(Guid id) => new(id.ToString(), Group);

    public async Task ScheduleAsync(NrtRunScheduleDto schedule, CancellationToken ct = default)
    {
        var scheduler = await _schedulerFactory.GetScheduler(ct);

        // Replace any prior registration so edits take immediate effect.
        await scheduler.DeleteJob(JobKeyFor(schedule.ScheduleId), ct);

        var job = JobBuilder.Create<NrtRunJob>()
            .WithIdentity(JobKeyFor(schedule.ScheduleId))
            .UsingJobData(NrtRunJob.ScheduleIdKey,    schedule.ScheduleId.ToString())
            .UsingJobData(NrtRunJob.DefinitionIdKey,  schedule.DefinitionId.ToString())
            .UsingJobData(NrtRunJob.ValuationDateKey, schedule.ValuationDate ?? string.Empty)
            .Build();

        var tz = !string.IsNullOrWhiteSpace(schedule.TimeZone)
            ? TimeZoneInfo.FindSystemTimeZoneById(schedule.TimeZone)
            : TimeZoneInfo.Utc;

        var cron = CronScheduleBuilder.CronSchedule(schedule.CronExpression)
            .InTimeZone(tz)
            .WithMisfireHandlingInstructionFireAndProceed();

        var trigger = TriggerBuilder.Create()
            .WithIdentity(TriggerKeyFor(schedule.ScheduleId))
            .WithSchedule(cron)
            .Build();

        await scheduler.ScheduleJob(job, trigger, ct);
        var state      = await scheduler.GetTriggerState(TriggerKeyFor(schedule.ScheduleId), ct);
        var registered = await scheduler.GetTrigger(TriggerKeyFor(schedule.ScheduleId), ct);
        _logger.LogInformation(
            "Scheduled '{Name}' ({ScheduleId}) cron='{Cron}' nextFire={NextFire} triggerState={State}",
            schedule.Name, schedule.ScheduleId, schedule.CronExpression,
            registered?.GetNextFireTimeUtc(), state);
    }

    public async Task UnscheduleAsync(Guid scheduleId, CancellationToken ct = default)
    {
        var scheduler = await _schedulerFactory.GetScheduler(ct);
        if (await scheduler.DeleteJob(JobKeyFor(scheduleId), ct))
            _logger.LogInformation("Unscheduled {ScheduleId}", scheduleId);
    }

    public async Task TriggerNowAsync(NrtRunScheduleDto schedule, CancellationToken ct = default)
    {
        var scheduler = await _schedulerFactory.GetScheduler(ct);
        var jobKey    = JobKeyFor(schedule.ScheduleId);

        if (await scheduler.CheckExists(jobKey, ct))
        {
            await scheduler.TriggerJob(jobKey, ct);
            return;
        }

        // Disabled schedules have no registered job — fire a one-off durable job.
        var job = JobBuilder.Create<NrtRunJob>()
            .WithIdentity(jobKey)
            .UsingJobData(NrtRunJob.ScheduleIdKey,    schedule.ScheduleId.ToString())
            .UsingJobData(NrtRunJob.DefinitionIdKey,  schedule.DefinitionId.ToString())
            .UsingJobData(NrtRunJob.ValuationDateKey, schedule.ValuationDate ?? string.Empty)
            .StoreDurably()
            .Build();

        await scheduler.AddJob(job, replace: true, ct);
        await scheduler.TriggerJob(jobKey, ct);
        // Remove the durable shell so it does not linger for a disabled schedule.
        await scheduler.DeleteJob(jobKey, ct);
    }

    public async Task SyncAllAsync(IEnumerable<NrtRunScheduleDto> schedules, CancellationToken ct = default)
    {
        foreach (var schedule in schedules)
        {
            try
            {
                await ScheduleAsync(schedule, ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Failed to seed schedule '{Name}' ({ScheduleId}) — skipped",
                    schedule.Name, schedule.ScheduleId);
            }
        }
    }

    public async Task<DateTimeOffset?> GetNextFireTimeAsync(Guid scheduleId, CancellationToken ct = default)
    {
        var scheduler = await _schedulerFactory.GetScheduler(ct);
        var trigger   = await scheduler.GetTrigger(TriggerKeyFor(scheduleId), ct);
        return trigger?.GetNextFireTimeUtc();
    }
}
