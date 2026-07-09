package com.xero.webapi.model;

public class DiffDbSettingsDto {
    private boolean    Enabled          = true;
    private DbProvider Provider         = DbProvider.PostgreSql;
    private String     ConnectionString = "";
    private String     TableName        = "NrtDiffResults";

    public boolean isEnabled() { return Enabled; }
    public void setEnabled(boolean enabled) { this.Enabled = enabled; }
    public DbProvider getProvider() { return Provider; }
    public void setProvider(DbProvider provider) { this.Provider = provider; }
    public String getConnectionString() { return ConnectionString; }
    public void setConnectionString(String connectionString) { this.ConnectionString = connectionString; }
    public String getTableName() { return TableName; }
    public void setTableName(String tableName) { this.TableName = tableName; }
}
