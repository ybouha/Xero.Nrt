package com.xero.webapi.repository;

import com.xero.webapi.model.DiffFilter;
import com.xero.webapi.model.DiffResultDto;
import io.github.resilience4j.retry.annotation.Retry;
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
import java.util.ArrayList;
import java.util.List;

/**
 * Read-only access to the {@code "NrtDiffResults"} table (note PG-quoted
 * PascalCase identifiers — the table is created by Xero.ResultSaver and uses
 * .NET-style naming).
 *
 * <p>Diffs are correlated to runs via the {@code "RunId"} FK column written by
 * the result-saver pipeline at save time.
 */
@Repository
public class DiffResultRepository {

    private static final String DIFF_SELECT = """
            SELECT d."Id"               AS id,
                   d."RunTimestamp"     AS run_timestamp,
                   d."ScenarioName"     AS scenario_name,
                   d."ReferenceVersion" AS reference_version,
                   d."TargetVersion"    AS target_version,
                   d."DiffType"         AS diff_type,
                   d."Diffs"::text      AS diffs,
                   d."CompareItems"::text AS compare_items
            FROM   "NrtDiffResults" d
            """;

    private final NamedParameterJdbcTemplate jdbc;

    public DiffResultRepository(@Qualifier("auditJdbcTemplate") NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Retry(name = "database")
    public int count(Integer runId, String diffType) {
        var where = buildWhere(runId, diffType);
        var sql   = "SELECT COUNT(*) FROM \"NrtDiffResults\" d" + where.sql();
        Integer total = jdbc.queryForObject(sql, where.params(), Integer.class);
        return total == null ? 0 : total;
    }

    @Retry(name = "database")
    public List<DiffResultDto> page(Integer runId, DiffFilter filter) {
        var where  = buildWhere(runId, filter.getDiffType());
        var params = where.params();
        params.addValue("pageSize", filter.getPageSize());
        params.addValue("offset",   (filter.getPage() - 1) * filter.getPageSize());

        var sql = DIFF_SELECT + where.sql() +
                  " ORDER BY d.\"Id\" LIMIT :pageSize OFFSET :offset";
        return jdbc.query(sql, params, (rs, i) -> mapRow(rs));
    }

    @Retry(name = "database")
    public DiffResultDto getById(int id) {
        try {
            return jdbc.queryForObject(
                    DIFF_SELECT + " WHERE d.\"Id\" = :id",
                    new MapSqlParameterSource("id", id),
                    (rs, i) -> mapRow(rs));
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    private static WhereClause buildWhere(Integer runId, String diffType) {
        var conditions = new ArrayList<String>(2);
        var params     = new MapSqlParameterSource();

        if (runId != null) {
            conditions.add("d.\"RunId\" = :runId");
            params.addValue("runId", runId);
        }
        if (diffType != null && !diffType.isBlank()) {
            conditions.add("d.\"DiffType\" = :diffType");
            params.addValue("diffType", diffType);
        }

        var sql = conditions.isEmpty()
                ? ""
                : " WHERE " + String.join(" AND ", conditions);
        return new WhereClause(sql, params);
    }

    private static DiffResultDto mapRow(ResultSet rs) throws SQLException {
        var dto = new DiffResultDto();
        dto.setId(rs.getInt("id"));
        dto.setRunTimestamp(toOdt(rs.getTimestamp("run_timestamp")));
        dto.setScenarioName(rs.getString("scenario_name"));
        dto.setReferenceVersion(rs.getString("reference_version"));
        dto.setTargetVersion(rs.getString("target_version"));
        dto.setDiffType(rs.getString("diff_type"));
        dto.setDiffs(rs.getString("diffs"));
        dto.setCompareItems(rs.getString("compare_items"));
        return dto;
    }

    private static OffsetDateTime toOdt(Timestamp ts) {
        return ts == null ? null : ts.toInstant().atOffset(ZoneOffset.UTC);
    }

    private record WhereClause(String sql, MapSqlParameterSource params) {}
}
