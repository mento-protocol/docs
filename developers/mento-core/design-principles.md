# Design Principles

The system is designed in a way that allows many protocol changes by config parameter, not core contract changes. Components that are modular are

* Exchange Setup: New exchange methodologies can be added by new contracts implementing the IExchangeProvider.sol interface, like BiPoolManager.sol. BiPoolManager.sol facilitates the creation of two-asset pools, whereas in the future more complex pool setups can be defined.
* Exchanges: In BiPoolManager.sol as well as future exchange contract additions, exchange pools can be added by config.
* Pricing Modules: Pricing modules can be added by adding new contracts implementing IPricingModule.sol and added as a config change to an exchange provider.
* Oracle Circuit Breakers: BreakerBox.sol acts like a hub for different breaker methodologies, which can be added by adding contracts that implement IBreaker.sol and adding them to the breaker box.
