# StableToken

## InflationFactorUpdated

```solidity
event InflationFactorUpdated(uint256 factor, uint256 lastUpdated)
```

## InflationParametersUpdated

```solidity
event InflationParametersUpdated(uint256 rate, uint256 updatePeriod, uint256 lastUpdated)
```

## Transfer

```solidity
event Transfer(address from, address to, uint256 value)
```

## TransferComment

```solidity
event TransferComment(string comment)
```

## name\_

```solidity
string name_
```

## symbol\_

```solidity
string symbol_
```

## decimals\_

```solidity
uint8 decimals_
```

## balances

```solidity
mapping(address => uint256) balances
```

## totalSupply\_

```solidity
uint256 totalSupply_
```

## allowed

```solidity
mapping(address => mapping(address => uint256)) allowed
```

## InflationState

```solidity
struct InflationState {
  struct FixidityLib.Fraction rate;
  struct FixidityLib.Fraction factor;
  uint256 updatePeriod;
  uint256 factorLastUpdated;
}
```

## inflationState

```solidity
struct StableToken.InflationState inflationState
```

## exchangeRegistryId

```solidity
bytes32 exchangeRegistryId
```

## updateInflationFactor

```solidity
modifier updateInflationFactor()
```

Recomputes and updates inflation factor if more than `updatePeriod` has passed since last update.

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

## constructor

```solidity
constructor(bool test) public
```

Sets initialized == true on implementation contracts

### Parameters

| Name | Type | Description                                       |
| ---- | ---- | ------------------------------------------------- |
| test | bool | Set to true to skip implementation initialization |

## initialize

```solidity
function initialize(string _name, string _symbol, uint8 _decimals, address registryAddress, uint256 inflationRate, uint256 inflationFactorUpdatePeriod, address[] initialBalanceAddresses, uint256[] initialBalanceValues, string exchangeIdentifier) external
```

### Parameters

| Name                        | Type       | Description                                                         |
| --------------------------- | ---------- | ------------------------------------------------------------------- |
| \_name                      | string     | The name of the stable token (English)                              |
| \_symbol                    | string     | A short symbol identifying the token (e.g. "cUSD")                  |
| \_decimals                  | uint8      | Tokens are divisible to this many decimal places.                   |
| registryAddress             | address    | Address of the Registry contract.                                   |
| inflationRate               | uint256    | Weekly inflation rate.                                              |
| inflationFactorUpdatePeriod | uint256    | How often the inflation factor is updated, in seconds.              |
| initialBalanceAddresses     | address\[] | Array of addresses with an initial balance.                         |
| initialBalanceValues        | uint256\[] | Array of balance values corresponding to initialBalanceAddresses.   |
| exchangeIdentifier          | string     | String identifier of exchange in registry (for specific fiat pairs) |

## setInflationParameters

```solidity
function setInflationParameters(uint256 rate, uint256 updatePeriod) external
```

Updates Inflation Parameters.

### Parameters

| Name         | Type    | Description                           |
| ------------ | ------- | ------------------------------------- |
| rate         | uint256 | New rate.                             |
| updatePeriod | uint256 | How often inflationFactor is updated. |

## increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 value) external returns (bool)
```

Increase the allowance of another user.

### Parameters

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| spender | address | The address which is being approved to spend StableToken.           |
| value   | uint256 | The increment of the amount of StableToken approved to the spender. |

### Return Values

| Name | Type | Description                       |
| ---- | ---- | --------------------------------- |
| \[0] | bool | True if the transaction succeeds. |

## decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 value) external returns (bool)
```

Decrease the allowance of another user.

### Parameters

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| spender | address | The address which is being approved to spend StableToken.           |
| value   | uint256 | The decrement of the amount of StableToken approved to the spender. |

### Return Values

| Name | Type | Description                       |
| ---- | ---- | --------------------------------- |
| \[0] | bool | True if the transaction succeeds. |

## approve

```solidity
function approve(address spender, uint256 value) external returns (bool)
```

Approve a user to transfer StableToken on behalf of another user.

### Parameters

| Name    | Type    | Description                                               |
| ------- | ------- | --------------------------------------------------------- |
| spender | address | The address which is being approved to spend StableToken. |
| value   | uint256 | The amount of StableToken approved to the spender.        |

### Return Values

| Name | Type | Description                       |
| ---- | ---- | --------------------------------- |
| \[0] | bool | True if the transaction succeeds. |

## mint

```solidity
function mint(address to, uint256 value) external returns (bool)
```

Mints new StableToken and gives it to 'to'.

### Parameters

| Name  | Type    | Description                           |
| ----- | ------- | ------------------------------------- |
| to    | address | The account for which to mint tokens. |
| value | uint256 | The amount of StableToken to mint.    |

## transferWithComment

```solidity
function transferWithComment(address to, uint256 value, string comment) external returns (bool)
```

Transfer token for a specified address

### Parameters

| Name    | Type    | Description                   |
| ------- | ------- | ----------------------------- |
| to      | address | The address to transfer to.   |
| value   | uint256 | The amount to be transferred. |
| comment | string  | The transfer comment.         |

### Return Values

| Name | Type | Description                       |
| ---- | ---- | --------------------------------- |
| \[0] | bool | True if the transaction succeeds. |

## burn

```solidity
function burn(uint256 value) external returns (bool)
```

Burns StableToken from the balance of msg.sender.

### Parameters

| Name  | Type    | Description                        |
| ----- | ------- | ---------------------------------- |
| value | uint256 | The amount of StableToken to burn. |

## transferFrom

```solidity
function transferFrom(address from, address to, uint256 value) external returns (bool)
```

Transfers StableToken from one address to another on behalf of a user.

### Parameters

| Name  | Type    | Description                               |
| ----- | ------- | ----------------------------------------- |
| from  | address | The address to transfer StableToken from. |
| to    | address | The address to transfer StableToken to.   |
| value | uint256 | The amount of StableToken to transfer.    |

### Return Values

| Name | Type | Description                       |
| ---- | ---- | --------------------------------- |
| \[0] | bool | True if the transaction succeeds. |

## name

```solidity
function name() external view returns (string)
```

### Return Values

| Name | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| \[0] | string | The name of the stable token. |

## symbol

```solidity
function symbol() external view returns (string)
```

### Return Values

| Name | Type   | Description                     |
| ---- | ------ | ------------------------------- |
| \[0] | string | The symbol of the stable token. |

## decimals

```solidity
function decimals() external view returns (uint8)
```

### Return Values

| Name | Type  | Description                                                     |
| ---- | ----- | --------------------------------------------------------------- |
| \[0] | uint8 | The number of decimal places to which StableToken is divisible. |

## allowance

```solidity
function allowance(address accountOwner, address spender) external view returns (uint256)
```

Gets the amount of owner's StableToken allowed to be spent by spender.

### Parameters

| Name         | Type    | Description                     |
| ------------ | ------- | ------------------------------- |
| accountOwner | address | The owner of the StableToken.   |
| spender      | address | The spender of the StableToken. |

### Return Values

| Name | Type    | Description                                                   |
| ---- | ------- | ------------------------------------------------------------- |
| \[0] | uint256 | The amount of StableToken owner is allowing spender to spend. |

## balanceOf

```solidity
function balanceOf(address accountOwner) external view returns (uint256)
```

Gets the balance of the specified address using the presently stored inflation factor.

### Parameters

| Name         | Type    | Description                          |
| ------------ | ------- | ------------------------------------ |
| accountOwner | address | The address to query the balance of. |

### Return Values

| Name | Type    | Description                           |
| ---- | ------- | ------------------------------------- |
| \[0] | uint256 | The balance of the specified address. |

## totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

_Though totalSupply_ is stored in units, this returns value.\_

### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| \[0] | uint256 | The total value of StableToken in existence |

## getInflationParameters

```solidity
function getInflationParameters() external view returns (uint256, uint256, uint256, uint256)
```

gets inflation parameters.

### Return Values

| Name | Type    | Description       |
| ---- | ------- | ----------------- |
| \[0] | uint256 | rate              |
| \[1] | uint256 | factor            |
| \[2] | uint256 | updatePeriod      |
| \[3] | uint256 | factorLastUpdated |

## valueToUnits

```solidity
function valueToUnits(uint256 value) external view returns (uint256)
```

Returns the units for a given value given the current inflation factor.

_We don't compute the updated inflationFactor here because we assume any function calling this will have updated the inflation factor._

### Parameters

| Name  | Type    | Description                    |
| ----- | ------- | ------------------------------ |
| value | uint256 | The value to convert to units. |

### Return Values

| Name | Type    | Description                                                            |
| ---- | ------- | ---------------------------------------------------------------------- |
| \[0] | uint256 | The units corresponding to `value` given the current inflation factor. |

## getExchangeRegistryId

```solidity
function getExchangeRegistryId() public view returns (bytes32)
```

Returns the exchange id in the registry of the corresponding fiat pair exchange.

_When this storage is uninitialized, it falls back to the default EXCHANGE\_REGISTRY\_ID. exchangeRegistryId was introduced after the initial release of cUSD's StableToken, so exchangeRegistryId will be uninitialized for that contract. If cUSD's StableToken exchangeRegistryId were to be correctly initialized, this function could be deprecated in favor of using exchangeRegistryId directly._

### Return Values

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| \[0] | bytes32 | Registry id for the corresponding exchange. |

## unitsToValue

```solidity
function unitsToValue(uint256 units) public view returns (uint256)
```

Returns the value of a given number of units given the current inflation factor.

### Parameters

| Name  | Type    | Description                    |
| ----- | ------- | ------------------------------ |
| units | uint256 | The units to convert to value. |

### Return Values

| Name | Type    | Description                                                            |
| ---- | ------- | ---------------------------------------------------------------------- |
| \[0] | uint256 | The value corresponding to `units` given the current inflation factor. |

## transfer

```solidity
function transfer(address to, uint256 value) public returns (bool)
```

Transfers `value` from `msg.sender` to `to`

### Parameters

| Name  | Type    | Description                   |
| ----- | ------- | ----------------------------- |
| to    | address | The address to transfer to.   |
| value | uint256 | The amount to be transferred. |

## \_transfer

```solidity
function _transfer(address to, uint256 value) internal returns (bool)
```

Transfers StableToken from one address to another

### Parameters

| Name  | Type    | Description                                  |
| ----- | ------- | -------------------------------------------- |
| to    | address | The address to transfer StableToken to.      |
| value | uint256 | The amount of StableToken to be transferred. |

## debitGasFees

```solidity
function debitGasFees(address from, uint256 value) external
```

Reserve balance for making payments for gas in this StableToken currency.

_Note that this function is called by the protocol when paying for tx fees in this currency. After the tx is executed, gas is refunded to the sender and credited to the various tx fee recipients via a call to `creditGasFees`. Note too that the events emitted by `creditGasFees` reflect the net gas fee payments for the transaction._

### Parameters

| Name  | Type    | Description                         |
| ----- | ------- | ----------------------------------- |
| from  | address | The account to reserve balance from |
| value | uint256 | The amount of balance to reserve    |

## creditGasFees

```solidity
function creditGasFees(address from, address feeRecipient, address gatewayFeeRecipient, address communityFund, uint256 refund, uint256 tipTxFee, uint256 gatewayFee, uint256 baseTxFee) external
```

Alternative function to credit balance after making payments for gas in this StableToken currency.

_Note that this function is called by the protocol when paying for tx fees in this currency. Before the tx is executed, gas is debited from the sender via a call to `debitGasFees`. Note too that the events emitted by `creditGasFees` reflect the net gas fee payments for the transaction._

### Parameters

| Name                | Type    | Description                       |
| ------------------- | ------- | --------------------------------- |
| from                | address | The account to debit balance from |
| feeRecipient        | address | Coinbase address                  |
| gatewayFeeRecipient | address | Gateway address                   |
| communityFund       | address | Community fund address            |
| refund              | uint256 |                                   |
| tipTxFee            | uint256 | Coinbase fee                      |
| gatewayFee          | uint256 | Gateway fee                       |
| baseTxFee           | uint256 | Community fund fee                |

## \_creditGas

```solidity
function _creditGas(address from, address to, uint256 value) internal returns (uint256)
```
