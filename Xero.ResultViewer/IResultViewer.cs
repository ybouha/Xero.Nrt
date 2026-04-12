using Xero.SmartComparer;

namespace Xero.ResultViewer;

/// <summary>
/// Renders a <see cref="CompareResult{T}"/> to a human-readable output
/// (console, HTML file, dashboard, …).
/// </summary>
public interface IResultViewer<T> where T : class, new()
{
    void Render(CompareResult<T> result, string scenarioName);
}
