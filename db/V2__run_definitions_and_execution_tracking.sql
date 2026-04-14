-- =============================================================================
-- V2 Migration: Run Definitions + Execution Status Tracking
--
-- 1. Rename nrt_runs → nrt_run_executions
-- 2. Add per-phase status columns to nrt_run_executions
-- 3. Create nrt_run_definitions table
-- 4. Link nrt_run_executions → nrt_run_definitions via FK
-- =============================================================================

-- ── 1. Rename the executions table ───────────────────────────────────────────
ALTER TABLE nrt_runs RENAME TO nrt_run_executions;

-- Update the sequence name for clarity (optional but keeps naming consistent)
ALTER SEQUENCE nrt_runs_run_id_seq RENAME TO nrt_run_executions_run_id_seq;

-- Rename the primary key constraint
ALTER TABLE nrt_run_executions RENAME CONSTRAINT nrt_runs_pkey TO nrt_run_executions_pkey;

-- ── 2. Add column_schema column (if not present from a prior migration) ───────
ALTER TABLE nrt_run_executions
    ADD COLUMN IF NOT EXISTS column_schema JSONB;

-- ── 3. Add execution-status columns ──────────────────────────────────────────
ALTER TABLE nrt_run_executions
    -- Overall workflow status
    -- Values: pending | running_commands | running_comparison | saving_results | completed | failed
    ADD COLUMN IF NOT EXISTS status              TEXT NOT NULL DEFAULT 'completed',
    ADD COLUMN IF NOT EXISTS error_message       TEXT,

    -- Ref pre-execution command tracking
    ADD COLUMN IF NOT EXISTS ref_cmd_status      TEXT,        -- null=skipped | running | completed | failed
    ADD COLUMN IF NOT EXISTS ref_cmd_started_at  TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS ref_cmd_finished_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS ref_cmd_exit_code   INT,
    ADD COLUMN IF NOT EXISTS ref_cmd_error       TEXT,

    -- Target pre-execution command tracking
    ADD COLUMN IF NOT EXISTS tgt_cmd_status      TEXT,
    ADD COLUMN IF NOT EXISTS tgt_cmd_started_at  TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS tgt_cmd_finished_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS tgt_cmd_exit_code   INT,
    ADD COLUMN IF NOT EXISTS tgt_cmd_error       TEXT,

    -- Pipeline phase timestamps
    ADD COLUMN IF NOT EXISTS comparison_started_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS saving_started_at     TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS finished_at           TIMESTAMPTZ;

-- ── 4. Create run definitions table ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nrt_run_definitions (
    definition_id      UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name               TEXT         NOT NULL,
    description        TEXT,
    scope              TEXT,
    scenario_name      TEXT         NOT NULL,
    reference_version  TEXT         NOT NULL,
    target_version     TEXT         NOT NULL,
    ref_commandline    TEXT,
    target_commandline TEXT,
    reference_db       JSONB        NOT NULL,
    target_db          JSONB        NOT NULL,
    compare_settings   JSONB        NOT NULL,
    output_settings    JSONB        NOT NULL,
    column_schema      JSONB        NOT NULL,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
    is_active          BOOLEAN      NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS ix_nrt_run_definitions_name
    ON nrt_run_definitions (name);

CREATE INDEX IF NOT EXISTS ix_nrt_run_definitions_scope
    ON nrt_run_definitions (scope);

CREATE INDEX IF NOT EXISTS ix_nrt_run_definitions_active
    ON nrt_run_definitions (is_active)
    WHERE is_active = true;

-- Auto-update updated_at on every UPDATE
CREATE OR REPLACE FUNCTION fn_update_nrt_run_definitions_ts()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_nrt_run_definitions_ts ON nrt_run_definitions;

CREATE TRIGGER trg_nrt_run_definitions_ts
    BEFORE UPDATE ON nrt_run_definitions
    FOR EACH ROW
    EXECUTE FUNCTION fn_update_nrt_run_definitions_ts();

-- ── 5. Link executions → definitions ─────────────────────────────────────────
ALTER TABLE nrt_run_executions
    ADD COLUMN IF NOT EXISTS definition_id UUID
        REFERENCES nrt_run_definitions (definition_id);
