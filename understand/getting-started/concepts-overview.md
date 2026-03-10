---
description: >-
  Short index to Mento v3 concepts: FPMMs, oracles, rebalancing, and safety.
---

# Concepts overview

These pages explain how Mento v3 works. For the big picture and why FPMMs, see [What Is Mento?](what-is-mento.md). Use the table below as a map into FPMM mechanics, oracles, rebalancing, and safety.

| Concept | What it covers |
|--------|-----------------|
| [Fixed-Price Market Makers (FPMMs)](../fpmm/README.md) | The invariant I = V/S, operations (swap/mint/burn), rebalancing and liquidity strategies. **Start here** for FPMM detail. |
| [Oracles, price feeds & circuit breakers](../fpmm/oracles-and-circuit-breakers.md) | How the pool gets the swap rate (OracleAdapter, BreakerBox), validity, and when trading is halted. |
| [Rebalancing & strategies](../fpmm/rebalancing-and-strategies.md) | When pools are rebalanceable, allowlisted strategies, threshold boundary, incentive cap. |
| [Trading limits](../fpmm/trading-limits.md) | Per-token caps (TradingLimitsV2) over time windows; how they protect the pool. |
| [The Reserve](../fpmm/the-reserve.md) | Backing for fully backed Mento stables; used by the Reserve liquidity strategy. |
| [Research & economics](../fpmm/research-and-economics.md) | Deeper research and economics (optional). |
