package com.xero.webapi.model;

/** Full definition with all nested config — returned by GET /api/run-definitions/{id}. */
public class NrtRunDefinitionDto extends NrtRunDefinitionSummary {
    private DbSettingsDto      Reference    = new DbSettingsDto();
    private DbSettingsDto      Target       = new DbSettingsDto();
    private CompareSettingsDto Compare      = new CompareSettingsDto();
    private OutputSettingsDto  Output       = new OutputSettingsDto();
    private ColumnDef[]        ColumnSchema = new ColumnDef[0];

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
