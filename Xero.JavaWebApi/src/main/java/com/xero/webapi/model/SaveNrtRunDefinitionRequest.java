package com.xero.webapi.model;

import jakarta.validation.constraints.NotBlank;

/** Request body for POST /api/run-definitions and PUT /api/run-definitions/{id}. */
public class SaveNrtRunDefinitionRequest {

    @NotBlank
    private String Name             = "";
    private String Description;
    private String Scope;

    @NotBlank
    private String ScenarioName     = "";
    @NotBlank
    private String ReferenceVersion = "";
    @NotBlank
    private String TargetVersion    = "";

    private String RefCommandLine;
    private String TargetCommandLine;

    private DbSettingsDto      Reference    = new DbSettingsDto();
    private DbSettingsDto      Target       = new DbSettingsDto();
    private CompareSettingsDto Compare      = new CompareSettingsDto();
    private OutputSettingsDto  Output       = new OutputSettingsDto();
    private ColumnDef[]        ColumnSchema = new ColumnDef[0];

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
    public DbSettingsDto getReference() { return Reference; }
    public void setReference(DbSettingsDto v) { this.Reference = v == null ? new DbSettingsDto() : v; }
    public DbSettingsDto getTarget() { return Target; }
    public void setTarget(DbSettingsDto v) { this.Target = v == null ? new DbSettingsDto() : v; }
    public CompareSettingsDto getCompare() { return Compare; }
    public void setCompare(CompareSettingsDto v) { this.Compare = v == null ? new CompareSettingsDto() : v; }
    public OutputSettingsDto getOutput() { return Output; }
    public void setOutput(OutputSettingsDto v) { this.Output = v == null ? new OutputSettingsDto() : v; }
    public ColumnDef[] getColumnSchema() { return ColumnSchema; }
    public void setColumnSchema(ColumnDef[] v) { this.ColumnSchema = v == null ? new ColumnDef[0] : v; }
}
