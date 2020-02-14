import {
  addMonths,
  addYears,
  addWeeks,
  getDaysInMonth,
  getDay as getDayOfWeek,
  setMonth,
  setDate as setDayOfMonth,
  isLeapYear,
  isEqual,
  isAfter
} from "date-fns";

import { isBetween } from "./utils";
import {
  InitialBill,
  Bill,
  PayPeriod,
  DayOfWeekIndex,
  MonthIndex,
  YearIndexes
} from "./types";

export function getFutureBillDates(
  { due, startOn }: Bill,
  numDates = 3
): Date[] {
  if (due.weekly) {
    let weekly = due.weekly as DayOfWeekIndex;

    if (getDayOfWeek(startOn) !== weekly) {
      throw new Error(
        "startOn must have the same day of week as the due date of the bill"
      );
    }

    return new Array(numDates).fill(startOn).map((date, index) => {
      return addWeeks(date, index);
    });
  } else if (due.monthly) {
    let monthly = due.monthly as MonthIndex;
    return new Array(numDates).fill(startOn).map((_date, index) => {
      const date = addMonths(startOn, index);
      const daysInMonth = getDaysInMonth(date);
      return setDayOfMonth(date, monthly > daysInMonth ? daysInMonth : monthly);
    });
  } else if (due.yearly) {
    let [yearMonth, yearDayOfMonth] = due.yearly as YearIndexes;
    // these should be zero indexed

    const yearlyDate = new Date(
      startOn.getFullYear(),
      yearMonth,
      yearDayOfMonth
    );

    if (!isEqual(startOn, yearlyDate)) {
      throw new Error(
        "startOn must have the same month and day as the due date of the bill"
      );
    }

    return new Array(numDates).fill(yearlyDate).map((_date, index) => {
      return addYears(yearlyDate, index);
    });
  }

  throw new Error("No schedule added");
}

export function addFutureBillDates(bill: Bill, numDates = 3) {
  return {
    ...bill,
    dueDates: getFutureBillDates(bill, numDates)
  };
}

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

export function createBill(bill: InitialBill) {
  return {
    dueDates: [],
    ...bill
  };
}
