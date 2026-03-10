# Troubleshooting (users)

Symptom → cause (one line) → fix. For **integrators** (reverts, SDK, addresses), see [Build: Troubleshooting](../build-on-mento/troubleshooting.md).

---

## Getting stables / swap

| Symptom | Cause | Fix |
|---------|--------|-----|
| I can't get stables | Wrong app or chain | Use the [Mento app](https://app.mento.org/) on a supported chain (e.g. Celo), or see [Getting Mento stables](getting-mento-stables/README.md). |
| Swap failed / reverted | Oracle invalid or trading limit | Oracle may be stale or gated; or the pool's trading limit for that token was hit. Try again later or a smaller amount. See [Build: Troubleshooting](../build-on-mento/troubleshooting.md). |
| I got less than I expected | Fee and/or rate | You get oracle rate **minus fee**. Check pool fee; re-quote right before swapping. |
| Wrong token or pair | Selected wrong asset or pool | Confirm the pair (e.g. USDC/USDm, EUROC/EURm) and that you're on the right network. |

---

## Mint / burn (LP)

| Symptom | Cause | Fix |
|---------|--------|-----|
| Mint failed | Wrong ratio or approval | You must add both tokens in the **current pool ratio**. Approve the Router/pool for both tokens. |
| Can't burn / withdraw | Slippage or approval | Ensure you're burning the correct LP token and have approved the contract if needed. |

---

## CDP (borrow / repay / stability pool)

| Symptom | Cause | Fix |
|---------|--------|-----|
| Can't borrow | Collateral or limits | Check minimum collateral and LTV; ensure you're using a supported CDP app (e.g. GBPm). |
| Position liquidated | Collateral ratio fell below requirement | Repay debt or add collateral to avoid liquidation; see [CDP operations](cdp-operations.md). |
| Stability pool deposit / withdraw issue | App or contract | Use the CDP app's support; for contract reverts see [Build: Troubleshooting](../build-on-mento/troubleshooting.md). |

---

**More help:** [Getting Mento stables](getting-mento-stables/README.md) · [Swap & liquidity](swap-and-liquidity.md) · [CDP operations](cdp-operations.md) · [Build: Troubleshooting](../build-on-mento/troubleshooting.md) (integrators).
