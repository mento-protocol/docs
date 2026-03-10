# Economics

Value flows, fees, incentives, and revenue in Mento V3. For the design rationale (why oracle pricing, no LVR), see [FPMMs](fpmm/README.md).

---

## Where value goes

Every swap pays a **fee** (split between **LP fee** and **protocol fee**). LPs earn from swap volume; the protocol earns a share of fees. When the pool’s inventory drifts (e.g. too much of one token), only **allowlisted liquidity strategies** can **rebalance**: the pool sends one token to the strategy and receives the other at the oracle rate. The strategy may keep a **capped rebalance incentive** (the pool enforces a **minimum repayment**), so value loss to the pool is bounded and keepers/strategies can earn for providing rebalancing.

**Backing and rebalancing sources.** **USDm** and **EURm** are **Reserve-backed**: the protocol **Reserve** holds fiat-backed collateral (USDC, USDT, EUROC, etc.) and a **Reserve liquidity strategy** rebalances the relevant FPMM pools by minting/burning stables and moving collateral. **GBPm** and other synthetic stables are **CDP-backed** (Liquity v2–style): users deposit USDm as collateral and borrow the synthetic stable; a **CDP liquidity strategy** rebalances using the stability pool and borrowing/repayment. Governance sets Reserve composition, strategy parameters, and which strategies are allowlisted on each pool.

**Safety and governance.** Trading limits (per-token net flow caps) and an **on-chain circuit breaker** (e.g. halt when the oracle is invalid or stale) protect pools when the oracle is wrong or manipulated. **Governance**—driven by **MENTO** token holders—controls protocol parameters (fees, rebalance incentives, trading limits, circuit breaker thresholds), oracle and feed configuration, pool allowlists, and Reserve policy. See [Understanding Mento Governance](governance-and-mento/understanding-mento-governance.md) and [MENTO Tokenomics](governance-and-mento/mento-tokenomics.md).

**MENTO token.** MENTO is the protocol’s **governance and value-accrual token**. Holders vote on parameter changes, oracle config, and treasury use. Locking MENTO as **veMENTO** (vote-escrowed) increases voting power (longer lock = more weight) and can entitle holders to a share of **protocol revenue** (trading fees, reserve yield, CDP interest, rebalancing-related fees). Supply is capped at 1 billion; distribution includes community treasury, team/contributors, airdrops, and reserve safety fund. Revenue distribution (e.g. veMENTO stakers, stability pools, buyback-and-burn) is governable. See [MENTO Tokenomics](governance-and-mento/mento-tokenomics.md) and [veMENTO & Voting Power](governance-and-mento/participating-in-governance/vemento-and-voting-power.md).

---

## Incentive structure (V3)

Incentives align five groups: **CDP borrowers**, **Stability Pool (SP) depositors**, **FPMM LPs**, **keepers/facilitators**, and **MENTO token holders**.

| Actor | Role and incentives |
|-------|---------------------|
| **CDP borrowers** | Pay ongoing interest; can take a short position by selling the stable or earn by providing liquidity in the SP or FPMM. |
| **Stability Pool** | Holds deposited stables to backstop liquidations; earns a **governable share** of borrower interest (`sp_yield_split`) plus **liquidation gains**. On **block expansions**, a **SP provider fee** (e.g. 0.25% of rebalance notional) is paid by FPMM LPs to SP providers. |
| **FPMM LPs** | Earn trading fees at the oracle price; may receive MENTO emissions (governable). Fund rebalancing incentives (e.g. SP provider fee on expansions). |
| **Keepers** | Earn bounties for triggering rebalances (e.g. block expansions, redemptions). |
| **MENTO holders** | Govern parameters (fees, `sp_yield_split`, rebalance incentives, emissions) and treasury use (e.g. buy-backs, LP/SP incentives). |

---

## Revenue overview (CDP-backed pools)

| Source | Share / parameter | Recipient |
|--------|-------------------|-----------|
| Borrower interest | `sp_yield_split` (e.g. 60%) | Stability Pool depositors |
| Borrower interest | `1 − sp_yield_split` (e.g. 40%) | Mento Protocol Treasury |
| Liquidations | Liquidation penalty (e.g. 2%) | Stability Pool depositors |
| Redemption fees | e.g. 0.5% of redemption notional | Redeemed CDPs |
| FPMM trading fees | LP fee + optional protocol fee | FPMM LPs; protocol |
| SP provider fee (expansions) | e.g. 0.25% of expansion notional | SP providers (paid by FPMM LPs) |
| MENTO emissions | Governable | LPs, keepers, partners (bootstrapping; expected to taper) |

Reserve-backed pools (USDm, EURm) do not have CDP interest or SP; rebalancing is via the Reserve strategy with a capped rebalance incentive.

---

## Risks

For protocol risks—oracle manipulation, reserve and inventory risk, smart contract and blockchain risk—see [Risk overview](security/risk-overview.md).

---

## Next steps

- [FPMMs](fpmm/README.md) — Design rationale, invariant, operations.
- [Governance & MENTO](governance-and-mento/README.md) — How the protocol is governed.
- [Security](security/README.md) — Risk overview and audit reports.
