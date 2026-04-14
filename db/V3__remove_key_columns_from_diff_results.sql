-- =============================================================================
-- V3 Migration: Make NrtDiffResults schema-agnostic
--
-- Removes VaR-specific key columns (TradeId, Book, Desk, RiskFactor,
-- ValuationDate) that were previously promoted to top-level columns.
-- Key values are already fully captured in the CompareItems JSONB column
-- and resolved at query time via the run's ColumnSchema.
--
-- Adds RunId FK column (if not already present from DbDiffSaver auto-DDL).
-- Drops the now-obsolete ix_diff_key index.
-- =============================================================================

-- ── 1. Drop VaR-specific key columns ─────────────────────────────────────────
ALTER TABLE "NrtDiffResults"
    DROP COLUMN IF EXISTS "TradeId",
    DROP COLUMN IF EXISTS "Book",
    DROP COLUMN IF EXISTS "Desk",
    DROP COLUMN IF EXISTS "RiskFactor",
    DROP COLUMN IF EXISTS "ValuationDate";

-- ── 2. Drop the stale composite key index ────────────────────────────────────
DROP INDEX IF EXISTS ix_diff_key;

-- ── 3. Add RunId FK (idempotent) ──────────────────────────────────────────────
ALTER TABLE "NrtDiffResults"
    ADD COLUMN IF NOT EXISTS "RunId" INTEGER
        REFERENCES nrt_run_executions (run_id) ON DELETE SET NULL;

-- ── 4. Index on RunId for join/filter performance ─────────────────────────────
CREATE INDEX IF NOT EXISTS ix_diff_run_id
    ON "NrtDiffResults" ("RunId");
