# Security

Overview of security for Mento v3: how the protocol is protected, audits, and how to verify deployments.

---

## Overview

- **Value protection:** No swap can reduce reserve value at the oracle after fees; reverts otherwise. See [FPMMs](../concepts/fpmm.md).
- **Trading limits:** Per-token netflow caps (5-min, 1-day) limit one-sided flow. See [Limits & breakers](../concepts/limits-and-breakers.md).
- **Rebalance caps:** Rebalance incentive is capped; minimum repayment is enforced so strategies can’t extract unbounded value. Thresholds and boundaries limit gaming. See [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md).
- **Oracle and breakers:** Swaps revert when the oracle is invalid or gated (recency, trading mode, FX hours). See [Oracles](../concepts/oracles.md).

Together these reduce risk from oracle failure, one-sided runs, and rebalance manipulation.

---

## Audits

Mento contracts have been audited by third parties. For the latest:

- **Audit reports:** Link to the current audit reports (e.g. PDFs or audit firm pages). Check the Mento docs or GitHub for the canonical list.
- **Scope:** Audits typically cover core contracts (FPMM, Factory, Router, OracleAdapter, BreakerBox, strategies). Review the reports for scope and findings.

*Insert links to audit reports and dates.*

---

## Verification

- **Contract verification:** Deployed contracts should be verified on the block explorer (e.g. Celo explorer). See [Deployments](../build/deployments.md) for addresses and verification steps.
- **Reproducible builds:** Build from the tagged source (`vendor/mento-core`) and compare with on-chain bytecode where possible.

---

**Next:** [Governance](governance.md) · [Limits & breakers](../concepts/limits-and-breakers.md) · [Build: Deployments](../build/deployments.md)
