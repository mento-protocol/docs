# Router

The **Router** provides a convenience layer for **quoting** and **executing** swaps across Mento FPMM pools. It uses a **FactoryRegistry** to resolve which factory owns a given pair and supports **multihop** routes (e.g. A → B → C) by chaining `getAmountOut` on each pool. The router is a fork of Aerodrome/Velodrome’s Router, adapted for Mento.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/swap/router/Router.sol`

---

## Interacting with the Router (code examples)

Use the Router when you want a single contract to handle token transfers and pool calls. **Approve the router** to spend the input token(s) before calling swap. For discovery and quoting from off-chain or JS, the [Mento SDK](../mento-sdk/README.md) is often simpler.

### Getting the pool for a pair

```solidity
IRouter router = IRouter(routerAddress);
address pool = router.poolFor(tokenA, tokenB, address(0));
// address(0) for factory means use router.defaultFactory()
```

### Quoting a single-hop swap

```solidity
IRouter.Route[] memory routes = new IRouter.Route[](1);
routes[0] = IRouter.Route({
    from: usdc,      // token in
    to: usdm,        // token out
    factory: address(0)
});

uint256[] memory amounts = router.getAmountsOut(amountIn, routes);
// amounts[0] == amountIn, amounts[1] == expected amount out (at oracle rate minus fee)
```

### Quoting a multihop swap

Chain two or more pools. Each step’s output is the next step’s input:

```solidity
IRouter.Route[] memory routes = new IRouter.Route[](2);
routes[0] = IRouter.Route({ from: tokenA, to: tokenB, factory: address(0) });
routes[1] = IRouter.Route({ from: tokenB, to: tokenC, factory: address(0) });

uint256[] memory amounts = router.getAmountsOut(amountIn, routes);
// amounts[0] = amountIn, amounts[1] = amount after first hop, amounts[2] = final amount out
```

### Executing a swap (exact input)

User sends `amountIn` of the first token and receives at least `amountOutMin` of the last token (slippage protection). Reverts if the pool oracle is invalid or trading limits are hit.

```solidity
IERC20(usdc).approve(routerAddress, amountIn);

uint256[] memory amounts = router.swapExactTokensForTokens(
    amountIn,
    amountOutMin,   // e.g. (expectedOut * 99) / 100
    routes,
    msg.sender,     // recipient of output tokens
    block.timestamp + 300  // deadline
);
```

### Adding liquidity

Quote first with `quoteAddLiquidity`, then add. You must approve the router for both tokens:

```solidity
(uint256 amountA, uint256 amountB, uint256 liquidity) = router.quoteAddLiquidity(
    tokenA, tokenB, address(0), amountADesired, amountBDesired
);

IERC20(tokenA).approve(routerAddress, amountA);
IERC20(tokenB).approve(routerAddress, amountB);

(,, liquidity) = router.addLiquidity(
    tokenA, tokenB,
    amountADesired, amountBDesired,
    amountAMin, amountBMin,
    msg.sender,
    block.timestamp + 300
);
```

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
