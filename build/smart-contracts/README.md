# Smart Contracts

**These docs describe Mento v3.** The Mento protocol consists of a set of smart contracts deployed on supported chains (e.g. [Celo](https://celo.org/)).

## Mento v3: FPMM-based exchange

In v3, the main exchange is built from **FPMM** (Fixed-Price Market Maker) pools:

- **FPMM** — Each pool holds two tokens and executes swaps at the **oracle** rate (minus fee). No reserve-based curve; value per LP share at the oracle is preserved.
- **FPMMFactory** / **FPMMProxy** — Deploy and manage FPMM pool instances.
- **OracleAdapter** — Supplies the pool with a valid oracle rate; combines price feed, recency, and **BreakerBox** (trading mode, circuit breakers).
- **BreakerBox** — Monitors feeds and can halt trading (oracle returns invalid) when breakers trip.
- **LiquidityStrategy**, **ReserveLiquidityStrategy**, **CDPLiquidityStrategy** — Allowlisted contracts that can call a pool’s rebalance function; they source the other token (from Reserve, CDP stability pool, or elsewhere).
- **TradingLimitsV2** — Enforces per-token net-flow caps over 5-minute and 1-day windows.
- **Router** — Convenience for quoting (`getAmountsOut`) and executing swaps across pools.

Other contracts (e.g. **StableToken**, **Reserve**, **SortedOracles**) still exist where used by v3 (e.g. Reserve for ReserveLiquidityStrategy). **Broker**, **BiPoolManager**, and v2 **pricing modules** are legacy (v2); see legacy docs and the [whitepaper](https://github.com/mento-protocol/whitepaper).

## Repository and reference

Mento Core is the set of smart contracts that enable creating, exchanging, and contributing to Mento stable currencies. In v3, FPMM pools and the above components are the primary exchange layer.

The contracts can be found in the [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) GitHub repository:

Here you will find everything from an overview to a detailed technical reference.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2023-12-12 at 14.37.20.png" alt=""><figcaption><p>Mento Smart Contracts</p></figcaption></figure>

