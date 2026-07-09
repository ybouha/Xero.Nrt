using Quartz;
using Quartz.Impl.Matchers;
using Xero.WebApi.Data;

namespace Xero.WebApi.Scheduling;

/// <summary>
/// On startup, ensures the <c>nrt_run_schedules</c> table exists and seeds the
/// in-memory Quartz scheduler from every enabled schedule. Runs after Quartz's own
/// hosted service has started the scheduler.
/// </summary>
public sealed class ScheduleBootstrapHostedService : IHostedService
{
    private readonly NrtRunScheduleRepository _repository;
    private readonly IScheduleManager         _manager;
    private readonly ISchedulerFactory        _schedulerFactory;
    private readonly NrtJobListener           _listener;
    private readonly ILogger<ScheduleBootstrapHostedService> _logger;

    public ScheduleBootstrapHostedService(
        NrtRunScheduleRepository repository,
        IScheduleManager         manager,
        ISchedulerFactory        schedulerFactory,
        NrtJobListener           listener,
        ILogger<ScheduleBootstrapHostedService> logger)
    {
        _repository       = repository;
        _manager          = manager;
        _schedulerFactory = schedulerFactory;
        _listener         = listener;
        _logger           = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var scheduler = await _schedulerFactory.GetScheduler(cancellationToken);
        scheduler.ListenerManager.AddJobListener(_listener, GroupMatcher<JobKey>.AnyGroup());

        await _repository.EnsureSchemaAsync(cancellationToken);

        var enabled = await _repository.GetEnabledAsync(cancellationToken);
        await _manager.SyncAllAsync(enabled, cancellationToken);

        _logger.LogInformation("Seeded {Count} enabled run schedule(s) into Quartz", enabled.Count);
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
