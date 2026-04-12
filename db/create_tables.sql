-- =============================================================================
-- Xero NRT Schema
-- Three tables:
--   1. nrt_reference_data  – raw VarTradeRow rows from the reference engine
--   2. nrt_target_data     – raw VarTradeRow rows from the target engine
--   3. "NrtDiffResults"    – one row per differing trade (matches DbDiffSaver DDL)
--
-- A lightweight nrt_runs header ties reference/target snapshots to a run.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 0. Run header  (one row per NRT execution)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nrt_runs (
    run_id            SERIAL          NOT NULL PRIMARY KEY,
    run_timestamp     TIMESTAMPTZ     NOT NULL DEFAULT now(),
    scenario_name     TEXT            NOT NULL,
    reference_version TEXT            NOT NULL,
    target_version    TEXT            NOT NULL,
    valuation_date    DATE            NOT NULL,
    -- summary counters filled in after comparison
    ref_row_count     INT,
    tgt_row_count     INT,
    diff_row_count    INT,
    only_in_ref_count INT,
    only_in_tgt_count INT,
    passed            BOOLEAN
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Reference data  (VarTradeRow snapshot – production / reference engine)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nrt_reference_data (
    id              BIGSERIAL       NOT NULL PRIMARY KEY,
    run_id          INT             NOT NULL REFERENCES nrt_runs (run_id) ON DELETE CASCADE,

    -- composite natural key
    trade_id        TEXT            NOT NULL,
    book            TEXT            NOT NULL,
    desk            TEXT            NOT NULL,
    risk_factor     TEXT            NOT NULL,
    asset_class     TEXT            NOT NULL,
    valuation_date  DATE            NOT NULL,

    -- risk sensitivities
    delta           NUMERIC(28, 10) NOT NULL DEFAULT 0,
    gamma           NUMERIC(28, 10) NOT NULL DEFAULT 0,
    vega            NUMERIC(28, 10) NOT NULL DEFAULT 0,

    -- VaR metrics
    var_1d_99       NUMERIC(28, 10) NOT NULL DEFAULT 0,
    svar_1d_99      NUMERIC(28, 10) NOT NULL DEFAULT 0,

    -- P&L
    pnl             NUMERIC(28, 10) NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS ix_ref_run
    ON nrt_reference_data (run_id);

CREATE INDEX IF NOT EXISTS ix_ref_key
    ON nrt_reference_data (run_id, trade_id, book, desk, risk_factor, valuation_date);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Target data  (VarTradeRow snapshot – new / candidate engine)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nrt_target_data (
    id              BIGSERIAL       NOT NULL PRIMARY KEY,
    run_id          INT             NOT NULL REFERENCES nrt_runs (run_id) ON DELETE CASCADE,

    -- composite natural key
    trade_id        TEXT            NOT NULL,
    book            TEXT            NOT NULL,
    desk            TEXT            NOT NULL,
    risk_factor     TEXT            NOT NULL,
    asset_class     TEXT            NOT NULL,
    valuation_date  DATE            NOT NULL,

    -- risk sensitivities
    delta           NUMERIC(28, 10) NOT NULL DEFAULT 0,
    gamma           NUMERIC(28, 10) NOT NULL DEFAULT 0,
    vega            NUMERIC(28, 10) NOT NULL DEFAULT 0,

    -- VaR metrics
    var_1d_99       NUMERIC(28, 10) NOT NULL DEFAULT 0,
    svar_1d_99      NUMERIC(28, 10) NOT NULL DEFAULT 0,

    -- P&L
    pnl             NUMERIC(28, 10) NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS ix_tgt_run
    ON nrt_target_data (run_id);

CREATE INDEX IF NOT EXISTS ix_tgt_key
    ON nrt_target_data (run_id, trade_id, book, desk, risk_factor, valuation_date);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Diff results  (one row per comparison outcome)
--    Schema kept in sync with DbDiffSaver.BuildPostgreSqlDdl().
--    Key properties (TradeId, Book, Desk, RiskFactor, ValuationDate) get their
--    own queryable columns.
--
--    DiffType     : "InBothButDiff" | "OnlyInReference" | "OnlyInTarget"
--    Diffs        : {"FieldName":{"Ref":<val>,"Tgt":<val>}, …}  (InBothButDiff only)
--    CompareItems : JSON array of the items involved:
--                   InBothButDiff  → [referenceItem, targetItem]
--                   OnlyInReference → [referenceItem]
--                   OnlyInTarget    → [targetItem]
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "NrtDiffResults" (
    "Id"               SERIAL          NOT NULL PRIMARY KEY,
    "RunTimestamp"     TIMESTAMPTZ     NOT NULL,
    "ScenarioName"     TEXT            NOT NULL,
    "ReferenceVersion" TEXT            NOT NULL,
    "TargetVersion"    TEXT            NOT NULL,

    -- composite key columns (must match CompareSettings.KeyProperties)
    "TradeId"          TEXT,
    "Book"             TEXT,
    "Desk"             TEXT,
    "RiskFactor"       TEXT,
    "ValuationDate"    TEXT,

    -- categorisation
    "DiffType"         TEXT,

    -- field-level diff payload  (InBothButDiff only)
    "Diffs"            JSONB,

    -- full item snapshots involved in this comparison outcome
    "CompareItems"     JSONB
);

CREATE INDEX IF NOT EXISTS ix_diff_timestamp
    ON "NrtDiffResults" ("RunTimestamp");

CREATE INDEX IF NOT EXISTS ix_diff_key
    ON "NrtDiffResults" ("TradeId", "Book", "Desk", "RiskFactor", "ValuationDate");

CREATE INDEX IF NOT EXISTS ix_diff_type
    ON "NrtDiffResults" ("DiffType");

-- GIN indexes enable fast JSONB field-level queries
CREATE INDEX IF NOT EXISTS ix_diff_diffs_gin
    ON "NrtDiffResults" USING GIN ("Diffs");

CREATE INDEX IF NOT EXISTS ix_diff_compare_items_gin
    ON "NrtDiffResults" USING GIN ("CompareItems");
