package com.xero.webapi.model;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.UUID;

public class NrtRunRequest {

    @NotBlank
    private String ScenarioName     = "";
    @NotBlank
    private String ReferenceVersion = "";
    @NotBlank
    private String TargetVersion    = "";

    private LocalDate ValuationDate = LocalDate.now();

    private DbSettingsDto      Reference   = new DbSettingsDto();
    private DbSettingsDto      Target      = new DbSettingsDto();
    private CompareSettingsDto Compare     = new CompareSettingsDto();
    private OutputSettingsDto  Output      = new OutputSettingsDto();
    private ColumnDef[]        ColumnSchema = new ColumnDef[0];

    private UUID    DefinitionId;
    private String  RefCommandLine;
    private String  TargetCommandLine;

    public String getScenarioName() { return ScenarioName; }
    public void setScenarioName(String s) { this.ScenarioName = s; }
    public String getReferenceVersion() { return ReferenceVersion; }
    public void setReferenceVersion(String s) { this.ReferenceVersion = s; }
    public String getTargetVersion() { return TargetVersion; }
    public void setTargetVersion(String s) { this.TargetVersion = s; }
    public LocalDate getValuationDate() { return ValuationDate; }
    public void setValuationDate(LocalDate v) { this.ValuationDate = v; }
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
    public UUID getDefinitionId() { return DefinitionId; }
    public void setDefinitionId(UUID v) { this.DefinitionId = v; }
    public String getRefCommandLine() { return RefCommandLine; }
    public void setRefCommandLine(String v) { this.RefCommandLine = v; }
    public String getTargetCommandLine() { return TargetCommandLine; }
    public void setTargetCommandLine(String v) { this.TargetCommandLine = v; }
}
