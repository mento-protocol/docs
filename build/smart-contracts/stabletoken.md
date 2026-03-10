# StableToken

**StableToken** contracts implement the ERC-20 Mento stable assets (USDm, EURm, GBPm, etc.). Each stable has its own implementation or proxy (e.g. **StableTokenV2** / **StableTokenV3** in mento-core). In **Mento V3**, Reserve-backed stables (USDm, EURm) are minted and burned by the **ReserveLiquidityStrategy** when FPMM pools rebalance; CDP-backed stables (e.g. GBPm) are minted via the Liquity v2–style CDP system.

**Contracts:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/tokens/` (e.g. StableTokenV2.sol, StableTokenV3.sol, and per-currency proxies).
