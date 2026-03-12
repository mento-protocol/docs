---
description: What is being governed?
---

# Governance Scope

### Overview

Mento Governance controls the following components:

* A suite of **Smart Contracts** deployed on the Celo Mainnet;
* A [**Protocol Reserve**](https://reserve.mento.org/) whose funds are held on Celo, Ethereum, and Bitcoin in a variety of ways:
  * Custodians;
  * Multi-signature wallets;
  * LP tokens of Reserve positions in various liquidity pools;
  * ReserveSpender Multisig rights

### Smart Contracts

The Mento Protocol includes the following upgradeable Smart Contracts (proxies and implementations), which are currently owned by Celo Governance:

* [BiPoolManagerProxy](https://celoscan.io/address/0x22d9db95E6Ae61c104A7B6F6C78D7993B94ec901)
* [BreakerBox](https://celoscan.io/address/0x303ed1df62fa067659b586ebee8de0ece824ab39)
* [BrokerProxy](https://celoscan.io/address/0x777A8255cA72412f0d706dc03C9D1987306B4CaD)
* [MedianDeltaBreaker](https://celoscan.io/address/0x49349F92D2B17d491e42C8fdB02D19f072F9B5D9)
* [ReserveProxy](https://celoscan.io/address/0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9)
* [StableTokenXXXProxy](../build-on-mento/deployments/addresses.md) (one per Mento Stablecoin, i.e. USDm)
* [ValueDeltaBreaker](https://celoscan.io/address/0x4DBC33B3abA78475A5AA4BC7A5B11445d387BF68)

A Celo Governance Proposal to transfer ownership over all the above proxies and their implementations to Mento Governance will be submitted soon.

### Protocol Reserve

Mento Governance will control reserve funds via two mechanisms:

* **The LP positions currently owned by Celo Governance**: Initially, we opted to hold protocol-owned liquidity (POL) in the governance contract for increased transparency and community control, but this proved cumbersome for active maintenance. However, there’s a middle ground. POL holdings will be migrated to a [safeguard mechanism](https://github.com/withtally/safeguard), where **Mento POL multisig is** managed by Mento Labs for agile portfolio management, over which **Mento Governance** will have veto power.
* **The ReserveSpender Multisig** has spending rights over the [**Reserve**](https://reserve.mento.org/). A group of early cLabs and Celo Foundation members currently owns it. This **multisig should be removed from the Reserve during the governance transfer process,** and the **Mento POL multisig** should be added.
