# Borrow (CDP)

The Mento SDK v3 supports **trove management** via the Mento CDP system (Liquity v2 fork): open, adjust, and close troves; repay debt; read trove data and system params; and **predict upfront fees** before opening.

---

## Create the client

```typescript
import { Mento, ChainId } from '@mento-protocol/mento-sdk'
import { parseUnits } from 'viem'

const mento = await Mento.create(ChainId.CELO)
```

---

## Open a trove

Borrow a stable (e.g. USDm) against collateral. You specify owner, collateral amount, debt amount, interest rate, and max upfront fee:

```typescript
const openTx = await mento.borrow.buildOpenTroveTransaction('USDm', {
  owner: ownerAddress,
  ownerIndex: 0,
  collAmount: parseUnits('10', 18),
  boldAmount: parseUnits('1000', 18),
  annualInterestRate: parseUnits('0.05', 18),   // 5%
  maxUpfrontFee: parseUnits('100', 18),
})
```

Send the returned transaction(s) with your viem wallet (approvals first if needed, then the open-trove tx).

---

## Predict upfront fee (before opening)

Estimate the upfront fee for a given borrow amount and interest rate so users can see cost before committing:

```typescript
const fee = await mento.borrow.predictOpenTroveUpfrontFee(
  'USDm',
  parseUnits('1000', 18),
  parseUnits('0.05', 18)
)
```

---

## Get trove data

Read a specific trove’s state (collateral, debt, etc.):

```typescript
const trove = await mento.borrow.getTroveData('USDm', troveId)
```

---

## Get system parameters

Read CDP system params (e.g. min/max collateral, rates, caps) for a stable:

```typescript
const params = await mento.borrow.getSystemParams('USDm')
```

Use this to validate user inputs or display protocol limits in your UI.

---

## Adjust and close troves

The SDK also supports **adjusting** an existing trove (add/remove collateral, borrow more, repay) and **closing** a trove. Use the corresponding `mento.borrow` methods (e.g. `buildAdjustTroveTransaction`, `buildCloseTroveTransaction`—check the package exports for exact names) with the same pattern: they return transaction params you send with your viem wallet.

---

## Summary

| Operation | Service method |
|-----------|----------------|
| Open trove | `mento.borrow.buildOpenTroveTransaction('USDm', { ... })` |
| Predict upfront fee | `mento.borrow.predictOpenTroveUpfrontFee('USDm', boldAmount, rate)` |
| Trove data | `mento.borrow.getTroveData('USDm', troveId)` |
| System params | `mento.borrow.getSystemParams('USDm')` |
| Adjust / close / repay | See `mento.borrow` exports for `buildAdjustTroveTransaction`, `buildCloseTroveTransaction`, etc. |

All builders return transaction (and optional approval) params; you send them with a viem wallet. Runnable examples: [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples).
