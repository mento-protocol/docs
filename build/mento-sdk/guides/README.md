# Mento SDK guides

These guides show how to use the **Mento SDK v3** for common tasks against Mento V3 (FPMM pools, oracles, and CDP). The SDK is service-based: you use `mento.tokens`, `mento.pools`, `mento.routes`, `mento.quotes`, `mento.swap`, `mento.trading`, `mento.liquidity`, and `mento.borrow` after creating a client with `Mento.create(ChainId.CELO)` (or with a custom RPC or viem client).

| Guide | What you’ll do |
|-------|----------------|
| [Getting exchange pairs](getting-exchange-pairs.md) | Discover tradable tokens, pools, and routes (FPMM pools and route cache) |
| [Getting a quote](getting-a-quote.md) | Get expected swap output with `mento.quotes.getAmountOut` |
| [Initiating a swap](initiating-a-swap.md) | Build swap and approval transactions with `mento.swap.buildSwapTransaction` and send with a viem wallet |

**Other SDK capabilities** (see the [SDK README](../README.md) and [GitHub](https://github.com/mento-protocol/mento-sdk)):

* **Trading status** — `mento.trading.isPairTradable(tokenA, tokenB)`, `mento.trading.getPoolTradabilityStatus(pool)` (circuit breaker and trading limits)
* **Liquidity** — `mento.liquidity.buildAddLiquidityTransaction`, `buildZapInTransaction`, `getLPTokenBalance`
* **Borrow (CDP)** — `mento.borrow.buildOpenTroveTransaction`, `getTroveData`, `getSystemParams`, and other trove operations
