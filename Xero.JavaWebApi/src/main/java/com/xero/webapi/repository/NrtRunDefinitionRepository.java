package com.xero.webapi.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xero.webapi.model.ColumnDef;
import com.xero.webapi.model.CompareSettingsDto;
import com.xero.webapi.model.DbSettingsDto;
import com.xero.webapi.model.NrtRunDefinitionDto;
import com.xero.webapi.model.NrtRunDefinitionSummary;
import com.xero.webapi.model.OutputSettingsDto;
import com.xero.webapi.model.SaveNrtRunDefinitionRequest;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

/**
 * CRUD operations for {@code nrt_run_definitions}. Nested config objects are stored
 * as JSONB and serialised via the standalone {@code jsonbObjectMapper} bean.
 *
 * <p>All methods are wrapped with a Resilience4j {@code @Retry("database")} so transient
 * connectivity / timeout failures are recovered automatically.
 */
@Repository
public class NrtRunDefinitionRepository {

    private static final Logger log = LoggerFactory.getLogger(NrtRunDefinitionRepository.class);

    private static final String SUMMARY_COLUMNS = """
            definition_id      AS definition_id,
            name               AS name,
            description        AS description,
            scope              AS scope,
            scenario_name      AS scenario_name,
            reference_version  AS reference_version,
            target_version     AS target_version,
            ref_commandline    AS ref_commandline,
            target_commandline AS target_commandline,
            created_at         AS created_at,
            updated_at         AS updated_at,
            is_active          AS is_active
            """;

    private final NamedParameterJdbcTemplate jdbc;
    private final ObjectMapper                json;

    public NrtRunDefinitionRepository(
            @Qualifier("auditJdbcTemplate") NamedParameterJdbcTemplate jdbc,
            @Qualifier("jsonbObjectMapper") ObjectMapper json) {
        this.jdbc = jdbc;
        this.json = json;
    }

    @Retry(name = "database")
    public List<NrtRunDefinitionSummary> getAll() {
        var sql = "SELECT " + SUMMARY_COLUMNS +
                  "FROM nrt_run_definitions WHERE is_active = true ORDER BY name";
        return jdbc.query(sql, (rs, i) -> mapSummary(new NrtRunDefinitionSummary(), rs));
    }

    @Retry(name = "database")
    public NrtRunDefinitionDto getById(UUID id) {
        var sql = "SELECT " + SUMMARY_COLUMNS + ", " +
                  "reference_db::text       AS reference_db_json, " +
                  "target_db::text          AS target_db_json, " +
                  "compare_settings::text   AS compare_settings_json, " +
                  "output_settings::text    AS output_settings_json, " +
                  "column_schema::text      AS column_schema_json " +
                  "FROM nrt_run_definitions WHERE definition_id = :id";
        try {
            return jdbc.queryForObject(sql, new MapSqlParameterSource("id", id), (rs, i) -> {
                var dto = new NrtRunDefinitionDto();
                mapSummary(dto, rs);
                dto.setReference(deserialize(rs.getString("reference_db_json"), DbSettingsDto.class, DbSettingsDto::new));
                dto.setTarget(deserialize(rs.getString("target_db_json"), DbSettingsDto.class, DbSettingsDto::new));
                dto.setCompare(deserialize(rs.getString("compare_settings_json"), CompareSettingsDto.class, CompareSettingsDto::new));
                dto.setOutput(deserialize(rs.getString("output_settings_json"), OutputSettingsDto.class, OutputSettingsDto::new));
                ColumnDef[] schema = deserialize(rs.getString("column_schema_json"), ColumnDef[].class, () -> new ColumnDef[0]);
                dto.setColumnSchema(schema);
                return dto;
            });
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    @Retry(name = "database")
    public UUID create(SaveNrtRunDefinitionRequest req) {
        var sql = """
                INSERT INTO nrt_run_definitions
                    (name, description, scope, scenario_name, reference_version, target_version,
                     ref_commandline, target_commandline,
                     reference_db, target_db, compare_settings, output_settings, column_schema)
                VALUES
                    (:name, :description, :scope, :scenarioName, :referenceVersion, :targetVersion,
                     :refCommandLine, :targetCommandLine,
                     :referenceDb::jsonb, :targetDb::jsonb,
                     :compareSettings::jsonb, :outputSettings::jsonb, :columnSchema::jsonb)
                RETURNING definition_id
                """;
        return jdbc.queryForObject(sql, saveParams(null, req), UUID.class);
    }

    @Retry(name = "database")
    public boolean update(UUID id, SaveNrtRunDefinitionRequest req) {
        var sql = """
                UPDATE nrt_run_definitions
                SET name               = :name,
                    description        = :description,
                    scope              = :scope,
                    scenario_name      = :scenarioName,
                    reference_version  = :referenceVersion,
                    target_version     = :targetVersion,
                    ref_commandline    = :refCommandLine,
                    target_commandline = :targetCommandLine,
                    reference_db       = :referenceDb::jsonb,
                    target_db          = :targetDb::jsonb,
                    compare_settings   = :compareSettings::jsonb,
                    output_settings    = :outputSettings::jsonb,
                    column_schema      = :columnSchema::jsonb
                WHERE definition_id = :id AND is_active = true
                """;
        return jdbc.update(sql, saveParams(id, req)) > 0;
    }

    @Retry(name = "database")
    public boolean softDelete(UUID id) {
        var sql = "UPDATE nrt_run_definitions SET is_active = false " +
                  "WHERE definition_id = :id AND is_active = true";
        return jdbc.update(sql, new MapSqlParameterSource("id", id)) > 0;
    }

    private MapSqlParameterSource saveParams(UUID id, SaveNrtRunDefinitionRequest r) {
        var p = new MapSqlParameterSource()
                .addValue("id",                id)
                .addValue("name",              r.getName())
                .addValue("description",       r.getDescription())
                .addValue("scope",             r.getScope())
                .addValue("scenarioName",      r.getScenarioName())
                .addValue("referenceVersion",  r.getReferenceVersion())
                .addValue("targetVersion",     r.getTargetVersion())
                .addValue("refCommandLine",    r.getRefCommandLine())
                .addValue("targetCommandLine", r.getTargetCommandLine())
                .addValue("referenceDb",       serialize(r.getReference()))
                .addValue("targetDb",          serialize(r.getTarget()))
                .addValue("compareSettings",   serialize(r.getCompare()))
                .addValue("outputSettings",    serialize(r.getOutput()))
                .addValue("columnSchema",      serialize(r.getColumnSchema()));
        return p;
    }

    private static <S extends NrtRunDefinitionSummary> S mapSummary(S dto, java.sql.ResultSet rs) throws java.sql.SQLException {
        dto.setDefinitionId((UUID) rs.getObject("definition_id"));
        dto.setName(rs.getString("name"));
        dto.setDescription(rs.getString("description"));
        dto.setScope(rs.getString("scope"));
        dto.setScenarioName(rs.getString("scenario_name"));
        dto.setReferenceVersion(rs.getString("reference_version"));
        dto.setTargetVersion(rs.getString("target_version"));
        dto.setRefCommandLine(rs.getString("ref_commandline"));
        dto.setTargetCommandLine(rs.getString("target_commandline"));
        dto.setCreatedAt(toOdt(rs.getTimestamp("created_at")));
        dto.setUpdatedAt(toOdt(rs.getTimestamp("updated_at")));
        dto.setActive(rs.getBoolean("is_active"));
        return dto;
    }

    private static OffsetDateTime toOdt(Timestamp ts) {
        return ts == null ? null : ts.toInstant().atOffset(ZoneOffset.UTC);
    }

    private String serialize(Object value) {
        if (value == null) return null;
        try {
            return json.writeValueAsString(value);
        } catch (JsonProcessingException ex) {
            log.warn("JSONB serialise failure for {} — writing null", value.getClass().getSimpleName(), ex);
            return null;
        }
    }

    private <T> T deserialize(String raw, Class<T> type, java.util.function.Supplier<T> fallback) {
        if (raw == null || raw.isBlank()) return fallback.get();
        try {
            return json.readValue(raw, type);
        } catch (JsonProcessingException ex) {
            log.warn("JSONB deserialise failure for {} — using fallback", type.getSimpleName(), ex);
            return fallback.get();
        }
    }
}
