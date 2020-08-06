
# @jonstuebe/allot-utils

Util functions for Allot

## Install

```
yarn add @jonstuebe/allot-utils date-fns date-fns-holiday-us
```

or with npm:

```
npm i @jonstuebe/allot-utils date-fns date-fns-holiday-us
```

## API

### Interfaces

* [Bill](interfaces/bill.md)
* [InitialBill](interfaces/initialbill.md)
* [PayPeriod](interfaces/payperiod.md)
* [Paycheck](interfaces/paycheck.md)

### Type aliases

* [Bills](README.md#bills)
* [DayOfMonthIndex](README.md#dayofmonthindex)
* [DayOfWeekIndex](README.md#dayofweekindex)
* [MonthIndex](README.md#monthindex)
* [PayPeriods](README.md#payperiods)
* [Paychecks](README.md#paychecks)
* [YearIndexes](README.md#yearindexes)

### Functions

* [addFutureBillDates](README.md#addfuturebilldates)
* [chunk](README.md#chunk)
* [createBill](README.md#createbill)
* [createPaycheck](README.md#createpaycheck)
* [firstDayOfMonth](README.md#firstdayofmonth)
* [formatCurrency](README.md#formatcurrency)
* [formatPayPeriodDate](README.md#formatpayperioddate)
* [getBillAmountForPayPeriod](README.md#getbillamountforpayperiod)
* [getBillDatesForPayPeriod](README.md#getbilldatesforpayperiod)
* [getFutureBillDates](README.md#getfuturebilldates)
* [getPayPeriods](README.md#getpayperiods)
* [getPaydays](README.md#getpaydays)
* [getSemiMonthlyForDate](README.md#getsemimonthlyfordate)
* [getSemiMonthlyForMonth](README.md#getsemimonthlyformonth)
* [isBetween](README.md#isbetween)
* [isBillInPayPeriod](README.md#isbillinpayperiod)
* [isPaycheckInPayPeriod](README.md#ispaycheckinpayperiod)
* [parseISO](README.md#parseiso)
* [renderTable](README.md#rendertable)
* [totalBillsInPayPeriod](README.md#totalbillsinpayperiod)
* [totalIncomeInPayPeriod](README.md#totalincomeinpayperiod)
* [validatePayPeriod](README.md#validatepayperiod)
* [validatePayPeriods](README.md#validatepayperiods)

## Type aliases

###  Bills

Ƭ **Bills**: *[Bill](interfaces/bill.md)[]*

*Defined in [types.ts:16](https://github.com/jonstuebe/allot-utils/blob/master/src/types.ts#L16)*

___

###  DayOfMonthIndex

Ƭ **DayOfMonthIndex**: *0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30*

*Defined in [types.ts:18](https://github.com/jonstuebe/allot-utils/blob/master/src/types.ts#L18)*

___

###  DayOfWeekIndex

Ƭ **DayOfWeekIndex**: *0 | 1 | 2 | 3 | 4 | 5 | 6*

*Defined in [types.ts:17](https://github.com/jonstuebe/allot-utils/blob/master/src/types.ts#L17)*

___

###  MonthIndex

Ƭ **MonthIndex**: *0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11*

*Defined in [types.ts:50](https://github.com/jonstuebe/allot-utils/blob/master/src/types.ts#L50)*

___

###  PayPeriods

Ƭ **PayPeriods**: *[PayPeriod](interfaces/payperiod.md)[]*

*Defined in [types.ts:1](https://github.com/jonstuebe/allot-utils/blob/master/src/types.ts#L1)*

___

###  Paychecks

Ƭ **Paychecks**: *[Paycheck](interfaces/paycheck.md)[]*

*Defined in [types.ts:9](https://github.com/jonstuebe/allot-utils/blob/master/src/types.ts#L9)*

___

###  YearIndexes

Ƭ **YearIndexes**: *[[MonthIndex](README.md#monthindex), [DayOfMonthIndex](README.md#dayofmonthindex)]*

*Defined in [types.ts:51](https://github.com/jonstuebe/allot-utils/blob/master/src/types.ts#L51)*

## Functions

###  addFutureBillDates

▸ **addFutureBillDates**(`bill`: [Bill](interfaces/bill.md), `numDates`: number): *object*

*Defined in [bill.ts:68](https://github.com/jonstuebe/allot-utils/blob/master/src/bill.ts#L68)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bill` | [Bill](interfaces/bill.md) | - |
`numDates` | number | 3 |

**Returns:** *object*

* **dueDates**: *Date[]* = getFutureBillDates(bill, numDates)

___

###  chunk

▸ **chunk**(`array`: Array‹any›, `size`: number): *Array‹any›*

*Defined in [utils.ts:10](https://github.com/jonstuebe/allot-utils/blob/master/src/utils.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`array` | Array‹any› |
`size` | number |

**Returns:** *Array‹any›*

___

###  createBill

▸ **createBill**(`bill`: [InitialBill](interfaces/initialbill.md)): *object*

*Defined in [bill.ts:96](https://github.com/jonstuebe/allot-utils/blob/master/src/bill.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`bill` | [InitialBill](interfaces/initialbill.md) |

**Returns:** *object*

* **dueDates**: *never[]* = []

___

###  createPaycheck

▸ **createPaycheck**(`paycheck`: [Paycheck](interfaces/paycheck.md)): *[Paycheck](interfaces/paycheck.md)*

*Defined in [paycheck.ts:3](https://github.com/jonstuebe/allot-utils/blob/master/src/paycheck.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`paycheck` | [Paycheck](interfaces/paycheck.md) |

**Returns:** *[Paycheck](interfaces/paycheck.md)*

___

###  firstDayOfMonth

▸ **firstDayOfMonth**(`date`: Date): *Date*

*Defined in [payday.ts:13](https://github.com/jonstuebe/allot-utils/blob/master/src/payday.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *Date*

___

###  formatCurrency

▸ **formatCurrency**(`amount`: number, `country`: string, `currency`: string): *string*

*Defined in [utils.ts:47](https://github.com/jonstuebe/allot-utils/blob/master/src/utils.ts#L47)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`amount` | number | - |
`country` | string | "en-US" |
`currency` | string | "USD" |

**Returns:** *string*

___

###  formatPayPeriodDate

▸ **formatPayPeriodDate**(`__namedParameters`: object, `formatType`: string): *string*

*Defined in [payPeriod.ts:68](https://github.com/jonstuebe/allot-utils/blob/master/src/payPeriod.ts#L68)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`end` | Date |
`start` | Date |

▪`Default value`  **formatType**: *string*= "MMM do y"

**Returns:** *string*

___

###  getBillAmountForPayPeriod

▸ **getBillAmountForPayPeriod**(`bill`: [Bill](interfaces/bill.md), `payPeriod`: [PayPeriod](interfaces/payperiod.md)): *number*

*Defined in [bill.ts:75](https://github.com/jonstuebe/allot-utils/blob/master/src/bill.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`bill` | [Bill](interfaces/bill.md) |
`payPeriod` | [PayPeriod](interfaces/payperiod.md) |

**Returns:** *number*

___

###  getBillDatesForPayPeriod

▸ **getBillDatesForPayPeriod**(`__namedParameters`: object, `__namedParameters`: object): *Date[]*

*Defined in [bill.ts:84](https://github.com/jonstuebe/allot-utils/blob/master/src/bill.ts#L84)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dueDates` | Date[] |

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`end` | Date |
`start` | Date |

**Returns:** *Date[]*

___

###  getFutureBillDates

▸ **getFutureBillDates**(`__namedParameters`: object, `numDates`: number): *Date[]*

*Defined in [bill.ts:21](https://github.com/jonstuebe/allot-utils/blob/master/src/bill.ts#L21)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`due` | object |
`startOn` | Date |

▪`Default value`  **numDates**: *number*= 3

**Returns:** *Date[]*

___

###  getPayPeriods

▸ **getPayPeriods**(`paydays`: Date[]): *[PayPeriod](interfaces/payperiod.md)[]*

*Defined in [payPeriod.ts:54](https://github.com/jonstuebe/allot-utils/blob/master/src/payPeriod.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`paydays` | Date[] |

**Returns:** *[PayPeriod](interfaces/payperiod.md)[]*

___

###  getPaydays

▸ **getPaydays**(`type`: "weekly" | "bi_weekly" | "semi_monthly" | "monthly", `startOn`: Date, `numPaydays`: number, `opts?`: undefined | object): *Array‹Date›*

*Defined in [payday.ts:53](https://github.com/jonstuebe/allot-utils/blob/master/src/payday.ts#L53)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`type` | "weekly" &#124; "bi_weekly" &#124; "semi_monthly" &#124; "monthly" | - |
`startOn` | Date | - |
`numPaydays` | number | 12 |
`opts?` | undefined &#124; object | - |

**Returns:** *Array‹Date›*

___

###  getSemiMonthlyForDate

▸ **getSemiMonthlyForDate**(`date`: Date): *Date[]*

*Defined in [payday.ts:17](https://github.com/jonstuebe/allot-utils/blob/master/src/payday.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *Date[]*

___

###  getSemiMonthlyForMonth

▸ **getSemiMonthlyForMonth**(`date`: Date): *Date[]*

*Defined in [payday.ts:49](https://github.com/jonstuebe/allot-utils/blob/master/src/payday.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`date` | Date |

**Returns:** *Date[]*

___

###  isBetween

▸ **isBetween**(`date`: Date, `start`: Date, `end`: Date, `includeEqual`: boolean): *Boolean*

*Defined in [utils.ts:32](https://github.com/jonstuebe/allot-utils/blob/master/src/utils.ts#L32)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`date` | Date | - |
`start` | Date | - |
`end` | Date | - |
`includeEqual` | boolean | false |

**Returns:** *Boolean*

___

###  isBillInPayPeriod

▸ **isBillInPayPeriod**(`bill`: [Bill](interfaces/bill.md), `payPeriod`: [PayPeriod](interfaces/payperiod.md)): *boolean*

*Defined in [bill.ts:80](https://github.com/jonstuebe/allot-utils/blob/master/src/bill.ts#L80)*

**Parameters:**

Name | Type |
------ | ------ |
`bill` | [Bill](interfaces/bill.md) |
`payPeriod` | [PayPeriod](interfaces/payperiod.md) |

**Returns:** *boolean*

___

###  isPaycheckInPayPeriod

▸ **isPaycheckInPayPeriod**(`paycheck`: [Paycheck](interfaces/paycheck.md), `payPeriod`: [PayPeriod](interfaces/payperiod.md)): *Boolean*

*Defined in [payPeriod.ts:75](https://github.com/jonstuebe/allot-utils/blob/master/src/payPeriod.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`paycheck` | [Paycheck](interfaces/paycheck.md) |
`payPeriod` | [PayPeriod](interfaces/payperiod.md) |

**Returns:** *Boolean*

___

###  parseISO

▸ **parseISO**(`dateISO`: string): *Date*

*Defined in [utils.ts:23](https://github.com/jonstuebe/allot-utils/blob/master/src/utils.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`dateISO` | string |

**Returns:** *Date*

___

###  renderTable

▸ **renderTable**(`payPeriods`: [PayPeriods](README.md#payperiods)): *void*

*Defined in [utils.ts:58](https://github.com/jonstuebe/allot-utils/blob/master/src/utils.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`payPeriods` | [PayPeriods](README.md#payperiods) |

**Returns:** *void*

___

###  totalBillsInPayPeriod

▸ **totalBillsInPayPeriod**(`payPeriod`: [PayPeriod](interfaces/payperiod.md)): *number*

*Defined in [payPeriod.ts:47](https://github.com/jonstuebe/allot-utils/blob/master/src/payPeriod.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`payPeriod` | [PayPeriod](interfaces/payperiod.md) |

**Returns:** *number*

___

###  totalIncomeInPayPeriod

▸ **totalIncomeInPayPeriod**(`payPeriod`: [PayPeriod](interfaces/payperiod.md)): *number*

*Defined in [payPeriod.ts:40](https://github.com/jonstuebe/allot-utils/blob/master/src/payPeriod.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`payPeriod` | [PayPeriod](interfaces/payperiod.md) |

**Returns:** *number*

___

###  validatePayPeriod

▸ **validatePayPeriod**(`payPeriod`: [PayPeriod](interfaces/payperiod.md), `bills`: [Bills](README.md#bills), `paychecks`: [Paychecks](README.md#paychecks)): *object*

*Defined in [payPeriod.ts:14](https://github.com/jonstuebe/allot-utils/blob/master/src/payPeriod.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`payPeriod` | [PayPeriod](interfaces/payperiod.md) |
`bills` | [Bills](README.md#bills) |
`paychecks` | [Paychecks](README.md#paychecks) |

**Returns:** *object*

* **bills**: *[Bill](interfaces/bill.md)[]* = bills.filter((bill: Bill) => {
      return isBillInPayPeriod(bill, payPeriod);
    })

* **paychecks**: *[Paycheck](interfaces/paycheck.md)[]* = paychecks.filter((paycheck: Paycheck) => {
      return isPaycheckInPayPeriod(paycheck, payPeriod);
    })

___

###  validatePayPeriods

▸ **validatePayPeriods**(`payPeriods`: [PayPeriods](README.md#payperiods), `bills`: [Bills](README.md#bills), `paychecks`: [Paychecks](README.md#paychecks)): *object[]*

*Defined in [payPeriod.ts:30](https://github.com/jonstuebe/allot-utils/blob/master/src/payPeriod.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`payPeriods` | [PayPeriods](README.md#payperiods) |
`bills` | [Bills](README.md#bills) |
`paychecks` | [Paychecks](README.md#paychecks) |

**Returns:** *object[]*

&copy; 2020 Jon Stuebe
