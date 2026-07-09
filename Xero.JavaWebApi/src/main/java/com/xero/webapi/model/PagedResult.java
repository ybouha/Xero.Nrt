package com.xero.webapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collections;
import java.util.List;

/** Generic envelope for paginated responses. */
public class PagedResult<T> {
    private List<T> Items      = Collections.emptyList();
    private int     TotalCount;
    private int     Page;
    private int     PageSize;

    public PagedResult() {}

    public PagedResult(List<T> items, int totalCount, int page, int pageSize) {
        this.Items      = items == null ? Collections.emptyList() : items;
        this.TotalCount = totalCount;
        this.Page       = page;
        this.PageSize   = pageSize;
    }

    public List<T> getItems() { return Items; }
    public void setItems(List<T> v) { this.Items = v == null ? Collections.emptyList() : v; }
    public int getTotalCount() { return TotalCount; }
    public void setTotalCount(int v) { this.TotalCount = v; }
    public int getPage() { return Page; }
    public void setPage(int v) { this.Page = v; }
    public int getPageSize() { return PageSize; }
    public void setPageSize(int v) { this.PageSize = v; }

    @JsonProperty("TotalPages")
    public int getTotalPages() {
        return PageSize > 0 ? (int) Math.ceil((double) TotalCount / PageSize) : 0;
    }
}
