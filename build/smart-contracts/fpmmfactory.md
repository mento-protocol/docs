# FPMMFactory

**FPMMFactory** deploys and tracks FPMM pool proxies. Each pool is created via a **proxy** (FPMMProxy) pointing to a registered implementation. The factory stores default parameters (fees, rebalance incentive, thresholds) and enforces caps on deployment defaults; individual pools can later be reconfigured within pool-level limits.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/swap/FPMMFactory.sol`

---

## Interacting with the factory (code examples)

### Finding a pool for a token pair

Tokens are ordered by address. Use `sortTokens` so you pass the pair in the order the factory expects:

```solidity
IFPMMFactory factory = IFPMMFactory(factoryAddress);

(address token0, address token1) = factory.sortTokens(tokenA, tokenB);
address pool = factory.getPool(token0, token1);

if (pool != address(0)) {
    // Pool exists; use it for getAmountOut, swap, etc.
}
```

### Precomputing the pool address (before deployment)

If the pool is not deployed yet, you can compute the proxy address that will be used when the owner deploys it. Useful for integrators that need to show a “future” pool address or for CREATE2-style flows:

```solidity
address poolOrFuture = factory.getOrPrecomputeProxyAddress(token0, token1);
// If pool exists, returns deployed address; else returns precomputed proxy address
```

### Listing all deployed pools

```solidity
address[] memory pools = factory.deployedFPMMAddresses();
for (uint256 i = 0; i < pools.length; i++) {
    address pool = pools[i];
    // Use pool with IFPMM(pool).tokens(), getAmountOut, etc.
}
```

---

## State

| Field | Meaning |
|-------|--------|
| `oracleAdapter` | Default oracle adapter address used when deploying a pool (can be overridden per deployment). |
| `proxyAdmin` | Admin for the FPMM proxy (upgrade authority). |
| `deployedFPMMs[token0][token1]` | Address of the deployed pool for the token pair (tokens sorted by address). |
| `isPool[pool]` | True if the address is a pool deployed by this factory. |
| `deployedFPMMAddresses[]` | List of all deployed pool addresses. |
| `isRegisteredImplementation[impl]` | True if `impl` is an allowed FPMM implementation for deployment. |
| `registeredImplementations[]` | List of registered implementations. |
| `defaultParams` | Default `FPMMParams` (fees, rebalance incentive, thresholds) applied when deploying with factory defaults. |

---

## Token order

- **sortTokens(tokenA, tokenB)** — Returns `(token0, token1)` with `token0 < token1` by address. Reverts if `tokenA == tokenB` or zero. All pool lookups use this order.
- **getPool(token0, token1)** — Returns the pool address for that pair. Caller must pass tokens in the same order as `sortTokens` (or use `getPool` with sorted pair).

---

## Deployment

- **deployFPMM(...)** — `onlyOwner`. Parameters: `fpmmImplementation`, `customOracleAdapter`, `customProxyAdmin`, `customOwner`, `token0`, `token1`, `referenceRateFeedID`, `invertRateFeed`, `customParams`.  
  - Tokens are sorted; pair must not already exist.  
  - Deploys an **FPMMProxy** (CreateX) with the given implementation, then initializes the proxy with the provided oracle adapter, rate feed ID, invert flag, owner, and params.  
  - Registers the new pool in `deployedFPMMs` and `isPool`.

- **getOrPrecomputeProxyAddress(token0, token1)** — Returns the deployed pool address if it exists, otherwise the **precomputed** CreateX address for that pair (so integrators can compute the pool address before deployment).

---

## Default params and caps

`defaultParams` is an `IFPMM.FPMMParams` struct. When setting defaults via **setDefaultParams**:

- `protocolFee + lpFee` ≤ **200** (2% combined).
- `protocolFeeRecipient != address(0)`.
- `rebalanceIncentive` ≤ **100** (1%).
- `rebalanceThresholdAbove` ≤ **10,000** bps.
- `rebalanceThresholdBelow` ≤ **5,000** bps.

Pool-level setters (on FPMM) allow the same threshold caps; the factory only restricts **default** values at deployment.

---

## Admin

| Function | Effect |
|----------|--------|
| `setOracleAdapter(addr)` | Set default oracle adapter. |
| `setProxyAdmin(addr)` | Set proxy admin. |
| `setDefaultParams(params)` | Set default FPMM params (subject to caps above). |
| `registerFPMMImplementation(impl)` | Allow an implementation for deployment. |
| `unregisterFPMMImplementation(impl, index)` | Remove implementation; `index` must match its position in `registeredImplementations`. |

---

## See also

- [FPMM](fpmm.md) — Pool contract.  
- [Deployments](../deployments/README.md) — Addresses and verification.
