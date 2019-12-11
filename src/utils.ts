import { isBefore, isAfter } from "date-fns";

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

export function isBetween(date: Date, start: Date, end: Date): Boolean {
  return isBefore(date, end) && isAfter(date, start);
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
