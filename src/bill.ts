import {
  isAfter,
  isSameDay,
  setDay as setDayOfWeek,
  setDate as setDayOfMonth,
  setMonth,
  eachDayOfInterval
} from "date-fns";

import { Bill, PayPeriod } from "./types";

export function getBillDates({ due }: Bill, start: Date, end: Date): Date[] {
  if (!isAfter(end, start)) {
    throw new Error("End date must come after start date");
  }

  return eachDayOfInterval({ start, end }).filter(day => {
    if (due.weekly) {
      return isSameDay(day, setDayOfWeek(day, due.weekly)) ? true : false;
    } else if (due.monthly) {
      return isSameDay(day, setDayOfMonth(day, due.monthly)) ? true : false;
    } else if (due.yearly) {
      const [monthIndex, dayOfMonthIndex] = due.yearly;
      return isSameDay(
        day,
        setDayOfMonth(setMonth(day, monthIndex), dayOfMonthIndex)
      )
        ? true
        : false;
    }

    return false;
  });
}

export function getBillAmountForPayPeriod(
  bill: Bill,
  payPeriod: PayPeriod
): number {
  const amount = bill.amount ? bill.amount : 0;
  const billDates = getBillDatesForPayPeriod(bill, payPeriod);
  return billDates.length > 0 ? amount * billDates.length : 0;
}

export function getBillEstimatedForPayPeriod(
  bill: Bill,
  payPeriod: PayPeriod
): number {
  const billDates = getBillDatesForPayPeriod(bill, payPeriod);
  return billDates.length > 0 ? bill.estimated * billDates.length : 0;
}

export function isBillInPayPeriod(bill: Bill, payPeriod: PayPeriod): boolean {
  return getBillDatesForPayPeriod(bill, payPeriod).length > 0;
}

export function getBillDatesForPayPeriod(
  bill: Bill,
  { start, end }: PayPeriod
) {
  return getBillDates(bill, start, end);
}

export function createBill({
  type = "source",
  amount = 0,
  autoPay = false,
  paid = false,
  ...bill
}: Bill) {
  return {
    type,
    amount,
    autoPay,
    paid,
    ...bill
  };
}
