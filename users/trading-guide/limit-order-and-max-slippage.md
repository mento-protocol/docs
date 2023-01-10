# Limit order & max slippage

### Limit orders

There are two main trading modes when you perform a transaction at an exchange: **limit order** and **market order**.

When a **market order** is created, the trade will be performed at the current market price at the moment when you submit a transaction. This way your orders can be executed faster, almost instantly.

When a **limit order** is selected, you can determine the price at which the trade must be performed at. Instead of executing your order immediately, the exchange will wait until there is enough supply to match your price. It is possible, that it might take some time because there is not always a counterparty available to perform your trade.

**Example.**  Let's imagine you want to trade 1000 cReal to fiat Reals. Because of the stability mechanism's design, the price of cReal floats around 1 Brazilian Real but rarely stays at 1 sharp. If you choose to perform a market order, it can be executed at 0.98, 0.99, or 1.02, etc. If you choose a limit order and set it to 1.00 sharp, your trade will be executed at that price and you will receive the exact amount in fiat currency (minus the exchange's fee).

Pretty much any CEX has limited order functionality.&#x20;

This is not the case when it comes to DEXes. At the moment of writing this, [Ubeswap](https://app.ubeswap.org/#/limit-order) is the only exchange in the Celo ecosystem allowing the limit orders feature.

### Max slippage parameter

While the limit orders feature is not available at all DEXes, you can always set the **max slippage** parameter. Usually, it is set to 0.5% or 1%.

If the slippage is higher than the parameter (the actual price of the trade deviates from the expected price by %), the transaction will be reverted.
