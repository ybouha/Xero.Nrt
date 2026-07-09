package com.xero.webapi.model;

import java.time.OffsetDateTime;
import java.util.UUID;

/** Summary of a single NRT execution (from <c>nrt_run_executions</c> table). */
public class RunExecutionSummary {
    private int             RunId;
    private OffsetDateTime  RunTimestamp;
    private String          ScenarioName     = "";
    private String          ReferenceVersion = "";
    private String          TargetVersion    = "";
    private String          ValuationDate    = "";
    private Integer         RefRowCount;
    private Integer         TgtRowCount;
    private Integer         DiffRowCount;
    private Integer         OnlyInRefCount;
    private Integer         OnlyInTgtCount;
    private Boolean         Passed;

    /** Raw JSON string of the ColumnDef[] schema stored at run creation time. */
    private String          ColumnSchemaJson;

    private String          Status              = "completed";
    private String          ErrorMessage;
    private String          RefCmdStatus;
    private String          TgtCmdStatus;
    private OffsetDateTime  RefCmdStartedAt;
    private OffsetDateTime  RefCmdFinishedAt;
    private Integer         RefCmdExitCode;
    private String          RefCmdError;
    private OffsetDateTime  TgtCmdStartedAt;
    private OffsetDateTime  TgtCmdFinishedAt;
    private Integer         TgtCmdExitCode;
    private String          TgtCmdError;
    private OffsetDateTime  ComparisonStartedAt;
    private OffsetDateTime  SavingStartedAt;
    private OffsetDateTime  FinishedAt;
    private UUID            DefinitionId;

    public int getRunId() { return RunId; }
    public void setRunId(int v) { this.RunId = v; }
    public OffsetDateTime getRunTimestamp() { return RunTimestamp; }
    public void setRunTimestamp(OffsetDateTime v) { this.RunTimestamp = v; }
    public String getScenarioName() { return ScenarioName; }
    public void setScenarioName(String v) { this.ScenarioName = v; }
    public String getReferenceVersion() { return ReferenceVersion; }
    public void setReferenceVersion(String v) { this.ReferenceVersion = v; }
    public String getTargetVersion() { return TargetVersion; }
    public void setTargetVersion(String v) { this.TargetVersion = v; }
    public String getValuationDate() { return ValuationDate; }
    public void setValuationDate(String v) { this.ValuationDate = v; }
    public Integer getRefRowCount() { return RefRowCount; }
    public void setRefRowCount(Integer v) { this.RefRowCount = v; }
    public Integer getTgtRowCount() { return TgtRowCount; }
    public void setTgtRowCount(Integer v) { this.TgtRowCount = v; }
    public Integer getDiffRowCount() { return DiffRowCount; }
    public void setDiffRowCount(Integer v) { this.DiffRowCount = v; }
    public Integer getOnlyInRefCount() { return OnlyInRefCount; }
    public void setOnlyInRefCount(Integer v) { this.OnlyInRefCount = v; }
    public Integer getOnlyInTgtCount() { return OnlyInTgtCount; }
    public void setOnlyInTgtCount(Integer v) { this.OnlyInTgtCount = v; }
    public Boolean getPassed() { return Passed; }
    public void setPassed(Boolean v) { this.Passed = v; }
    public String getColumnSchemaJson() { return ColumnSchemaJson; }
    public void setColumnSchemaJson(String v) { this.ColumnSchemaJson = v; }
    public String getStatus() { return Status; }
    public void setStatus(String v) { this.Status = v; }
    public String getErrorMessage() { return ErrorMessage; }
    public void setErrorMessage(String v) { this.ErrorMessage = v; }
    public String getRefCmdStatus() { return RefCmdStatus; }
    public void setRefCmdStatus(String v) { this.RefCmdStatus = v; }
    public String getTgtCmdStatus() { return TgtCmdStatus; }
    public void setTgtCmdStatus(String v) { this.TgtCmdStatus = v; }
    public OffsetDateTime getRefCmdStartedAt() { return RefCmdStartedAt; }
    public void setRefCmdStartedAt(OffsetDateTime v) { this.RefCmdStartedAt = v; }
    public OffsetDateTime getRefCmdFinishedAt() { return RefCmdFinishedAt; }
    public void setRefCmdFinishedAt(OffsetDateTime v) { this.RefCmdFinishedAt = v; }
    public Integer getRefCmdExitCode() { return RefCmdExitCode; }
    public void setRefCmdExitCode(Integer v) { this.RefCmdExitCode = v; }
    public String getRefCmdError() { return RefCmdError; }
    public void setRefCmdError(String v) { this.RefCmdError = v; }
    public OffsetDateTime getTgtCmdStartedAt() { return TgtCmdStartedAt; }
    public void setTgtCmdStartedAt(OffsetDateTime v) { this.TgtCmdStartedAt = v; }
    public OffsetDateTime getTgtCmdFinishedAt() { return TgtCmdFinishedAt; }
    public void setTgtCmdFinishedAt(OffsetDateTime v) { this.TgtCmdFinishedAt = v; }
    public Integer getTgtCmdExitCode() { return TgtCmdExitCode; }
    public void setTgtCmdExitCode(Integer v) { this.TgtCmdExitCode = v; }
    public String getTgtCmdError() { return TgtCmdError; }
    public void setTgtCmdError(String v) { this.TgtCmdError = v; }
    public OffsetDateTime getComparisonStartedAt() { return ComparisonStartedAt; }
    public void setComparisonStartedAt(OffsetDateTime v) { this.ComparisonStartedAt = v; }
    public OffsetDateTime getSavingStartedAt() { return SavingStartedAt; }
    public void setSavingStartedAt(OffsetDateTime v) { this.SavingStartedAt = v; }
    public OffsetDateTime getFinishedAt() { return FinishedAt; }
    public void setFinishedAt(OffsetDateTime v) { this.FinishedAt = v; }
    public UUID getDefinitionId() { return DefinitionId; }
    public void setDefinitionId(UUID v) { this.DefinitionId = v; }
}
