# Broker

The **Broker** is responsible for orchestrating swaps in the Mento protocol. It does that by fulfilling three main responsibilities:&#x20;

* **Discoverability**: It maintains a list of all [**exchange providers**](exchange-providers.md) registered in the system.
* **Treasury management:** It has spending rights on the [**Mento Reserve**](../reserve.md) and can mint and burn any stable asset in the system, thus it is responsible for moving around assets during a trade.
* **Safety**: In service of [stability](../stability.md), it enforces [trading limits](trading-limits.md) in the protocol, constraining the volume of assets that can be traded over time.

While it is responsible for moving around assets during a swap, it doesn't know how to price swaps. For that, it relies on [**exchange providers**](exchange-providers.md). These abstract components implement a unified interface and can be plugged into the **Broker** to provide exchanges between two or more assets. The first exchange provider implemented is the [BiPoolManager](../../build-on-mento/smart-contracts/bipoolmanager.md). &#x20;
