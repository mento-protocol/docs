# Initiating a swap

This guide shows how to **build and send a swap** with the Mento SDK v3. The SDK returns transaction parameters (including an approval transaction if needed); you submit them with any **viem** wallet client.

---

## Create the client and get a quote

Read-only operations (quotes, routes) only need a **public client**. For building swap transactions you still use `Mento.create`; the SDK returns **transaction parameters** that you send with your own wallet:

```typescript
import { Mento, ChainId, deadlineFromMinutes } from '@mento-protocol/mento-sdk'
import { parseUnits } from 'viem'

const mento = await Mento.create(ChainId.CELO)

const USDm = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
const CELO = '0x471EcE3750Da237f93B8E339c536989b8978a438'
const amountIn = parseUnits('100', 18)

const expectedOut = await mento.quotes.getAmountOut(USDm, CELO, amountIn)
```

---

## Build swap transaction (approval + swap)

`buildSwapTransaction` returns both an **approval** (if the token needs an allowance) and the **swap** transaction. All public APIs use **object-based parameters**:

```typescript
const recipientAddress = '0x...'  // address that receives the output tokens
const ownerAddress = '0x...'     // address that holds tokenIn and signs the tx

const { approval, swap } = await mento.swap.buildSwapTransaction(
  USDm,
  CELO,
  amountIn,
  recipientAddress,
  ownerAddress,
  {
    slippageTolerance: 0.5,           // 0.5%
    deadline: deadlineFromMinutes(5),
  }
)
```

* **slippageTolerance** — percentage (e.g. `0.5` = 0.5%). The SDK caps this (e.g. at 50%) to reduce sandwich risk.
* **deadline** — use `deadlineFromMinutes(minutes)` or pass a Unix timestamp.

---

## Send with a viem wallet client

Execute the approval first (if present), then the swap:

```typescript
import { createWalletClient, custom } from 'viem'
import { celo } from 'viem/chains'

const walletClient = createWalletClient({
  chain: celo,
  transport: custom(window.ethereum),
})

if (approval) {
  await walletClient.sendTransaction(approval)
}
await walletClient.sendTransaction(swap.params)
```

The SDK returns **transaction request** objects; you are responsible for sending them and handling receipts (e.g. waiting for confirmation).

---

## Summary

1. **Quote** — `mento.quotes.getAmountOut(tokenIn, tokenOut, amountIn)` (or `getAmountIn` for exact amount out).
2. **Build** — `mento.swap.buildSwapTransaction(tokenIn, tokenOut, amountIn, recipient, owner, { slippageTolerance, deadline })`.
3. **Send** — If `approval` is set, send it first; then send `swap.params` with your viem wallet client.

Runnable examples: [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples).
