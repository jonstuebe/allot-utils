import { getPayPeriods, validatePayPeriods } from "./payPeriod";
import { createPaycheck } from "./paycheck";
import { getPaydays } from "./payday";
import { createBill, addFutureBillDates } from "./bill";
import { Bills } from "./types";
import { renderTable } from "./utils";

describe("Integration Tests", () => {
  it("", () => {
    const startingDate = new Date(2019, 10, 22, 0, 0, 0);
    const bills: Bills = [
      createBill({
        name: "Rent",
        amount: 1500,
        autoPay: false,
        startOn: startingDate,
        due: {
          monthly: 1
        }
      }),
      createBill({
        name: "EOS",
        amount: 22,
        autoPay: true,
        startOn: startingDate,
        due: {
          monthly: 5
        }
      }),
      createBill({
        name: "Spotify",
        amount: 10.82,
        autoPay: true,
        startOn: startingDate,
        due: {
          monthly: 16
        }
      }),
      createBill({
        name: "SRP",
        amount: 101,
        autoPay: true,
        startOn: startingDate,
        due: {
          monthly: 19
        }
      }),
      createBill({
        name: "Car Insurance",
        amount: 85,
        autoPay: false,
        startOn: startingDate,
        due: {
          monthly: 21
        }
      }),
      createBill({
        name: "Car Payment",
        amount: 341.31,
        autoPay: true,
        startOn: startingDate,
        due: {
          monthly: 16
        }
      }),
      createBill({
        name: "Cox",
        amount: 69.99,
        autoPay: true,
        startOn: startingDate,
        due: {
          monthly: 23
        }
      }),
      createBill({
        name: "Mesa Utilities",
        amount: 100,
        autoPay: true,
        startOn: startingDate,
        due: {
          monthly: 18
        }
      }),
      createBill({
        name: "Verizon",
        amount: 60,
        autoPay: false,
        startOn: startingDate,
        due: {
          monthly: 12
        }
      }),
      createBill({
        name: "Dollar Shave Club",
        amount: 5,
        autoPay: true,
        startOn: startingDate,
        due: {
          monthly: 30
        }
      })
    ].map(bill => addFutureBillDates(bill, 24));
    const paydays = getPaydays("bi_weekly", startingDate) as Date[];
    const paychecks = [
      createPaycheck({
        amount: 1337.94,
        date: new Date(2019, 10, 22, 0, 0, 0),
        source: "SmartRent"
      }),
      createPaycheck({
        amount: 1823.3,
        date: new Date(2019, 11, 6, 0, 0, 0),
        source: "SmartRent"
      })
    ];
    const payPeriods = validatePayPeriods(
      getPayPeriods(paydays),
      bills,
      paychecks
    );

    // renderTable(payPeriods);
  });
});
