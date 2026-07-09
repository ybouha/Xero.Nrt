package com.xero.webapi.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/** Request body for POST /api/run-definitions/{id}/execute. */
public class ExecuteFromDefinitionRequest {

    /** ISO date string (yyyy-MM-dd). */
    private String ValuationDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

    public String getValuationDate() { return ValuationDate; }
    public void setValuationDate(String v) { this.ValuationDate = v; }
}
