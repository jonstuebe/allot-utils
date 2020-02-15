import { getPayPeriods, formatPayPeriodDate } from "./payPeriod";
import { getPaydays } from "./payday";

const startingDate = new Date(2019, 10, 22, 0, 0, 0);
const paydays = getPaydays("bi_weekly", startingDate) as Date[];
const payPeriods = getPayPeriods(paydays);

describe("getPayPeriods", () => {
  it("returns an array of payPeriods when given an array of dates", () => {
    expect(payPeriods).toEqual([
      {
        start: new Date("2019-11-22T07:00:00.000Z"),
        end: new Date("2019-12-05T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2019-12-06T07:00:00.000Z"),
        end: new Date("2019-12-19T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2019-12-20T07:00:00.000Z"),
        end: new Date("2020-01-02T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-01-03T07:00:00.000Z"),
        end: new Date("2020-01-16T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-01-17T07:00:00.000Z"),
        end: new Date("2020-01-30T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-01-31T07:00:00.000Z"),
        end: new Date("2020-02-13T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-02-14T07:00:00.000Z"),
        end: new Date("2020-02-27T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-02-28T07:00:00.000Z"),
        end: new Date("2020-03-12T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-03-13T07:00:00.000Z"),
        end: new Date("2020-03-26T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-03-27T07:00:00.000Z"),
        end: new Date("2020-04-09T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-04-10T07:00:00.000Z"),
        end: new Date("2020-04-23T07:00:00.000Z"),
        bills: [],
        paychecks: []
      },
      {
        start: new Date("2020-04-24T07:00:00.000Z"),
        end: new Date("2020-05-08T07:00:00.000Z"),
        bills: [],
        paychecks: []
      }
    ]);
  });
});

describe("formatPayPeriodDate", () => {
  it("returns a date string", () => {
    expect(formatPayPeriodDate(payPeriods[0])).toEqual(
      "Nov 22nd 2019 - Dec 5th 2019"
    );
  });
});
