# Reserve

**Reserve** stores and manages ERC-20 collateral backing **Reserve-backed Mento stables** (USDm, EURm) on supported chains (e.g. Celo). The Reserve holds the fiat-backed assets (e.g. USDC, USDT, EUROC) that back circulating supply. In V3, the **ReserveLiquidityStrategy** is allowlisted on FPMM pools that pair USDm or EURm with those external stables; when a pool rebalances, the strategy mints or burns the Mento stable and moves collateral via the Reserve.

For the protocol role of the Reserve, see [The Reserve](../../dive-deeper/the-reserve.md).

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/swap/Reserve.sol`
