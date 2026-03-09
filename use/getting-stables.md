# Getting stables

How to get USDm, EURm, GBPm. **Primary option:** [Mento app](https://app.mento.org/) — swap (FPMM), borrow (CDP), add/remove liquidity, stability pool. Pools support external stables (USDC, USDT, EUROC, etc.) paired with Mento stables.

---

## Paths

| Path | When | Where |
|------|------|--------|
| **Mento app** | Swap, add/remove liquidity, borrow, repay, stability pool. | [app.mento.org](https://app.mento.org/) |
| **Swap (FPMM)** | You have USDC, USDT, EUROC or another supported asset; want Mento stables at oracle rate. | [FPMM operations → Swap](fpmm-operations.md#swap) |
| **Borrow (CDP)** | Borrow stable against collateral (e.g. GBPm). | [CDP operations → Borrow](cdp-operations.md#borrow) |
| **Other chains** | Bridge or DEX on another chain. | [From other chains](#from-other-chains) |
| **CEX** | Buy/sell on centralized exchange. | [Via CEX](#via-cex) |
| **On-ramps / automation** | Fiat on-ramp, recurring buys. | [On-ramps and automation](#on-ramps-and-automation) |

---

## Mento app

The [Mento app](https://app.mento.org/) lets you: **swap** (FPMM at oracle rate), **add/remove liquidity** to FPMM pools, **borrow** and **repay** CDP stablecoins (e.g. GBPm), and **deposit** into the **stability pool**. Connect a wallet on a supported chain. [Swap](fpmm-operations.md#swap), [Borrow](cdp-operations.md#borrow), [Mint & burn](fpmm-operations.md#mint--burn), [Stability pool](cdp-operations.md#stability-pool).

---

## From other chains

**Bridge** to a chain where Mento v3 is deployed → swap or borrow as above. **DEX on that chain:** if Mento stables are listed, swap there; confirm v3 and rate source.

---

## Via CEX

Some stables on CEXs. Buy/sell → withdraw to your target chain. Check listing for USDm, EURm, GBPm and supported networks.

---

## On-ramps and automation

**On-ramps:** Fiat → stables or supported asset via provider; then swap/borrow in the [Mento app](https://app.mento.org/) or another v3 app if needed. **Automation:** Point at v3 pool or [Mento app](https://app.mento.org/); see tool docs and [FPMM operations](fpmm-operations.md).

---

## Next

- [FPMM operations](fpmm-operations.md) · [CDP operations](cdp-operations.md) · [How it works](../overview/intro.md)
