import { getPayPeriods, formatPayPeriodDate } from "./payPeriod";
import { getPaydays } from "./payday";

const startingDate = new Date(2019, 10, 22, 0, 0, 0);
const paydays = getPaydays("bi-weekly", startingDate);
const payPeriods = getPayPeriods(paydays);

describe("getPayPeriods", () => {
  it("returns an array of payPeriods when given an array of dates", () => {
    expect(payPeriods).toEqual([
      {
        start: new Date("2019-11-08T07:00:00.000Z"),
        end: new Date("2019-11-22T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2019-11-22T07:00:00.000Z"),
        end: new Date("2019-12-06T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2019-12-06T07:00:00.000Z"),
        end: new Date("2019-12-20T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2019-12-20T07:00:00.000Z"),
        end: new Date("2020-01-03T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-01-03T07:00:00.000Z"),
        end: new Date("2020-01-17T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-01-17T07:00:00.000Z"),
        end: new Date("2020-01-31T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-01-31T07:00:00.000Z"),
        end: new Date("2020-02-14T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-02-14T07:00:00.000Z"),
        end: new Date("2020-02-28T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-02-28T07:00:00.000Z"),
        end: new Date("2020-03-13T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-03-13T07:00:00.000Z"),
        end: new Date("2020-03-27T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-03-27T07:00:00.000Z"),
        end: new Date("2020-04-10T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-04-10T07:00:00.000Z"),
        end: new Date("2020-04-24T07:00:00.000Z"),
        bills: [],
        paychecks: []
      }
    ]);
  });
});

describe("formatPayPeriodDate", () => {
  it("returns a date string", () => {
    expect(formatPayPeriodDate(payPeriods[0])).toEqual(
      "Nov 8th 2019 - Nov 22nd 2019"
    );
  });
});
