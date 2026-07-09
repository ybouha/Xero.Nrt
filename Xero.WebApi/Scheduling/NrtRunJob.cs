using Quartz;
using Xero.WebApi.Data;
using Xero.WebApi.Models;
using Xero.WebApi.Services;

namespace Xero.WebApi.Scheduling;

/// <summary>
/// Quartz job that fires an NRT run for a scheduled definition.
/// Quartz's MS DI job factory creates a fresh scope per execution, so the scoped
/// <see cref="INrtService"/> is injected directly. The fire outcome is recorded back
/// onto the schedule row for display in the UI.
/// </summary>
[DisallowConcurrentExecution]
public sealed class NrtRunJob : IJob
{
    public const string ScheduleIdKey   = "scheduleId";
    public const string DefinitionIdKey = "definitionId";
    public const string ValuationDateKey = "valuationDate";

    private readonly INrtService               _nrtService;
    private readonly NrtRunScheduleRepository  _scheduleRepository;
    private readonly ILogger<NrtRunJob>        _logger;

    public NrtRunJob(
        INrtService              nrtService,
        NrtRunScheduleRepository scheduleRepository,
        ILogger<NrtRunJob>       logger)
    {
        _nrtService         = nrtService;
        _scheduleRepository = scheduleRepository;
        _logger             = logger;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        var map          = context.MergedJobDataMap;
        var scheduleId   = Guid.Parse(map.GetString(ScheduleIdKey)!);
        var definitionId = Guid.Parse(map.GetString(DefinitionIdKey)!);
        var valuationDate = map.ContainsKey(ValuationDateKey)
            ? map.GetString(ValuationDateKey)
            : null;

        var ct = context.CancellationToken;

        var request = new NrtRunRequest
        {
            DefinitionId  = definitionId,
            ValuationDate = string.IsNullOrWhiteSpace(valuationDate)
                ? DateTime.Today.ToString("yyyy-MM-dd")
                : valuationDate,
        };

        _logger.LogInformation(
            "Scheduled NRT run firing — schedule={ScheduleId} definition={DefinitionId} valDate={ValDate}",
            scheduleId, definitionId, request.ValuationDate);

        try
        {
            var result = await _nrtService.ExecuteRunAsync(request, ct);
            await _scheduleRepository.SetLastRunAsync(
                scheduleId, result.RunId, "completed", null, ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Scheduled NRT run failed — schedule={ScheduleId}", scheduleId);
            try
            {
                // Use CancellationToken.None — original token may be cancelled on shutdown.
                await _scheduleRepository.SetLastRunAsync(
                    scheduleId, null, "failed", ex.Message, CancellationToken.None);
            }
            catch (Exception dbEx)
            {
                _logger.LogError(dbEx,
                    "Failed to persist run failure for schedule {ScheduleId}", scheduleId);
            }
            // Do not rethrow: a failed run is recorded, not a Quartz misfire.
            // Rethrowing would put the Quartz trigger into ERROR state.
        }
    }
}
