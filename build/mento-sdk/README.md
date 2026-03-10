# Mento SDK

The **Mento SDK** is a TypeScript library for integrating applications with the Mento Protocol. **SDK v3** is a complete rewrite for **Mento V3**: service-based design, **viem-native** (no ethers.js), first-class **FPMM pool** support, **liquidity management**, **CDP borrow** (trove operations), enriched **pool details**, and **route caching** for fast quote lookups.

**Repository:** [mento-protocol/mento-sdk](https://github.com/mento-protocol/mento-sdk)

**Who this is for:** JavaScript/TypeScript developers who want to swap, add/remove liquidity, borrow against collateral, discover pools and routes, get quotes, and check trading status—without calling the smart contracts directly.

---

## What’s new in SDK v3

| Capability | Description |
|------------|-------------|
| **Service-based architecture** | Replaces the monolithic `Mento` class with focused services: `pools`, `routes`, `quotes`, `swap`, `liquidity`, `borrow`, `tokens`, `trading`. |
| **viem-native** | Drops ethers.js in favor of **viem** as a peer dependency; use any viem wallet/client for signing and sending transactions. |
| **FPMM pool support** | First-class support for V3 Fixed Product Market Maker pools alongside legacy Virtual (BiPoolManager) pools. |
| **Liquidity management** | Add/remove liquidity and **zap in/out** for FPMM pools (single-token entry/exit with configurable split). |
| **Borrow (CDP)** | **Trove management** via the Mento CDP system: open, close, adjust, repay; predict upfront fees and read system params. |
| **Pool details** | Enriched pool data: pricing, fees, rebalancing state, and trading limits so you can build UIs and risk checks. |
| **Route caching** | Pre-computed route cache for faster quote lookups; optional fresh route generation from the chain. |
| **Dual CJS/ESM** | Proper dual-format package with exports map for Node and bundlers. |
| **Packaging & audit** | Pre-release audit: missing exports, README accuracy, error handling, and packaging best practices addressed. |

---

## Services at a glance

After `Mento.create(ChainId.CELO)` (or custom RPC / viem client), you get a client with these namespaces:

| Service | What you can do |
|--------|------------------|
| **mento.tokens** | List Mento stable tokens and collateral assets. |
| **mento.pools** | Discover and inspect pools (FPMM + legacy). Get addresses, token info, **pricing**, **fees**, **rebalancing state**, and **trading limits**. |
| **mento.routes** | Find trading routes between any two tokens (direct and multi-hop). Use **cached** routes for speed or **fresh** from chain. |
| **mento.quotes** | Get expected swap output (or amount in for exact out). Oracle-priced, fee-adjusted. |
| **mento.swap** | Build swap transactions with optional approval; returns params you send with any viem wallet client. |
| **mento.trading** | Check **circuit breaker** and **trading limit** status: is a pair tradable? Full pool tradability status. |
| **mento.liquidity** | **Add/remove liquidity** to FPMM pools; **zap in** (single token → LP) and **zap out** (LP → single token). Get LP token balance. |
| **mento.borrow** | **Open, adjust, close** troves; **repay**; read trove data and system params; **predict upfront fee** before opening. |

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

* [Installation](installation.md) — Install `@mento-protocol/mento-sdk` and the **viem** peer dependency (Node 18+).
* [Guides](guides/README.md) — Step-by-step: tokens & pools, routes, quotes, swaps, **trading status**, **liquidity**, and **borrow**.

**See also:** [Integration](../integration/README.md), [Smart Contracts](../smart-contracts/README.md), [Deployments](../deployments/README.md).
