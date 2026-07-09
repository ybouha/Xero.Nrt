package com.xero.webapi.model;

/** Query parameters shared by diff-listing endpoints. */
public class DiffFilter {
    private String DiffType;
    private int    Page     = 1;
    private int    PageSize = 50;

    public String getDiffType() { return DiffType; }
    public void setDiffType(String v) { this.DiffType = v; }
    public int getPage() { return Page; }
    public void setPage(int v) { this.Page = v; }
    public int getPageSize() { return PageSize; }
    public void setPageSize(int v) { this.PageSize = v; }
}
