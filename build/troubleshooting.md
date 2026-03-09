# Troubleshooting (integrators)

Symptom → cause (one line) → fix. For **user**-facing issues (e.g. “I can’t get stables”), see [Use: Troubleshooting](../use/troubleshooting.md).

---

## Swap / quote

| Symptom | Cause | Fix |
|---------|--------|-----|
| Swap reverts | Oracle invalid or stale | Ensure oracle is valid (recency, trading mode, FX hours). Check BreakerBox. |
| Swap reverts | Trading limit exceeded | Netflow for that token over the window is at cap. Wait or use a smaller amount. |
| Swap reverts | Value protection | Reserve value at oracle would decrease after fee. Check amounts and fee config. |
| Quote doesn’t match execution | Rate or fee changed between quote and tx | Quote is at current oracle; re-quote close to execution. |
| Wrong output amount | Wrong token order or wrong pool | Use Router or sort tokens (token0 < token1 by address). Confirm pool address from [Deployments](deployments.md). |

---

## Addresses and config

| Symptom | Cause | Fix |
|---------|--------|-----|
| Wrong pool or “pool not found” | Stale or wrong address | Use [Deployments](deployments.md); re-check parameters notes and deployment output. |
| Contract not verified | Deployment not verified on explorer | Run verification for that chain (see [Deployments](deployments.md)). |
| SDK returns wrong pair list | Cached or wrong chain | Refresh pool config; ensure chain ID and deployment addresses match. |

---

## Rebalance and strategies

| Symptom | Cause | Fix |
|---------|--------|-----|
| Rebalance reverts | Strategy not allowlisted | Only allowlisted strategies can call rebalance. |
| Rebalance reverts | Deviation below threshold / direction or boundary violated | Pool enforces threshold, direction, no overshoot, min repayment. Check rebalancing state. |

---

For concept-level questions (what is value protection? what are trading limits?), see [Concepts](../concepts/fpmm.md) and [Limits & breakers](../concepts/limits-and-breakers.md).
