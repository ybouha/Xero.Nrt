package com.xero.webapi.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Mirrors {@code Xero.SmartComparer.ColumnDef}. The {@code Type} hint is
 * one of {@code "string"}, {@code "decimal"}, {@code "int"}, {@code "bool"};
 * unrecognised values fall back to string at the pipeline layer.
 */
public record ColumnDef(String Name, String Type) {

    @JsonCreator
    public ColumnDef(@JsonProperty("Name") String Name,
                     @JsonProperty("Type") String Type) {
        this.Name = Name;
        this.Type = (Type == null || Type.isBlank()) ? "string" : Type;
    }

    public ColumnDef(String name) { this(name, "string"); }
}
