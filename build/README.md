# Integration guide

For **integrators:** quote, swap, call contracts, deploy. All paths assume Mento v3 (FPMM, oracle adapter, BreakerBox, trading limits).

---

## What to read

| Goal | Page |
|------|------|
| How pieces fit | [Architecture](architecture.md) |
| Contract roles | [Contracts](contracts.md) |
| SDK: install, quote, swap | [SDK](sdk.md) |
| Addresses, parameters | [Deployments](deployments.md) |
| Reverts, failures | [Troubleshooting](troubleshooting.md) |

---

## Quick flow

1. **Quote:** Router or `FPMM.getAmountOut` (oracle rate minus fee). [SDK](sdk.md), [Contracts](contracts.md).
2. **Swap:** Router or direct pool; input in, output out. Value protection + limits apply; invalid oracle or over limit → revert.
3. **Addresses:** [Deployments](deployments.md) per chain/pool. Re-check vs repo (`vendor/mento-core`, parameters notes).
4. **Stuck:** [Troubleshooting](troubleshooting.md).

Concepts: [FPMMs](../concepts/fpmm.md), oracles, rebalancing.
