---
description: >-
  If you are looking to acquire or sell mento stable assets, this article is
  explaining where you can do that.
---

# Buy & Sell

There are three ways how the one can buy or sell mento stable assets:

1. Through one of the centralized or decentralized exchanges.
2. Through one of the on-ramp partners.
3. Through mento protocol directly.

## Purchase mento stable assets on the open market

### Purchase from one of the centralized exchanges

Centralised exchanges (CEX for short) work best when you have fiat currency in your bank account, to begin with, and seek to exchange it for stable assets on the blockchain. You will have to create an account with an exchange, and in most cases they will require some sort of identity verification (a procedure called Know Your Customer, KYC for short).

#### List of trading pairs for Mento stable assets on CEXes:

* cUSD
  * Kucoin
    * [cUSD/USDT trading pair](https://www.kucoin.com/trade/CUSD-USDT)
    * [cUSD/BTC trading pair](https://www.kucoin.com/trade/CUSD-BTC)
  * Huobi Global
    * [cUSD/USDT trading pair](https://www.huobi.com/en-us/exchange/cusd\_usdt)
  * Coinlist Pro
    * cUSD/USD trading pair
    * cUSD/USDC trading pair
  * Gate.io
    * [cUSD/USDT trading pair](https://www.gate.io/trade/cusd\_usdt)
  * OkCoin
    * [cUSD/USD trading pair](https://www.okcoin.com/spot/trade#product=cusd\_usd)
* cEUR
* cREAL
  *

### Purchase from one of the decentralised exchanges

Decentralized exchanges (DEX for short) are permissionless protocols and available to practically anyone around the globe, without any restrictions applied. (Your local government still might impose some regulations prohibiting their citizens from accessing DEXes, so do your own research).&#x20;

You will have to know how to use non-custodial wallet (e.g Metamask, Ledger, Valora, TrustWallet, etc.) and have some crypto currency in your wallet to begin with. Majority of DEXes have smart routing built in, so it doesn't really matter which asset do you start with - as long as mento token is listed there, it will find a way to perform a trade.

#### List of DEXes listing mento stable assets:

* Ubeswap
* Mobius.money
* Sushi.com

## Which exchange is right for you?

It really depends from couple of factors:

**Your geographical location**. Some CEXes can be accessed from certain regions, and some governments allow their citizens to access only some exchanges. Depending from where you are, you will have to find an exchange that works in your jurisdiction.

**Which asset do you start with**. For example, if you have US dollars in your bank account you might prefer an exchange that has a direct pair cUSD/USD.

**Total amount you want to trade**. All exchanges have different trading volume at different times. The rule of thumb - the higher the daily trading volume is, the better.

### Where can I find an up to date list?

We will be updating this page when our assets are listed on new exchanges. On Coinmarketcap you can find the complete list of markets for majority of popular tokens. For example, if you go to [Celo Dollars](https://coinmarketcap.com/currencies/celo-dollar/) page, scroll down to 'Celo Dollar Markets' section you will see the list of all available exchanges and their trading volumes, updated in real time.

## Acquire assets through one of the on-ramp partners

You can acquire mento stable assets with a credit card or form a bank account with one of our payment providers partners.

You will have to create an account with them, do identity verification and you must have celo account where you will receive your funds.&#x20;

[Ramp network](https://ramp.network/) has the best coverage around the globe and best fees (free).

If it doesn't work for you for some reason, you can try using [Moonpay](https://www.moonpay.com/) or [Simplex](https://www.simplex.com/) instead.

[Valora](https://valoraapp.com/) is a mobile crypto wallet native to Celo blockchain. They aggregate all available cash in/out options in their app. Check [this support article](https://support.valoraapp.com/hc/en-us/categories/360006359592-Adding-and-Withdrawing-Funds) on their website for more info.&#x20;

Cashing out to credit card / bank account is not supported by any of the existing providers atm.

## Mint/burn stable with Mento protocol directly

Mento protocol allows users to deposit CELO and mint new stable assets into existence. Users can also burn stable assets they have on hands to receive back the deposited CELO from the reserve.

Usually it is not recommended way for end users, because transactions with Mento might be subject to higher slippage, then performing the same trade through CEX or DEX.

When you are looking to exchange relatively high amount and can't do that because of high slippage, we recommend to user [celo trading bot](https://github.com/celo-org/celo-exchange-bot) (requires technical knowledge to be able to implement and run the bot). The bot allows you to brake down big trade in a chain of smaller ones that will be executed over prolonged interval of time. This helps to avoid slippage, but doesn't work when you need to exchange big amount immediately.

## Limit orders

There are two main trading modes when you perform a transaction at an exchange: **limit order** and **market order**.

When a **market order** is created, the trade will be performed at the current market price at the moment when you submit a transaction. This way your orders can be executed faster, almost instantly.

When a **limit order** is selected, you can determine the price that the trade must be performed at. Instead of executing your order immediately, the exchange will wait until there is enough supply to match your price. It is possible, that it might take some time because there is not always a counterparty available to perform your trade.

**Example.**  Let's imagine you want to trade 1000 cReal to fiat Reals. Because of the stability mechanism's design, the price of cReal floats around 1 Real, but rarely stays at 1 sharp. If you choose to perform a market order, it can be executed at 0.98, 0.99, or 1.02, etc. If you choose a limit order and set it to 1.00 sharp, your trade will be executed at that price and you will receive the exact amount in fiat currency (minus the exchange's fee).

Pretty much any CEX has limit order functionality.&#x20;

This is not the case when it comes to all DEXes. At the moment of writing this, [Ubeswap](https://app.ubeswap.org/#/limit-order) is the only exchange in Celo ecosystem allowing the limit orders feature.

