namespace Xero.NrtRunner;

/// <summary>
/// Represents a single row from the VaR/risk calculation engine output.
/// TradeId + Book + Desk + RiskFactor + ValuationDate form the natural composite key.
/// </summary>
public sealed class VarTradeRow
{
    // ── Keys ──────────────────────────────────────────────────────────────────
    public string  TradeId        { get; set; } = string.Empty;
    public string  Book           { get; set; } = string.Empty;
    public string  Desk           { get; set; } = string.Empty;
    public string  RiskFactor     { get; set; } = string.Empty;
    public string  AssetClass     { get; set; } = string.Empty;
    public string  ValuationDate  { get; set; } = string.Empty;

    // ── Risk sensitivities ────────────────────────────────────────────────────
    public decimal Delta          { get; set; }
    public decimal Gamma          { get; set; }
    public decimal Vega           { get; set; }

    // ── VaR metrics ───────────────────────────────────────────────────────────
    public decimal Var1D99        { get; set; }   // 1-day 99% VaR
    public decimal SVaR1D99       { get; set; }   // 1-day 99% Stressed VaR

    // ── P&L ───────────────────────────────────────────────────────────────────
    public decimal Pnl            { get; set; }
}
