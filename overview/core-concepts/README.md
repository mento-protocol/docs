---
description: >-
  Mento v3 is built on FPMMs (Fixed-Price Market Makers), oracles, rebalancing,
  and safety mechanisms. This section explains these core concepts.
---

# Core Concepts

These pages explain how Mento v3 works. **Start with FPMMs** — they are the DEX. Then oracles (how the rate is set), rebalancing (how pools stay balanced), and safety (limits and breakers).

| Concept | What it covers |
|--------|-----------------|
| [Fixed-Price Market Makers (FPMMs)](fixed-price-market-makers-fpmms.md) | What an FPMM is, why no curve/LVR, the invariant I = V/S, rebalancing and liquidity strategies. **Start here.** |
| [Oracles & price feeds](oracles-and-price-feeds.md) | How the pool gets the swap rate (OracleAdapter, BreakerBox), validity and circuit breakers. |
| [Rebalancing & strategies](rebalancing-and-strategies.md) | When pools are rebalanceable, allowlisted strategies, threshold boundary, incentive cap. |
| [Trading limits & circuit breakers](trading-limits-and-circuit-breakers.md) | Per-token caps (TradingLimitsV2), circuit breakers, how they protect the pool. |
| [The Reserve](the-reserve.md) | Backing for fully backed Mento stables; used by the Reserve liquidity strategy. |
| [Stability mechanisms](stability-mechanisms.md) | How fixed prices and rebalancing support stability (v3 context). |
| [Research & economics](research-and-economics.md) | Deeper research and economics (optional). |

*Legacy v2 concepts (Broker, Virtual AMMs, BiPoolManager) are not part of the v3 core; see [Legacy (v2)](../legacy-v2.md).*

For additional protocol-level reference (reserve, stability, asset exchanges, circuit breaker, governance verification), see the [Protocol concepts (reference)](../../protocol-concepts/asset-exchanges/README.md) section in the table of contents.
