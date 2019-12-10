import {
  addFutureBillDates,
  createBill,
  getFutureBillDates,
  isBillInPayPeriod
} from "./bill";
import { getPaydays } from "./payday";
import { getPayPeriods, validatePayPeriods } from "./payPeriod";

describe("createBill", () => {
  it("returns a bill with a monthly due date", () => {
    const bill = createBill({
      name: "Rent",
      amount: 1200,
      due: { monthly: 1 }
    });
    expect(bill).toEqual({
      name: "Rent",
      amount: 1200,
      due: {
        monthly: 1
      },
      dueDates: []
    });
  });
});

describe("getFutureBillDates", () => {
  it("returns an array of dates", () => {
    const bill = createBill({
      name: "Rent",
      amount: 1200,
      due: { monthly: 1 }
    });
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
          due: {}
        }),
        new Date(2019, 11, 1)
      )
    ).toThrow("No schedule added");
  });
  it("moves the date to an earlier possible one in short months", () => {
    const bill = createBill({
      name: "Rent",
      amount: 1200,
      due: { monthly: 30 }
    });

    expect(getFutureBillDates(bill, new Date(2020, 0, 1))).toEqual([
      new Date(2020, 0, 30),
      new Date(2020, 1, 29),
      new Date(2020, 2, 30)
    ]);
  });
  it("works with config option due.yearly", () => {
    const bill = createBill({
      name: "Rent",
      amount: 1200,
      due: { yearly: [10, 15] }
    });
    expect(addFutureBillDates(bill, new Date(2019, 10, 15))).toEqual({
      name: "Rent",
      amount: 1200,
      due: { yearly: [10, 15] },
      dueDates: [
        new Date(2019, 10, 15),
        new Date(2020, 10, 15),
        new Date(2021, 10, 15)
      ]
    });
  });
  it("throws error as wrong date is passed to startOn", () => {
    const bill = createBill({
      name: "Rent",
      amount: 1200,
      due: { yearly: [10, 15] }
    });
    expect(() => addFutureBillDates(bill, new Date(2020, 0, 1))).toThrow(
      "startOn must have the same month and day as the due date of the bill."
    );
  });
});

describe("addFutureBillDates", () => {
  it("adds an array of bill dates to a Bill", () => {
    const bill = createBill({
      name: "Rent",
      amount: 1200,
      due: { monthly: 1 }
    });
    expect(addFutureBillDates(bill, new Date(2019, 11, 1))).toEqual({
      name: "Rent",
      amount: 1200,
      due: {
        monthly: 1
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
  const bill = createBill({
    name: "Rent",
    amount: 1200,
    due: { monthly: 1 }
  });
  const startingDate = new Date(2019, 10, 22, 0, 0, 0);
  const paydays = getPaydays("bi-weekly", startingDate);
  const payPeriods = validatePayPeriods(
    getPayPeriods(paydays),
    [addFutureBillDates(bill, startingDate)],
    []
  );

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
