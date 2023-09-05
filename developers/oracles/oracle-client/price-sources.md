# Price Sources

Mento Oracle Clients aggregate data from multiple configured centralized cryptocurrency exchanges. They then calculate a volume-weighted average market price across exchanges.&#x20;

For the robustness of the protocol, it is important to choose reliable exchange rates. Researching which rates to use usually starts with getting an overview of what trading pairs for a given exchange rate exist. Time series characteristics like price stability, traded volume, and order book depth can often be analyzed via [coinmarketcap.com](https://coinmarketcap.com/) or [tradingview.com](https://www.tradingview.com/). It is also helpful to check for the stability of these measures over time and check for wash trading, which can usually be approximated by a market maker's opinion. If necessary, more extensive data can be bought from for example [Tardis](https://tardis.dev/).&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2023-03-07 at 15.39.39.png" alt=""><figcaption><p>USDCEUR maximum deviation from average analysis example</p></figcaption></figure>

The oracle client uses a maximum deviation from the average parameter to determine which exchange rates to include in the volume-weighted mean calculation. The goal of researching a set of exchange rates is to have one with a low and stable deviation from its average over time.&#x20;

## Adding exchange rates

New exchange rates or pairs for existing rates can be added with a PR in the celo-monorepo deployment helm charts:&#x20;

{% embed url="https://github.com/celo-org/celo-monorepo/tree/master/packages/helm-charts/oracle" %}

If a new exchange is not yet supported by the oracle client, a new exchange adapter needs to be added like in this [example PR](https://github.com/celo-org/celo-oracle/pull/150). New currency pairs need to be added like in this [example PR](https://github.com/celo-org/celo-oracle/pull/149/files).&#x20;

After adding the necessary features and configurations, the client can be tested by adjusting the [developer price sources](https://github.com/celo-org/celo-oracle/blob/main/devPriceSourcesConfig.txt) with the new price sources and running the application locally. A more technical documentation about running the client application locally can be found in the [repository readme](https://github.com/celo-org/celo-oracle) files.
