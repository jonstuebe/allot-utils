import {
  format,
  addMonths,
  addDays,
  setDate as setDayOfMonth,
  getDate as getDayOfMonth
} from "date-fns";

import {
  getPayDays,
  getPayPeriods,
  createPaycheck,
  isPaycheckInPayPeriod
} from "./payday";
import { isBetween } from "./utils";
import { InitialBill, Bill, Bills, PayPeriod, PayPeriods } from "./types";

console.clear();
// for dev

function getFutureBillDates(
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

function addFutureBillDates(bill: Bill, startOn: Date, numDates = 3) {
  return {
    ...bill,
    dueDates: getFutureBillDates(bill, startOn, numDates)
  };
}

function findPayPeriodIndexesByBillDates(
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

function isBillInPayPeriod(
  { dueDates }: Bill,
  { start, end }: PayPeriod
): boolean {
  return (
    dueDates.filter(dueDate => {
      return isBetween(dueDate, start, end);
    }).length > 0
  );
}

function findPayPeriodsByBillDates(
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
function findPayPeriodsByBill(
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

const startingDate = new Date(2019, 10, 22, 0, 0, 0);
const payDays = getPayDays("bi-weekly", startingDate);
const bills: Bills = [
  createBill({
    name: "Rent",
    amount: 1041.6,
    dueOn: {
      dayOfMonth: 1
    }
  })
].map(bill => addFutureBillDates(bill, startingDate));
const paychecks = [
  createPaycheck({
    amount: 1200,
    date: addDays(startingDate, 12)
  })
];
const payPeriods = getPayPeriods(payDays).map(payPeriod => {
  return {
    ...payPeriod,
    bills: bills.filter(bill => {
      return isBillInPayPeriod(bill, payPeriod);
    }),
    paychecks: paychecks.filter(paycheck => {
      return isPaycheckInPayPeriod(paycheck, payPeriod);
    })
  };
});

console.log(JSON.stringify(payPeriods, null, 2));

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

function renderTable(
  payPeriods: Array<[Date, Date]>,
  bills: number[],
  paychecks: number[]
) {
  const payPeriodsFormatted = payPeriods.map(([start, end]) => {
    const formatType = "MMM do y";
    return `${format(start, formatType)} - ${format(end, formatType)}`;
  }) as string[];
  const remaining = bills.map((bill, index) => {
    return parseFloat((paychecks[index] - bill).toFixed(2));
  });

  const table = payPeriodsFormatted.map((payPeriod, index) => {
    return {
      "Pay Period": payPeriod,
      Bills: bills[index] ? formatCurrency(bills[index]) : undefined,
      Income: paychecks[index] ? formatCurrency(paychecks[index]) : undefined,
      Remaining: remaining[index] ? formatCurrency(remaining[index]) : undefined
    };
  });

  console.table(table);
}

// renderTable(payPeriods);
