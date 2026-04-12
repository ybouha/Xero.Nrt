using Xero.SmartComparer;

namespace Xero.ResultSaver;

/// <summary>
/// Persists a <see cref="CompareResult{T}"/> produced by the SmartComparer engine
/// to an external store (file, database, …).
/// </summary>
public interface IResultSaver<T> where T : class, new()
{
    Task SaveAsync(CompareResult<T> result, SaveOptions options, CancellationToken ct = default);
}
