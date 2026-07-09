package com.xero.webapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final CorsProperties cors;

    public WebMvcConfig(CorsProperties cors) {
        this.cors = cors;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        var registration = registry.addMapping("/**");
        if (!cors.getAllowedOrigins().isEmpty()) {
            registration.allowedOrigins(cors.getAllowedOrigins().toArray(String[]::new));
        }
        if (!cors.getAllowedMethods().isEmpty()) {
            registration.allowedMethods(cors.getAllowedMethods().toArray(String[]::new));
        }
        if (!cors.getAllowedHeaders().isEmpty()) {
            registration.allowedHeaders(cors.getAllowedHeaders().toArray(String[]::new));
        }
        registration.allowCredentials(cors.isAllowCredentials());
    }
}
