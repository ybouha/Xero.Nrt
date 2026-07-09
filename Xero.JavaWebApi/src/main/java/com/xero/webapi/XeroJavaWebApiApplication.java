package com.xero.webapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * Bootstrap entry point for the Xero NRT Web API.
 *
 * <p>DataSource auto-configuration is disabled because we wire two HikariCP
 * datasources manually via {@link com.xero.webapi.config.DataSourceConfig}.</p>
 */
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class XeroJavaWebApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(XeroJavaWebApiApplication.class, args);
    }
}
