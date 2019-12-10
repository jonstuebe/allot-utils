import { addWeeks, format } from "date-fns";

import {
  Bill,
  Bills,
  PayPeriod,
  PayPeriods,
  Paycheck,
  Paychecks
} from "./types";
import { isBillInPayPeriod } from "./bill";
import { isBetween } from "./utils";

export function validatePayPeriod(
  payPeriod: PayPeriod,
  bills: Bills,
  paychecks: Paychecks
) {
  return {
    ...payPeriod,
    bills: bills.filter((bill: Bill) => {
      return isBillInPayPeriod(bill, payPeriod);
    }),
    paychecks: paychecks.filter((paycheck: Paycheck) => {
      return isPaycheckInPayPeriod(paycheck, payPeriod);
    })
  };
}

export function validatePayPeriods(
  payPeriods: PayPeriods,
  bills: Bills,
  paychecks: Paychecks
) {
  return payPeriods.map(payPeriod =>
    validatePayPeriod(payPeriod, bills, paychecks)
  );
}

export function totalIncomeInPayPeriod(payPeriod: PayPeriod) {
  return payPeriod.paychecks.reduce(
    (acc, paycheck: Paycheck) => acc + paycheck.amount,
    0
  );
}

export function getPayPeriods(paydays: Date[]): PayPeriod[] {
  return paydays.map(payday => ({
    start: addWeeks(payday, -2),
    end: payday,
    bills: [],
    paychecks: []
  }));
}

export function formatPayPeriodDate({ start, end }: PayPeriod) {
  const formatType = "MMM do y";
  return `${format(start, formatType)} - ${format(end, formatType)}`;
}

export function totalBillsInPayPeriod(payPeriod: PayPeriod) {
  return payPeriod.bills.reduce((acc, bill: Bill) => acc + bill.amount, 0);
}

export function isPaycheckInPayPeriod(
  paycheck: Paycheck,
  payPeriod: PayPeriod
): Boolean {
  return isBetween(paycheck.date, payPeriod.start, payPeriod.end);
}