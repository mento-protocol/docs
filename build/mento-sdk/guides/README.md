# Mento SDK guides

These guides show how to use the **Mento SDK v3** for Mento V3: FPMM pools, oracles, route caching, liquidity, and CDP borrowing. The SDK is **service-based**: after `Mento.create(ChainId.CELO)` you use `mento.tokens`, `mento.pools`, `mento.routes`, `mento.quotes`, `mento.swap`, `mento.trading`, `mento.liquidity`, and `mento.borrow`.

---

## Discovery & trading status

| Guide | What you’ll do |
|-------|----------------|
| [Getting exchange pairs and routes](getting-exchange-pairs.md) | Discover tokens, **pools** (with pricing, fees, rebalancing, limits), **routes** (cached or fresh), and **trading status** (circuit breaker, limits). |
| [Getting a quote](getting-a-quote.md) | Get expected swap output with `mento.quotes.getAmountOut` (or amount in for exact out). |
| [Initiating a swap](initiating-a-swap.md) | Build swap and approval transactions with `mento.swap.buildSwapTransaction` and send with a viem wallet. |

---

## Liquidity (FPMM pools)

| Guide | What you’ll do |
|-------|----------------|
| [Liquidity management](liquidity.md) | **Add/remove liquidity** to FPMM pools; **zap in** (single token → LP) and **zap out** (LP → single token); get LP token balance. |

---

## Borrow (CDP)

| Guide | What you’ll do |
|-------|----------------|
| [Borrow (CDP)](borrow.md) | **Open, adjust, close** troves; read trove data and system params; **predict upfront fee** before opening; build transactions for your viem wallet. |

---

All guides assume you have created a client as in [Installation](../installation.md). For runnable code, see [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples).
