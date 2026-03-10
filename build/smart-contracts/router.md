# Router

The **Router** provides a convenience layer for **quoting** and **executing** swaps across Mento FPMM pools. It uses a **FactoryRegistry** to resolve which factory owns a given pair and supports **multihop** routes (e.g. A → B → C) by chaining `getAmountOut` on each pool. The router is a fork of Aerodrome/Velodrome’s Router, adapted for Mento.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/swap/router/Router.sol`

---

## Immutable configuration

- **factoryRegistry** — Contract that maps (tokenA, tokenB) or factory to an approved pool factory. Used to ensure the pool comes from an approved factory.
- **defaultFactory** — Factory used when a route does not specify a custom factory (e.g. the Mento FPMMFactory).

---

## Token order

- **sortTokens(tokenA, tokenB)** — Returns `(token0, token1)` with `token0 < token1` by address. Reverts if same address or zero. Matches the FPMM pool’s token order.

---

## Pool resolution

- **poolFor(tokenA, tokenB, factory)** — Returns the pool address for the pair. If `factory` is `address(0)`, uses `defaultFactory`. Reverts if the factory is not approved in `factoryRegistry` (`PoolFactoryDoesNotExist`). The pool address is obtained via `IRPoolFactory(factory).getOrPrecomputeProxyAddress(tokenA, tokenB)`.

---

## Quoting

- **getAmountsOut(amountIn, routes)** — Given an initial `amountIn` and an array of **Route** structs (each has `from`, `to`, and optional `factory`), returns an array of amounts: `amounts[0] = amountIn`, then for each route `amounts[i+1] = pool.getAmountOut(amounts[i], routes[i].from)`. So each step uses the **oracle-priced** quote from the FPMM. Reverts if the path is invalid or a pool does not exist.

- **getReserves(tokenA, tokenB, factory)** — Returns reserve amounts for the pair (in the order tokenA, tokenB) from the pool’s `getReserves()`.

---

## Swap execution

The router’s swap functions (e.g. `swapExactTokensForTokens`, `swapTokensForExactTokens`, and variants with deadline) encode the user’s intent and then:

1. Resolve the pool(s) via `poolFor` (and optionally multihop routes).
2. Transfer tokens from the user to the pool (or to the router then to the pool).
3. Call the pool’s **swap(amount0Out, amount1Out, to, data)** with output amounts. For a single-hop swap, the output amount is computed from `getAmountOut`; the user must have approved the router (or the pool) to pull the input amount.
4. Enforce a **deadline** (e.g. `block.timestamp <= deadline`) when the function uses the `ensure(deadline)` modifier.

Exact signatures and encoding depend on the router interface (e.g. `IRouter`). The important point for integrators: the pool’s **swap** is output-specified and uses a callback only when `data.length > 0`; the router typically uses the callback to supply the input tokens in the same transaction.

---

## Add / remove liquidity

- **quoteAddLiquidity(...)** — View that returns suggested `amountA`, `amountB`, and `liquidity` for adding liquidity to a pool (at current reserve ratio for existing pools, or arbitrary for new pools).
- **addLiquidity**, **removeLiquidity** (and variants) — Execute mint or burn on the pool after transferring tokens or LP shares. Exact parameters (e.g. min amounts, deadline) are on the interface.

---

## See also

- [FPMM](fpmm.md) — Pool’s `getAmountOut` and `swap`.  
- [FPMMFactory](fpmmfactory.md) — `getPool` and `getOrPrecomputeProxyAddress`.  
- [Mento SDK](../mento-sdk/README.md) — JS/TS integration and quoting.
