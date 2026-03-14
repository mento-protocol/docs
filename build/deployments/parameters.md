# Parameters

Deployed parameters for Mento V3 pools. The tables below document the configuration in use for **USDC/USDm**, **axlUSDC/USDm**, **USDT/USDm** (Celo), **AUSD/USDm** and **USDC/USDm** (Monad), and **GBPm/USDm** (Celo and Monad).

Unless stated otherwise, **basis points (bps)** use denominator 10,000. Governance can change parameters over time; for current on-chain configuration, see [Addresses](addresses.md) and chain explorers.

---

## USDC/USDm, axlUSDC/USDm, USDT/USDm (Celo); AUSD/USDm, USDC/USDm (Monad)

These pools pair reserve-backed **USDm** with an external USD stablecoin. On **Celo** the deployed pools are USDC/USDm, axlUSDC/USDm, and USDT/USDm; on **Monad**, AUSD/USDm and USDC/USDm. Rebalancing uses **ReserveLiquidityStrategy**, not CDP-based liquidity.

{% tabs %}
{% tab title="Celo Mainnet" %}
| Parameter set | Parameter | Value |
|---------------|-----------|-------|
| **Pools** | Deployed pools | USDC/USDm, axlUSDC/USDm, USDT/USDm |
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
| **Pools** | Deployed pools | AUSD/USDm, USDC/USDm |
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
| **Oracle feed** | Chainlink deviation threshold (USDC/USD, AUSD/USD)† | 0.05 % |
| **Oracle feed** | Chainlink heartbeat (USDC/USD, AUSD/USD)† | 3600 s |
| **Oracle feed** | SortedOracles report expiry (heartbeat + 2 min) | 3720 s |
| **Risk controls** | ValueDeltaBreaker threshold (USDC/USD, AUSD/USD) | 0.15 % |
| **Risk controls** | TradingLimitsV2 (each pool token) — 5 minutes | 2,500,000 |
| **Risk controls** | TradingLimitsV2 (each pool token) — 1 day | 5,000,000 |

† External Chainlink feed settings; not configurable by Mento governance.
{% endtab %}
{% endtabs %}

---

## GBPm/USDm

Oracle-priced **GBPm/USDm** pool deployed on both Celo and Monad. **Celo** has a GBPm CDP deployment (Liquity v2) and rebalancing uses the **CDP Liquidity Strategy**. **Monad** has no CDP deployment and no CDP Liquidity Strategy; rebalancing uses **OpenLiquidityStrategy** at [0x54e2Ae8c8448912E17cE0b2453bAFB7B0D80E40f](https://monadscan.com/address/0x54e2Ae8c8448912E17cE0b2453bAFB7B0D80E40f).

{% tabs %}
{% tab title="Celo Mainnet" %}
| Parameter set | Parameter | Value | Units |
|---------------|-----------|-------|-------|
| **Pools** | Deployed pools | GBPm/USDm |
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
| **Pools** | Deployed pools | GBPm/USDm |
| **Liquidity strategy** | OpenLiquidityStrategy | [0x54e2Ae8c8448912E17cE0b2453bAFB7B0D80E40f](https://monadscan.com/address/0x54e2Ae8c8448912E17cE0b2453bAFB7B0D80E40f) | — |
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

## CDP (Bold / Liquity v2 fork) — GBPm on Celo

The following parameters apply to the **CDP system** (Bold / Liquity v2 fork) used for GBPm on Celo. This is a separate deployment from the GBPm/USDm FPMM pool; the pool uses [CDPLiquidityStrategy](smart-contracts/liquidity-strategies.md#cdpliquiditystrategy) to rebalance against the CDP. CDP contract addresses are in [Addresses](addresses.md#cdp-bold--liquity-v2-fork).

Because Mento CDPs are **FX CDPs**, the branch price feed is gated by FX market hours through `FXPriceFeed -> OracleAdapter -> MarketHoursBreaker`. In practice, normal price-dependent trove operations, liquidations, and standard redemptions are unavailable while the FX market is closed (for example on weekends), while regular Stability Pool deposit / withdraw / claim flows remain available.

| Parameter | Value | Units |
|-----------|-------|-------|
| MIN_DEBT | 1,000 | GBPm |
| LIQUIDATION_PENALTY_SP | 5 | % |
| LIQUIDATION_PENALTY_REDISTRIBUTION | 10 | % |
| COLL_GAS_COMPENSATION_DIVISOR | 200 | — |
| COLL_GAS_COMPENSATION_CAP | 10 | USDm |
| ETH_GAS_COMPENSATION | 1.0 | CELO |
| CCR | 135 | % |
| SCR | 110 | % |
| MCR | 110 | % |
| BCR | 10 | % |
| MIN_ANNUAL_INTEREST_RATE | 0.2 | % |
| REDEMPTION_FEE_FLOOR | 0.5 | % |
| INITIAL_BASE_RATE | 100 | % |
| REDEMPTION_MINUTE_DECAY_FACTOR (≈60 min half-life) | 0.9885140204 | — |
| REDEMPTION_BETA | 1 | — |
| SP_YIELD_SPLIT | 75 | % |
| MIN_BOLD_IN_SP | 1 | GBPm |
| MIN_BOLD_AFTER_REBALANCE | 5,000 | GBPm |

