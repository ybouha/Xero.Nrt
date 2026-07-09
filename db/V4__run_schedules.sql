-- =============================================================================
-- V4 Migration: Run Schedules (Quartz.NET cron-driven NRT runs)
--
-- A run schedule binds a cron expression to an existing run definition.
-- The Web API seeds an in-memory Quartz scheduler from enabled rows at startup
-- and keeps Quartz in sync on every CRUD/toggle operation.
-- =============================================================================

CREATE TABLE IF NOT EXISTS nrt_run_schedules (
    schedule_id     UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    definition_id   UUID         NOT NULL REFERENCES nrt_run_definitions (definition_id),
    name            TEXT         NOT NULL,
    cron_expression TEXT         NOT NULL,                 -- Quartz 6/7-field cron
    time_zone       TEXT,                                  -- IANA/Windows tz id; null = UTC
    valuation_date  DATE,                                  -- fixed val date; null = run day (today)
    is_enabled      BOOLEAN      NOT NULL DEFAULT true,
    last_run_at     TIMESTAMPTZ,
    last_run_id     INT,
    last_status     TEXT,                                  -- completed | failed
    last_error      TEXT,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_nrt_run_schedules_definition
    ON nrt_run_schedules (definition_id);

CREATE INDEX IF NOT EXISTS ix_nrt_run_schedules_enabled
    ON nrt_run_schedules (is_enabled)
    WHERE is_enabled = true;

-- Auto-update updated_at on every UPDATE
CREATE OR REPLACE FUNCTION fn_update_nrt_run_schedules_ts()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_nrt_run_schedules_ts ON nrt_run_schedules;

CREATE TRIGGER trg_nrt_run_schedules_ts
    BEFORE UPDATE ON nrt_run_schedules
    FOR EACH ROW
    EXECUTE FUNCTION fn_update_nrt_run_schedules_ts();
