namespace Xero.ResultViewerApi.Models;

/// <summary>
/// One row from <c>NrtDiffResults</c>.
/// <c>Diffs</c> and <c>CompareItems</c> are returned as raw JSON strings —
/// callers can deserialise them as needed.
/// </summary>
public sealed class DiffResultDto
{
    public int            Id               { get; init; }
    public DateTimeOffset RunTimestamp     { get; init; }
    public string         ScenarioName     { get; init; } = string.Empty;
    public string         ReferenceVersion { get; init; } = string.Empty;
    public string         TargetVersion    { get; init; } = string.Empty;
    public string?        TradeId          { get; init; }
    public string?        Book             { get; init; }
    public string?        Desk             { get; init; }
    public string?        RiskFactor       { get; init; }
    public string?        ValuationDate    { get; init; }

    /// <summary>
    /// "InBothButDiff" | "OnlyInReference" | "OnlyInTarget"
    /// </summary>
    public string?        DiffType         { get; init; }

    /// <summary>
    /// JSON object: { "FieldName": { "Ref": value, "Tgt": value }, … }
    /// Present only for DiffType = "InBothButDiff".
    /// </summary>
    public string?        Diffs            { get; init; }

    /// <summary>
    /// JSON array of the item(s) involved: [refItem, tgtItem] or [item].
    /// </summary>
    public string?        CompareItems     { get; init; }
}
