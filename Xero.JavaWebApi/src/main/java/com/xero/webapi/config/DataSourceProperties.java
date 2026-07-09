package com.xero.webapi.config;

import com.xero.webapi.model.DbProvider;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Strongly-typed configuration for the two named datasources defined in
 * {@code xero.datasources.*}.
 */
@ConfigurationProperties(prefix = "xero.datasources")
public class DataSourceProperties {

    private Entry audit = new Entry();
    private Entry primary = new Entry();

    public Entry getAudit() { return audit; }
    public void setAudit(Entry audit) { this.audit = audit; }

    public Entry getPrimary() { return primary; }
    public void setPrimary(Entry primary) { this.primary = primary; }

    public static class Entry {
        private String jdbcUrl;
        private String username;
        private String password;
        private String driverClassName;
        private DbProvider provider = DbProvider.PostgreSql;
        private int maximumPoolSize = 10;
        private int minimumIdle = 2;
        private long connectionTimeoutMs = 30_000L;

        public String getJdbcUrl() { return jdbcUrl; }
        public void setJdbcUrl(String jdbcUrl) { this.jdbcUrl = jdbcUrl; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getDriverClassName() { return driverClassName; }
        public void setDriverClassName(String driverClassName) { this.driverClassName = driverClassName; }
        public DbProvider getProvider() { return provider; }
        public void setProvider(DbProvider provider) { this.provider = provider; }
        public int getMaximumPoolSize() { return maximumPoolSize; }
        public void setMaximumPoolSize(int maximumPoolSize) { this.maximumPoolSize = maximumPoolSize; }
        public int getMinimumIdle() { return minimumIdle; }
        public void setMinimumIdle(int minimumIdle) { this.minimumIdle = minimumIdle; }
        public long getConnectionTimeoutMs() { return connectionTimeoutMs; }
        public void setConnectionTimeoutMs(long connectionTimeoutMs) { this.connectionTimeoutMs = connectionTimeoutMs; }
    }
}
