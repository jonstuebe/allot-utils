import { getBillDates, createBill, isBillInPayPeriod } from "./bill";
import { getPaydays } from "./payday";
import { getPayPeriods, validatePayPeriods } from "./payPeriod";
import { createDate } from "./utils";
import { PayFrequencyEnum } from "./types";

describe("createBill", () => {
  it("returns a bill with a monthly due date", () => {
    const bill = createBill({
      name: "Rent",
      estimated: 1200,
      amount: 1200,
      startOn: createDate(2019, 12, 1),
      due: { monthly: 1 }
    });
    expect(bill).toEqual({
      type: "source",
      name: "Rent",
      estimated: 1200,
      autoPay: false,
      paid: false,
      amount: 1200,
      startOn: createDate(2019, 12, 1),
      due: {
        monthly: 1
      }
    });
  });
});

describe("getBillDates", () => {
  it("weekly test", () => {
    const bill = createBill({
      name: "Childcare",
      estimated: 200,
      amount: 173,
      startOn: createDate(2019, 12, 1),
      due: { weekly: 2 }
    });
    expect(
      getBillDates(bill, createDate(2019, 11, 1), createDate(2019, 12, 5))
    ).toEqual([
      createDate(2019, 11, 5),
      createDate(2019, 11, 12),
      createDate(2019, 11, 19),
      createDate(2019, 11, 26),
      createDate(2019, 12, 3)
    ]);
  });

  it("monthly test", () => {
    const bill = createBill({
      name: "Rent",
      estimated: 1200,
      amount: 1200,
      startOn: createDate(2019, 12, 1),
      due: { monthly: 1 }
    });
    expect(
      getBillDates(bill, createDate(2019, 11, 1), createDate(2019, 12, 5))
    ).toEqual([createDate(2019, 11, 1), createDate(2019, 12, 1)]);
  });

  it("yearly test", () => {
    const bill = createBill({
      name: "Amazon Prime",
      estimated: 120,
      amount: 123.98,
      startOn: createDate(2019, 11, 5),
      due: { yearly: [10, 5] }
    });
    expect(
      getBillDates(bill, createDate(2017, 1, 1), createDate(2019, 1, 1))
    ).toEqual([createDate(2017, 11, 5), createDate(2018, 11, 5)]);
  });

  it("moves the date to an earlier possible one in short months", () => {
    const bill = createBill({
      name: "Rent",
      estimated: 1200,
      amount: 1200,
      startOn: createDate(2020, 1, 1),
      due: { monthly: 30 }
    });
    expect(
      getBillDates(bill, createDate(2020, 1, 1), createDate(2020, 4, 1))
    ).toEqual([createDate(2020, 1, 30), createDate(2020, 3, 30)]);
  });
});

describe("isBillInPayPeriod", () => {
  const startingDate = createDate(2020, 3, 27);
  const bill = createBill({
    name: "Credit Card",
    estimated: 45,
    amount: 37.98,
    startOn: createDate(2020, 2, 27),
    due: { monthly: 27 }
  });
  const paydays = getPaydays(PayFrequencyEnum.biWeekly, startingDate) as Date[];
  const payPeriods = validatePayPeriods(getPayPeriods(paydays), [bill], []);

  it("return false", () => {
    expect(isBillInPayPeriod(bill, payPeriods[1])).toBeFalsy();
  });
  it("return true", () => {
    expect(isBillInPayPeriod(bill, payPeriods[0])).toBeTruthy();
  });
});

describe("isBillInPayPeriod (weekly)", () => {
  const startingDate = createDate(2020, 1, 14);
  const bill = createBill({
    name: "Childcare",
    estimated: 75,
    amount: 50,
    startOn: createDate(2020, 1, 1),
    due: { weekly: 6 }
  });
  const paydays = getPaydays(PayFrequencyEnum.biWeekly, startingDate) as Date[];
  const payPeriods = validatePayPeriods(getPayPeriods(paydays), [bill], []);

  expect(isBillInPayPeriod(bill, payPeriods[0])).toBeTruthy();
});
