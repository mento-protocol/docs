# SDK

Mento SDK: tradable pairs, quote, swap. Code: `vendor/mento-sdk/` (src, scripts). Contract details: [Contracts](contracts.md).

---

## Install

```bash
cd vendor/mento-sdk
yarn install
```

See SDK README for current install/build.

---

## Pairs

SDK exposes pairs (pool addresses, tokens). Scripts or `src/` API; e.g. `vendor/mento-sdk/scripts/` (tradablePairs, poolConfigs).

---

## Quote

Output amount for input amount + token. Pool: oracle rate minus fee. SDK calls Router or `FPMM.getAmountOut`. Example:

```ts
const amountOut = await pool.getAmountOut(amountIn, tokenIn);
```

API: `vendor/mento-sdk/src/`, [Contracts](contracts.md).

---

## Swap

1. Approve Router (or pool) for input token.
2. Call Router swap (e.g. swapExactTokensForTokens).
3. Pool: oracle (minus fee), value protection, limits, transfer out.

Guides: `vendor/mento-sdk/`. Flow: [Contracts](contracts.md).

---

## Next

- [Contracts](contracts.md) · [Deployments](deployments.md)
