package com.xero.webapi.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xero.webapi.model.ColumnDef;
import com.xero.webapi.model.NrtRunRequest;
import com.xero.webapi.model.RunExecutionSummary;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

/**
 * Manages {@code nrt_run_executions} header rows.
 *
 * <p>Creates a record before the run starts and exposes targeted update methods
 * for each phase of the pipeline so callers can track progress in real time.
 *
 * <p>All public methods are guarded by Resilience4j {@code @Retry("database")}.
 */
@Repository
public class RunExecutionRepository {

    private static final Logger log = LoggerFactory.getLogger(RunExecutionRepository.class);

    private static final String SELECT_COLUMNS = """
            run_id                AS run_id,
            run_timestamp         AS run_timestamp,
            scenario_name         AS scenario_name,
            reference_version     AS reference_version,
            target_version        AS target_version,
            valuation_date::text  AS valuation_date,
            ref_row_count         AS ref_row_count,
            tgt_row_count         AS tgt_row_count,
            diff_row_count        AS diff_row_count,
            only_in_ref_count     AS only_in_ref_count,
            only_in_tgt_count     AS only_in_tgt_count,
            passed                AS passed,
            column_schema::text   AS column_schema_json,
            status                AS status,
            error_message         AS error_message,
            ref_cmd_status        AS ref_cmd_status,
            ref_cmd_started_at    AS ref_cmd_started_at,
            ref_cmd_finished_at   AS ref_cmd_finished_at,
            ref_cmd_exit_code     AS ref_cmd_exit_code,
            ref_cmd_error         AS ref_cmd_error,
            tgt_cmd_status        AS tgt_cmd_status,
            tgt_cmd_started_at    AS tgt_cmd_started_at,
            tgt_cmd_finished_at   AS tgt_cmd_finished_at,
            tgt_cmd_exit_code     AS tgt_cmd_exit_code,
            tgt_cmd_error         AS tgt_cmd_error,
            comparison_started_at AS comparison_started_at,
            saving_started_at     AS saving_started_at,
            finished_at           AS finished_at,
            definition_id         AS definition_id
            """;

    private final NamedParameterJdbcTemplate jdbc;
    private final ObjectMapper               json;

    public RunExecutionRepository(
            @Qualifier("auditJdbcTemplate") NamedParameterJdbcTemplate jdbc,
            @Qualifier("jsonbObjectMapper") ObjectMapper json) {
        this.jdbc = jdbc;
        this.json = json;
    }

    // ── Create ────────────────────────────────────────────────────────────────

    /** Inserts a new execution header with status=<code>pending</code> and returns the run_id. */
    @Retry(name = "database")
    public int createRun(NrtRunRequest request, OffsetDateTime runTimestamp) {
        var sql = """
                INSERT INTO nrt_run_executions
                    (run_timestamp, scenario_name, reference_version, target_version,
                     valuation_date, column_schema, status, definition_id)
                VALUES
                    (:runTimestamp, :scenarioName, :referenceVersion, :targetVersion,
                     :valuationDate::date, :columnSchema::jsonb, 'pending', :definitionId)
                RETURNING run_id
                """;
        var params = new MapSqlParameterSource()
                .addValue("runTimestamp",     runTimestamp)
                .addValue("scenarioName",     request.getScenarioName())
                .addValue("referenceVersion", request.getReferenceVersion())
                .addValue("targetVersion",    request.getTargetVersion())
                .addValue("valuationDate",    request.getValuationDate() == null
                                                ? null
                                                : request.getValuationDate().toString())
                .addValue("columnSchema",     serializeSchema(request.getColumnSchema()))
                .addValue("definitionId",     request.getDefinitionId());
        Integer id = jdbc.queryForObject(sql, params, Integer.class);
        return id == null ? 0 : id;
    }

    // ── Status updates ────────────────────────────────────────────────────────

    /** Updates the overall workflow status (and optionally an error message). */
    @Retry(name = "database")
    public void setStatus(int runId, String status, String errorMessage) {
        var sql = """
                UPDATE nrt_run_executions
                SET status        = :status,
                    error_message = :errorMessage
                WHERE run_id = :runId
                """;
        jdbc.update(sql, new MapSqlParameterSource()
                .addValue("runId",        runId)
                .addValue("status",       status)
                .addValue("errorMessage", errorMessage));
    }

    /** Updates the ref pre-execution command tracking columns. */
    @Retry(name = "database")
    public void setRefCommandStatus(int runId, String status,
                                    OffsetDateTime startedAt, OffsetDateTime finishedAt,
                                    Integer exitCode, String error) {
        jdbc.update("""
                UPDATE nrt_run_executions
                SET ref_cmd_status      = :status,
                    ref_cmd_started_at  = :startedAt,
                    ref_cmd_finished_at = :finishedAt,
                    ref_cmd_exit_code   = :exitCode,
                    ref_cmd_error       = :error
                WHERE run_id = :runId
                """, cmdParams(runId, status, startedAt, finishedAt, exitCode, error));
    }

    /** Updates the target pre-execution command tracking columns. */
    @Retry(name = "database")
    public void setTgtCommandStatus(int runId, String status,
                                    OffsetDateTime startedAt, OffsetDateTime finishedAt,
                                    Integer exitCode, String error) {
        jdbc.update("""
                UPDATE nrt_run_executions
                SET tgt_cmd_status      = :status,
                    tgt_cmd_started_at  = :startedAt,
                    tgt_cmd_finished_at = :finishedAt,
                    tgt_cmd_exit_code   = :exitCode,
                    tgt_cmd_error       = :error
                WHERE run_id = :runId
                """, cmdParams(runId, status, startedAt, finishedAt, exitCode, error));
    }

    /** Records the moment the comparison phase begins. */
    @Retry(name = "database")
    public void setComparisonStarted(int runId) {
        jdbc.update("""
                UPDATE nrt_run_executions
                SET status                = 'running_comparison',
                    comparison_started_at = now()
                WHERE run_id = :runId
                """, new MapSqlParameterSource("runId", runId));
    }

    /** Records the moment the save-results phase begins. */
    @Retry(name = "database")
    public void setSavingStarted(int runId) {
        jdbc.update("""
                UPDATE nrt_run_executions
                SET status            = 'saving_results',
                    saving_started_at = now()
                WHERE run_id = :runId
                """, new MapSqlParameterSource("runId", runId));
    }

    /**
     * Finalises the execution record with row counts, pass/fail, and finished
     * timestamp. Sets status to <code>completed</code>.
     */
    @Retry(name = "database")
    public void setCompleted(int runId,
                             int refCount, int tgtCount, int diffCount,
                             int onlyRefCount, int onlyTgtCount, boolean passed) {
        var sql = """
                UPDATE nrt_run_executions
                SET status            = 'completed',
                    finished_at       = now(),
                    ref_row_count     = :refCount,
                    tgt_row_count     = :tgtCount,
                    diff_row_count    = :diffCount,
                    only_in_ref_count = :onlyRefCount,
                    only_in_tgt_count = :onlyTgtCount,
                    passed            = :passed
                WHERE run_id = :runId
                """;
        jdbc.update(sql, new MapSqlParameterSource()
                .addValue("runId",        runId)
                .addValue("refCount",     refCount)
                .addValue("tgtCount",     tgtCount)
                .addValue("diffCount",    diffCount)
                .addValue("onlyRefCount", onlyRefCount)
                .addValue("onlyTgtCount", onlyTgtCount)
                .addValue("passed",       passed));
    }

    // ── Queries ───────────────────────────────────────────────────────────────

    @Retry(name = "database")
    public List<RunExecutionSummary> getRuns(int page, int pageSize) {
        var sql = "SELECT " + SELECT_COLUMNS +
                  "FROM nrt_run_executions " +
                  "ORDER BY run_timestamp DESC " +
                  "LIMIT :pageSize OFFSET :offset";
        var params = new MapSqlParameterSource()
                .addValue("pageSize", pageSize)
                .addValue("offset",   (page - 1) * pageSize);
        return jdbc.query(sql, params, (rs, i) -> mapRow(rs));
    }

    @Retry(name = "database")
    public int count() {
        Integer total = jdbc.queryForObject(
                "SELECT COUNT(*) FROM nrt_run_executions",
                new MapSqlParameterSource(),
                Integer.class);
        return total == null ? 0 : total;
    }

    @Retry(name = "database")
    public RunExecutionSummary getRun(int runId) {
        var sql = "SELECT " + SELECT_COLUMNS +
                  "FROM nrt_run_executions WHERE run_id = :runId";
        try {
            return jdbc.queryForObject(sql,
                    new MapSqlParameterSource("runId", runId),
                    (rs, i) -> mapRow(rs));
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static MapSqlParameterSource cmdParams(int runId, String status,
                                                   OffsetDateTime startedAt,
                                                   OffsetDateTime finishedAt,
                                                   Integer exitCode, String error) {
        return new MapSqlParameterSource()
                .addValue("runId",      runId)
                .addValue("status",     status)
                .addValue("startedAt",  startedAt)
                .addValue("finishedAt", finishedAt)
                .addValue("exitCode",   exitCode)
                .addValue("error",      error);
    }

    private static RunExecutionSummary mapRow(ResultSet rs) throws SQLException {
        var dto = new RunExecutionSummary();
        dto.setRunId(rs.getInt("run_id"));
        dto.setRunTimestamp(toOdt(rs.getTimestamp("run_timestamp")));
        dto.setScenarioName(rs.getString("scenario_name"));
        dto.setReferenceVersion(rs.getString("reference_version"));
        dto.setTargetVersion(rs.getString("target_version"));
        dto.setValuationDate(rs.getString("valuation_date"));
        dto.setRefRowCount(getNullableInt(rs, "ref_row_count"));
        dto.setTgtRowCount(getNullableInt(rs, "tgt_row_count"));
        dto.setDiffRowCount(getNullableInt(rs, "diff_row_count"));
        dto.setOnlyInRefCount(getNullableInt(rs, "only_in_ref_count"));
        dto.setOnlyInTgtCount(getNullableInt(rs, "only_in_tgt_count"));
        dto.setPassed(getNullableBool(rs, "passed"));
        dto.setColumnSchemaJson(rs.getString("column_schema_json"));
        dto.setStatus(rs.getString("status"));
        dto.setErrorMessage(rs.getString("error_message"));
        dto.setRefCmdStatus(rs.getString("ref_cmd_status"));
        dto.setRefCmdStartedAt(toOdt(rs.getTimestamp("ref_cmd_started_at")));
        dto.setRefCmdFinishedAt(toOdt(rs.getTimestamp("ref_cmd_finished_at")));
        dto.setRefCmdExitCode(getNullableInt(rs, "ref_cmd_exit_code"));
        dto.setRefCmdError(rs.getString("ref_cmd_error"));
        dto.setTgtCmdStatus(rs.getString("tgt_cmd_status"));
        dto.setTgtCmdStartedAt(toOdt(rs.getTimestamp("tgt_cmd_started_at")));
        dto.setTgtCmdFinishedAt(toOdt(rs.getTimestamp("tgt_cmd_finished_at")));
        dto.setTgtCmdExitCode(getNullableInt(rs, "tgt_cmd_exit_code"));
        dto.setTgtCmdError(rs.getString("tgt_cmd_error"));
        dto.setComparisonStartedAt(toOdt(rs.getTimestamp("comparison_started_at")));
        dto.setSavingStartedAt(toOdt(rs.getTimestamp("saving_started_at")));
        dto.setFinishedAt(toOdt(rs.getTimestamp("finished_at")));
        dto.setDefinitionId((UUID) rs.getObject("definition_id"));
        return dto;
    }

    private static OffsetDateTime toOdt(Timestamp ts) {
        return ts == null ? null : ts.toInstant().atOffset(ZoneOffset.UTC);
    }

    private static Integer getNullableInt(ResultSet rs, String col) throws SQLException {
        int v = rs.getInt(col);
        return rs.wasNull() ? null : v;
    }

    private static Boolean getNullableBool(ResultSet rs, String col) throws SQLException {
        boolean v = rs.getBoolean(col);
        return rs.wasNull() ? null : v;
    }

    private String serializeSchema(ColumnDef[] schema) {
        if (schema == null || schema.length == 0) return null;
        try {
            return json.writeValueAsString(schema);
        } catch (JsonProcessingException ex) {
            log.warn("Failed to serialise ColumnSchema — storing null", ex);
            return null;
        }
    }
}
