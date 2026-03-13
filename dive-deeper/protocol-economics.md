# Protocol Economics

Value flows, fees, incentives, and revenue in Mento V3. For the design rationale (why oracle pricing, no LVR), see [FPMMs](fpmm/README.md).

---

## Where value goes

Every swap pays a **fee** (split between **LP fee** and **protocol fee**). LPs earn from swap volume; the protocol earns a share of fees. When the pool's inventory drifts (e.g. too much of one token), only **allowlisted liquidity strategies** can **rebalance**: the pool sends one token to the strategy and receives the other at the oracle rate. The strategy may keep a **capped rebalance incentive** (the pool enforces a **minimum repayment**), so value loss to the pool is bounded and keepers/strategies can earn for providing rebalancing.

**Backing and rebalancing sources.** **USDm** and **EURm** are **Reserve-backed**: the protocol **Reserve** holds fiat-backed collateral (USDC, USDT, EUROC, etc.) and a **Reserve liquidity strategy** rebalances the relevant FPMM pools by minting/burning stables and moving collateral. **GBPm** and other synthetic stables are **CDP-backed** (Liquity v2–style): users deposit USDm as collateral and borrow the synthetic stable; a **CDP liquidity strategy** rebalances using the stability pool and borrowing/repayment. Governance sets Reserve composition, strategy parameters, and which strategies are allowlisted on each pool.

**Safety and governance.** TradingLimitsV2 (per-token net flow caps) and an **on-chain circuit breaker** (e.g. halt when the oracle is invalid or stale) protect pools when the oracle is wrong or manipulated. **Governance**—driven by **MENTO** token holders—controls protocol parameters (fees, rebalance incentives, TradingLimitsV2, circuit breaker thresholds), oracle and feed configuration, pool allowlists, and Reserve policy. See [Understanding Mento Governance](governance-and-mento/understanding-mento-governance.md) and [MENTO Tokenomics](governance-and-mento/mento-tokenomics.md).

**MENTO token.** MENTO is the protocol's **governance and value-accrual token**. Holders vote on parameter changes, oracle config, and treasury use. Locking MENTO as **veMENTO** (vote-escrowed) increases voting power (longer lock = more weight). Governance can direct **protocol revenue** (trading fees, reserve yield, CDP interest, rebalancing-related fees) toward uses such as **MENTO buybacks**, treasury growth, and liquidity programs. In the current design, value is expected to flow to MENTO holders **indirectly** through **protocol-driven MENTO token buybacks**, not through direct revenue sharing with veMENTO holders. See [MENTO Tokenomics](governance-and-mento/mento-tokenomics.md) and [veMENTO & Voting Power](governance-and-mento/participating-in-governance/vemento-and-voting-power.md).

---

## Incentive structure (V3)

Unless noted otherwise, the figures below are **examples of the mechanism**. For **current deployed values**, see [Parameters](../build/deployments/parameters.md).

Incentives align five groups: **CDP borrowers**, **Stability Pool (SP) depositors**, **FPMM LPs**, **keepers/facilitators**, and **MENTO token holders**.

| Actor | Role and incentives |
|-------|---------------------|
| **CDP borrowers** | Pay ongoing interest; can take a short position by selling the stable or earn by providing liquidity in the SP or FPMM. |
| **Stability Pool** | Holds deposited stables to backstop liquidations; earns a **governable share** of borrower interest (`SP_YIELD_SPLIT`) plus **liquidation gains**. In the currently documented **GBPm/Celo** deployment, `SP_YIELD_SPLIT = 75%`. |
| **FPMM LPs** | Earn trading fees at the oracle price; may receive MENTO emissions (governable). On CDP-backed pools they also fund the pool's capped rebalancing incentives. |
| **Keepers** | Earn bounties for triggering rebalances (e.g. block expansions, redemptions). |
| **MENTO holders** | Govern parameters (fees, `sp_yield_split`, rebalance incentives, emissions) and treasury use (e.g. buy-backs, LP/SP incentives). |

---

## Revenue overview (CDP-backed pools)

The table below uses the currently documented **GBPm on Celo** deployment as the concrete reference point where the docs provide one. Values may differ by pool and chain.

| Source | Share / parameter | Recipient |
|--------|-------------------|-----------|
| Borrower interest | `SP_YIELD_SPLIT = 75%` | Stability Pool depositors |
| Borrower interest | `25%` treasury share | Mento Protocol Treasury |
| Liquidations | `LIQUIDATION_PENALTY_SP = 5%` | Stability Pool depositors |
| Redemption fees | `REDEMPTION_FEE_FLOOR = 0.5%` | Redeemed CDPs |
| FPMM trading fees | LP fee + optional protocol fee | FPMM LPs; protocol |
| CDP strategy liquidity-source incentive | `0.05%` on expansion; `0.05%` on contraction; protocol split `0%` | Liquidity source used by the strategy |
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
