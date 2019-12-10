import { format, addMonths, setDate as setDayOfMonth } from "date-fns";

import { isBetween } from "./utils";
import { InitialBill, Bill, PayPeriod, PayPeriods } from "./types";

export function getFutureBillDates(
  { dueOn }: Bill,
  startOn: Date,
  numDates = 3
): Date[] {
  if (dueOn.dayOfMonth) {
    return new Array(numDates).fill(startOn).map((_date, index) => {
      return setDayOfMonth(
        addMonths(startOn, index),
        dueOn.dayOfMonth as number
      );
    });
  }

  return [startOn];
}

export function addFutureBillDates(bill: Bill, startOn: Date, numDates = 3) {
  return {
    ...bill,
    dueDates: getFutureBillDates(bill, startOn, numDates)
  };
}

export function findPayPeriodIndexesByBillDates(
  payPeriods: PayPeriods,
  billDates: Date[]
) {
  return billDates
    .map(billDate => {
      return payPeriods
        .map(({ start, end }: PayPeriod, index) => {
          return isBetween(billDate, start, end) ? index : false;
        })
        .filter((payPeriod: number | false) => payPeriod !== false);
    })
    .reduce((acc, cur) => acc.concat(cur), []);
}

export function isBillInPayPeriod(
  { dueDates }: Bill,
  { start, end }: PayPeriod
): boolean {
  return (
    dueDates.filter(dueDate => {
      return isBetween(dueDate, start, end);
    }).length > 0
  );
}

export function findPayPeriodsByBillDates(
  payPeriods: PayPeriods,
  billDates: Date[]
): PayPeriods {
  return billDates
    .map(billDate => {
      return payPeriods.filter(({ start, end }: PayPeriod) => {
        return isBetween(billDate, start, end);
      });
    })
    .reduce((acc, cur) => acc.concat(cur), []);
}
export function findPayPeriodsByBill(
  payPeriods: PayPeriods,
  bill: Bill,
  startDate: Date
) {
  return findPayPeriodsByBillDates(
    payPeriods,
    getFutureBillDates(bill, startDate)
  );
}

export function addBillToPayPeriod(payPeriod: PayPeriod, bill: Bill) {
  return {
    ...payPeriod,
    bills: [...payPeriod.bills, bill]
  };
}

export function totalBillsInPayPeriod(payPeriod: PayPeriod) {
  return payPeriod.bills.reduce((acc, bill: Bill) => acc + bill.amount, 0);
}

export function createBill(bill: InitialBill) {
  return {
    dueDates: [],
    ...bill
  };
}

export function formatPayPeriodDate({ start, end }: PayPeriod) {
  const formatType = "MMM do y";
  return `${format(start, formatType)} - ${format(end, formatType)}`;
}
