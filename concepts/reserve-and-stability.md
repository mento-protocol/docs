# Reserve & stability

The **Reserve** backs stablecoins like cUSD and EURm: it holds assets and supplies liquidity to FPMM pools via rebalancing. **Stability** is how the peg is maintained—redemption and (for GBPm) the CDP (collateralized debt position) and stability pool.

---

## The Reserve

The Reserve is the protocol’s asset reserve. It:

- Holds collateral and stablecoin inventory.
- Acts as a **liquidity strategy** for FPMM pools: when a pool rebalances, it sends one token to the Reserve and receives the other. So the Reserve “refills” the pool on the other side.
- Supports **redemption**: users can redeem stablecoins for collateral (or the other asset) according to protocol rules, which helps keep the peg.

Reserve-backed stablecoins (e.g. cUSD, EURm) use this flow. For how rebalancing works, see [Rebalancing & strategies](rebalancing-and-strategies.md).

---

## How the peg is maintained

- **Redemption:** Users can redeem stablecoins for the underlying asset(s). Demand for redemption when the peg is below par, and supply when above, pushes the peg back.
- **CDP (e.g. GBPm):** GBPm uses a Liquity-style CDP. Users **borrow** GBPm against collateral; they **repay** to close positions. A **stability pool** absorbs liquidations and rewards depositors. The CDP is also a liquidity strategy for the GBPm pool (rebalance flow). So the peg is maintained by collateralization, liquidation, redemption, and the stability pool, not only by the Reserve.

More Mento stablecoins may use the CDP model in the future. For user-facing operations (borrow, repay, stability pool), see [CDP operations](../use/cdp-operations.md).

---

## Next

- [Rebalancing & strategies](rebalancing-and-strategies.md) — How the Reserve and CDP interact with pools.
- [FPMMs](fpmm.md) — Value per share, rebalance at oracle.
