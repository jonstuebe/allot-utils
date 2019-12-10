import { addDays } from "date-fns";

import { renderTable } from "./utils";
import {
  getPayDays,
  createPaycheck,
  getPayPeriods,
  isPaycheckInPayPeriod
} from "./payday";
import { createBill, addFutureBillDates, isBillInPayPeriod } from "./bill";
import { Bills } from "./types";

console.clear();
// for dev

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

renderTable(payPeriods);
