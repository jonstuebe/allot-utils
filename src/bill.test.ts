import {
  addFutureBillDates,
  createBill,
  getFutureBillDates,
  isBillInPayPeriod
} from "./bill";
import { getPaydays } from "./payday";
import { getPayPeriods, validatePayPeriods } from "./payPeriod";
import { createPaycheck } from "./paycheck";

const bill = createBill({
  name: "Rent",
  amount: 1200,
  dueOn: { dayOfMonth: 1 }
});
const startingDate = new Date(2019, 10, 22, 0, 0, 0);
// const paychecks = [
//   createPaycheck({ amount: 1500, date: new Date(2019, 11, 15) }),
//   createPaycheck({ amount: 1500, date: new Date(2019, 11, 30) })
// ];
const paydays = getPaydays("bi-weekly", startingDate);
const payPeriods = validatePayPeriods(
  getPayPeriods(paydays),
  [addFutureBillDates(bill, startingDate)],
  []
);

describe("createBill", () => {
  it("returns a bill with a monthly due date", () => {
    expect(bill).toEqual({
      name: "Rent",
      amount: 1200,
      dueOn: {
        dayOfMonth: 1
      },
      dueDates: []
    });
  });
});

describe("getFutureBillDates", () => {
  it("returns an array of dates", () => {
    expect(getFutureBillDates(bill, new Date(2019, 11, 1))).toEqual([
      new Date(2019, 11, 1),
      new Date(2020, 0, 1),
      new Date(2020, 1, 1)
    ]);
  });
  it("throws error", () => {
    expect(() =>
      getFutureBillDates(
        createBill({
          name: "rent",
          amount: 1200,
          dueOn: {}
        }),
        new Date(2019, 11, 1)
      )
    ).toThrow("No schedule added");
  });
});

describe("addFutureBillDates", () => {
  it("adds an array of bill dates to a Bill", () => {
    expect(addFutureBillDates(bill, new Date(2019, 11, 1))).toEqual({
      name: "Rent",
      amount: 1200,
      dueOn: {
        dayOfMonth: 1
      },
      dueDates: [
        new Date(2019, 11, 1),
        new Date(2020, 0, 1),
        new Date(2020, 1, 1)
      ]
    });
  });
});

describe("isBillInPayPeriod", () => {
  it("throws error", () => {
    expect(() => isBillInPayPeriod(bill, payPeriods[0])).toThrow(
      "No due dates found in bill. Have you added them?"
    );
  });
  it("return false", () => {
    expect(
      isBillInPayPeriod(addFutureBillDates(bill, startingDate), payPeriods[0])
    ).toBeFalsy();
  });
  it("return true", () => {
    expect(
      isBillInPayPeriod(addFutureBillDates(bill, startingDate), payPeriods[1])
    ).toBeTruthy();
  });
});
