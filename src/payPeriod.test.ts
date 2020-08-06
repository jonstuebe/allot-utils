import { getPayPeriods, formatPayPeriodDate } from "./payPeriod";
import { getPaydays } from "./payday";
import { PayFrequencyEnum } from "./types";
import { createDate } from "./utils";

const startingDate = createDate(2019, 9, 22);
const paydays = getPaydays(PayFrequencyEnum.biWeekly, startingDate) as Date[];
const payPeriods = getPayPeriods(paydays);

describe("getPayPeriods", () => {
  it("returns an array of payPeriods when given an array of dates", () => {
    expect(payPeriods).toEqual([
      {
        bills: [],
        end: createDate(2019, 10, 5),
        paychecks: [],
        start: createDate(2019, 9, 22)
      },
      {
        bills: [],
        end: createDate(2019, 10, 19),
        paychecks: [],
        start: createDate(2019, 10, 6)
      },
      {
        bills: [],
        end: createDate(2019, 11, 2),
        paychecks: [],
        start: createDate(2019, 10, 20)
      },
      {
        bills: [],
        end: createDate(2019, 11, 16),
        paychecks: [],
        start: createDate(2019, 11, 3)
      },
      {
        bills: [],
        end: createDate(2019, 11, 30),
        paychecks: [],
        start: createDate(2019, 11, 17)
      },
      {
        bills: [],
        end: createDate(2019, 12, 14),
        paychecks: [],
        start: createDate(2019, 12, 1)
      },
      {
        bills: [],
        end: createDate(2019, 12, 28),
        paychecks: [],
        start: createDate(2019, 12, 15)
      },
      {
        bills: [],
        end: createDate(2020, 1, 11),
        paychecks: [],
        start: createDate(2019, 12, 29)
      },
      {
        bills: [],
        end: createDate(2020, 1, 25),
        paychecks: [],
        start: createDate(2020, 1, 12)
      },
      {
        bills: [],
        end: createDate(2020, 2, 8),
        paychecks: [],
        start: createDate(2020, 1, 26)
      },
      {
        bills: [],
        end: createDate(2020, 2, 22),
        paychecks: [],
        start: createDate(2020, 2, 9)
      },
      {
        bills: [],
        end: createDate(2020, 3, 7),
        paychecks: [],
        start: createDate(2020, 2, 23)
      },
      {
        bills: [],
        end: createDate(2020, 3, 21),
        paychecks: [],
        start: createDate(2020, 3, 8)
      },
      {
        bills: [],
        end: createDate(2020, 4, 4),
        paychecks: [],
        start: createDate(2020, 3, 22)
      },
      {
        bills: [],
        end: createDate(2020, 4, 18),
        paychecks: [],
        start: createDate(2020, 4, 5)
      },
      {
        bills: [],
        end: createDate(2020, 5, 2),
        paychecks: [],
        start: createDate(2020, 4, 19)
      },
      {
        bills: [],
        end: createDate(2020, 5, 16),
        paychecks: [],
        start: createDate(2020, 5, 3)
      },
      {
        bills: [],
        end: createDate(2020, 5, 30),
        paychecks: [],
        start: createDate(2020, 5, 17)
      },
      {
        bills: [],
        end: createDate(2020, 6, 13),
        paychecks: [],
        start: createDate(2020, 5, 31)
      },
      {
        bills: [],
        end: createDate(2020, 6, 27),
        paychecks: [],
        start: createDate(2020, 6, 14)
      },
      {
        bills: [],
        end: createDate(2020, 7, 11),
        paychecks: [],
        start: createDate(2020, 6, 28)
      },
      {
        bills: [],
        end: createDate(2020, 7, 26),
        paychecks: [],
        start: createDate(2020, 7, 12)
      }
    ]);
  });
});

describe("formatPayPeriodDate", () => {
  it("returns a date string", () => {
    expect(formatPayPeriodDate(payPeriods[0])).toEqual(
      "Sep 22nd 2019 - Oct 5th 2019"
    );
  });
});
