using Quartz;

namespace Xero.WebApi.Scheduling;

/// <summary>
/// Global Quartz listener — logs every job lifecycle event so we can see exactly
/// whether the scheduler is attempting to fire a trigger and what happens.
/// </summary>
public sealed class NrtJobListener : IJobListener
{
    private readonly ILogger<NrtJobListener> _logger;

    public string Name => "nrt-global-listener";

    public NrtJobListener(ILogger<NrtJobListener> logger)
    {
        _logger = logger;
    }

    public Task JobToBeExecuted(IJobExecutionContext context, CancellationToken ct = default)
    {
        _logger.LogInformation(
            "Quartz firing job {JobKey} (trigger={TriggerKey} scheduledAt={ScheduledFireTime})",
            context.JobDetail.Key, context.Trigger.Key, context.ScheduledFireTimeUtc);
        return Task.CompletedTask;
    }

    public Task JobExecutionVetoed(IJobExecutionContext context, CancellationToken ct = default)
    {
        _logger.LogWarning(
            "Quartz VETOED job {JobKey} — [DisallowConcurrentExecution] blocked concurrent fire",
            context.JobDetail.Key);
        return Task.CompletedTask;
    }

    public Task JobWasExecuted(IJobExecutionContext context, JobExecutionException? jobException, CancellationToken ct = default)
    {
        if (jobException is not null)
            _logger.LogError(jobException,
                "Quartz job {JobKey} threw JobExecutionException after {Elapsed}ms",
                context.JobDetail.Key, context.JobRunTime.TotalMilliseconds);
        else
            _logger.LogInformation(
                "Quartz job {JobKey} completed in {Elapsed}ms",
                context.JobDetail.Key, context.JobRunTime.TotalMilliseconds);
        return Task.CompletedTask;
    }
}
