# SDK

Use the Mento SDK to get tradable pairs, get a quote, and run a swap. Code lives in `vendor/mento-sdk/` (src, scripts). This page is a short guide; for contract details see [Contracts](contracts.md).

---

## Install

From the repo (or published package if available):

```bash
# If using from monorepo
cd vendor/mento-sdk
yarn install
```

Check the SDK README for the current install and build steps.

---

## Get pairs

The SDK exposes tradable pairs (pool addresses, tokens). Use the scripts or the exported API in `src/` to list pairs for a chain. See `vendor/mento-sdk/scripts/` (e.g. tradablePairs, poolConfigs).

---

## Get a quote

Quote = output amount for a given input amount and token. The pool uses the **oracle rate** (minus fee); the SDK typically calls the Router or `FPMM.getAmountOut`. Example shape (adapt to actual SDK):

```ts
// Pseudocode: get quote for swapping amountIn of tokenIn
const amountOut = await pool.getAmountOut(amountIn, tokenIn);
```

Exact API: see `vendor/mento-sdk/src/` and [Contracts](contracts.md) (FPMM.getAmountOut).

---

## Run a swap

1. User (or relayer) approves the Router or pool for the input token.
2. Call Router swap (e.g. swapExactTokensForTokens or the variant used by the SDK).
3. Router routes to the pool; pool executes at oracle (minus fee), applies value protection and trading limits, transfers output to user.

See SDK guides in `vendor/mento-sdk/` (e.g. initiating-a-swap) and [Contracts](contracts.md) for the swap flow.

---

## Next

- [Contracts](contracts.md) — FPMM, Router, quote and swap flow.
- [Deployments](deployments.md) — Addresses and parameters per chain.
