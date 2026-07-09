package com.xero.webapi.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.sql.DataSource;

/**
 * Wires the two named HikariCP datasources used throughout the app:
 * <ul>
 *   <li><b>auditDataSource</b> — backs the {@code nrt_run_executions} and
 *       {@code nrt_run_definitions} tables (and diff results). This is the
 *       service's own metadata store.</li>
 *   <li><b>primaryDataSource</b> — read-only target of administrative queries
 *       (kept for parity with the .NET configuration; the pipeline's per-run
 *       reference/target connections are opened ad-hoc, not via these beans).</li>
 * </ul>
 */
@Configuration
@EnableConfigurationProperties({DataSourceProperties.class, CorsProperties.class, PipelineProperties.class})
public class DataSourceConfig {

    @Bean(name = "auditDataSource", destroyMethod = "close")
    public DataSource auditDataSource(DataSourceProperties props) {
        return build(props.getAudit(), "audit-pool");
    }

    @Bean(name = "primaryDataSource", destroyMethod = "close")
    public DataSource primaryDataSource(DataSourceProperties props) {
        return build(props.getPrimary(), "primary-pool");
    }

    @Bean(name = "auditJdbcTemplate")
    public NamedParameterJdbcTemplate auditJdbcTemplate(
            @org.springframework.beans.factory.annotation.Qualifier("auditDataSource") DataSource ds) {
        return new NamedParameterJdbcTemplate(ds);
    }

    @Bean(name = "primaryJdbcTemplate")
    public NamedParameterJdbcTemplate primaryJdbcTemplate(
            @org.springframework.beans.factory.annotation.Qualifier("primaryDataSource") DataSource ds) {
        return new NamedParameterJdbcTemplate(ds);
    }

    private static HikariDataSource build(DataSourceProperties.Entry entry, String poolName) {
        var cfg = new HikariConfig();
        cfg.setJdbcUrl(entry.getJdbcUrl());
        cfg.setUsername(entry.getUsername());
        cfg.setPassword(entry.getPassword());
        if (entry.getDriverClassName() != null && !entry.getDriverClassName().isBlank()) {
            cfg.setDriverClassName(entry.getDriverClassName());
        }
        cfg.setMaximumPoolSize(entry.getMaximumPoolSize());
        cfg.setMinimumIdle(entry.getMinimumIdle());
        cfg.setConnectionTimeout(entry.getConnectionTimeoutMs());
        cfg.setPoolName(poolName);
        return new HikariDataSource(cfg);
    }
}
