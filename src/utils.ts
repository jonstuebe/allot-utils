import { isBefore, isAfter } from "date-fns";

import { PayPeriods } from "./types";
import { totalBillsInPayPeriod, formatPayPeriodDate } from "./bill";
import { totalIncomeInPayPeriod } from "./payday";

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
