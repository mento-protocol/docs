# Trading Limits

The Mento stability mechanism relies on the ability to contract and expand the supply of Mento stable assets by allowing everyone to exchange stable assets with the Reserve against collateral assets and the other way around. The rate of expansion and contraction (i.e. _volume that can be traded in a unit of time_) is highly dependent on the **volatility** and the **liquidity** of the collateral in the pair. For example, when trading USDm for Celo with the Reserve, the amount that we can trade between two vAMM bucket updates has to be significantly lower than the amount we are able to trade when trading USDm against USDC. This is done in order to protect against oracle manipulation risk, which is greatly reduced when trading USDm against USDC.

In Mento V1 the vAMM bucket sizes had two distinct uses: (1) they enabled price finding between oracle updates and (2) they acted as an effective trading limit by introducing slippage. This worked quite well but made it hard to fine-tune the slippage function. Introducing trading limits, allows us to use the bucket sizes only for price finding. This means we can increase the bucket sizes, thus reducing the average slippage between two oracle updates, while still limiting the amount that can be traded between two bucket updates.

In a broader sense, we can also apply the trading limits to safeguard the protocol by enforcing daily or global limits. Governance can configure trading limits on a specific combination of token and exchange – for example, a limit can be set on the amount of USDm that flows in the USDm/CELO exchange, while another limit can be set on the amount of USDm that flows through the USDm/USDC exchange. Each token and exchange combination can have two **time-based limits** (**L0** and **L1**) and one **global limit** (**LG**).&#x20;

L0 and L1 are time-based limits that monitor the net flow of a particular asset and ensure that it doesn’t exceed the specified limit within a set time frame. Typically we've set **L0** at 5 minutes, to enforce how much can be traded between two bucket updates, and **L1** to a day as a fail-safe.

In contrast, **LG** is a global limit that remains in effect for as long as the limit is enabled and prevents the net flow of a particular asset from meeting or exceeding the configured limit.

The Broker smart contract initiates the trading limit checks on every exchange request. Trading limits are configured in the broker contract and can only be modified by governance.

Please check out the technical reference for more information on how the trading limits work.
