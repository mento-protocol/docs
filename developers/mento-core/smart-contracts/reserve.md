# Reserve

## TobinTaxCache

```solidity
struct TobinTaxCache {
  uint128 numerator;
  uint128 timestamp;
}
```

## isToken

```solidity
mapping(address => bool) isToken
```

## tobinTaxCache

```solidity
struct Reserve.TobinTaxCache tobinTaxCache
```

## tobinTaxStalenessThreshold

```solidity
uint256 tobinTaxStalenessThreshold
```

## tobinTax

```solidity
uint256 tobinTax
```

## tobinTaxReserveRatio

```solidity
uint256 tobinTaxReserveRatio
```

## isSpender

```solidity
mapping(address => bool) isSpender
```

## isOtherReserveAddress

```solidity
mapping(address => bool) isOtherReserveAddress
```

## otherReserveAddresses

```solidity
address[] otherReserveAddresses
```

## assetAllocationSymbols

```solidity
bytes32[] assetAllocationSymbols
```

## assetAllocationWeights

```solidity
mapping(bytes32 => uint256) assetAllocationWeights
```

## lastSpendingDay

```solidity
uint256 lastSpendingDay
```

## spendingLimit

```solidity
uint256 spendingLimit
```

## frozenReserveGoldStartBalance

```solidity
uint256 frozenReserveGoldStartBalance
```

## frozenReserveGoldStartDay

```solidity
uint256 frozenReserveGoldStartDay
```

## frozenReserveGoldDays

```solidity
uint256 frozenReserveGoldDays
```

## isExchangeSpender

```solidity
mapping(address => bool) isExchangeSpender
```

## exchangeSpenderAddresses

```solidity
address[] exchangeSpenderAddresses
```

## collateralAssetLastSpendingDay

```solidity
mapping(address => uint256) collateralAssetLastSpendingDay
```

## collateralAssets

```solidity
address[] collateralAssets
```

## isCollateralAsset

```solidity
mapping(address => bool) isCollateralAsset
```

## collateralAssetSpendingLimit

```solidity
mapping(address => uint256) collateralAssetSpendingLimit
```

## TobinTaxStalenessThresholdSet

```solidity
event TobinTaxStalenessThresholdSet(uint256 value)
```

## DailySpendingRatioSet

```solidity
event DailySpendingRatioSet(uint256 ratio)
```

## TokenAdded

```solidity
event TokenAdded(address token)
```

## TokenRemoved

```solidity
event TokenRemoved(address token, uint256 index)
```

## SpenderAdded

```solidity
event SpenderAdded(address spender)
```

## SpenderRemoved

```solidity
event SpenderRemoved(address spender)
```

## OtherReserveAddressAdded

```solidity
event OtherReserveAddressAdded(address otherReserveAddress)
```

## OtherReserveAddressRemoved

```solidity
event OtherReserveAddressRemoved(address otherReserveAddress, uint256 index)
```

## AssetAllocationSet

```solidity
event AssetAllocationSet(bytes32[] symbols, uint256[] weights)
```

## ReserveGoldTransferred

```solidity
event ReserveGoldTransferred(address spender, address to, uint256 value)
```

## TobinTaxSet

```solidity
event TobinTaxSet(uint256 value)
```

## TobinTaxReserveRatioSet

```solidity
event TobinTaxReserveRatioSet(uint256 value)
```

## ExchangeSpenderAdded

```solidity
event ExchangeSpenderAdded(address exchangeSpender)
```

## ExchangeSpenderRemoved

```solidity
event ExchangeSpenderRemoved(address exchangeSpender)
```

## DailySpendingRatioForCollateralAssetSet

```solidity
event DailySpendingRatioForCollateralAssetSet(address collateralAsset, uint256 collateralAssetDailySpendingRatios)
```

## ReserveCollateralAssetsTransferred

```solidity
event ReserveCollateralAssetsTransferred(address spender, address to, uint256 value, address token)
```

## CollateralAssetRemoved

```solidity
event CollateralAssetRemoved(address collateralAsset)
```

## CollateralAssetAdded

```solidity
event CollateralAssetAdded(address collateralAsset)
```

## constructor

```solidity
constructor(bool test) public
```

Sets initialized == true on implementation contracts

### Parameters

| Name | Type | Description                                       |
| ---- | ---- | ------------------------------------------------- |
| test | bool | Set to true to skip implementation initialization |

## isStableToken

```solidity
modifier isStableToken(address token)
```

## getVersionNumber

```solidity
function getVersionNumber() external pure returns (uint256, uint256, uint256, uint256)
```

Returns the storage, major, minor, and patch version of the contract.

### Return Values

| Name | Type    | Description                      |
| ---- | ------- | -------------------------------- |
| \[0] | uint256 | Storage version of the contract. |
| \[1] | uint256 | Major version of the contract.   |
| \[2] | uint256 | Minor version of the contract.   |
| \[3] | uint256 | Patch version of the contract.   |

## fallback

```solidity
fallback() external payable
```

## initialize

```solidity
function initialize(address registryAddress, uint256 _tobinTaxStalenessThreshold, uint256 _spendingRatioForCelo, uint256 _frozenGold, uint256 _frozenDays, bytes32[] _assetAllocationSymbols, uint256[] _assetAllocationWeights, uint256 _tobinTax, uint256 _tobinTaxReserveRatio, address[] _collateralAssets, uint256[] _collateralAssetDailySpendingRatios) external
```

Used in place of the constructor to allow the contract to be upgradable via proxy.

### Parameters

| Name                                 | Type       | Description                                                                             |
| ------------------------------------ | ---------- | --------------------------------------------------------------------------------------- |
| registryAddress                      | address    | The address of the registry core smart contract.                                        |
| \_tobinTaxStalenessThreshold         | uint256    | The initial number of seconds to cache tobin tax value for.                             |
| \_spendingRatioForCelo               | uint256    | The relative daily spending limit for the reserve spender.                              |
| \_frozenGold                         | uint256    | The balance of reserve gold that is frozen.                                             |
| \_frozenDays                         | uint256    | The number of days during which the frozen gold thaws.                                  |
| \_assetAllocationSymbols             | bytes32\[] | The symbols of the reserve assets.                                                      |
| \_assetAllocationWeights             | uint256\[] | The reserve asset weights.                                                              |
| \_tobinTax                           | uint256    | The tobin tax value as a fixidity fraction.                                             |
| \_tobinTaxReserveRatio               | uint256    | When to turn on the tobin tax, as a fixidity fraction.                                  |
| \_collateralAssets                   | address\[] | The relative daily spending limit of an ERC20 collateral asset for the reserve spender. |
| \_collateralAssetDailySpendingRatios | uint256\[] | The address of an ERC20 collateral asset                                                |

## setTobinTaxStalenessThreshold

```solidity
function setTobinTaxStalenessThreshold(uint256 value) public
```

Sets the number of seconds to cache the tobin tax value for.

### Parameters

| Name  | Type    | Description                                             |
| ----- | ------- | ------------------------------------------------------- |
| value | uint256 | The number of seconds to cache the tobin tax value for. |

## setTobinTax

```solidity
function setTobinTax(uint256 value) public
```

Sets the tobin tax.

### Parameters

| Name  | Type    | Description    |
| ----- | ------- | -------------- |
| value | uint256 | The tobin tax. |

## setTobinTaxReserveRatio

```solidity
function setTobinTaxReserveRatio(uint256 value) public
```

Sets the reserve ratio at which the tobin tax sets in.

### Parameters

| Name  | Type    | Description                                       |
| ----- | ------- | ------------------------------------------------- |
| value | uint256 | The reserve ratio at which the tobin tax sets in. |

## setDailySpendingRatio

```solidity
function setDailySpendingRatio(uint256 ratio) public
```

Set the ratio of reserve that is spendable per day.

### Parameters

| Name  | Type    | Description                           |
| ----- | ------- | ------------------------------------- |
| ratio | uint256 | Spending ratio as unwrapped Fraction. |

## setDailySpendingRatioForCollateralAssets

```solidity
function setDailySpendingRatioForCollateralAssets(address[] _collateralAssets, uint256[] collateralAssetDailySpendingRatios) public
```

Set the ratio of reserve for a given collateral asset that is spendable per day.

### Parameters

| Name                               | Type       | Description                                                                 |
| ---------------------------------- | ---------- | --------------------------------------------------------------------------- |
| \_collateralAssets                 | address\[] | Collection of the addresses of collateral assets we're setting a limit for. |
| collateralAssetDailySpendingRatios | uint256\[] | Collection of the relative daily spending limits of collateral assets.      |

## getDailySpendingRatio

```solidity
function getDailySpendingRatio() public view returns (uint256)
```

Get daily spending ratio.

### Return Values

| Name | Type    | Description                           |
| ---- | ------- | ------------------------------------- |
| \[0] | uint256 | Spending ratio as unwrapped Fraction. |

## getDailySpendingRatioForCollateralAsset

```solidity
function getDailySpendingRatioForCollateralAsset(address collateralAsset) public view returns (uint256)
```

Get daily spending ratio of a collateral asset.

### Parameters

| Name            | Type    | Description                                                           |
| --------------- | ------- | --------------------------------------------------------------------- |
| collateralAsset | address | The address of a collateral asset we're getting a spending ratio for. |

### Return Values

| Name | Type    | Description                                                          |
| ---- | ------- | -------------------------------------------------------------------- |
| \[0] | uint256 | Daily spending ratio for the collateral asset as unwrapped Fraction. |

## setFrozenGold

```solidity
function setFrozenGold(uint256 frozenGold, uint256 frozenDays) public
```

Sets the balance of reserve gold frozen from transfer.

### Parameters

| Name       | Type    | Description                                    |
| ---------- | ------- | ---------------------------------------------- |
| frozenGold | uint256 | The amount of CELO frozen.                     |
| frozenDays | uint256 | The number of days the frozen CELO thaws over. |

## setAssetAllocations

```solidity
function setAssetAllocations(bytes32[] symbols, uint256[] weights) public
```

Sets target allocations for CELO and a diversified basket of non-Celo assets.

### Parameters

| Name    | Type       | Description                                                            |
| ------- | ---------- | ---------------------------------------------------------------------- |
| symbols | bytes32\[] | The symbol of each asset in the Reserve portfolio.                     |
| weights | uint256\[] | The weight for the corresponding asset as unwrapped Fixidity.Fraction. |

## addToken

```solidity
function addToken(address token) external returns (bool)
```

Add a token that the reserve will stabilize.

### Parameters

| Name  | Type    | Description                                |
| ----- | ------- | ------------------------------------------ |
| token | address | The address of the token being stabilized. |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## removeToken

```solidity
function removeToken(address token, uint256 index) external returns (bool)
```

Remove a token that the reserve will no longer stabilize.

### Parameters

| Name  | Type    | Description                                          |
| ----- | ------- | ---------------------------------------------------- |
| token | address | The address of the token no longer being stabilized. |
| index | uint256 | The index of the token in \_tokens.                  |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## addOtherReserveAddress

```solidity
function addOtherReserveAddress(address reserveAddress) external returns (bool)
```

Add a reserve address whose balance shall be included in the reserve ratio.

### Parameters

| Name           | Type    | Description                 |
| -------------- | ------- | --------------------------- |
| reserveAddress | address | The reserve address to add. |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## removeOtherReserveAddress

```solidity
function removeOtherReserveAddress(address reserveAddress, uint256 index) external returns (bool)
```

Remove reserve address whose balance shall no longer be included in the reserve ratio.

### Parameters

| Name           | Type    | Description                                                |
| -------------- | ------- | ---------------------------------------------------------- |
| reserveAddress | address | The reserve address to remove.                             |
| index          | uint256 | The index of the reserve address in otherReserveAddresses. |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## addSpender

```solidity
function addSpender(address spender) external
```

Gives an address permission to spend Reserve funds.

### Parameters

| Name    | Type    | Description                                         |
| ------- | ------- | --------------------------------------------------- |
| spender | address | The address that is allowed to spend Reserve funds. |

## removeSpender

```solidity
function removeSpender(address spender) external
```

Takes away an address's permission to spend Reserve funds.

### Parameters

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| spender | address | The address that is to be no longer allowed to spend Reserve funds. |

## isAllowedToSpendExchange

```solidity
modifier isAllowedToSpendExchange(address spender)
```

Checks if an address is able to spend as an exchange.

_isExchangeSpender was introduced after cUSD, so the cUSD Exchange is not included in it. If cUSD's Exchange were to be added to isExchangeSpender, the check with the registry could be removed._

### Parameters

| Name    | Type    | Description                |
| ------- | ------- | -------------------------- |
| spender | address | The address to be checked. |

## addExchangeSpender

```solidity
function addExchangeSpender(address spender) external
```

Gives an address permission to spend Reserve without limit.

### Parameters

| Name    | Type    | Description                                         |
| ------- | ------- | --------------------------------------------------- |
| spender | address | The address that is allowed to spend Reserve funds. |

## removeExchangeSpender

```solidity
function removeExchangeSpender(address spender, uint256 index) external
```

Takes away an address's permission to spend Reserve funds without limits.

### Parameters

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| spender | address | The address that is to be no longer allowed to spend Reserve funds. |
| index   | uint256 | The index in exchangeSpenderAddresses of spender.                   |

## getExchangeSpenders

```solidity
function getExchangeSpenders() external view returns (address[])
```

Returns addresses of exchanges permitted to spend Reserve funds. Because exchangeSpenderAddresses was introduced after cUSD, cUSD's exchange is not included in this list.

### Return Values

| Name | Type       | Description                                             |
| ---- | ---------- | ------------------------------------------------------- |
| \[0] | address\[] | An array of addresses permitted to spend Reserve funds. |

## transferGold

```solidity
function transferGold(address payable to, uint256 value) external returns (bool)
```

Transfer gold to a whitelisted address subject to reserve spending limits.

### Parameters

| Name  | Type            | Description                             |
| ----- | --------------- | --------------------------------------- |
| to    | address payable | The address that will receive the gold. |
| value | uint256         | The amount of gold to transfer.         |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## transferCollateralAsset

```solidity
function transferCollateralAsset(address collateralAsset, address payable to, uint256 value) external returns (bool)
```

Transfer collateral asset subject to reserve spending limits to the trader, if the limit is set, othersise the limit is 100%.

### Parameters

| Name            | Type            | Description                                  |
| --------------- | --------------- | -------------------------------------------- |
| collateralAsset | address         | The token address you're transferring.       |
| to              | address payable | The address that will receive the funds.     |
| value           | uint256         | The amount of collateral assets to transfer. |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## \_transferCollateralAsset

```solidity
function _transferCollateralAsset(address collateralAsset, address payable to, uint256 value) internal returns (bool)
```

Transfer collateral asset to any address.

### Parameters

| Name            | Type            | Description                                  |
| --------------- | --------------- | -------------------------------------------- |
| collateralAsset | address         | The token address you're transferring.       |
| to              | address payable | The address that will receive the funds.     |
| value           | uint256         | The amount of collateral assets to transfer. |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## transferExchangeCollateralAsset

```solidity
function transferExchangeCollateralAsset(address collateralAsset, address payable to, uint256 value) external returns (bool)
```

Transfer collateral asset to any address.

_Transfers are not subject to a daily spending limit._

### Parameters

| Name            | Type            | Description                                         |
| --------------- | --------------- | --------------------------------------------------- |
| collateralAsset | address         | The address of collateral asset being transferred.  |
| to              | address payable | The address that will receive the collateral asset. |
| value           | uint256         | The amount of collateral asset to transfer.         |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## \_transferGold

```solidity
function _transferGold(address payable to, uint256 value) internal returns (bool)
```

Transfer unfrozen gold to any address.

### Parameters

| Name  | Type            | Description                             |
| ----- | --------------- | --------------------------------------- |
| to    | address payable | The address that will receive the gold. |
| value | uint256         | The amount of gold to transfer.         |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## transferExchangeGold

```solidity
function transferExchangeGold(address payable to, uint256 value) external returns (bool)
```

Transfer unfrozen gold to any address, used for one side of CP-DOTO.

_Transfers are not subject to a daily spending limit._

### Parameters

| Name  | Type            | Description                             |
| ----- | --------------- | --------------------------------------- |
| to    | address payable | The address that will receive the gold. |
| value | uint256         | The amount of gold to transfer.         |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## getOrComputeTobinTax

```solidity
function getOrComputeTobinTax() external returns (uint256, uint256)
```

Returns the tobin tax, recomputing it if it's stale.

### Return Values

| Name | Type    | Description                                       |
| ---- | ------- | ------------------------------------------------- |
| \[0] | uint256 | The numerator - tobin tax amount as a fraction.   |
| \[1] | uint256 | The denominator - tobin tax amount as a fraction. |

## getTokens

```solidity
function getTokens() external view returns (address[])
```

Returns the list of stabilized token addresses.

### Return Values

| Name | Type       | Description                                 |
| ---- | ---------- | ------------------------------------------- |
| \[0] | address\[] | An array of addresses of stabilized tokens. |

## getOtherReserveAddresses

```solidity
function getOtherReserveAddresses() external view returns (address[])
```

Returns the list other addresses included in the reserve total.

### Return Values

| Name | Type       | Description                                                |
| ---- | ---------- | ---------------------------------------------------------- |
| \[0] | address\[] | An array of other addresses included in the reserve total. |

## getAssetAllocationSymbols

```solidity
function getAssetAllocationSymbols() external view returns (bytes32[])
```

Returns a list of token symbols that have been allocated.

### Return Values

| Name | Type       | Description                                         |
| ---- | ---------- | --------------------------------------------------- |
| \[0] | bytes32\[] | An array of token symbols that have been allocated. |

## getAssetAllocationWeights

```solidity
function getAssetAllocationWeights() external view returns (uint256[])
```

Returns a list of weights used for the allocation of reserve assets.

### Return Values

| Name | Type       | Description                                                              |
| ---- | ---------- | ------------------------------------------------------------------------ |
| \[0] | uint256\[] | An array of a list of weights used for the allocation of reserve assets. |

## getUnfrozenBalance

```solidity
function getUnfrozenBalance() public view returns (uint256)
```

Returns the amount of unfrozen CELO in the reserve.

### Return Values

| Name | Type    | Description                             |
| ---- | ------- | --------------------------------------- |
| \[0] | uint256 | The total unfrozen CELO in the reserve. |

## getReserveGoldBalance

```solidity
function getReserveGoldBalance() public view returns (uint256)
```

Returns the amount of CELO included in the reserve.

### Return Values

| Name | Type    | Description                              |
| ---- | ------- | ---------------------------------------- |
| \[0] | uint256 | The CELO amount included in the reserve. |

## getOtherReserveAddressesGoldBalance

```solidity
function getOtherReserveAddressesGoldBalance() public view returns (uint256)
```

Returns the amount of CELO included in other reserve addresses.

### Return Values

| Name | Type    | Description                                          |
| ---- | ------- | ---------------------------------------------------- |
| \[0] | uint256 | The CELO amount included in other reserve addresses. |

## getUnfrozenReserveGoldBalance

```solidity
function getUnfrozenReserveGoldBalance() public view returns (uint256)
```

Returns the amount of unfrozen CELO included in the reserve.

### Return Values

| Name | Type    | Description                                       |
| ---- | ------- | ------------------------------------------------- |
| \[0] | uint256 | The unfrozen CELO amount included in the reserve. |

## getReserveAddressesCollateralAssetBalance

```solidity
function getReserveAddressesCollateralAssetBalance(address collateralAsset) public view returns (uint256)
```

Returns the amount of particular collateral asset in reserve including other reserve addresses.

### Parameters

| Name            | Type    | Description                           |
| --------------- | ------- | ------------------------------------- |
| collateralAsset | address | the asset we're checking a balance of |

### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| \[0] | uint256 | The balance of particular collateral asset. |

## addCollateralAsset

```solidity
function addCollateralAsset(address collateralAsset) public returns (bool)
```

Add a collateral asset in the reserve.

### Parameters

| Name            | Type    | Description                           |
| --------------- | ------- | ------------------------------------- |
| collateralAsset | address | The address of the token being added. |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## removeCollateralAsset

```solidity
function removeCollateralAsset(address collateralAsset, uint256 index) external returns (bool)
```

Remove a collateral asset in the reserve.

### Parameters

| Name            | Type    | Description                             |
| --------------- | ------- | --------------------------------------- |
| collateralAsset | address | The address of the token being removed. |
| index           | uint256 | The index of the token being removed.   |

### Return Values

| Name | Type | Description                               |
| ---- | ---- | ----------------------------------------- |
| \[0] | bool | Returns true if the transaction succeeds. |

## checkIsCollateralAsset

```solidity
function checkIsCollateralAsset(address collateralAsset) public view returns (bool)
```

Check if a collateral asset is added to the reserve.

### Parameters

| Name            | Type    | Description                             |
| --------------- | ------- | --------------------------------------- |
| collateralAsset | address | The address of the token being checked. |

### Return Values

| Name | Type | Description                                                |
| ---- | ---- | ---------------------------------------------------------- |
| \[0] | bool | Returns true if the token was added as a collateral asset. |

## getFrozenReserveGoldBalance

```solidity
function getFrozenReserveGoldBalance() public view returns (uint256)
```

Returns the amount of frozen CELO in the reserve.

### Return Values

| Name | Type    | Description                           |
| ---- | ------- | ------------------------------------- |
| \[0] | uint256 | The total frozen CELO in the reserve. |

## getReserveRatio

```solidity
function getReserveRatio() public view returns (uint256)
```

Computes the ratio of current reserve balance to total stable token valuation.

### Return Values

| Name | Type    | Description                            |
| ---- | ------- | -------------------------------------- |
| \[0] | uint256 | Reserve ratio in a fixed point format. |

## isStableAsset

```solidity
function isStableAsset(address token) external view returns (bool)
```
