package com.xero.webapi.model;

import java.time.OffsetDateTime;
import java.util.UUID;

/** Lightweight summary returned by GET /api/run-definitions. */
public class NrtRunDefinitionSummary {
    private UUID            DefinitionId;
    private String          Name             = "";
    private String          Description;
    private String          Scope;
    private String          ScenarioName     = "";
    private String          ReferenceVersion = "";
    private String          TargetVersion    = "";
    private String          RefCommandLine;
    private String          TargetCommandLine;
    private OffsetDateTime  CreatedAt;
    private OffsetDateTime  UpdatedAt;
    private boolean         IsActive;

    public UUID getDefinitionId() { return DefinitionId; }
    public void setDefinitionId(UUID v) { this.DefinitionId = v; }
    public String getName() { return Name; }
    public void setName(String v) { this.Name = v; }
    public String getDescription() { return Description; }
    public void setDescription(String v) { this.Description = v; }
    public String getScope() { return Scope; }
    public void setScope(String v) { this.Scope = v; }
    public String getScenarioName() { return ScenarioName; }
    public void setScenarioName(String v) { this.ScenarioName = v; }
    public String getReferenceVersion() { return ReferenceVersion; }
    public void setReferenceVersion(String v) { this.ReferenceVersion = v; }
    public String getTargetVersion() { return TargetVersion; }
    public void setTargetVersion(String v) { this.TargetVersion = v; }
    public String getRefCommandLine() { return RefCommandLine; }
    public void setRefCommandLine(String v) { this.RefCommandLine = v; }
    public String getTargetCommandLine() { return TargetCommandLine; }
    public void setTargetCommandLine(String v) { this.TargetCommandLine = v; }
    public OffsetDateTime getCreatedAt() { return CreatedAt; }
    public void setCreatedAt(OffsetDateTime v) { this.CreatedAt = v; }
    public OffsetDateTime getUpdatedAt() { return UpdatedAt; }
    public void setUpdatedAt(OffsetDateTime v) { this.UpdatedAt = v; }
    public boolean isActive() { return IsActive; }
    public void setActive(boolean v) { this.IsActive = v; }
}
