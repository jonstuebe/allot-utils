import { createBill, getFutureBillDates } from "./bill";
import { Bill } from "./types";

let bill: Bill | undefined;
beforeEach(() => {
  bill = createBill({
    name: "Rent",
    amount: 1200,
    dueOn: { dayOfMonth: 1 }
  });
});

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
    expect(getFutureBillDates(bill as Bill, new Date(2019, 11, 1))).toEqual([
      new Date(2019, 11, 1),
      new Date(2020, 0, 1),
      new Date(2020, 1, 1)
    ]);
  });
});
