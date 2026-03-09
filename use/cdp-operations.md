# CDP operations

**CDP** (collateralized debt position, Liquity-style): **borrow** stablecoins against collateral, **repay** to close/reduce, **stability pool** to earn. GBPm is the current example.

---

## Borrow

**What:** Deposit collateral, open position, **borrow** stablecoin (e.g. GBPm). Position liquidatable if collateral ratio falls below requirement.

**How:** App that supports CDP (e.g. GBPm). Connect wallet → deposit collateral → borrow. Terms (LTV, liquidation, interest): CDP protocol. [Reserve & stability](../concepts/reserve-and-stability.md) (peg, rebalance).

---

## Repay

**What:** Return borrowed stablecoin (and optionally adjust collateral) to **close** or **reduce** position. Cuts liquidation risk.

**How:** Same app, “Repay” → amount (and collateral adjustment) → confirm.

---

## Stability pool

**What:** Deposit stablecoin (e.g. GBPm) into **stability pool**. Liquidations → pool absorbs collateral; depositors can earn rewards. Risks: liquidations, pool composition.

**How:** CDP app “Stability pool” / “Deposit” → deposit → withdraw when exiting. Check app for rewards and risks.

---

## Other

- **Liquidations:** Collateral ratio below requirement → position liquidatable; collateral repays debt, stability pool may receive. View conditions in app.
- **Redemption:** Liquity-style redemption of stablecoins for collateral under protocol rules. See CDP (GBPm) docs.

**Scope:** GBPm for now; more CDP-backed stables later.

**Next:** [Getting stables](getting-stables.md) · [Reserve & stability](../concepts/reserve-and-stability.md) · [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md)
