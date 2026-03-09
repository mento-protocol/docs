# CDP operations

Mento stablecoins backed by a **CDP** (collateralized debt position, Liquity-style) let you **borrow** stablecoins against collateral, **repay** to close or reduce your position, and **provide to the stability pool** to earn rewards. GBPm is the current example; more Mento stables may use the CDP model later.

---

## Borrow

**What it is:** You deposit collateral and open a position to **borrow** the stablecoin (e.g. GBPm). You receive the stablecoin; your position is liquidatable if the collateral ratio falls below the requirement.

**When / where / how:** Use an app or interface that supports the CDP (e.g. GBPm). Connect wallet, deposit collateral, borrow the stable amount. Terms (LTV, liquidation, interest if any) are set by the CDP protocol. See [Reserve & stability](../concepts/reserve-and-stability.md) for how the CDP fits Mento (peg, rebalance).

**More:** [Reserve & stability](../concepts/reserve-and-stability.md), [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md) (CDP as liquidity strategy).

---

## Repay

**What it is:** You return the borrowed stablecoin (and optionally add collateral or withdraw collateral) to **close** or **reduce** your position. Repaying reduces or eliminates liquidation risk for that position.

**Where / how:** Same app or interface as borrow. Select “Repay,” enter amount (and any collateral adjustment), confirm.

---

## Provide to stability pool

**What it is:** You deposit the stablecoin (e.g. GBPm) into the **stability pool**. When liquidations occur, the pool absorbs the collateral; depositors can earn rewards or compensation. There are risks (e.g. exposure to liquidations, pool composition).

**Where / how:** Use the CDP app’s “Stability pool” or “Deposit” flow. Deposit the stable, then withdraw when you want to exit. Check the app for current rewards and risks.

**Risks:** Stability pool value can change with liquidations and protocol parameters. Read the protocol docs and the app’s risk disclaimers.

---

## Other CDP operations

- **Liquidations:** If a position’s collateral ratio falls below the requirement, it can be liquidated; collateral may be used to repay the debt and stability pool depositors may receive collateral. View-only: you can see liquidation conditions in the app.
- **Redemption:** In Liquity-style systems, users can redeem stablecoins for collateral under certain conditions. See the CDP (GBPm) docs for redemption rules.

---

## Scope

**GBPm for now.** More Mento stablecoins will use the CDP model in the future; this page will be updated as they launch.

**Next:** [Getting stables](getting-stables.md) · [Reserve & stability](../concepts/reserve-and-stability.md) · [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md)
