# On Celo

Mento stables are available on the Celo blockchain. This guide covers how to get USDm, EURm, BRLm, XOFm, and GBPm on Celo.

## Swap at oracle rate (USDm, EURm, BRLm, XOFm)

The most direct way to get these Mento stables on Celo is by swapping on the Mento protocol. FPMM pools use **oracle-based rates**: you get the same rate you see off-chain for the pair (e.g. EUR/USD). **There is no slippage** — the rate is fixed by the oracle for your trade size.

### Using the Mento app

1. Visit [app.mento.org](https://app.mento.org/?chain=42220)
2. Connect your wallet and **select the Celo network**
3. Select your **input token** (e.g. USDC, USDT, EUROC)
4. Choose your desired stable (USDm, EURm, BRLm, XOFm)
5. Enter amount and confirm the swap

The app shows the oracle rate and fees upfront. No curve, no slippage. In the backing model documented for **Mento V3**, **USDm** and **EURm** are Reserve-backed, while **GBPm** is CDP-backed.

## GBPm: borrow via CDP

**GBPm is different.** It is not minted by the Reserve like USDm or EURm. You can get GBPm by **borrowing it into existence** against collateral (USDm) in a **CDP (Collateralized Debt Position)**. This is often the main route for sourcing GBPm on Celo.

1. Visit [app.mento.org](https://app.mento.org/borrow?chain=42220) and connect your wallet on Celo.
2. Open **Borrow**. Select **GBPm** in the currency dropdown, then **+ Open Your First Trove**.
3. Deposit **USDm** as collateral and borrow **GBPm**. Set your interest rate; there is no fixed repayment schedule. Keep your collateral ratio above the minimum to avoid liquidation.

For a step-by-step walkthrough, see **[Borrow a stable (e.g. GBPm)](../../get-started/quick-start-guides.md#-borrow-a-stable-eg-gbpm)** in the Quick Start Guides.

For protocol details (troves, liquidations, Stability pool), see [CDPs](../../dive-deeper/cdp.md).

## Other venues (DEXs)

Some DEXs on Celo list pairs that include Mento stables (e.g. USDm/USDC). You can use them if you prefer; rates and liquidity vary. For oracle-priced swaps with no slippage, use the [Mento app](https://app.mento.org/?chain=42220) directly.

## Need help?

* [Troubleshooting](../troubleshooting.md) — common issues when swapping or getting stables
* [Mento Discord](https://discord.com/invite/7CXxS5ub96)
