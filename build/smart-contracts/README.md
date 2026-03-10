# Smart Contracts

**Who this is for:** Integrators and auditors who need the contract layout and behavior of Mento V3 (FPMM pools, oracles, limits, strategies). The Mento protocol consists of a set of smart contracts deployed on supported chains (e.g. [Celo](https://celo.org/)).

**See also:** [Integration](../integration/README.md) — integration paths; [Mento SDK](../mento-sdk/README.md) — JS/TS library; [Deployments](../deployments/README.md) — addresses and verification.

## Mento V3: FPMM-based exchange

In V3, the main exchange is built from **FPMM** (Fixed-Price Market Maker) pools:

- **FPMM** — Each pool holds two tokens and executes swaps at the **oracle** rate (minus fee). No reserve-based curve; value per LP share at the oracle is preserved.
- **FPMMFactory** / **FPMMProxy** — Deploy and manage FPMM pool instances.
- **OracleAdapter** — Supplies the pool with a valid oracle rate; combines price feed, recency, and **BreakerBox** (trading mode, circuit breakers).
- **BreakerBox** — Monitors feeds and can halt trading (oracle returns invalid) when breakers trip.
- **LiquidityStrategy**, **ReserveLiquidityStrategy**, **CDPLiquidityStrategy** — Allowlisted contracts that can call a pool’s rebalance function; they source the other token (from Reserve, CDP stability pool, or elsewhere).
- **TradingLimitsV2** — Enforces per-token net-flow caps over 5-minute and 1-day windows.
- **Router** — Convenience for quoting (`getAmountsOut`) and executing swaps across pools.

Other contracts used by V3 include **StableToken** (minting and burning Reserve-backed stables such as USDm and EURm) and **Reserve** (collateral backing and used by ReserveLiquidityStrategy for rebalancing). **Broker**, **BiPoolManager**, **SortedOracles**, and v2 **pricing modules** are legacy (V2) and not used by the FPMM exchange layer.

## Repository and reference

Mento Core is the set of smart contracts that enable creating, exchanging, and contributing to Mento stable currencies. In V3, FPMM pools and the above components are the primary exchange layer.

The contracts can be found in the [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) GitHub repository:

Here you will find everything from an overview to a detailed technical reference.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2023-12-12 at 14.37.20.png" alt=""><figcaption><p>Mento Smart Contracts</p></figcaption></figure>

