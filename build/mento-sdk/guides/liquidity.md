# Liquidity management

The Mento SDK v3 lets you **add liquidity**, **remove liquidity**, and **zap in/out** for **FPMM pools**. You get transaction parameters to send with any viem wallet client.

---

## Create the client

```typescript
import { Mento, ChainId, deadlineFromMinutes } from '@mento-protocol/mento-sdk'
import { parseUnits } from 'viem'

const mento = await Mento.create(ChainId.CELO)
```

---

## Add liquidity (two tokens)

Add both sides of a pool in the desired ratio. You need the pool address, token addresses, amounts, recipient, and owner:

```typescript
const addTx = await mento.liquidity.buildAddLiquidityTransaction(
  poolAddress,
  tokenA,
  amountA,
  tokenB,
  amountB,
  recipient,
  owner,
  { slippageTolerance: 0.5, deadline: deadlineFromMinutes(5) }
)
```

Send the returned transaction(s) with your viem wallet (approval first if present, then the add-liquidity tx).

---

## Zap in (single token → LP)

Deposit a **single token** and the SDK splits it into the two pool assets according to a **split ratio** (e.g. 0.5 = 50/50):

```typescript
const zapTx = await mento.liquidity.buildZapInTransaction(
  poolAddress,
  tokenIn,
  amountIn,
  0.5,   // split ratio (e.g. 50/50)
  recipient,
  owner,
  { slippageTolerance: 0.5, deadline: deadlineFromMinutes(5) }
)
```

Use this when users want to provide liquidity with one token only.

---

## Zap out (LP → single token)

Remove liquidity and receive a **single token** (the other side is swapped internally). Build the transaction with the pool, LP amount, desired output token, and options:

```typescript
const zapOutTx = await mento.liquidity.buildZapOutTransaction(
  poolAddress,
  lpAmount,
  tokenOut,
  recipient,
  owner,
  { slippageTolerance: 0.5, deadline: deadlineFromMinutes(5) }
)
```

---

## Remove liquidity (LP → two tokens)

Standard removal: burn LP and receive both pool tokens in proportion to the pool’s reserves. Use the SDK’s remove-liquidity builder (method name may be `buildRemoveLiquidityTransaction` or similar—check the package exports) with pool address, LP amount, recipient, owner, and slippage/deadline.

---

## LP token balance

Read a user’s LP token balance for a given pool:

```typescript
const balance = await mento.liquidity.getLPTokenBalance(poolAddress, owner)
```

Use this to show users their position size or to build remove/zap-out amounts.

---

## Summary

| Operation | Service method |
|-----------|----------------|
| Add liquidity (two tokens) | `mento.liquidity.buildAddLiquidityTransaction(...)` |
| Zap in (single token → LP) | `mento.liquidity.buildZapInTransaction(...)` |
| Zap out (LP → single token) | `mento.liquidity.buildZapOutTransaction(...)` |
| LP balance | `mento.liquidity.getLPTokenBalance(poolAddress, owner)` |

All builders return transaction params (and optional approval) for you to send with a viem wallet. Use **slippage tolerance** and **deadline** to protect users. Runnable examples: [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples).
