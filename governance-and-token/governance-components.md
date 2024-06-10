# Governance Components

Mento on-chain governance consists of the components visualized in the architecture diagram below:

<figure><img src="../.gitbook/assets/Mento Governance (2).png" alt=""><figcaption><p>Mento Governance at a glance</p></figcaption></figure>

### [Emission Contract](https://celoscan.io/address/0x5C789592E2611df1873b46D394c69f75faB99778)

A contract that emits MENTO tokens from its initial 40% allocation to the Community Treasury on a predefined schedule. It follows an exponential decay function, which means that new emissions will get smaller and smaller until the entire allocation has been emitted around the year 2060.

### [Governance Executor & Community Treasury](https://celoscan.io/address/0x890DB8A597940165901372Dd7DB61C9f246e2147)

The main governance contract serves two functions:

1. Executing queued proposals that have passed governance voting
2. Community treasury storing the initial MENTO treasury allocation and ongoing [emissions](governance-components.md#emission-contract) for future initiatives

This contract is [time-locked](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks), which means there is a 2-day delay before a passed proposal can be executed. This delay allows the [Mento Watchdog Multisig](governance-components.md#watchdog-multisig) to veto potentially malicious proposals.

### [Governance Factory](https://celoscan.io/address/0xee6CE2dbe788dFC38b8F583Da86cB9caf2C8cF5A)

A contract that [deployed](https://celoscan.io/tx/0x0e77668a41d618030e61abe91dc2bd5ff17e2c2b27736f6f91f61b8688034f66) the entire governance system with all relevant contracts. It was used to set up the Mento Governance in a fully decentralized manner.

### [Governor](https://celoscan.io/address/0x47036d78bB3169b4F5560dD77BF93f4412A59852)

A contract that allows any user to vote on proposals. It also allows users with a minimum of 10,000 [veMENTO](governance-components.md#vemento-locking) in voting power to create new governance proposals.

### [Liquidity Multisig](https://celoscan.io/address/0xA74Ac93de1A209957E62391B01E09161277a9ffC)

A multisig wallet managing its 10% allocation of MENTO tokens for providing liquidity on centralized and decentralized exchanges.

### [Mento Labs Multisig](https://celoscan.io/address/0x655133d8E90F8190ed5c1F0f3710F602800C0150)

A multisig wallet owned by the Mento Labs Team. It sends allocated tokens to a vesting contract, from which they are paid out to team members and investors over predefined vesting schedules.

### [MENTO Token](https://celoscan.io/address/0x7ff62f59e3e89ea34163ea1458eebcc81177cfb6)

The Mento governance token is the system’s core token. It can be locked in exchange for veMENTO to participate in creating and voting on governance proposals.

### [Proxy Admin](https://celoscan.io/address/0x70d8DC60f9701c46D4CE9AC141E154f6804e1dC3)

An admin contract, owned by the [Governance Executor](governance-components.md#governance-executor-and-community-treasury), that can upgrade the following contracts in the system:

* [Emissions Contract](governance-components.md#emission-contract)
* [Governance Executor & Community Treasury](governance-components.md#governance-executor-and-community-treasury)
* [Governor](governance-components.md#governor)
* [veMENTO Locking](governance-components.md#vemento-locking)

### [veMENTO Locking](https://celoscan.io/address/0x001Bb66636dCd149A1A2bA8C50E408BdDd80279C)

A locking contract inspired by Curve’s[ veToken model](https://resources.curve.fi/crv-token/overview/). Users can lock their MENTO in exchange for veMENTO, which grants them the power to create and vote on governance proposals.

### [Watchdog Multisig](https://celoscan.io/address/0xE6951C4176aaB41097C6f5fE11e9c515B7108acd)

A guardian of last resort that can only veto malicious governance proposals.
