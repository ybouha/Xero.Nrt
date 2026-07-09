package com.xero.webapi.model;

public class CompareSettingsDto {
    private String[] KeyProperties     = new String[0];
    private String[] CompareProperties = new String[0];

    public String[] getKeyProperties() { return KeyProperties; }
    public void setKeyProperties(String[] keyProperties) { this.KeyProperties = keyProperties == null ? new String[0] : keyProperties; }
    public String[] getCompareProperties() { return CompareProperties; }
    public void setCompareProperties(String[] compareProperties) { this.CompareProperties = compareProperties == null ? new String[0] : compareProperties; }
}
