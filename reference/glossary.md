# Glossary

Short definitions for terms used in the Mento V3 docs. For full context, see [Overview](../README.md) · [What Is Mento? (deep dive)](../dive-deeper/what-is-mento.md) and [FPMMs](../dive-deeper/fpmm/README.md).

---

| Term | Definition |
|------|------------|
| **AMM** (automated market maker) | A pool that sets swap price by a rule (e.g. formula or oracle) rather than an order book. |
| **CFMM** (constant-function market maker) | An AMM whose **trading function** depends only on **reserves** (e.g. constant product xy = k). Price is derived from reserves and moves only when someone trades; no oracle in the rule. LVR and slippage arise from this design. |
| **CDP** (collateralized debt position) | A position where you deposit collateral and borrow a stablecoin. Used for synthetic Mento stables. |
| **Circuit breaker** | A rule that can halt trading when conditions are abnormal (e.g. oracle stale, price move too large). In V3, BreakerBox and OracleAdapter gate when the pool accepts swaps. |
| **DEX** (decentralized exchange) | A place to swap tokens without a central custodian; trades are executed by smart contracts. |
| **FPMM** (Fixed-Price Market Maker) | An AMM where the swap price is fixed to an external **oracle** rate (minus fee). No reserve-based curve; no curve slippage; no LVR from a stale pool price. |
| **FX** (foreign exchange) | Exchange of one currency or currency-like asset for another at a rate (e.g. USDC/USDm, EUR/USD). |
| **Invariant** | A quantity the protocol keeps unchanged by every allowed operation. In V3 FPMMs: **I = V / S** (value at oracle per LP share). |
| **Liquidity strategy** | A smart contract allowlisted by a pool that can call the pool's rebalance function (e.g. Reserve, CDP). |
| **LVR** (loss-versus-rebalancing) | In curve-based AMMs, loss to LPs when arbitrageurs trade against a stale pool price. In an FPMM the pool always quotes the oracle, so LVR from a stale curve is zero. |
| **Mento stables** | Mento stablecoins: USDm, EURm, GBPm, and others. Track fiat; obtainable via swap (FPMM) or borrow (CDP). |
| **Oracle** | An external price feed the protocol trusts. In V3, each pool uses an oracle to set the swap rate. |
| **Rebalance** | When the pool's reserve ratio drifts from the oracle, an allowlisted **liquidity strategy** can take one token from the pool and return the other at the oracle rate (capped incentive). |
| **Reserves** | The two tokens held by a pool. Swaps change composition; **value at oracle** is preserved (minus fees). |
| **Trading limits** | Caps on per-token net flow over a time window (e.g. 5 minutes, 1 day). Limit how much the pool can be drained. |
| **Value protection** | Rule that every swap must not decrease the pool's **reserve value at the oracle** (after fees). |

---

**See also:** [Overview](../README.md) · [What Is Mento? (deep dive)](../dive-deeper/what-is-mento.md) · [FPMMs](../dive-deeper/fpmm/README.md) · [Oracles & circuit breakers](../dive-deeper/fpmm/oracles-and-circuit-breakers.md).
