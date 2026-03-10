# Getting exchange pairs and routes

This guide shows how to use the Mento SDK v3 to discover tradable tokens, FPMM pools, and routes between token pairs. The SDK uses a **route cache** by default for fast lookups; you can also fetch fresh data from the chain.

---

## Create the client

```typescript
import { Mento, ChainId } from '@mento-protocol/mento-sdk'

// Celo Mainnet (use ChainId.CELO_SEPOLIA for testnet)
const mento = await Mento.create(ChainId.CELO)
```

---

## Tokens

Get Mento stable tokens and collateral assets:

```typescript
const stableTokens = await mento.tokens.getStableTokens()
const collateral = await mento.tokens.getCollateralAssets()
```

---

## Pools

List all pools (FPMM and legacy Virtual/BiPoolManager):

```typescript
const pools = await mento.pools.getPools()
```

Each pool includes addresses, token info, pricing, fees, rebalancing state, and trading limits. Use these when you need full pool details rather than just a path between two tokens.

---

## Routes

Find a **route** between two tokens (for quoting and swapping):

```typescript
const USDm = '0x765DE816845861e75A25fCA122bb6898B8B1282a'
const CELO = '0x471EcE3750Da237f93B8E339c536989b8978a438'

const route = await mento.routes.findRoute(USDm, CELO)
console.log(`Hops: ${route.path.length}`)
```

Get **all tradable routes** (from the pre-generated cache by default):

```typescript
const routes = await mento.routes.getRoutes()
```

Force a **fresh** route set from the blockchain:

```typescript
const freshRoutes = await mento.routes.getRoutes({ cached: false })
```

---

## Trading status

Check whether a pair is tradable (circuit breaker and trading limits):

```typescript
const isTradable = await mento.trading.isPairTradable(USDm, CELO)
```

For a specific pool, get full tradability status:

```typescript
const pools = await mento.pools.getPools()
const status = await mento.trading.getPoolTradabilityStatus(pools[0])

if (!status.circuitBreakerOk) {
  console.log('Trading suspended by circuit breaker')
} else if (!status.limitsOk) {
  console.log('Trading limit reached')
}
```

---

Runnable examples: [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples).
