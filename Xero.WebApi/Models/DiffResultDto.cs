namespace Xero.WebApi.Models;

/// <summary>
/// One row from <c>NrtDiffResults</c>.
/// <c>Diffs</c> and <c>CompareItems</c> are returned as raw JSON strings —
/// callers can deserialise them as needed.
/// Key column values are no longer promoted to top-level properties; they live
/// inside <c>CompareItems</c> and the Angular grid reads them via the run's
/// <c>ColumnSchema</c>.
/// </summary>
public sealed class DiffResultDto
{
    public int            Id               { get; init; }
    public DateTimeOffset RunTimestamp     { get; init; }
    public string         ScenarioName     { get; init; } = string.Empty;
    public string         ReferenceVersion { get; init; } = string.Empty;
    public string         TargetVersion    { get; init; } = string.Empty;

    /// <summary>"InBothButDiff" | "OnlyInReference" | "OnlyInTarget"</summary>
    public string?        DiffType         { get; init; }

    /// <summary>
    /// JSON object: { "FieldName": { "Ref": value, "Tgt": value }, … }
    /// Present only for DiffType = "InBothButDiff".
    /// </summary>
    public string?        Diffs            { get; init; }

    /// <summary>
    /// JSON array of the item(s) involved: [refItem, tgtItem] or [item].
    /// Key column values are read from here by the Angular grid at runtime
    /// using the run's ColumnSchema.
    /// </summary>
    public string?        CompareItems     { get; init; }
}
