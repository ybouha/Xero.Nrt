package com.xero.webapi.exception;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.OffsetDateTime;
import java.util.List;

/**
 * Stable shape for every error body the API emits. The frontend can rely on
 * {@code status}, {@code error}, and {@code path} always being present.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiErrorResponse {

    private OffsetDateTime timestamp;
    private int            status;
    private String         error;
    private String         message;
    private String         path;
    private String         runId;
    private List<FieldViolation> violations;

    public ApiErrorResponse() {
        this.timestamp = OffsetDateTime.now();
    }

    public OffsetDateTime getTimestamp()                      { return timestamp; }
    public void           setTimestamp(OffsetDateTime t)      { this.timestamp = t; }

    public int  getStatus()                                   { return status; }
    public void setStatus(int status)                         { this.status = status; }

    public String getError()                                  { return error; }
    public void   setError(String error)                      { this.error = error; }

    public String getMessage()                                { return message; }
    public void   setMessage(String message)                  { this.message = message; }

    public String getPath()                                   { return path; }
    public void   setPath(String path)                        { this.path = path; }

    public String getRunId()                                  { return runId; }
    public void   setRunId(String runId)                      { this.runId = runId; }

    public List<FieldViolation> getViolations()               { return violations; }
    public void                 setViolations(List<FieldViolation> v) { this.violations = v; }

    /** One per failed @Valid constraint. */
    public record FieldViolation(String field, String message) {}
}
