# Getting stables

How do I get Mento stablecoins (cUSD, EURm, GBPm, etc.)? This page is the single entry point. From here you’re routed to swapping (FPMM), borrowing (CDP), or to where to access them (Celo, mobile, other chains, CEX).

---

## Paths to get stables

| Path | When to use | Where to go |
|------|--------------|-------------|
| **Swap via FPMM** | You have CELO or another asset and want to swap at the oracle rate. | [FPMM operations → Swap](fpmm-operations.md#swap) |
| **Borrow via CDP** | You want to borrow a stablecoin against collateral (e.g. GBPm). | [CDP operations → Borrow](cdp-operations.md#borrow) |
| **On Celo** | You’re on Celo and want an app or DEX. | [On Celo](#on-celo) below |
| **On mobile** | You want a mobile app. | [On mobile](#on-mobile) below |
| **From other chains** | You’re on another chain and want to bridge or use a DEX there. | [From other chains](#from-other-chains) below |
| **Via CEX** | You want to buy/sell on a centralized exchange. | [Via CEX](#via-cex) below |

---

## On Celo

On Celo mainnet you can get v3 stablecoins by:

- Using a Celo wallet app (e.g. Valora) that supports Mento v3 pools.
- Swapping CELO or other assets for stables in-app (swap at oracle rate). See [FPMM operations → Swap](fpmm-operations.md#swap).
- If the app supports CDP (e.g. GBPm): borrowing against collateral. See [CDP operations → Borrow](cdp-operations.md#borrow).

*List or link to current Celo apps and DEXs that integrate v3; update as the ecosystem changes.*

---

## On mobile

Use a mobile wallet that supports Mento v3 (e.g. Valora). Flow: open app → select pair (e.g. CELO/cUSD) → swap or (for GBPm) borrow. Same operations as on Celo; see [FPMM operations](fpmm-operations.md) and [CDP operations](cdp-operations.md).

---

## From other chains

To get Mento stables from another chain:

- **Bridge:** Bridge assets to Celo (or the chain where the pool is), then swap or borrow as above.
- **DEX on that chain:** If Mento stables are listed on a DEX on another chain, you can swap there; check that the pool is v3 and the rate source is correct.

*Add or link to bridge and multi-chain DEX info as needed.*

---

## Via CEX

Some Mento stablecoins are listed on centralized exchanges. You can buy or sell there; then withdraw to Celo (or your target chain) to use in DeFi. Check the exchange’s listing for cUSD, EURm, GBPm, etc., and their supported networks.

*Add a short table or link: Stablecoin | CEXs (example) | Networks.*

---

## On-ramps and automation

- **On-ramps:** Fiat on-ramp providers may support CELO or Mento stables; use their flow then swap/borrow as above if needed.
- **Automation (e.g. MATE):** If you use automation tools for recurring buys or DCA, point them at the v3 pool or the supported app; see the tool’s docs and [FPMM operations](fpmm-operations.md).

---

## Next

- [FPMM operations](fpmm-operations.md) — Swap, mint/burn, rebalance.
- [CDP operations](cdp-operations.md) — Borrow, repay, stability pool (GBPm).
- [How it works & stablecoins](../overview/intro.md) — Which stablecoins exist on v3.
