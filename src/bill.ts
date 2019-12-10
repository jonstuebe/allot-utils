import {
  addMonths,
  addYears,
  getDaysInMonth,
  setMonth,
  setDate as setDayOfMonth,
  isLeapYear,
  isEqual,
  isAfter
} from "date-fns";

import { isBetween } from "./utils";
import { InitialBill, Bill, PayPeriod } from "./types";

export function getFutureBillDates(
  { due }: Bill,
  startOn: Date,
  numDates = 3
): Date[] {
  if (due.yearly) {
    let [yearMonth, yearDayOfMonth] = due.yearly as [number, number];
    // these should be zero indexed

    const yearlyDate = new Date(
      startOn.getFullYear(),
      yearMonth,
      yearDayOfMonth
    );

    if (!isEqual(startOn, yearlyDate)) {
      throw new Error(
        "startOn must have the same month and day as the due date of the bill."
      );
    }

    return new Array(numDates).fill(yearlyDate).map((_date, index) => {
      return addYears(yearlyDate, index);
    });
  } else if (due.monthly) {
    let monthly = due.monthly as number;
    return new Array(numDates).fill(startOn).map((_date, index) => {
      const date = addMonths(startOn, index);
      const daysInMonth = getDaysInMonth(date);
      return setDayOfMonth(date, monthly > daysInMonth ? daysInMonth : monthly);
    });
  }

  throw new Error("No schedule added");
}

export function addFutureBillDates(bill: Bill, startOn: Date, numDates = 3) {
  return {
    ...bill,
    dueDates: getFutureBillDates(bill, startOn, numDates)
  };
}

// export function findPayPeriodIndexesByBillDates(
//   payPeriods: PayPeriods,
//   billDates: Date[]
// ) {
//   return billDates
//     .map(billDate => {
//       return payPeriods
//         .map(({ start, end }: PayPeriod, index) => {
//           return isBetween(billDate, start, end) ? index : false;
//         })
//         .filter((payPeriod: number | false) => payPeriod !== false);
//     })
//     .reduce((acc, cur) => acc.concat(cur), []);
// }

export function isBillInPayPeriod(
  { dueDates }: Bill,
  { start, end }: PayPeriod
): boolean {
  if (dueDates.length === 0) {
    throw new Error("No due dates found in bill. Have you added them?");
  }
  return (
    dueDates.filter(dueDate => {
      return isBetween(dueDate, start, end);
    }).length > 0
  );
}

// export function findPayPeriodsByBillDates(
//   payPeriods: PayPeriods,
//   billDates: Date[]
// ): PayPeriods {
//   return billDates
//     .map(billDate => {
//       return payPeriods.filter(({ start, end }: PayPeriod) => {
//         return isBetween(billDate, start, end);
//       });
//     })
//     .reduce((acc, cur) => acc.concat(cur), []);
// }

// export function findPayPeriodsByBill(
//   payPeriods: PayPeriods,
//   bill: Bill,
//   startDate: Date
// ) {
//   return findPayPeriodsByBillDates(
//     payPeriods,
//     getFutureBillDates(bill, startDate)
//   );
// }

// export function addBillToPayPeriod(payPeriod: PayPeriod, bill: Bill) {
//   return {
//     ...payPeriod,
//     bills: [...payPeriod.bills, bill]
//   };
// }

export function createBill(bill: InitialBill) {
  return {
    dueDates: [],
    ...bill
  };
}
