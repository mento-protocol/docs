# Legacy (v2)

**These docs focus on Mento v3.** The previous protocol architecture (v2) is documented here only for reference.

---

## What was different in v2?

Mento v2 used a different exchange and governance layout:

- **Broker** — A contract that routed trades to **exchange providers**.
- **BiPoolManager** — Managed pools with **constant-sum** or **constant-product** pricing (reserve-based curves), not oracle-priced FPMMs.
- **Virtual AMMs** — Abstraction layer for trading; not used in v3’s FPMM design.
- **SortedOracles** — On-chain median aggregation of oracle reports; v3 uses **OracleAdapter** and **BreakerBox** for validity and gating, with support for multiple feed sources.

In v3, **FPMMs** replace the v2 broker/pool/pricing flow: each pool has its own oracle, swap-at-oracle logic, and allowlisted liquidity strategies. There is no Broker or BiPoolManager in the main user flow.

---

## If you need v2 details

Legacy v2 contract and flow documentation (Broker, BiPoolManager, constant-sum/constant-product modules, SortedOracles, etc.) may exist in older repos or archives. This doc set does not maintain full v2 coverage; use it only to understand that v3 is a different architecture.

**[Back to What is Mento?](getting-started/what-is-mento.md)** · **[Mento v3 README](../README.md)**
