# Getting a quote

This guide shows how to get a **swap quote** with the Mento SDK v3. Quotes use **FPMM pools** and the router (oracle-priced, fee-adjusted). You can quote “amount out” for a given “amount in,” or “amount in” for a desired “amount out.”

---

## Create the client

```typescript
import { Mento, ChainId } from '@mento-protocol/mento-sdk'
import { parseUnits, formatUnits } from 'viem'

const mento = await Mento.create(ChainId.CELO)
```

---

## Quote: amount out (given amount in)

You have an **amount in** and want to know how much of the other token you will receive:

```typescript
const USDm = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
const CELO = '0x471EcE3750Da237f93B8E339c536989b8978a438'

const amountIn = parseUnits('100', 18)
const expectedOut = await mento.quotes.getAmountOut(USDm, CELO, amountIn)

console.log(`Expected out: ~${formatUnits(expectedOut, 18)} CELO for 100 USDm`)
```

Parameter order is **tokenIn, tokenOut, amountIn**. The SDK resolves the route (including multi-hop if needed) and returns the expected amount out.

---

## Quote: amount in (for exact amount out)

You want a specific **amount out** and need to know how much to send in:

```typescript
const amountOut = parseUnits('1', 18)
const amountInNeeded = await mento.quotes.getAmountIn(USDm, CELO, amountOut)

console.log(`Amount in needed: ~${formatUnits(amountInNeeded, 18)} USDm to get 1 CELO`)
```

Use this when the user specifies “I want exactly X of token B”; then use the returned amount (or a slightly higher value for slippage) as the input for building the swap.

---

## Trading status (optional)

Before quoting or swapping, you can check if the pair is tradable (circuit breaker and trading limits):

```typescript
const isTradable = await mento.trading.isPairTradable(USDm, CELO)
if (!isTradable) {
  console.log('Pair is not tradable (circuit breaker or limits)')
}
```

---

Runnable examples: [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples). Next: [Initiating a swap](initiating-a-swap.md).
