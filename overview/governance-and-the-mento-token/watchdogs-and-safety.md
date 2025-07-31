# Watchdogs & Safety

Mento implements multiple protection mechanisms to safeguard the protocol during its maturation. The watchdog system provides an additional security layer during the critical early stages of decentralized governance.

## What Are Watchdogs?

Watchdogs are trusted community members who oversee the Mento protocol by scrutinizing governance proposals. They pay close attention to the execution code of each proposal, identify malicious payloads, and can veto proposals via a 3-of-8 multisig if needed.

This mechanism serves as a "last-minute" defense against malicious actors. Ideally, suspicious proposals should be caught early and voted against by the community. However, the watchdog veto provides crucial protection against:

* Proposals with misleading descriptions
* Technical errors that could harm the protocol
* Governance attacks during low participation periods
* Actions that prioritize one stakeholder group over others

## Governance Proposal Lifecycle

Understanding when watchdogs can act requires knowing the proposal stages:

1. **Submission**: Proposal submitted on-chain
2. **Voting Period**: 7 days for community voting
3. **Queueing**: If passed, proposal enters 2-day timelock
4. **Execution**: Open-ended phase where proposal can be executed

**Veto Window**: Watchdogs can veto from the moment a proposal is queued until it's executed.

## The Watchdog Multisig

The watchdog system operates through a **3-of-8 multisignature Safe** with veto powers over governance proposals. This structure ensures:

* No single watchdog can block proposals
* Sufficient redundancy for availability
* Balance between security and efficiency
* Transparent on-chain operations

## What Watchdogs Veto

Watchdogs are expected to veto proposals that:

#### 1. Have Misleading Descriptions

The proposal description must accurately reflect the execution code. Any mismatch—whether intentional or accidental—warrants a veto to maintain governance integrity.

#### 2. Harm Protocol Stakeholders

Proposals with high probability of harming Mento stakeholders should be vetoed. Stakeholders include:

* **Mento stablecoin holders** (prioritized as risk-averse users)
* **MENTO token holders**
* **Projects and partners** relying on Mento infrastructure

**Priority Principle**: The safety of stablecoin holders takes precedence over risk-taking stakeholders like MENTO holders.

**Example**: A proposal to distribute all reserve collateral to MENTO holders would be vetoed as it undermines stablecoin holder safety, even if beneficial to token holders.

## How Monitoring Works

Watchdogs coordinate through multiple channels:

* **Private Telegram Group**: For watchdog coordination
* [**Public Discord Channel**](https://discord.com/channels/966739027782955068/1262714272476037212): Community discussion and flag raising
* **Automated Bot Notifications**: Alerts for new proposals with summaries
* **Self-Organization**: At least three reviews required before execution

Monitoring tools include:

* [Mento Governance UI](https://governance.mento.org/) - Human-readable proposal details
* [Governor Contract](https://celoscan.io/address/0x47036d78bB3169b4F5560dD77BF93f4412A59852) - Raw on-chain data
* [TimelockController](https://celoscan.io/address/0x890DB8A597940165901372Dd7DB61C9f246e2147) - Execution queue

### Current Watchdog Members

Initial watchdogs serve 12-month terms from governance activation:

1. **Bogdan Dumitru** - Mento Labs
2. **Bayo Sodimu** - Mento Labs
3. **Phillip Paetz** - Mento Labs
4. **Baransel Tekin** - Mento Labs
5. **Luuk Weber** - Kolektivo Labs
6. **Martin Chrzanowski** - cLabs
7. **Martin Volpe** - cLabs
8. **Silas Boyd-Wiziker** - Valora

The group can replace inactive members and elect a **Watchdog Secretary** responsible for:

* Rotating members annually
* Replacing non-responsive members
* Ensuring smooth process operation
* Implementing process improvements

## Technical Veto Process

To veto a proposal, watchdogs must:

1. **Identify the Timelock Operation ID** from bot notifications
2. **Initiate or sign a cancel transaction** in the Safe multisig
3. **Call the cancel function** on the TimelockController
4. **Notify other watchdogs** of the action

The technical steps involve interacting with the Safe interface and TimelockController contract detailed instructions are maintained in the watchdog operational guide.

## Guiding Principles

When evaluating proposals, watchdogs follow these principles:

* **Safety over timeliness**: Better to veto and request resubmission than risk harm
* **Transparency first**: All concerns should be communicated publicly
* **Technical accuracy**: Focus on code matching descriptions
* **Stakeholder protection**: Prioritize the most vulnerable users
* **Err on caution**: When in doubt, protect the protocol

## Progressive Decentralization

The watchdog system is explicitly temporary. The community will evaluate:

* **Participation rates**: Higher engagement reduces need for watchdogs
* **Proposal quality**: Better submissions require less oversight
* **Tool development**: Automated verification can replace manual review
* **Track record**: History of safe governance builds confidence

Through governance, the community can:

* Reduce required signers (e.g., from 3-of-8 to 2-of-5)
* Limit veto powers to specific proposal types
* Ultimately sunset the watchdog system entirely

## For Proposal Authors

To ensure smooth watchdog review:

1. **Match description to code exactly**
2. **Test thoroughly** and provide results
3. **Engage early** for complex proposals
4. **Document clearly** what each action does
5. **Allow time** for proper review

Well-prepared proposals pass review quickly, while unclear submissions face delays or vetoes.

## Accountability

Watchdog operations maintain transparency through:

* **Public identities** of all members
* **On-chain records** of all multisig actions
* **Open communication** channels
* **Performance accountability** to the community

This ensures watchdogs remain aligned with their protective mission while avoiding overreach.

## Next Steps

To understand Mento's complete governance framework:

* [Understanding Mento Governance](https://www.notion.so/learn-about-mento/governance-mento-token/understanding-mento-governance) - Core governance mechanics
* [Participating in Governance](https://www.notion.so/learn-about-mento/governance-mento-token/participating-in-governance) - How to propose and vote
* [Governance Forum](https://forum.mento.org/) - Join the discussion
