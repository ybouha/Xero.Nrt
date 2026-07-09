package com.xero.webapi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "xero.pipeline")
public class PipelineProperties {
    private List<String> defaultKeyProperties = List.of("TradeId", "Book", "Desk", "RiskFactor", "ValuationDate");
    private String defaultDiffTableName = "NrtDiffResults";

    public List<String> getDefaultKeyProperties() { return defaultKeyProperties; }
    public void setDefaultKeyProperties(List<String> defaultKeyProperties) { this.defaultKeyProperties = defaultKeyProperties; }
    public String getDefaultDiffTableName() { return defaultDiffTableName; }
    public void setDefaultDiffTableName(String defaultDiffTableName) { this.defaultDiffTableName = defaultDiffTableName; }
}
