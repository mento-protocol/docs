---
description: Mento Protocol Incentive Mechanisms
---

# Incentive Structure

## TL;DR

Mento aligns incentives across five actor groups—**borrowers (CDPs), Stability Pool (SP) depositors, FPMM LPs, Keepers, and MENTO token holders**—to keep synthetic assets on-peg and markets liquid.

* **Borrowers** pay ongoing interest and can take a short position in the stablecoin by selling it or earn rewards by providing liquidity in the SP or FPMM.
* **SP depositors** earn a configurable share of the interest paid by borrowers; the remainder accrues to the Mento Protocol Treasury.
* **FPMM LPs** earn trading fees at an oracle-fixed price and may receive MENTO emissions (governable).
* **Keepers/facilitators** earn bounties for triggering expansions/redemptions. FPMMs rebalance **via SP-based block expansions** (FPMM buys stables from SP) and **via direct redemptions** from CDPs (FPMM redeems stables for CDP collateral). On **block expansions**, a `sp_provider_fee` (e.g., 0.25% of the rebalancing amount) is paid **by FPMM LPs** to **SP providers**. This means that in periods of strong **supply expansion**, SP providers help scale supply and are rewarded.
* **MENTO token holders** govern parameters and how treasury revenue is used (e.g., MENTO buy-backs or other protocol incentives).

***

## Core Mechanics

### 1. CDPs (Collateralized Debt Positions)

* Lock collateral to **mint stablecoins** (incurs ongoing interest).
* If the collateral ratio falls below thresholds, CDPs can be **liquidated**; the **SP** pays the debt and receives collateral in return.

### 2. Stability Pool (SP)

* Holds **deposited stablecoins** to backstop liquidations.
* Earns **liquidation gains** (collateral at a discount).
* Receives a **governable share** of borrower interest via `sp_yield_split`.
* **Expansion facilitator fee**: on **block expansions**, `sp_provider_fee` (e.g., 0.25%) is **paid by FPMM LPs** to SP providers/facilitators.

### 3. FPMMs (Fixed-Price Market Makers)

* Like AMM pools but priced **at the oracle rate** (plus a swap fee `fpmm_swap_fee`); **no curve-based slippage**.
* **LPs deposit** two assets and **trading fees** pro rata to their TVL share; an optional **protocol fee** on swaps (`protocol_swap_fee`) is governable.
* **Rebalancing paths:**
  * **Block Expansion (SP-based)**: FPMM sells collateral to SP for stables at (near) the oracle price; `sp_provider_fee` applies and is paid by FPMM LPs.
  * **Block Contraction (direct)**: FPMM redeems excess stables directly against CDPs to obtain collateral - this contracts stablecoin supply; a redemption\_fee (e.g., 0.25%) is paid and accrues to the redeemed CDP;&#x20;
* **Outcome**: tight price tracking to the oracle rate with minimal external arbitrage.

### 4. MENTO Token Holders & Treasury

* **MENTO holders** govern parameters (e.g., `sp_yield_split`, `fpmm_swap_fee`, `protocol_swap_fee`, `sp_provider_fee`, `redemption_fee`, `keeper_bounty`, emissions) and treasury usage (e.g., buy-backs or targeted incentives through MENTO gauges).
* The **Mento Protocol Treasury** accrues the remainder of borrower interest (`1 − sp_yield_split`) and deploys it via governance by MENTO holders.

***

## Sources of Incentives

1. **Borrower interest**
   * `sp_yield_split` → SP depositors (ongoing yield).
   * `1 − sp_yield_split` → Mento Protocol Treasury (retained; governable for buy-backs/incentives).
2. **Liquidation gains**
   * SP depositors receive collateral from liquidations and earn liquidation premiums.
3. **Redemption fees**
   * A `redemption_fee` (e.g., 0.25%) is paid by FPMM LPs on redemptions and credited to redeemed CDPs.
4. **FPMM trading fees**
   * **LPs** earn `fpmm_swap_fee` at the oracle price; optional `protocol_swap_fee` is governable.
5. **MENTO emissions (governable / bootstrapping)**
   * Directed to SP and FPMM LPs, keepers / facilitators, integration partners, …; expected to taper as organic revenues grow.
6. **Keeper / facilitator rewards**
   * Flat, governable `keeper_bounty` per expansion/redemption event (e.g., ≈ gas × 1.5).
   * Plus: `sp_provider_fee` (e.g., 0.25%) on block expansions, paid by FPMM LPs to SP providers.

**Implication**: In expansion-heavy periods, SP providers are explicitly rewarded for scaling supply, while FPMM LPs fund that service via `sp_provider_fee`.

***

## Revenue Overview Table&#x20;

| **Borrower interest** | `sp_yield_split` ( e.g. 60%)     | Stability Pool depositors           | Ongoing yield; complements liquidation gains         |
| --------------------- | -------------------------------- | ----------------------------------- | ---------------------------------------------------- |
| **Borrower interest** | `1 − sp_yield_split` ( e.g. 40%) | Mento Protocol Treasury             | Retained revenue; buy-backs/incentives by governance |
| **CDP collateral**    | `Liquidation_penalty` ( e.g. 2%) | Stability Pool depositors           | Collateral received on liquidations                  |
| **Redemption fees**   | `redemption_fee` (e.g., 0.5%)    | Redeemed CDPs                       | Paid on redemptions; accrues to the redeemed CDP     |
| **FPMM trading fees** | `fpmm_swap_fee` (e.g., 0.5%)     | FPMM LPs (pro-rata TVL)             | Oracle-priced swaps; optional protocol\_swap\_fee    |
| **SP provider fee**   | `sp_provider_fee` (e.g., 0.25%)  | SP providers (paid by FPMM LPs)     | Fee on expansion notional                            |
| **MENTO emissions**   | see Figure 1                     | LPs, keepers/facilitators, partners | Bootstrapping; expected to taper slowly over time    |

<p align="center"><sub>Figure 1: MENTO token emissions</sub></p>

<figure><img src="../.gitbook/assets/unnamed (1).png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
MENTO total supply increases over time as more tokens are emitted and paid out as incentives. The emission schedule is fixed and provides an upper bound on spending by the Mento Community Treasury. How much is actually spent and what these emissions are used for is governable.
{% endhint %}

***

## Example: Mento Incentive Model in Numbers

### **Assumptions**

* **Total CDP Debt Outstanding**: $100M (= total stablecoin supply in USD)
* **Average Borrowing Interest Rate**: 3% p.a. → $3M/year borrower interest
* **`sp_yield_split`**: 60% to SP; 40% to Mento Protocol Treasury
* **MENTO emissions** to LPs & keepers: $2M/year. Emissions are fixed and provide an upper bound on how much can be spent. Actual spending is governable and expected to taper after the bootstrapping phase.
* **Liquidations**: Net-neutral / opportunistic gains
* **FPMM fee example**: `fpmm_swap_fee` = 0.5%, $50k/day volume → $91,250/year per $1M TVL to LPs (≈ 9.13% APR)
* **SP provider fee on expansions**: `sp_provider_fee` = 0.25% of annual gross block expansion notional (E) — paid by FPMM LPs
* **Redemption fee**: `redemption_fee` = 0.5%  of annual gross block contraction notional (C) — accrues to redeemed CDPs\
  \


### Exemplary Revenue Flow Breakdown

<table data-header-hidden><thead><tr><th>Source of Revenue</th><th width="130.43359375">Amount p.a.</th><th>Recipient </th><th>Notes</th></tr></thead><tbody><tr><td><strong>Borrower interest</strong> (sp_yield_split = 60%)</td><td>$1.8M</td><td>Stability Pool depositors</td><td>Governed split</td></tr><tr><td><p><strong>Borrower interest</strong></p><p>(1 − sp_yield_split)</p></td><td>$1.2M</td><td>Protocol Treasury</td><td>Retained; may fund buy-backs/incentives</td></tr><tr><td><strong>Redemption fees</strong> (redemption_fee)</td><td>0.5% × C</td><td>Redeemed CDPs</td><td>C = annual gross block contraction notional</td></tr><tr><td><strong>FPMM trading fees</strong> (per $1M TVL example)</td><td>$91,250</td><td>FPMM LPs</td><td>≈ 9.13% APR; ~9.55% APY if compounded daily</td></tr><tr><td><strong>SP provider fee</strong> (expansions)</td><td>0.25% × E</td><td>SP providers (paid by FPMM LPs)</td><td>E = annual gross block expansion notional</td></tr><tr><td><strong>MENTO emissions</strong> (bootstrapping)</td><td>$2.0M</td><td>SP providers, FPMM LPs, keepers/facilitators</td><td>Temporary; governed taper</td></tr></tbody></table>

* **Ecosystem rewards** (ex-Treasury accrual): $1.8M (SP yield) + $2.0M (emissions);  LP fee earnings (e.g., $91,250 per $1M TVL); SP expansions (sp\_provider\_fee = 0.25% × E).
* **Mento Treasury accrual**: $1.2M/year (governable deployment by MENTO holders).

### Net Picture

* **Organic borrower interest**: $3.0M/year
  * $1.8M → SP depositors
  * $1.2M → Mento Protocol Treasury
* **FPMM fees**: flow to LPs based on volume and TVL share; LPs also fund sp\_provider\_fee on expansions.
* **Inflationary incentives**: $2.0M/year.
* **Expansion-period dynamics**: SP providers are rewarded (sp\_provider\_fee) for facilitating supply growth; LPs fund this cost while earning swap fees and therefore benefiting from trading volume.

### Key Insights

* **Borrowers fund the system to a significant extent**: Their interest supports SP yield and accrues treasury revenue that MENTO holders can deploy.
* **FPMMs offer improved stablecoin distribution** by allowing for swaps of stablecoins at the FX rate without slippage. FPMMs tighten the peg and keep inventory balanced using SP-based expansions and direct redemptions. The fpmm\_swap\_fee complements borrower interest as a major protocol revenue driver. &#x20;
* **FPMM LPs earn fee income that scales with trading volume**. Additionally, MENTO tokens can be distributed to LPs (Stability Pool and/or FPMM) as an incentive. Expansion costs are explicitly covered through the sp\_provider\_fee paid during block expansions.&#x20;
* **MENTO holders** steer sustainability via parameters, treasury use, and emissions.\
  \
