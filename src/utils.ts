import { isBefore, isAfter, isEqual } from "date-fns";

import { PayPeriods } from "./types";
import {
  totalBillsInPayPeriod,
  totalIncomeInPayPeriod,
  formatPayPeriodDate
} from "./payPeriod";

export function chunk(array: Array<any>, size: number): Array<any> {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

export function strToDate(
  date: string,
  format: "YYYY-MM-DD" | "MM-DD-YYYY" | "MM/DD/YYYY" = "YYYY-MM-DD"
): Date {
  let year, month, day;
  const delimiter = format === "MM/DD/YYYY" ? "/" : "-";
  const dateArr = date.split(delimiter);
  switch (format) {
    case "MM-DD-YYYY":
      [month, day, year] = dateArr;
      break;
    case "MM/DD/YYYY":
      [month, day, year] = dateArr;
      break;
    default:
      [year, month, day] = dateArr;
      break;
  }

  return createDate(Number(year), Number(month), Number(day));
}

export function createDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

export function isBetween(
  date: Date,
  start: Date,
  end: Date,
  includeEqual = false
): Boolean {
  const between = isBefore(date, end) && isAfter(date, start);

  if (includeEqual) {
    return between || isEqual(date, start) || isEqual(date, end);
  }

  return between;
}

export function formatCurrency(
  amount: number,
  country = "en-US",
  currency = "USD"
): string {
  return new Intl.NumberFormat(country, {
    style: "currency",
    currency
  }).format(amount);
}

export function renderTable(payPeriods: PayPeriods) {
  const table = payPeriods.map((payPeriod, index) => {
    const bills =
      payPeriod.bills.length > 0 ? totalBillsInPayPeriod(payPeriod) : 0;
    const income =
      payPeriod.paychecks.length > 0 ? totalIncomeInPayPeriod(payPeriod) : 0;

    return {
      "Pay Period": formatPayPeriodDate(payPeriod),
      Bills: formatCurrency(bills),
      Income: formatCurrency(income),
      Remaining: formatCurrency(income - bills)
    };
  });

  console.table(table);
}
