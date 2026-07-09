package com.xero.webapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI xeroOpenApi() {
        return new OpenAPI().info(new Info()
                .title("Xero NRT Web API")
                .description("Non-Regression Testing orchestration API.")
                .version("v1"));
    }
}
