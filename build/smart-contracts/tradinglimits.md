# TradingLimitsV2

In **Mento V3**, FPMM pools enforce **per-token net-flow limits** to bound adverse flow over time. The **TradingLimitsV2** library is used by the pool to apply these limits after each swap. (TradingLimits v1 applied to Mento V2; V3 uses TradingLimitsV2.)

## Behavior

- **L0** — Short-term limit over a **5-minute** rolling window: net flow of the token in that window must stay within the configured bounds (e.g. `-limit0 <= netflow0 <= limit0`).
- **L1** — Medium-term limit over a **1-day** rolling window: net flow over the day must stay within the configured bounds.

Each pool token can have its own config (limit0, limit1). If a swap would cause either limit to be exceeded, the swap reverts. Limits are applied after the swap amounts are determined; fee is deducted from inflow before updating net flow.

This protects the pool and the protocol from large one-sided flow in a short period (e.g. oracle lag or manipulation) while still allowing normal trading.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/libraries/TradingLimitsV2.sol`

For how TradingLimitsV2 is configured and used on a pool, see [TradingLimitsV2](../../dive-deeper/fpmm/trading-limits.md) in Dive Deeper.
