# Integration guide

This section is for **integrators**: you want to quote swaps, run swaps, call contracts, or deploy. All paths below assume Mento v3 (FPMM pools, oracle adapter, BreakerBox, trading limits).

---

## What to read next

| Goal | Page |
|------|------|
| See how pieces fit together | [Architecture](architecture.md) |
| Contract roles and references | [Contracts](contracts.md) |
| Install SDK, get pairs, quote, swap | [SDK](sdk.md) |
| Addresses, parameters, verification | [Deployments](deployments.md) |
| Reverts, quote/swap failures, wrong addresses | [Troubleshooting](troubleshooting.md) |

---

## Quick flow for integrators

1. **Quote:** Use the Router or `FPMM.getAmountOut` with the oracle rate (minus fee). See [SDK](sdk.md) and [Contracts](contracts.md).
2. **Swap:** Router or direct pool call; user (or relayer) provides the input token and receives the output token. Value protection and trading limits apply; invalid oracle or exceeded limit ⇒ revert.
3. **Addresses:** [Deployments](deployments.md) — per chain and pool. Re-check against the repo (e.g. `vendor/mento-core`, parameters notes).
4. **Stuck?** [Troubleshooting](troubleshooting.md) — symptom → cause → fix for integrators.

For **concepts** (what an FPMM is, oracles, rebalancing), start with [Concepts](../concepts/fpmm.md).
