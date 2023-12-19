---
description: Exchange provider with two-asset virtual automated market maker pools
---

# BiPoolManager

The **BiPoolManager** is an [exchange provider ](exchange-providers.md)that generalizes the [vAMM](bipoolmanager.md#vamm) implementation previously used in Mento v1's Exchanges. It manages asset pools containing a pair of Mento assets, which can be either stable-to-collateral or stable-to-stable. A pool can be configured to use either a constant sum or a constant product pricing function via [pricing modules.](bipoolmanager.md#pricing-modules)

### vAMM

An automated market maker (AMM) is a type of decentralized exchange (DEX) that enables the automatic exchange of digital assets. Typically AMMs rely on user-provided liquidity pools, which hold assets, that can be exchanged in one or more smart contracts. AMMs rely on a specific market-maker function that automatically adjusts the price of assets based on the liquidity pool reserves.

&#x20;Virtual automated market makers (vAMMs) are built on the same concepts as AMMs; however, there is no user-provided liquidity, and the vAMM holds no assets. Virtual automated market makers also employ market-maker functions to determine the price of assets that users can exchange.

### Pricing Modules

A market maker function is a mathematical formula used by AMMs & vAMMs to determine the price of assets in a pool and to determine the levels of available liquidity. Several market maker functions exist, including constant product, constant sum, and constant mean. Mento pricing modules are an abstraction over these market maker functions, allowing Mento exchanges to use any market maker function without changing the underlying code structure.
