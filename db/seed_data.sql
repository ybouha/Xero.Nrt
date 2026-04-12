-- =============================================================================
-- Seed 100 000 rows into nrt_reference_data and nrt_target_data with:
--   • 99 700 rows matched identically in both tables
--   •    100 rows only in reference   (TRD-0099801 … TRD-0099900)
--   •    100 rows only in target      (TRD-0099901 … TRD-0100000)
--   •    100 rows in both but differing (TRD-0100001 … TRD-0100100)
--        → 100 corresponding rows written to "NrtDiffResults"
-- =============================================================================

DO $$
DECLARE
    v_run_id        INT;
    v_val_date      DATE    := '2025-01-31';
    v_scenario      TEXT    := 'VaR NRT';
    v_ref_ver       TEXT    := 'prod-2025-01';
    v_tgt_ver       TEXT    := 'uat-2025-02';
    v_run_ts        TIMESTAMPTZ := now();

    v_books         TEXT[] := ARRAY[
        'BOOK-ALPHA','BOOK-BETA','BOOK-GAMMA','BOOK-DELTA',
        'BOOK-EPSILON','BOOK-ZETA','BOOK-ETA','BOOK-THETA'
    ];
    v_desks         TEXT[] := ARRAY[
        'EQUITY','RATES','FX','CREDIT','COMMODITY','INFLATION'
    ];
    v_risk_factors  TEXT[] := ARRAY[
        'IR_USD_3M','IR_USD_6M','IR_USD_1Y','IR_EUR_3M','IR_EUR_6M',
        'FX_EURUSD','FX_USDJPY','FX_GBPUSD','FX_USDCAD','FX_AUDUSD',
        'EQ_SPX','EQ_NDX','EQ_DAX','EQ_FTSE','EQ_NIKKEI',
        'CR_IG_5Y','CR_HY_5Y','CR_IG_10Y','CR_HY_10Y',
        'CMDTY_OIL','CMDTY_NATGAS','CMDTY_GOLD','CMDTY_SILVER',
        'INF_USD_5Y','INF_EUR_5Y'
    ];
    v_asset_classes TEXT[] := ARRAY[
        'Equity','Rates','FX','Credit','Commodity','Inflation'
    ];
BEGIN

    -- ── 0. Run header ──────────────────────────────────────────────────────────
    INSERT INTO nrt_runs (
        run_timestamp,
        scenario_name, reference_version, target_version, valuation_date,
        ref_row_count, tgt_row_count,
        diff_row_count, only_in_ref_count, only_in_tgt_count,
        passed
    )
    VALUES (
        v_run_ts,
        v_scenario, v_ref_ver, v_tgt_ver, v_val_date,
        100000, 100000,   -- 99 800 matching + 100 only-in + 100 diff each
        100, 100, 100,
        false
    )
    RETURNING run_id INTO v_run_id;

    RAISE NOTICE '[seed] run_id = %', v_run_id;

    -- ─────────────────────────────────────────────────────────────────────────
    -- 1. REFERENCE DATA
    -- ─────────────────────────────────────────────────────────────────────────

    -- 1a. Matching rows  TRD-0000001 … TRD-0099800
    INSERT INTO nrt_reference_data (
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        delta, gamma, vega, var_1d_99, svar_1d_99, pnl
    )
    SELECT
        v_run_id,
        'TRD-' || lpad(i::text, 7, '0'),
        v_books        [1 + ((i-1) % cardinality(v_books))],
        v_desks        [1 + ((i-1) % cardinality(v_desks))],
        v_risk_factors [1 + ((i-1) % cardinality(v_risk_factors))],
        v_asset_classes[1 + ((i-1) % cardinality(v_asset_classes))],
        v_val_date,
        round((random() * 200       - 100   )::numeric, 6),   -- delta     ±100
        round((random() * 20        - 10    )::numeric, 6),   -- gamma     ±10
        round((random() * 100       - 50    )::numeric, 6),   -- vega      ±50
        round((random() * 499000    + 1000  )::numeric, 2),   -- var_1d_99 1k–500k
        round((random() * 599000    + 1500  )::numeric, 2),   -- svar      1.5k–600k
        round((random() * 200000    - 100000)::numeric, 2)    -- pnl       ±100k
    FROM generate_series(1, 99800) AS gs(i);

    RAISE NOTICE '[seed] 99 800 matching reference rows inserted';

    -- 1b. Only-in-reference rows  TRD-0099801 … TRD-0099900  (100 rows)
    INSERT INTO nrt_reference_data (
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        delta, gamma, vega, var_1d_99, svar_1d_99, pnl
    )
    SELECT
        v_run_id,
        'TRD-' || lpad(i::text, 7, '0'),
        v_books        [1 + ((i-1) % cardinality(v_books))],
        v_desks        [1 + ((i-1) % cardinality(v_desks))],
        v_risk_factors [1 + ((i-1) % cardinality(v_risk_factors))],
        v_asset_classes[1 + ((i-1) % cardinality(v_asset_classes))],
        v_val_date,
        round((random() * 200    - 100   )::numeric, 6),
        round((random() * 20     - 10    )::numeric, 6),
        round((random() * 100    - 50    )::numeric, 6),
        round((random() * 499000 + 1000  )::numeric, 2),
        round((random() * 599000 + 1500  )::numeric, 2),
        round((random() * 200000 - 100000)::numeric, 2)
    FROM generate_series(99801, 99900) AS gs(i);

    RAISE NOTICE '[seed] 100 only-in-reference rows inserted';

    -- 1c. In-both-but-diff reference side  TRD-0100001 … TRD-0100100  (100 rows)
    INSERT INTO nrt_reference_data (
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        delta, gamma, vega, var_1d_99, svar_1d_99, pnl
    )
    SELECT
        v_run_id,
        'TRD-' || lpad(i::text, 7, '0'),
        v_books        [1 + ((i-1) % cardinality(v_books))],
        v_desks        [1 + ((i-1) % cardinality(v_desks))],
        v_risk_factors [1 + ((i-1) % cardinality(v_risk_factors))],
        v_asset_classes[1 + ((i-1) % cardinality(v_asset_classes))],
        v_val_date,
        round((random() * 200    - 100   )::numeric, 6),
        round((random() * 20     - 10    )::numeric, 6),
        round((random() * 100    - 50    )::numeric, 6),
        round((random() * 499000 + 1000  )::numeric, 2),
        round((random() * 599000 + 1500  )::numeric, 2),
        round((random() * 200000 - 100000)::numeric, 2)
    FROM generate_series(100001, 100100) AS gs(i);

    RAISE NOTICE '[seed] 100 in-both-diff reference rows inserted  → ref total = 100 000';

    -- ─────────────────────────────────────────────────────────────────────────
    -- 2. TARGET DATA
    -- ─────────────────────────────────────────────────────────────────────────

    -- 2a. Matching rows — exact copy of reference rows 1 … 99 700
    INSERT INTO nrt_target_data (
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        delta, gamma, vega, var_1d_99, svar_1d_99, pnl
    )
    SELECT
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        delta, gamma, vega, var_1d_99, svar_1d_99, pnl
    FROM nrt_reference_data
    WHERE run_id   = v_run_id
      AND trade_id <= 'TRD-0099800';

    RAISE NOTICE '[seed] 99 800 matching target rows inserted';

    -- 2b. Only-in-target rows  TRD-0099901 … TRD-0100000  (100 rows)
    INSERT INTO nrt_target_data (
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        delta, gamma, vega, var_1d_99, svar_1d_99, pnl
    )
    SELECT
        v_run_id,
        'TRD-' || lpad(i::text, 7, '0'),
        v_books        [1 + ((i-1) % cardinality(v_books))],
        v_desks        [1 + ((i-1) % cardinality(v_desks))],
        v_risk_factors [1 + ((i-1) % cardinality(v_risk_factors))],
        v_asset_classes[1 + ((i-1) % cardinality(v_asset_classes))],
        v_val_date,
        round((random() * 200    - 100   )::numeric, 6),
        round((random() * 20     - 10    )::numeric, 6),
        round((random() * 100    - 50    )::numeric, 6),
        round((random() * 499000 + 1000  )::numeric, 2),
        round((random() * 599000 + 1500  )::numeric, 2),
        round((random() * 200000 - 100000)::numeric, 2)
    FROM generate_series(99901, 100000) AS gs(i);

    RAISE NOTICE '[seed] 100 only-in-target rows inserted';

    -- 2c. In-both-but-diff target side — perturb reference values by ±5–10%
    --     NULLIF guards against zero values so the diff is always non-trivial.
    INSERT INTO nrt_target_data (
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        delta, gamma, vega, var_1d_99, svar_1d_99, pnl
    )
    SELECT
        run_id, trade_id, book, desk, risk_factor, asset_class, valuation_date,
        -- perturb: original * (1.05 … 1.10) — always at least +5% diff
        round((COALESCE(NULLIF(delta,     0), 1) * (1.05 + random() * 0.05))::numeric, 6),
        round((COALESCE(NULLIF(gamma,     0), 1) * (1.05 + random() * 0.05))::numeric, 6),
        round((COALESCE(NULLIF(vega,      0), 1) * (1.05 + random() * 0.05))::numeric, 6),
        round((var_1d_99  * (1.05 + random() * 0.05))::numeric, 2),
        round((svar_1d_99 * (1.05 + random() * 0.05))::numeric, 2),
        round((COALESCE(NULLIF(pnl,       0), 1) * (1.05 + random() * 0.05))::numeric, 2)
    FROM nrt_reference_data
    WHERE run_id   = v_run_id
      AND trade_id >= 'TRD-0100001'
      AND trade_id <= 'TRD-0100100';

    RAISE NOTICE '[seed] 100 in-both-diff target rows inserted  → tgt total = 100 000';

    -- ─────────────────────────────────────────────────────────────────────────
    -- 3. NrtDiffResults — one row per differing matched pair
    --    Diffs JSONB format: {"FieldName": {"Ref": <val>, "Tgt": <val>}, …}
    -- ─────────────────────────────────────────────────────────────────────────
    INSERT INTO "NrtDiffResults" (
        "RunTimestamp",
        "ScenarioName", "ReferenceVersion", "TargetVersion",
        "TradeId", "Book", "Desk", "RiskFactor", "ValuationDate",
        "Diffs"
    )
    SELECT
        v_run_ts,
        v_scenario, v_ref_ver, v_tgt_ver,
        r.trade_id,
        r.book,
        r.desk,
        r.risk_factor,
        r.valuation_date::text,
        jsonb_build_object(
            'Delta',    jsonb_build_object('Ref', r.delta,      'Tgt', t.delta),
            'Gamma',    jsonb_build_object('Ref', r.gamma,      'Tgt', t.gamma),
            'Vega',     jsonb_build_object('Ref', r.vega,       'Tgt', t.vega),
            'Var1D99',  jsonb_build_object('Ref', r.var_1d_99,  'Tgt', t.var_1d_99),
            'SVaR1D99', jsonb_build_object('Ref', r.svar_1d_99, 'Tgt', t.svar_1d_99),
            'Pnl',      jsonb_build_object('Ref', r.pnl,        'Tgt', t.pnl)
        )
    FROM  nrt_reference_data r
    JOIN  nrt_target_data    t
          ON  t.run_id   = r.run_id
          AND t.trade_id = r.trade_id
    WHERE r.run_id   = v_run_id
      AND r.trade_id >= 'TRD-0100001'
      AND r.trade_id <= 'TRD-0100100';

    RAISE NOTICE '[seed] 100 NrtDiffResults rows inserted';
    RAISE NOTICE '[seed] Done. run_id = %', v_run_id;

END $$;
