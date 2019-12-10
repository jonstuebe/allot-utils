import {
  addFutureBillDates,
  createBill,
  getFutureBillDates,
  isBillInPayPeriod
} from "./bill";
import { getPaydays } from "./payday";
import { getPayPeriods, validatePayPeriods } from "./payPeriod";

const bill = createBill({
  name: "Rent",
  amount: 1200,
  dueOn: { dayOfMonth: 1 }
});
const startingDate = new Date(2019, 10, 22, 0, 0, 0);
const payDays = getPaydays("bi-weekly", startingDate);
const payPeriods = validatePayPeriods(
  getPayPeriods(payDays),
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
