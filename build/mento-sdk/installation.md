# Installation

The Mento SDK v3 requires **Node.js 18+** and **viem** as a peer dependency (ethers.js is no longer used). The package is published in **dual CJS/ESM** format with an exports map for Node and bundlers.

```bash
npm install @mento-protocol/mento-sdk viem
# or
pnpm add @mento-protocol/mento-sdk viem
# or
yarn add @mento-protocol/mento-sdk viem
```

**Peer dependency:** `viem ^2.21.44` (or compatible v2.x). The SDK uses viem for chain config, encoding, and wallet interactions.

---

## Create the client

```typescript
import { Mento, ChainId } from '@mento-protocol/mento-sdk'

// Use default public RPC for the chain
const mento = await Mento.create(ChainId.CELO)

// Or pass a custom RPC URL
const mento = await Mento.create(ChainId.CELO, 'https://your-rpc-url.com')

// Or pass an existing viem PublicClient (e.g. for custom transport or chain)
const mento = await Mento.create(ChainId.CELO, yourPublicClient)
```

---

## What you can do next

| Area | Guides |
|------|--------|
| **Discovery** | [Discovering tokens, pools and routes](guides/getting-exchange-pairs.md) — tokens, pools, routes, trading status |
| **Trading** | [Getting a quote](guides/getting-a-quote.md), [Initiating a swap](guides/initiating-a-swap.md) |
| **Liquidity** | [Liquidity management](guides/liquidity.md) — add/remove liquidity, zap in/out for FPMM pools |
| **Borrow** | [Borrow (CDP)](guides/borrow.md) — open/adjust/close troves, fees, system params |

Runnable examples: [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples).
