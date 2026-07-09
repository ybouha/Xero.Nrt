package com.xero.webapi.model;

public class DbSettingsDto {
    private DbProvider Provider = DbProvider.PostgreSql;
    private String     ConnectionString = "";
    private String     Query = "";
    private int        TimeoutSeconds = 300;

    public DbProvider getProvider() { return Provider; }
    public void setProvider(DbProvider provider) { this.Provider = provider; }
    public String getConnectionString() { return ConnectionString; }
    public void setConnectionString(String connectionString) { this.ConnectionString = connectionString; }
    public String getQuery() { return Query; }
    public void setQuery(String query) { this.Query = query; }
    public int getTimeoutSeconds() { return TimeoutSeconds; }
    public void setTimeoutSeconds(int timeoutSeconds) { this.TimeoutSeconds = timeoutSeconds; }
}
