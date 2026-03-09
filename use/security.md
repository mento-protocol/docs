# Security

How v3 is protected, audits, verification.

---

## Protections

- **Value protection:** Reserve value at oracle cannot decrease after fees; else revert. [FPMMs](../concepts/fpmm.md).
- **Trading limits:** Per-token netflow caps (5-min, 1-day). [Limits & breakers](../concepts/limits-and-breakers.md).
- **Rebalance caps:** Incentive capped; minimum repayment enforced; thresholds and boundaries limit gaming. [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md).
- **Oracle and breakers:** Invalid or gated (recency, trading mode, FX hours) → revert. [Oracles](../concepts/oracles.md).

Together: oracle failure, one-sided runs, rebalance manipulation are bounded.

---

## Audits

Third-party audits. Latest:

- **Reports:** Mento docs or GitHub for current audit reports (PDFs, firm pages).
- **Scope:** Typically FPMM, Factory, Router, oracle adapter, BreakerBox, strategies. Check reports for scope and findings.

---

## Verification

- **Contract verification:** Verify on block explorer. [Deployments](../build/deployments.md).
- **Builds:** Build from tagged source (`vendor/mento-core`); compare bytecode where possible.

**Next:** [Governance](governance.md) · [Limits & breakers](../concepts/limits-and-breakers.md) · [Deployments](../build/deployments.md)
