# SortedOracles

## isOracle

```solidity
mapping(address => mapping(address => bool)) isOracle
```

## oracles

```solidity
mapping(address => address[]) oracles
```

## reportExpirySeconds

```solidity
uint256 reportExpirySeconds
```

## tokenReportExpirySeconds

```solidity
mapping(address => uint256) tokenReportExpirySeconds
```

## breakerBox

```solidity
contract IBreakerBox breakerBox
```

## OracleAdded

```solidity
event OracleAdded(address token, address oracleAddress)
```

## OracleRemoved

```solidity
event OracleRemoved(address token, address oracleAddress)
```

## OracleReported

```solidity
event OracleReported(address token, address oracle, uint256 timestamp, uint256 value)
```

## OracleReportRemoved

```solidity
event OracleReportRemoved(address token, address oracle)
```

## MedianUpdated

```solidity
event MedianUpdated(address token, uint256 value)
```

## ReportExpirySet

```solidity
event ReportExpirySet(uint256 reportExpiry)
```

## TokenReportExpirySet

```solidity
event TokenReportExpirySet(address token, uint256 reportExpiry)
```

## BreakerBoxUpdated

```solidity
event BreakerBoxUpdated(address newBreakerBox)
```

## onlyOracle

```solidity
modifier onlyOracle(address token)
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
function initialize(uint256 _reportExpirySeconds) external
```

Used in place of the constructor to allow the contract to be upgradable via proxy.

### Parameters

| Name                  | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| \_reportExpirySeconds | uint256 | The number of seconds before a report is considered expired. |

## setReportExpiry

```solidity
function setReportExpiry(uint256 _reportExpirySeconds) public
```

Sets the report expiry parameter.

### Parameters

| Name                  | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| \_reportExpirySeconds | uint256 | The number of seconds before a report is considered expired. |

## setTokenReportExpiry

```solidity
function setTokenReportExpiry(address _token, uint256 _reportExpirySeconds) external
```

Sets the report expiry parameter for a token.

### Parameters

| Name                  | Type    | Description                                                  |
| --------------------- | ------- | ------------------------------------------------------------ |
| \_token               | address | The address of the token to set expiry for.                  |
| \_reportExpirySeconds | uint256 | The number of seconds before a report is considered expired. |

## setBreakerBox

```solidity
function setBreakerBox(contract IBreakerBox newBreakerBox) public
```

Sets the address of the BreakerBox.

### Parameters

| Name          | Type                 | Description                 |
| ------------- | -------------------- | --------------------------- |
| newBreakerBox | contract IBreakerBox | The new BreakerBox address. |

## addOracle

```solidity
function addOracle(address token, address oracleAddress) external
```

Adds a new Oracle.

### Parameters

| Name          | Type    | Description                |
| ------------- | ------- | -------------------------- |
| token         | address | The address of the token.  |
| oracleAddress | address | The address of the oracle. |

## removeOracle

```solidity
function removeOracle(address token, address oracleAddress, uint256 index) external
```

Removes an Oracle.

### Parameters

| Name          | Type    | Description                                          |
| ------------- | ------- | ---------------------------------------------------- |
| token         | address | The address of the token.                            |
| oracleAddress | address | The address of the oracle.                           |
| index         | uint256 | The index of `oracleAddress` in the list of oracles. |

## removeExpiredReports

```solidity
function removeExpiredReports(address token, uint256 n) external
```

Removes a report that is expired.

### Parameters

| Name  | Type    | Description                                                                       |
| ----- | ------- | --------------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported.      |
| n     | uint256 | The number of expired reports to remove, at most (deterministic upper gas bound). |

## isOldestReportExpired

```solidity
function isOldestReportExpired(address token) public view returns (bool, address)
```

Check if last report is expired.

### Parameters

| Name  | Type    | Description                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported. |

### Return Values

| Name | Type    | Description                     |
| ---- | ------- | ------------------------------- |
| \[0] | bool    | isExpired                       |
| \[1] | address | The address of the last report. |

## report

```solidity
function report(address token, uint256 value, address lesserKey, address greaterKey) external
```

Updates an oracle value and the median.

_Note that only one of `lesserKey` or `greaterKey` needs to be correct to reduce friction._

### Parameters

| Name       | Type    | Description                                                                  |
| ---------- | ------- | ---------------------------------------------------------------------------- |
| token      | address | The address of the token for which the CELO exchange rate is being reported. |
| value      | uint256 | The amount of `token` equal to one CELO, expressed as a fixidity value.      |
| lesserKey  | address | The element which should be just left of the new oracle value.               |
| greaterKey | address | The element which should be just right of the new oracle value.              |

## numRates

```solidity
function numRates(address token) public view returns (uint256)
```

Returns the number of rates.

### Parameters

| Name  | Type    | Description                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported. |

### Return Values

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| \[0] | uint256 | The number of reported oracle rates for `token`. |

## medianRate

```solidity
function medianRate(address token) external view returns (uint256, uint256)
```

Returns the median rate.

### Parameters

| Name  | Type    | Description                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported. |

### Return Values

| Name | Type    | Description                           |
| ---- | ------- | ------------------------------------- |
| \[0] | uint256 | The median exchange rate for `token`. |
| \[1] | uint256 | fixidity                              |

## getRates

```solidity
function getRates(address token) external view returns (address[], uint256[], enum SortedLinkedListWithMedian.MedianRelation[])
```

Gets all elements from the doubly linked list.

### Parameters

| Name  | Type    | Description                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported. |

### Return Values

| Name | Type                                              | Description                                                                   |
| ---- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| \[0] | address\[]                                        | keys Keys of nn unpacked list of elements from largest to smallest.           |
| \[1] | uint256\[]                                        | values Values of an unpacked list of elements from largest to smallest.       |
| \[2] | enum SortedLinkedListWithMedian.MedianRelation\[] | relations Relations of an unpacked list of elements from largest to smallest. |

## numTimestamps

```solidity
function numTimestamps(address token) public view returns (uint256)
```

Returns the number of timestamps.

### Parameters

| Name  | Type    | Description                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported. |

### Return Values

| Name | Type    | Description                                         |
| ---- | ------- | --------------------------------------------------- |
| \[0] | uint256 | The number of oracle report timestamps for `token`. |

## medianTimestamp

```solidity
function medianTimestamp(address token) external view returns (uint256)
```

Returns the median timestamp.

### Parameters

| Name  | Type    | Description                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported. |

### Return Values

| Name | Type    | Description                              |
| ---- | ------- | ---------------------------------------- |
| \[0] | uint256 | The median report timestamp for `token`. |

## getTimestamps

```solidity
function getTimestamps(address token) external view returns (address[], uint256[], enum SortedLinkedListWithMedian.MedianRelation[])
```

Gets all elements from the doubly linked list.

### Parameters

| Name  | Type    | Description                                                                  |
| ----- | ------- | ---------------------------------------------------------------------------- |
| token | address | The address of the token for which the CELO exchange rate is being reported. |

### Return Values

| Name | Type                                              | Description                                                                   |
| ---- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| \[0] | address\[]                                        | keys Keys of nn unpacked list of elements from largest to smallest.           |
| \[1] | uint256\[]                                        | values Values of an unpacked list of elements from largest to smallest.       |
| \[2] | enum SortedLinkedListWithMedian.MedianRelation\[] | relations Relations of an unpacked list of elements from largest to smallest. |

## reportExists

```solidity
function reportExists(address token, address oracle) internal view returns (bool)
```

Returns whether a report exists on token from oracle.

### Parameters

| Name   | Type    | Description                                                                  |
| ------ | ------- | ---------------------------------------------------------------------------- |
| token  | address | The address of the token for which the CELO exchange rate is being reported. |
| oracle | address | The oracle whose report should be checked.                                   |

## getOracles

```solidity
function getOracles(address token) external view returns (address[])
```

Returns the list of oracles for a particular token.

### Parameters

| Name  | Type    | Description                                                |
| ----- | ------- | ---------------------------------------------------------- |
| token | address | The address of the token whose oracles should be returned. |

### Return Values

| Name | Type       | Description                                 |
| ---- | ---------- | ------------------------------------------- |
| \[0] | address\[] | The list of oracles for a particular token. |

## getTokenReportExpirySeconds

```solidity
function getTokenReportExpirySeconds(address token) public view returns (uint256)
```

Returns the expiry for the token if exists, if not the default.

### Parameters

| Name  | Type    | Description               |
| ----- | ------- | ------------------------- |
| token | address | The address of the token. |

### Return Values

| Name | Type    | Description                   |
| ---- | ------- | ----------------------------- |
| \[0] | uint256 | The report expiry in seconds. |
