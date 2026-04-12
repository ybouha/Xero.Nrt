namespace Xero.NrtApi.Models;

/// <summary>
/// Represents a single row from the VaR/risk calculation engine output.
/// Mirrors Xero.NrtRunner.VarTradeRow — kept here because NrtRunner is an executable.
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
    public decimal Var1D99        { get; set; }
    public decimal SVaR1D99       { get; set; }

    // ── P&L ───────────────────────────────────────────────────────────────────
    public decimal Pnl            { get; set; }
}
