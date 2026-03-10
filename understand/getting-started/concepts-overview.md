---
description: >-
  Mento v3 is built on FPMMs (Fixed-Price Market Makers), oracles, rebalancing,
  and safety mechanisms. This section explains these core concepts.
---

# Concepts overview

These pages explain how Mento v3 works. **Start with FPMMs** — they are the DEX. Then oracles (how the rate is set), rebalancing (how pools stay balanced), and safety (limits and breakers).

| Concept | What it covers |
|--------|-----------------|
| [Fixed-Price Market Makers (FPMMs)](../fpmm/README.md) | What an FPMM is, why no curve/LVR, the invariant I = V/S, rebalancing and liquidity strategies. **Start here.** |
| [Oracles, price feeds & circuit breakers](../fpmm/oracles-and-circuit-breakers.md) | How the pool gets the swap rate (OracleAdapter, BreakerBox), validity, and when trading is halted. |
| [Rebalancing & strategies](../fpmm/rebalancing-and-strategies.md) | When pools are rebalanceable, allowlisted strategies, threshold boundary, incentive cap. |
| [Trading limits](../fpmm/trading-limits.md) | Per-token caps (TradingLimitsV2) over time windows; how they protect the pool. |
| [The Reserve](../fpmm/the-reserve.md) | Backing for fully backed Mento stables; used by the Reserve liquidity strategy. |
| [Research & economics](../fpmm/research-and-economics.md) | Deeper research and economics (optional). |
