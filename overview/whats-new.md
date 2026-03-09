# What's new

Updates and changes for Mento v3. This page focuses on v3 only.

---

## v3 highlights

- **Fixed-price market makers (FPMMs):** Swaps execute at the oracle rate (minus fee). No curve slippage; value per share at the oracle.
- **Rebalancing:** Allowlisted strategies (Reserve, CDP) rebalance pools when composition drifts. Capped incentive; value protection and trading limits.
- **CDP-backed stables:** GBPm and future CDP-backed stablecoins use a Liquity-style CDP (borrow, repay, stability pool).
- **Oracle and breakers:** OracleAdapter and BreakerBox gate trading (recency, trading mode, FX hours). Trading limits cap netflow per token.

For full mechanics and concepts, see [How it works & stablecoins](intro.md) and [Concepts](../concepts/fpmm.md).
