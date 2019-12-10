import { getPayPeriods, validatePayPeriods } from "./payPeriod";
import { createPaycheck } from "./paycheck";
import { getPaydays } from "./payday";
import { createBill, addFutureBillDates } from "./bill";
import { Bills } from "./types";

describe("Integration Tests", () => {
  it("", () => {
    const startingDate = new Date(2019, 11, 1, 0, 0, 0);
    const bills: Bills = [
      createBill({
        name: "Rent",
        amount: 1200,
        due: {
          monthly: 30
        }
      })
    ].map(bill => addFutureBillDates(bill, startingDate));
    const payDays = getPaydays("bi-weekly", startingDate);
    const paychecks = [
      createPaycheck({
        amount: 2000,
        date: new Date(2019, 11, 15, 0, 0, 0),
        source: "ABC Landscaping"
      })
    ];
    const payPeriods = validatePayPeriods(
      getPayPeriods(payDays),
      bills,
      paychecks
    );

    // console.log(payPeriods);
  });
});
