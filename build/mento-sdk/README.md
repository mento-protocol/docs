# Mento SDK

The **Mento SDK** is a TypeScript library for integrating applications with the Mento Protocol. The SDK has been rewritten for **Mento V3**: it is **viem-native**, uses a **service-based API**, and provides first-class support for **FPMM pools** (swaps, liquidity, quotes), **trading status** (circuit breakers, TradingLimitsV2), and **CDP borrowing** (trove management).

**Repository:** [mento-protocol/mento-sdk](https://github.com/mento-protocol/mento-sdk)

**Who this is for:** JavaScript/TypeScript developers who want to discover pools, get quotes, execute swaps, add/remove liquidity, or interact with the CDP (borrow) system without calling the smart contracts directly.

---

## Overview (SDK v3)

| Service | Description |
|--------|-------------|
| **mento.tokens** | Query Mento stable tokens and collateral assets |
| **mento.pools** | Discover and inspect FPMM liquidity pools (pricing, fees, rebalancing state, trading limits) |
| **mento.routes** | Find trading routes (direct and multi-hop) between tokens; uses a route cache by default |
| **mento.quotes** | Get expected swap output amounts (oracle-priced, minus fees) |
| **mento.swap** | Build swap transactions with optional approval steps; execute with any viem wallet client |
| **mento.trading** | Check circuit breaker and trading limit status (is a pair tradable?) |
| **mento.liquidity** | Add/remove liquidity and zap in/out for FPMM pools |
| **mento.borrow** | Open, adjust, and close troves via the Mento CDP system (Liquity v2 fork) |

---

## Quick start

```typescript
import { Mento, ChainId, deadlineFromMinutes } from '@mento-protocol/mento-sdk'
import { parseUnits } from 'viem'

// Default public RPC
const mento = await Mento.create(ChainId.CELO)

// Or with custom RPC
const mento = await Mento.create(ChainId.CELO, 'https://your-rpc-url.com')

// Or with an existing viem PublicClient
const mento = await Mento.create(ChainId.CELO, yourPublicClient)
```

**Supported chains:** Celo Mainnet (`ChainId.CELO`, 42220), Celo Sepolia (`ChainId.CELO_SEPOLIA`, 11142220).

---

## Documentation in this section

* [Installation](installation.md) — Install `@mento-protocol/mento-sdk` and the **viem** peer dependency
* [Guides](guides/README.md) — Step-by-step: exchange pairs/routes, quotes, swaps, and optional liquidity/borrow

**See also:** [Integration](../integration/README.md), [Smart Contracts](../smart-contracts/README.md), [Deployments](../deployments/README.md).
