# Troubleshooting (users)

Symptom → cause (one line) → fix. For **integrators** (reverts, SDK, addresses), see [Build: Troubleshooting](../build/troubleshooting.md).

---

## Getting stables / swap

| Symptom | Cause | Fix |
|---------|--------|-----|
| I can’t get stables | Wrong app or chain | Use an app that supports Mento v3 on your chain; see [Getting stables](getting-stables.md). |
| Swap failed / reverted | Oracle invalid or trading limit | Oracle may be stale or gated; or the pool’s trading limit for that token was hit. Try again later or smaller amount. See [Build: Troubleshooting](../build/troubleshooting.md). |
| I got less than I expected | Fee and/or rate | You get oracle rate **minus fee**. Check pool fee; re-quote right before swapping. |
| Wrong token or pair | Selected wrong asset or pool | Confirm the pair (e.g. CELO/cUSD) and that you’re on the right network. |

---

## Mint / burn (LP)

| Symptom | Cause | Fix |
|---------|--------|-----|
| Mint failed | Wrong ratio or approval | You must add both tokens in the **current pool ratio**. Approve the Router/pool for both tokens. |
| Can’t burn / withdraw | Slippage or approval | Ensure you’re burning the correct LP token and have approved the contract if needed. |

---

## CDP (borrow / repay / stability pool)

| Symptom | Cause | Fix |
|---------|--------|-----|
| Can’t borrow | Collateral or limits | Check minimum collateral and LTV; ensure you’re using a supported CDP app (e.g. GBPm). |
| Position liquidated | Collateral ratio fell below requirement | Repay debt or add collateral to avoid liquidation; see [CDP operations → Repay](cdp-operations.md#repay). |
| Stability pool deposit / withdraw issue | App or contract | Use the CDP app’s support; for contract reverts see [Build: Troubleshooting](../build/troubleshooting.md). |

---

**More help:** [Getting stables](getting-stables.md) · [FPMM operations](fpmm-operations.md) · [CDP operations](cdp-operations.md) · [Build: Troubleshooting](../build/troubleshooting.md) (integrators).
