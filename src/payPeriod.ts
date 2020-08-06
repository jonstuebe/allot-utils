import { addDays, format, differenceInDays } from "date-fns";

import {
  Bill,
  Bills,
  PayPeriod,
  PayPeriods,
  Paycheck,
  Paychecks
} from "./types";
import {
  isBillInPayPeriod,
  getBillAmountForPayPeriod,
  getBillEstimatedForPayPeriod
} from "./bill";
import { isBetween } from "./utils";

export function validatePayPeriod(
  payPeriod: PayPeriod,
  bills: Bills,
  paychecks: Paychecks
): PayPeriod {
  return {
    ...payPeriod,
    bills: bills.filter(bill => {
      return isBillInPayPeriod(bill, payPeriod);
    }),
    paychecks: paychecks.filter(paycheck => {
      return isPaycheckInPayPeriod(paycheck, payPeriod);
    })
  };
}

export function validatePayPeriods(
  payPeriods: PayPeriods,
  bills: Bills,
  paychecks: Paychecks
): PayPeriods {
  return payPeriods.map(payPeriod =>
    validatePayPeriod(payPeriod, bills, paychecks)
  );
}

export function totalIncomeInPayPeriod(payPeriod: PayPeriod): number {
  return payPeriod.paychecks
    .filter(paycheck => {
      return isPaycheckInPayPeriod(paycheck, payPeriod);
    })
    .reduce((acc, paycheck) => {
      const amount = paycheck.amount ? paycheck.amount : 0;
      return acc + amount;
    }, 0);
}

export function totalBillsInPayPeriod(payPeriod: PayPeriod): number {
  return payPeriod.bills
    .filter((bill: Bill) => {
      return isBillInPayPeriod(bill, payPeriod);
    })
    .reduce(
      (acc, bill: Bill) => acc + getBillAmountForPayPeriod(bill, payPeriod),
      0
    );
}

export function totalEstimatedBillsInPayPeriod(payPeriod: PayPeriod): number {
  return payPeriod.bills
    .filter((bill: Bill) => {
      return isBillInPayPeriod(bill, payPeriod);
    })
    .reduce(
      (acc, bill: Bill) => acc + getBillEstimatedForPayPeriod(bill, payPeriod),
      0
    );
}

export function getPayPeriods(paydays: Date[]): PayPeriod[] {
  return paydays.map((payday, index) => {
    let end = paydays[index + 1]
      ? addDays(paydays[index + 1], -1)
      : addDays(payday, differenceInDays(payday, paydays[index - 1]));
    return {
      start: payday,
      end,
      bills: [],
      paychecks: []
    };
  });
}

export function formatPayPeriodDate(
  { start, end }: PayPeriod,
  formatType = "MMM do y"
) {
  return `${format(start, formatType)} - ${format(end, formatType)}`;
}

export function isPaycheckInPayPeriod(
  paycheck: Paycheck,
  payPeriod: PayPeriod
): Boolean {
  return isBetween(paycheck.date, payPeriod.start, payPeriod.end, true);
}
