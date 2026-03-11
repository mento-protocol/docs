# Getting Mento stables

**One way to use Mento V3 is to obtain Mento stablecoins:** USDm (Mento Dollar), EURm (Mento Euro), GBPm (Mento Pound), and others. This page lists the main paths. It assumes you know what Mento V3 is from [Overview](../../README.md).

---

## What are Mento stablecoins?

**Mento stablecoins** are assets that aim to track a fiat currency (e.g. USD, EUR, GBP). They are **one use case** of the Mento V3 DEX: many FPMM pools pair a Mento stable (e.g. USDm) with an external stable (e.g. USDC, USDT) or with another asset. You can get Mento stables by **swapping** in those pools (at the oracle rate) or by **borrowing** (e.g. GBPm via a CDP). You do **not** need prior knowledge of “minting” or “reserves”; the main user-facing actions are **swap** and **borrow**.

---

## Paths to get Mento stables

| Path | When to use it | Where |
|------|----------------|--------|
| **Mento app (swap)** | You have USDC, USDT, EUROC, or another supported token and want USDm, EURm, etc. | [app.mento.org](https://app.mento.org/) — connect wallet, choose pair, swap at oracle rate. |
| **Mento app (borrow)** | You want to borrow a Mento stable (e.g. GBPm) against collateral. | [app.mento.org](https://app.mento.org/) — CDP / borrow flow. |
| **On Celo** | You are on Celo and want to swap or add liquidity on Celo. | Same app; select Celo network. See [On Celo](on-celo.md) for Celo-specific notes. |
| **On mobile** | You prefer a mobile wallet or app. | See [On mobile](on-mobile.md). |
| **From another chain** | You hold assets on another chain and want Mento stables. | Bridge to a chain where Mento V3 is deployed, then use the app or a DEX there. See [From other chains](from-other-chains.md). |
| **Via centralized exchanges (CEX)** | You want to buy/sell Mento stables on a CEX. | See [Via centralized exchanges](via-centralized-exchanges.md). Check whether USDm, EURm, GBPm are listed and on which networks. |
| **On-ramp providers** | You want to buy crypto with fiat (card/bank) into your wallet. | See [On-ramp providers](on-ramp-providers.md). |
| **Automation (MATE)** | You want to automate on/off-ramp flows. | See [Automation via MATE](automation-via-mate.md). |

---

## Recommended starting point

For most users, the simplest path is:

1. Go to **[app.mento.org](https://app.mento.org/)**.
2. Connect your wallet on a supported chain (e.g. Celo).
3. To **get USDm or EURm**: choose the pair (e.g. USDC ↔ USDm) and **swap** at the oracle rate.
4. To **get GBPm** (or other CDP-backed stables): use the **borrow** flow (collateralize and borrow).

For **swap and liquidity** in general (not only “getting stables”), see [Swap & liquidity (FPMM operations)](../swap-and-liquidity.md).

---

## Next steps

- [Swap & liquidity (FPMM operations)](../swap-and-liquidity.md) — How to swap and add/remove liquidity.
- [Overview](../../README.md) — DEX for FX, FPMMs, and where Mento stables fit in.
- [FPMMs](../../dive-deeper/fpmm/README.md) — How pools and the oracle rate work.
- [Troubleshooting](../troubleshooting.md) — Common issues when swapping or getting stables.
