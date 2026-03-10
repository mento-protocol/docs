# GBPm/USDm launch parameters (reference)

This page summarizes the **recommended launch parameters** for the Mento V3 GBPm/USDm deployment (FPMM, risk controls, Liquity v2 CDP, and CDP Strategy). The values are taken from the full parameters note in this repository: **`parameters/suggested_fpmm_gbpm_usdm_parameters.pdf`** (and its source `parameters/suggested_fpmm_gbpm_usdm_parameters.tex`). They apply to the **Celo** deployment; the Monad deployment uses the same FPMM/oracle/risk values but has no CDP-based liquidity. Governance may change these after launch.

---

## FPMM (pool)

| Parameter | Celo | Monad | Units |
|-----------|------|-------|-------|
| LP fee ($\phi_{\mathrm{LP}}$) | 20 | 10 | bps |
| Protocol fee ($\phi_{\mathrm{protocol}}$) | 10 | 5 | bps |
| Rebalance incentive ($\rho$) | 6 | 6 | bps |
| Rebalance threshold above ($\theta_{\mathrm{above}}$) | 5,000 | 5,000 | bps |
| Rebalance threshold below ($\theta_{\mathrm{below}}$) | 3,333 | 3,333 | bps |

---

## Risk controls

| Parameter | Value | Units |
|-----------|--------|-------|
| TradingLimitsV2 (USDm) — 5 min | 100,000 | USDm |
| TradingLimitsV2 (USDm) — 1 day | 500,000 | USDm |
| TradingLimitsV2 (GBPm) — 5 min | 77,000 | GBPm |
| TradingLimitsV2 (GBPm) — 1 day | 385,000 | GBPm |
| MedianDeltaBreaker threshold (GBP/USD) | 4 | % |
| MedianDeltaBreaker cooldown | 900 | s |

---

## Liquity v2 (CDP system) — Celo only

Collateral: **USDm**. Debt token: **GBPm**.

| Parameter | Value | Units |
|-----------|--------|-------|
| **MIN_DEBT** (minimum borrow) | 1,000 | GBPm |
| Min. collateral ratio (**MCR**) | 110 | % |
| Critical collateral ratio (**CCR**) | 135 | % |
| **MIN_ANNUAL_INTEREST_RATE** | 0.2 | % |
| REDEMPTION_FEE_FLOOR | 0.5 | % |
| LIQUIDATION_PENALTY_SP (Stability Pool) | 5 | % |
| LIQUIDATION_PENALTY_REDISTRIBUTION | 10 | % |
| COLL_GAS_COMPENSATION_CAP | 10 | USDm |
| ETH_GAS_COMPENSATION | 1.0 | CELO |
| SP_YIELD_SPLIT | 75 | % |
| MIN_BOLD_IN_SP | 1 | GBPm |
| MIN_BOLD_AFTER_REBALANCE | 5,000 | GBPm |

Liquidation occurs when the collateral ratio falls below **MCR (110%)**; the **LOAN-TO-VALUE** bar in the app shows "Liquidation at …%" (e.g. ~91% LTV corresponds to 110% collateral ratio).

---

## CDP Strategy (rebalancing) — Celo only

| Parameter | Value | Units |
|-----------|--------|-------|
| rebalanceCooldown | 300 | s |
| stabilityPoolPercentage | 2,000 (20%) | bps |
| maxIterations | 500 | count |
| liquiditySourceIncentiveExpansion | 0.05 | % |
| liquiditySourceIncentiveContraction (trove-owner fee) | 0.05 | % |
| protocolIncentiveExpansion / Contraction | 0 | % |

---

For rationale, on-chain constraints, and post-launch monitoring, see the full note: **`parameters/suggested_fpmm_gbpm_usdm_parameters.pdf`**.
