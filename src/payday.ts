import { addWeeks } from "date-fns";

import { PayPeriod, Paycheck } from "./types";
import { isBetween } from "./utils";

export function getPayDays(
  type: "bi-weekly",
  startOn: Date,
  numPayDays = 12
): Date[] {
  if (type === "bi-weekly") {
    return new Array(numPayDays).fill(startOn).map((payDay, index) => {
      return addWeeks(payDay, index * 2);
    });
  }
  return [startOn];
}

export function createPaycheck(paycheck: Paycheck) {
  return paycheck;
}

export function isPaycheckInPayPeriod(
  paycheck: Paycheck,
  payPeriod: PayPeriod
): Boolean {
  return isBetween(paycheck.date, payPeriod.start, payPeriod.end);
}

export function addPaycheckToPayPeriod(
  paycheck: Paycheck,
  payPeriod: PayPeriod
): PayPeriod {
  return {
    ...payPeriod,
    paychecks: [...payPeriod.paychecks, paycheck]
  };
}

export function totalIncomeInPayPeriod(payPeriod: PayPeriod) {
  return payPeriod.paychecks.reduce(
    (acc, paycheck: Paycheck) => acc + paycheck.amount,
    0
  );
}

export function getPayPeriods(payDays: Date[]): PayPeriod[] {
  return payDays.map(payDay => ({
    start: addWeeks(payDay, -2),
    end: payDay,
    bills: [],
    paychecks: []
  }));
}
