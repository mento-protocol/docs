# Reserve & stability

**Reserve:** backs USDm, EURm; holds assets; supplies liquidity to FPMM pools via rebalancing. **Stability:** how the **peg** (target price, e.g. 1 USD per USDm) is kept—redemption and (for GBPm) CDP + stability pool.

---

## The Reserve

- Holds collateral and stablecoin inventory.
- **Liquidity strategy** for FPMM pools: on rebalance, receives one token from pool, returns the other (“refills” the other side).
- **Redemption:** users redeem stablecoins for collateral/other asset per protocol rules; supports the peg.

Reserve-backed: USDm, EURm. Rebalance flow: [Rebalancing & strategies](rebalancing-and-strategies.md).

---

## How the peg is maintained

- **Redemption:** Redeem stablecoins for underlying. Demand rises when peg below par, supply when above → peg moves back.
- **CDP (e.g. GBPm):** Liquity-style. Users **borrow** GBPm against collateral; **repay** to close. **Stability pool** absorbs liquidations, rewards depositors. CDP is also liquidity strategy for GBPm pool. Peg maintained by collateralization, liquidation, redemption, stability pool.

User ops (borrow, repay, stability pool): [CDP operations](../use/cdp-operations.md).

---

## Next

- [Rebalancing & strategies](rebalancing-and-strategies.md) — Reserve, CDP, pools.
- [FPMMs](fpmm.md) — Value per share, rebalance at oracle.
