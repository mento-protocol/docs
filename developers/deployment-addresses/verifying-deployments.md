---
description: How to check the validity of a Mento deployment
---

# Verifying deployments

We've built a handy tool to verify that the on-chain bytecode of deployed Mento contracts matches what has been audited. This is a bit technical and requires at least some knowledge of the stack used for smart contract development and how to use the terminal.

Before you get started make sure you have installed: git, [foundry](https://book.getfoundry.sh/getting-started/installation), node, and yarn.

1. Clone the [mento-deployments](https://github.com/mento-protocol/mento-deployment)
2. Run `forge install`
3. Run `yarn verifyBytecodes -n <network> -u <upgrade> -c <commit or tag>`

For the `verifyBytecodes` command, you need to pick three parameters as follows:

* `network` one of `baklava`, `alfajores` or `celo`
* `upgrade`  currently only `MU01` exists which upgrades mento from v1.0 to v2.0
* `commit or tag` what version of the source files to check against, this should come from the [audit report](../../audits/audit-reports.md) associated with the upgrade.

For example, if we want to verify on Celo mainnet we would run this command:

```
$ yarn verifyBytecodes -n celo -u MU01 -c v2.0.0
```

<figure><img src="../../.gitbook/assets/download.gif" alt=""><figcaption></figcaption></figure>

#### Verification script (verifying the verifier)

In order to trust the results, you also have to trust the verification script. Luckily it's short enough to be able to read comfortably. You can find it here:

{% embed url="https://github.com/mento-protocol/mento-deployment/blob/main/bin/verifyBytecodes.ts" %}
Link to verification script
{% endembed %}

The script flow is the following:

1. Check out `lib/mento-core` at the supplied commit
2. Clean and recompile all contracts
3. Find deployed contracts by looking at the [broadcast folders](#user-content-fn-1)[^1] related to the upgrade
4. Compare the bytecode found on-chain for a deployed contract with the local compilation results
5. Print a pretty table.

[^1]: This is where Foundry stores the artifacts of on-chain operations done via scripts. We commit all relevant runs to the repository and use them to reconstruct the state of the system.
