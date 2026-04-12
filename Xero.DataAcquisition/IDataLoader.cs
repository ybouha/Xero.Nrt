namespace Xero.DataAcquisition;

/// <summary>
/// Loads a reference dataset and a target dataset in one call so they can be
/// fed directly into <c>ListComparer&lt;T&gt;.CompareList</c>.
/// </summary>
public interface IDataLoader<T>
{
    /// <summary>
    /// Returns both sides of the comparison, loaded in parallel.
    /// </summary>
    Task<(IReadOnlyList<T> Reference, IReadOnlyList<T> Target)> LoadAsync(
        DataLoadOptions options,
        CancellationToken ct = default);
}
