namespace Xero.WebApi.Models;

/// <summary>Generic envelope for paginated responses.</summary>
public sealed class PagedResult<T>
{
    public IReadOnlyList<T> Items      { get; init; } = [];
    public int              TotalCount { get; init; }
    public int              Page       { get; init; }
    public int              PageSize   { get; init; }
    public int              TotalPages => PageSize > 0
        ? (int)Math.Ceiling((double)TotalCount / PageSize)
        : 0;
}

/// <summary>Query parameters shared by diff-listing endpoints.</summary>
public sealed class DiffFilter
{
    public string? DiffType { get; set; }
    public string? TradeId  { get; set; }
    public string? Book     { get; set; }
    public string? Desk     { get; set; }
    public int     Page     { get; set; } = 1;
    public int     PageSize { get; set; } = 50;
}
