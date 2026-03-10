# Troubleshooting (integrators)

**Who this is for:** Integrators debugging quote/swap failures, SDK or RPC issues, or deployment/verification problems with Mento V3. For **user** issues (getting stables, swap failed in app), see [Use: Troubleshooting](../use/troubleshooting.md).

---

## Swap / quote

| Symptom | Cause | Fix |
|---------|--------|-----|
| Swap reverted | Value protection, trading limits, or circuit breaker | Pool enforces: (1) reserve value at oracle must not decrease after fee, (2) per-token 5-min and 1-day limits not exceeded, (3) oracle valid and breakers not tripped. Check [Trading limits](smart-contracts/tradinglimits.md), [BreakerBox](smart-contracts/breakerbox.md); try smaller amount or later. |
| Quote doesn't match execution | Stale quote or fee | Re-fetch quote immediately before sending tx; ensure you account for pool fee. |
| `getAmountOut` / quote fails | Invalid pair, oracle, or pool state | Verify pool address and that the oracle is valid for that pool; check [Integration](integration/README.md) and [Smart contracts](smart-contracts/README.md). |

---

## SDK and integration

| Symptom | Cause | Fix |
|---------|--------|-----|
| SDK returns wrong network or pairs | v2 Broker vs V3 FPMM | V3 uses **FPMM pools** and pool/router for quotes and swaps, not the legacy Broker. Use SDK/contracts that target FPMM; see [Mento SDK](mento-sdk/README.md) and [Smart contracts](smart-contracts/README.md). |
| RPC or provider errors | Wrong RPC URL or chain | Use a supported chain (e.g. Celo) and a valid RPC endpoint; see [Deployments](deployments/README.md) for addresses. |

---

## Contracts and deployments

| Symptom | Cause | Fix |
|---------|--------|-----|
| Wrong pool or router address | Outdated deployment list | Use [Deployments → Addresses](deployments/addresses.md); verify on block explorer. |
| Verification failed | Source or constructor args | See [Verification](deployments/verification.md). |

---

**More:** [Integration](integration/README.md) · [Smart contracts](smart-contracts/README.md) · [Deployments](deployments/README.md) · [Use: Troubleshooting](../use/troubleshooting.md).
