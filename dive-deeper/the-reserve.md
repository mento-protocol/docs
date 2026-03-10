# The Reserve

In Mento V3, **most Mento stablecoins are CDP-backed** (using Liquity v2–style CDPs). **Only USDm and EURm** are backed by collateral held in the **MENTO Reserve**. This page explains why that split exists and how the Reserve works for those two stables.

---

## Two backing models in V3

| Backing model | Stablecoins | How it works |
|---------------|-------------|----------------|
| **Reserve-backed** | **USDm**, **EURm** | The Reserve holds high-quality fiat-backed collateral (e.g. USDC, USDT, USDS for USDm; EUROC for EURm). These stables can be backed **1:1** by such assets because they have liquid, high-quality counterparts that can be integrated onchain. |
| **CDP-backed** | **GBPm** and others | No equivalent high-quality fiat-backed GBP (or other currency) stablecoin is integrated at scale yet. So these stables are minted via **Liquity v2–style CDPs**: users deposit **USDm** as collateral and borrow the synthetic stable (e.g. GBPm). When high-quality fiat-backed counterparts become available, governance can consider moving to Reserve-backed backing for them too. |

So: the Reserve backs **only USDm and EURm**. Other Mento stables are **synthetic** and backed by CDPs (with USDm as collateral in the current design), until the ecosystem has suitable fiat-backed collateral to integrate.

---

## Why only USDm and EURm are Reserve-backed

USDm and EURm have **high-quality, fiat-backed counterparts** that are already integrated and liquid on the chains where Mento deploys:

- **USD**: USDC, USDT, USDS, and (on some chains) others trade at or near USD parity and are widely used. The Reserve can hold these and back USDm **1:1**.
- **EUR**: EUROC (and e.g. axlEUROC on Celo) provides a regulated euro-backed stablecoin. The Reserve can hold it and back EURm **1:1**.

For **GBP** (and some other currencies), there is currently **no integrated, high-quality fiat-backed stablecoin** at the same level of adoption and trust. So 1:1 Reserve backing with a single GBP collateral type is not feasible yet. CDPs allow those stables to exist anyway: users lock **USDm** (which is itself Reserve-backed) and mint e.g. GBPm. Once high-quality fiat-backed GBP (or other currency) counterparts are available and can be integrated, the protocol can consider Reserve-backed backing for those stables too.

---

## What the Reserve does (USDm and EURm)

For **USDm** and **EURm**, the Reserve:

- **Holds collateral** — Holds the fiat-backed assets (USDC, USDT, USDS for USDm; EUROC etc. for EURm) that back the circulating supply.
- **Enables rebalancing** — The **Reserve liquidity strategy** is allowlisted on the FPMM pools that pair USDm or EURm with those external stables. When a pool becomes imbalanced, the strategy can mint or burn the Mento stable and move collateral so the pool rebalances at the oracle rate (within configured incentives and caps).
- **Operates transparently** — Holdings and operations are onchain and verifiable.

The Reserve does **not** hold collateral for CDP-backed stables like GBPm; those are backed by user-deposited USDm in the Liquity v2 system.

---

## Reserve dashboard: [reserve.mento.org](https://reserve.mento.org/)

The **Reserve dashboard** at [reserve.mento.org](https://reserve.mento.org/) is the public view of the Mento Reserve. It shows:

- **Total stablecoin supply** — Combined supply of all Mento stables (USDm, EURm, GBPm, and others).
- **Reserve holdings** — The total value of collateral held in the Reserve (the diversified portfolio backing USDm and EURm).
- **Collateralization ratio** — Reserve holdings divided by the supply of Reserve-backed stables; a ratio above 1 indicates over-collateralization.
- **Supply by stablecoin** — Circulating supply per Mento stable (USDm, EURm, GBPm, etc.).

Use it to check Reserve health, verify backing, and see how supply and collateral evolve over time.

---

## Governance and risk

Reserve composition, which assets are accepted as collateral, and the parameters for the Reserve liquidity strategy are set by **governance** (MENTO token holders). Over-collateralization and risk management apply to the Reserve's backing of USDm and EURm; the goal is to keep those stables robustly backed while allowing efficient rebalancing.

---

## Next steps

- [FPMMs](fpmm/README.md) — How pools use the oracle rate and rebalance.
- [Rebalancing & strategies](fpmm/rebalancing-and-strategies.md) — Reserve liquidity strategy and other allowlisted strategies.
- [Protocol Economics](protocol-economics.md) — Value flows, fees, incentives, and reserve management.
