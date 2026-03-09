# Getting stables

How to get USDm, EURm, GBPm. Entry point: swap (FPMM), borrow (CDP), or where to access (Celo, mobile, other chains, CEX).

---

## Paths

| Path | When | Where |
|------|------|--------|
| **Swap (FPMM)** | You have CELO or another asset; want oracle rate. | [FPMM operations → Swap](fpmm-operations.md#swap) |
| **Borrow (CDP)** | Borrow stable against collateral (e.g. GBPm). | [CDP operations → Borrow](cdp-operations.md#borrow) |
| **On Celo** | App or DEX on Celo. | [On Celo](#on-celo) |
| **On mobile** | Mobile app. | [On mobile](#on-mobile) |
| **Other chains** | Bridge or DEX on another chain. | [From other chains](#from-other-chains) |
| **CEX** | Buy/sell on centralized exchange. | [Via CEX](#via-cex) |
| **On-ramps / automation** | Fiat on-ramp, recurring buys (e.g. MATE). | [On-ramps and automation](#on-ramps-and-automation) |

---

## On Celo

Celo mainnet: wallet app (e.g. Valora) with v3 support → swap CELO/other for stables (oracle rate), or (if app supports) borrow via CDP (e.g. GBPm). [Swap](fpmm-operations.md#swap), [Borrow](cdp-operations.md#borrow).

---

## On mobile

Mobile wallet with v3 (e.g. Valora). Same flow: pair → swap or borrow. [FPMM operations](fpmm-operations.md), [CDP operations](cdp-operations.md).

---

## From other chains

**Bridge** to Celo (or chain with pool) → swap or borrow as above. **DEX on that chain:** if Mento stables listed, swap there; confirm v3 and rate source.

---

## Via CEX

Some stables on CEXs. Buy/sell → withdraw to Celo or target chain. Check listing for USDm, EURm, GBPm and networks.

---

## On-ramps and automation

**On-ramps:** Fiat → CELO or stables via provider; then swap/borrow if needed. **Automation (e.g. MATE):** Point at v3 pool or supported app; see tool docs and [FPMM operations](fpmm-operations.md).

---

## Next

- [FPMM operations](fpmm-operations.md) · [CDP operations](cdp-operations.md) · [How it works](../overview/intro.md)
