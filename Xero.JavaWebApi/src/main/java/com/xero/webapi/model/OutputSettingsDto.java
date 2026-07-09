package com.xero.webapi.model;

public class OutputSettingsDto {
    private DiffDbSettingsDto DiffDb = new DiffDbSettingsDto();

    public DiffDbSettingsDto getDiffDb() { return DiffDb; }
    public void setDiffDb(DiffDbSettingsDto diffDb) { this.DiffDb = diffDb == null ? new DiffDbSettingsDto() : diffDb; }
}
