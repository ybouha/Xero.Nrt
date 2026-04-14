using Xero.WebApi.Data;
using Xero.WebApi.Models;

namespace Xero.WebApi.Services;

public interface INrtRunDefinitionService
{
    Task<IReadOnlyList<NrtRunDefinitionSummary>> GetAllAsync(CancellationToken ct);
    Task<NrtRunDefinitionDto?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<Guid> CreateAsync(SaveNrtRunDefinitionRequest req, CancellationToken ct);
    Task<bool> UpdateAsync(Guid id, SaveNrtRunDefinitionRequest req, CancellationToken ct);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct);
}

public sealed class NrtRunDefinitionService : INrtRunDefinitionService
{
    private readonly NrtRunDefinitionRepository _repo;

    public NrtRunDefinitionService(NrtRunDefinitionRepository repo) => _repo = repo;

    public Task<IReadOnlyList<NrtRunDefinitionSummary>> GetAllAsync(CancellationToken ct)
        => _repo.GetAllAsync(ct);

    public Task<NrtRunDefinitionDto?> GetByIdAsync(Guid id, CancellationToken ct)
        => _repo.GetByIdAsync(id, ct);

    public Task<Guid> CreateAsync(SaveNrtRunDefinitionRequest req, CancellationToken ct)
        => _repo.CreateAsync(req, ct);

    public Task<bool> UpdateAsync(Guid id, SaveNrtRunDefinitionRequest req, CancellationToken ct)
        => _repo.UpdateAsync(id, req, ct);

    public Task<bool> DeleteAsync(Guid id, CancellationToken ct)
        => _repo.SoftDeleteAsync(id, ct);
}
