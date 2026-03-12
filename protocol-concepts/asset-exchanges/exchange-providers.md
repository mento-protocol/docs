# Exchange Providers

The concept of exchange providers allows us to abstract how asset exchanges are priced from the [**Broker's**](broker.md) responsibilities. Given an _in asset_ and an _out asset_ and the _amount_ one wants to trade, an exchange provider can employ any mechanism in order to price the respective trade and manage its internal state as a result of executing such trades. It does this entirely virtually and never actually holds assets.

The first exchange provider that we make use of in the Mento protocol is the [**BiPoolManager**](bipoolmanager.md)**.**
