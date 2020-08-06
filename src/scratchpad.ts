import {
  startOfDay,
  addWeeks,
  addMonths,
  isBefore,
  isAfter,
  differenceInWeeks
} from "date-fns";

import { PayFrequencyEnum } from "./types";

import { strToDate } from "./utils";
import { getPaydays } from "./payday";
import { getPayPeriods, validatePayPeriods } from "./payPeriod";
import { createBill, getBillDates } from "./bill";
import { createPaycheck } from "./paycheck";

const job = {
  company: "Babydoll Hair",
  payFrequency: PayFrequencyEnum.biWeekly,
  startOn: strToDate("2018-02-14"),
  estimated: 0
};

const sourceBills = [
  createBill({
    name: "Mesa Utilities",
    estimated: 100,
    autoPay: true,
    due: {
      monthly: 18
      // yearly: [2, 18]
    },
    startOn: strToDate("2020-02-18")
  })
];

const paydays = getPaydays(job.payFrequency, job.startOn);
const pastPayPeriods = validatePayPeriods(
  getPayPeriods(paydays.filter(payday => isBefore(payday, new Date()))),
  sourceBills,
  []
);
// console.log(pastPayPeriods);

const futurePayPeriods = validatePayPeriods(
  getPayPeriods(paydays.filter(payday => isAfter(payday, new Date()))),
  sourceBills,
  []
);

// console.log(futurePayPeriods);

// const paycheck = createPaycheck({
//   estimated: 1500,
//   amount: 1249.5,
//   date: strToDate("2018-02-27"),
//   jobId: "sd0f9sdfkl"
// });

// const bills = [
//   {
//     name: "Mesa Utilities",
//     amount: 109.56,
//     paid: false,
//     paidOn: strToDate("2020-02-19")
//   }
// ];

// console.log(
//   "estimatedBillsAmount",
//   sourceBills.reduce((acc, bill) => {
//     return acc + bill.estimated;
//   }, 0)
// );

// console.log(
//   "actualBillsAmount",
//   bills.reduce((acc, bill) => {
//     return acc + bill.amount;
//   }, 0)
// );
