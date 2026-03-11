# Parameters

Deployed parameters for Mento V3 pools. The tables below document the configuration in use for USDX/USDm, GBPm/USDm, and axlEUROC/EURm.

Unless stated otherwise, **basis points (bps)** use denominator 10,000. Governance can change parameters over time; for current on-chain configuration, see [Addresses](addresses.md) and chain explorers.

---

## USDX/USDm (oracle-priced FPMM, Reserve strategy)

Pools where **USDX** is an external USD stablecoin (e.g. USDC, USDT, axlUSDC, AUSD) and **USDm** is reserve-backed. Rebalancing uses **ReserveLiquidityStrategy**, not CDP-based liquidity.

**Target pools:** Celo — USDC/USDm, axlUSDC/USDm, USDT/USDm. Monad — AUSD/USDm, USDC/USDm, USDT/USDm.

{% tabs %}
{% tab title="Celo Mainnet" %}
| Parameter set | Parameter | Value |
|---------------|-----------|-------|
| **Pools** | Target pools | USDC/USDm, axlUSDC/USDm, USDT/USDm |
| **FPMM** | LP fee (φ_LP) | 3 bps |
| **FPMM** | Protocol fee (φ_protocol) | 2 bps |
| **FPMM** | Total fee (φ_total) | 5 bps |
| **FPMM** | Rebalance incentive (ρ) | 1 bps |
| **FPMM** | Rebalance threshold above (θ_above) | 5000 bps |
| **FPMM** | Rebalance threshold below (θ_below) | 3333 bps |
| **Reserve Strategy** | debtToken | USDm |
| **Reserve Strategy** | rebalanceCooldown | 300 s |
| **Reserve Strategy** | protocolIncentiveExpansion / Contraction | 0 % |
| **Reserve Strategy** | liquiditySourceIncentiveExpansion / Contraction | 0 % |
| **Oracle feed** | Chainlink deviation threshold (USDC/USD, USDT/USD)† | 0.5 % |
| **Oracle feed** | Chainlink heartbeat (USDC/USD, USDT/USD)† | 240 s |
| **Oracle feed** | SortedOracles report expiry (v2 reference) | 360 s |
| **Risk controls** | ValueDeltaBreaker threshold (USDC/USD, USDT/USD) | 0.15 % |
| **Risk controls** | TradingLimitsV2 (each pool token) — 5 minutes | 500,000 |
| **Risk controls** | TradingLimitsV2 (each pool token) — 1 day | 1,000,000 |

† External Chainlink feed settings; not configurable by Mento governance.
{% endtab %}

{% tab title="Monad" %}
| Parameter set | Parameter | Value |
|---------------|-----------|-------|
| **Pools** | Target pools | AUSD/USDm, USDC/USDm, USDT/USDm |
| **FPMM** | LP fee (φ_LP) | 3 bps |
| **FPMM** | Protocol fee (φ_protocol) | 2 bps |
| **FPMM** | Total fee (φ_total) | 5 bps |
| **FPMM** | Rebalance incentive (ρ) | 1 bps |
| **FPMM** | Rebalance threshold above (θ_above) | 5000 bps |
| **FPMM** | Rebalance threshold below (θ_below) | 3333 bps |
| **Reserve Strategy** | debtToken | USDm |
| **Reserve Strategy** | rebalanceCooldown | 300 s |
| **Reserve Strategy** | protocolIncentiveExpansion / Contraction | 0 % |
| **Reserve Strategy** | liquiditySourceIncentiveExpansion / Contraction | 0 % |
| **Oracle feed** | Chainlink deviation threshold (USDC/USD, USDT/USD, AUSD/USD)† | 0.05 % |
| **Oracle feed** | Chainlink heartbeat (USDC/USD, USDT/USD, AUSD/USD)† | 3600 s |
| **Oracle feed** | SortedOracles report expiry (heartbeat + 2 min) | 3720 s |
| **Risk controls** | ValueDeltaBreaker threshold (USDC/USD, USDT/USD, AUSD/USD) | 0.15 % |
| **Risk controls** | TradingLimitsV2 (each pool token) — 5 minutes | 2,500,000 |
| **Risk controls** | TradingLimitsV2 (each pool token) — 1 day | 5,000,000 |

† External Chainlink feed settings; not configurable by Mento governance.
{% endtab %}
{% endtabs %}

---

## GBPm/USDm (oracle-priced FPMM, CDP strategy on Celo)

Oracle-priced **GBPm/USDm** pool. **Celo** uses CDP-based liquidity (Liquity v2 + CDP Liquidity Strategy). **Monad** uses FPMM, oracle, and risk controls only (no CDP).

{% tabs %}
{% tab title="Celo Mainnet" %}
| Parameter set | Parameter | Value | Units |
|---------------|-----------|-------|-------|
| **FPMM** | LP fee (φ_LP) | 20 | bps |
| **FPMM** | Protocol fee (φ_protocol) | 10 | bps |
| **FPMM** | Rebalance incentive (ρ) | 6 | bps |
| **FPMM** | Rebalance threshold above (θ_above) | 5000 | bps |
| **FPMM** | Rebalance threshold below (θ_below) | 3333 | bps |
| **Oracle feed** | Chainlink deviation threshold (GBP/USD)† | 0.30 | % |
| **Oracle feed** | Chainlink heartbeat (GBP/USD)† | 240 | s |
| **Oracle feed** | SortedOracles report expiry (v2 reference) | 360 | s |
| **Risk controls** | TradingLimitsV2 (USDm) — 5 minutes | 100,000 | USDm |
| **Risk controls** | TradingLimitsV2 (USDm) — 1 day | 500,000 | USDm |
| **Risk controls** | TradingLimitsV2 (GBPm) — 5 minutes | 77,000 | GBPm |
| **Risk controls** | TradingLimitsV2 (GBPm) — 1 day | 385,000 | GBPm |
| **Risk controls** | MedianDeltaBreaker threshold (relayed:GBPUSD, v2 reference) | 4 | % |
| **Risk controls** | MedianDeltaBreaker cooldown (v2 reference) | 900 | s |
| **Risk controls** | MedianDeltaBreaker smoothing factor (v2 reference) | 0.005 | — |
| **Liquity v2** | MIN_DEBT | 1,000 | GBPm |
| **Liquity v2** | LIQUIDATION_PENALTY_SP | 5 | % |
| **Liquity v2** | LIQUIDATION_PENALTY_REDISTRIBUTION | 10 | % |
| **Liquity v2** | COLL_GAS_COMPENSATION_DIVISOR | 200 | — |
| **Liquity v2** | COLL_GAS_COMPENSATION_CAP | 10 | USDm |
| **Liquity v2** | ETH_GAS_COMPENSATION | 1.0 | CELO |
| **Liquity v2** | CCR | 135 | % |
| **Liquity v2** | SCR | 110 | % |
| **Liquity v2** | MCR | 110 | % |
| **Liquity v2** | BCR | 10 | % |
| **Liquity v2** | MIN_ANNUAL_INTEREST_RATE | 0.2 | % |
| **Liquity v2** | REDEMPTION_FEE_FLOOR | 0.5 | % |
| **Liquity v2** | INITIAL_BASE_RATE | 100 | % |
| **Liquity v2** | REDEMPTION_MINUTE_DECAY_FACTOR (≈60 min half-life) | 0.9885140204 | — |
| **Liquity v2** | REDEMPTION_BETA | 1 | — |
| **Liquity v2** | SP_YIELD_SPLIT | 75 | % |
| **Liquity v2** | MIN_BOLD_IN_SP | 1 | GBPm |
| **Liquity v2** | MIN_BOLD_AFTER_REBALANCE | 5,000 | GBPm |
| **CDP Strategy** | rebalanceCooldown | 300 | s |
| **CDP Strategy** | stabilityPoolPercentage | 2,000 | bps |
| **CDP Strategy** | maxIterations | 500 | count |
| **CDP Strategy** | liquiditySourceIncentiveExpansion | 0.05 | % |
| **CDP Strategy** | liquiditySourceIncentiveContraction (fixed trove-owner fee) | 0.05 | % |
| **CDP Strategy** | protocolIncentiveExpansion / Contraction | 0 | % |
| **CDP Strategy** | REDEMPTION_SHORTFALL_TOLERANCE | ≈10⁻⁶ | USDm |

† External Chainlink feed settings; not configurable by Mento governance.
{% endtab %}

{% tab title="Monad" %}
| Parameter set | Parameter | Value | Units |
|---------------|-----------|-------|-------|
| **FPMM** | LP fee (φ_LP) | 10 | bps |
| **FPMM** | Protocol fee (φ_protocol) | 5 | bps |
| **FPMM** | Rebalance incentive (ρ) | 6 | bps |
| **FPMM** | Rebalance threshold above (θ_above) | 5000 | bps |
| **FPMM** | Rebalance threshold below (θ_below) | 3333 | bps |
| **Oracle feed** | Chainlink deviation threshold (GBP/USD)† | 0.15 | % |
| **Oracle feed** | Chainlink heartbeat (GBP/USD)† | 240 | s |
| **Oracle feed** | SortedOracles report expiry | 360 | s |
| **Risk controls** | TradingLimitsV2 (USDm) — 5 minutes | 100,000 | USDm |
| **Risk controls** | TradingLimitsV2 (USDm) — 1 day | 500,000 | USDm |
| **Risk controls** | TradingLimitsV2 (GBPm) — 5 minutes | 77,000 | GBPm |
| **Risk controls** | TradingLimitsV2 (GBPm) — 1 day | 385,000 | GBPm |
| **Risk controls** | MedianDeltaBreaker threshold | 4 | % |
| **Risk controls** | MedianDeltaBreaker cooldown | 900 | s |
| **Risk controls** | MedianDeltaBreaker smoothing factor | 0.005 | — |

† External Chainlink feed settings; not configurable by Mento governance.
{% endtab %}
{% endtabs %}

---

## axlEUROC/EURm (Celo, Reserve strategy)

Oracle-priced **axlEUROC/EURm** pool on **Celo**. **EURm** is reserve-backed; rebalancing uses **ReserveLiquidityStrategy** (no CDP).

**Target pool:** axlEUROC/EURm.

{% tabs %}
{% tab title="Celo Mainnet" %}
| Parameter set | Parameter | Value |
|---------------|-----------|-------|
| **Pools** | Target pool | axlEUROC/EURm |
| **FPMM** | LP fee (φ_LP) | 30 bps |
| **FPMM** | Protocol fee (φ_protocol) | 20 bps |
| **FPMM** | Total fee (φ_total) | 50 bps |
| **FPMM** | Rebalance incentive (ρ) | 1 bps |
| **FPMM** | Rebalance threshold above (θ_above) | 5000 bps |
| **FPMM** | Rebalance threshold below (θ_below) | 3333 bps |
| **Reserve Strategy** | debtToken | EURm |
| **Reserve Strategy** | rebalanceCooldown | 300 s |
| **Reserve Strategy** | protocolIncentiveExpansion / Contraction | 0 % |
| **Reserve Strategy** | liquiditySourceIncentiveExpansion / Contraction | 0 % |
| **Oracle feed** | SortedOracles report expiry (v2 reference) | 360 s |
| **Oracle feed** | Chainlink deviation threshold (EURC/USD)† | 0.30 % |
| **Oracle feed** | Chainlink deviation threshold (EUR/USD)† | 0.50 % |
| **Oracle feed** | Chainlink heartbeat (EURC/USD, EUR/USD)† | 240 s |
| **Risk controls** | ValueDeltaBreaker threshold (v2 reference) | 0.50 % |
| **Risk controls** | TradingLimitsV2 (each pool token) — 5 minutes (v2 reference) | 100,000 |
| **Risk controls** | TradingLimitsV2 (each pool token) — 1 day (v2 reference) | 500,000 |

† External Chainlink feed settings; not configurable by Mento governance.
{% endtab %}
{% endtabs %}

---

## Notes

- **Token ordering:** Pools use canonical ordering where `token0` and `token1` are sorted by token address (`token0` is the smaller address).
- **v2 reference:** Values marked “v2 reference” are aligned with the Mento v2 configuration on Celo.
- For more detail on **GBPm/USDm** (rationale and monitoring), see [GBPm/USDm parameters reference](../reference/gbpm-usdm-parameters-reference.md).
