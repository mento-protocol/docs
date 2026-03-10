# Borrow (CDP)

The Mento SDK v3 supports **trove management** via the Mento CDP system (Liquity v2 fork): open, adjust, and close troves; repay debt; read trove data and system params; and **predict upfront fees** before opening.

In Mento CDPs, **USDm is the collateral**: you lock USDm and **borrow** another stable (e.g. **GBPm**). The SDK identifies each CDP system by the **debt token** (the stable you borrow). See [CDPs](../../smart-contracts/cdps.md) in Smart Contracts for an overview and the Liquity v2 docs for full mechanics.

---

## Create the client

```typescript
import { Mento, ChainId } from '@mento-protocol/mento-sdk'
import { parseUnits } from 'viem'

const mento = await Mento.create(ChainId.CELO)
```

---

## Open a trove

Lock **USDm** as collateral and borrow the debt stable (e.g. **GBPm**). Pass the **debt token** symbol (the stable you borrow) to identify the CDP system. You specify owner, collateral amount (USDm), debt amount (e.g. GBPm), interest rate, and max upfront fee:

```typescript
// Borrow GBPm against USDm collateral (debt token = GBPm)
const openTx = await mento.borrow.buildOpenTroveTransaction('GBPm', {
  owner: ownerAddress,
  ownerIndex: 0,
  collAmount: parseUnits('10000', 18),   // USDm collateral
  boldAmount: parseUnits('1000', 18),    // GBPm to borrow
  annualInterestRate: parseUnits('0.05', 18),   // 5%
  maxUpfrontFee: parseUnits('100', 18),
})
```

Send the returned transaction(s) with your viem wallet (approvals first if needed, then the open-trove tx).

---

## Predict upfront fee (before opening)

Estimate the upfront fee for a given borrow amount and interest rate so users can see cost before committing. Pass the **debt token** (e.g. GBPm) and the amount to borrow:

```typescript
const fee = await mento.borrow.predictOpenTroveUpfrontFee(
  'GBPm',
  parseUnits('1000', 18),
  parseUnits('0.05', 18)
)
```

---

## Get trove data

Read a specific trove’s state (collateral, debt, etc.). Pass the debt token (e.g. GBPm):

```typescript
const trove = await mento.borrow.getTroveData('GBPm', troveId)
```

---

## Get system parameters

Read CDP system params (e.g. min/max collateral, rates, caps) for a CDP system. Pass the debt token (e.g. GBPm):

```typescript
const params = await mento.borrow.getSystemParams('GBPm')
```

Use this to validate user inputs or display protocol limits in your UI.

---

## Adjust and close troves

The SDK also supports **adjusting** an existing trove (add/remove collateral, borrow more, repay) and **closing** a trove. Use the corresponding `mento.borrow` methods (e.g. `buildAdjustTroveTransaction`, `buildCloseTroveTransaction`—check the package exports for exact names) with the same pattern: they return transaction params you send with your viem wallet.

---

## Summary

| Operation | Service method |
|-----------|----------------|
| Open trove | `mento.borrow.buildOpenTroveTransaction('GBPm', { ... })` — debt token = what you borrow |
| Predict upfront fee | `mento.borrow.predictOpenTroveUpfrontFee('GBPm', boldAmount, rate)` |
| Trove data | `mento.borrow.getTroveData('GBPm', troveId)` |
| System params | `mento.borrow.getSystemParams('GBPm')` |
| Adjust / close / repay | See `mento.borrow` exports for `buildAdjustTroveTransaction`, `buildCloseTroveTransaction`, etc. |

All builders return transaction (and optional approval) params; you send them with a viem wallet. Runnable examples: [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples).
