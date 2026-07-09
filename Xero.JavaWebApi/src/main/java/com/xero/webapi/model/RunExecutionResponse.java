package com.xero.webapi.model;

import java.time.LocalDate;
import java.time.OffsetDateTime;

/** Returned synchronously when a run completes. */
public class RunExecutionResponse {
    private int            RunId;
    private String         ScenarioName;
    private String         ReferenceVersion;
    private String         TargetVersion;
    private LocalDate      ValuationDate;
    private OffsetDateTime RunTimestamp;
    private int            RefRowCount;
    private int            TgtRowCount;
    private int            DiffRowCount;
    private int            OnlyInRefCount;
    private int            OnlyInTgtCount;
    private boolean        Passed;
    private double         DurationSeconds;
    private String         Status;

    public int getRunId() { return RunId; }
    public void setRunId(int v) { this.RunId = v; }
    public String getScenarioName() { return ScenarioName; }
    public void setScenarioName(String v) { this.ScenarioName = v; }
    public String getReferenceVersion() { return ReferenceVersion; }
    public void setReferenceVersion(String v) { this.ReferenceVersion = v; }
    public String getTargetVersion() { return TargetVersion; }
    public void setTargetVersion(String v) { this.TargetVersion = v; }
    public LocalDate getValuationDate() { return ValuationDate; }
    public void setValuationDate(LocalDate v) { this.ValuationDate = v; }
    public OffsetDateTime getRunTimestamp() { return RunTimestamp; }
    public void setRunTimestamp(OffsetDateTime v) { this.RunTimestamp = v; }
    public int getRefRowCount() { return RefRowCount; }
    public void setRefRowCount(int v) { this.RefRowCount = v; }
    public int getTgtRowCount() { return TgtRowCount; }
    public void setTgtRowCount(int v) { this.TgtRowCount = v; }
    public int getDiffRowCount() { return DiffRowCount; }
    public void setDiffRowCount(int v) { this.DiffRowCount = v; }
    public int getOnlyInRefCount() { return OnlyInRefCount; }
    public void setOnlyInRefCount(int v) { this.OnlyInRefCount = v; }
    public int getOnlyInTgtCount() { return OnlyInTgtCount; }
    public void setOnlyInTgtCount(int v) { this.OnlyInTgtCount = v; }
    public boolean isPassed() { return Passed; }
    public void setPassed(boolean v) { this.Passed = v; }
    public double getDurationSeconds() { return DurationSeconds; }
    public void setDurationSeconds(double v) { this.DurationSeconds = v; }
    public String getStatus() { return Status; }
    public void setStatus(String v) { this.Status = v; }
}
