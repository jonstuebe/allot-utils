import { getPaydays } from "./payday";
import { createDate } from "./utils";
import { PayFrequencyEnum } from "./types";

describe("getPaydays", () => {
  it("works with weekly option", () => {
    expect(
      getPaydays(PayFrequencyEnum.weekly, createDate(2019, 11, 22))
    ).toEqual([
      createDate(2019, 11, 22),
      createDate(2019, 11, 29),
      createDate(2019, 12, 6),
      createDate(2019, 12, 13),
      createDate(2019, 12, 20),
      createDate(2019, 12, 27),
      createDate(2020, 1, 3),
      createDate(2020, 1, 10),
      createDate(2020, 1, 17),
      createDate(2020, 1, 24),
      createDate(2020, 1, 31),
      createDate(2020, 2, 7),
      createDate(2020, 2, 14),
      createDate(2020, 2, 21),
      createDate(2020, 2, 28),
      createDate(2020, 3, 6),
      createDate(2020, 3, 13),
      createDate(2020, 3, 20),
      createDate(2020, 3, 27),
      createDate(2020, 4, 3),
      createDate(2020, 4, 10),
      createDate(2020, 4, 17),
      createDate(2020, 4, 24),
      createDate(2020, 5, 1),
      createDate(2020, 5, 8),
      createDate(2020, 5, 15),
      createDate(2020, 5, 22),
      createDate(2020, 5, 29),
      createDate(2020, 6, 5),
      createDate(2020, 6, 12),
      createDate(2020, 6, 19),
      createDate(2020, 6, 26),
      createDate(2020, 7, 3)
    ]);
  });

  it("works with bi_weekly option", () => {
    expect(
      getPaydays(PayFrequencyEnum.biWeekly, createDate(2019, 11, 22))
    ).toEqual([
      createDate(2019, 11, 22),
      createDate(2019, 12, 6),
      createDate(2019, 12, 20),
      createDate(2020, 1, 3),
      createDate(2020, 1, 17),
      createDate(2020, 1, 31),
      createDate(2020, 2, 14),
      createDate(2020, 2, 28),
      createDate(2020, 3, 13),
      createDate(2020, 3, 27),
      createDate(2020, 4, 10),
      createDate(2020, 4, 24),
      createDate(2020, 5, 8),
      createDate(2020, 5, 22),
      createDate(2020, 6, 5),
      createDate(2020, 6, 19),
      createDate(2020, 7, 3),
      createDate(2020, 7, 17)
    ]);
  });

  it("works with semi_monthly option", () => {
    expect(
      getPaydays(PayFrequencyEnum.semiMonthly, createDate(2019, 11, 15))
    ).toEqual([
      createDate(2019, 11, 15),
      createDate(2019, 11, 29),
      createDate(2020, 1, 15),
      createDate(2020, 1, 31),
      createDate(2020, 3, 13),
      createDate(2020, 3, 31),
      createDate(2020, 5, 15),
      createDate(2020, 5, 29),
      createDate(2020, 7, 15),
      createDate(2020, 7, 31),
      createDate(2020, 9, 15),
      createDate(2020, 9, 30)
    ]);
  });

  it("works with monthly option", () => {
    expect(
      getPaydays(PayFrequencyEnum.monthly, createDate(2019, 11, 30), {
        monthly: 30
      })
    ).toEqual([
      createDate(2019, 11, 30),
      createDate(2019, 12, 30),
      createDate(2020, 1, 30),
      createDate(2020, 2, 29),
      createDate(2020, 3, 30),
      createDate(2020, 4, 30),
      createDate(2020, 5, 30),
      createDate(2020, 6, 30),
      createDate(2020, 7, 30)
    ]);
  });
});
