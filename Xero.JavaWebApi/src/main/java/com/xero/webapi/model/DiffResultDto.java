package com.xero.webapi.model;

import java.time.OffsetDateTime;

/**
 * One row from {@code NrtDiffResults}. {@code Diffs} and {@code CompareItems}
 * are returned as raw JSON strings — callers can deserialise them as needed.
 */
public class DiffResultDto {
    private int            Id;
    private OffsetDateTime RunTimestamp;
    private String         ScenarioName     = "";
    private String         ReferenceVersion = "";
    private String         TargetVersion    = "";

    /** "InBothButDiff" | "OnlyInReference" | "OnlyInTarget" */
    private String DiffType;

    /** JSON object: {"FieldName":{"Ref":value,"Tgt":value},...}. Present only for "InBothButDiff". */
    private String Diffs;

    /** JSON array of the item(s) involved: [refItem, tgtItem] or [item]. */
    private String CompareItems;

    public int getId() { return Id; }
    public void setId(int v) { this.Id = v; }
    public OffsetDateTime getRunTimestamp() { return RunTimestamp; }
    public void setRunTimestamp(OffsetDateTime v) { this.RunTimestamp = v; }
    public String getScenarioName() { return ScenarioName; }
    public void setScenarioName(String v) { this.ScenarioName = v; }
    public String getReferenceVersion() { return ReferenceVersion; }
    public void setReferenceVersion(String v) { this.ReferenceVersion = v; }
    public String getTargetVersion() { return TargetVersion; }
    public void setTargetVersion(String v) { this.TargetVersion = v; }
    public String getDiffType() { return DiffType; }
    public void setDiffType(String v) { this.DiffType = v; }
    public String getDiffs() { return Diffs; }
    public void setDiffs(String v) { this.Diffs = v; }
    public String getCompareItems() { return CompareItems; }
    public void setCompareItems(String v) { this.CompareItems = v; }
}
