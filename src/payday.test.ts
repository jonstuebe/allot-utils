import { getPaydays } from "./payday";

describe("getPaydays", () => {
  it("works with weekly option", () => {
    expect(getPaydays("weekly", new Date(2019, 10, 22, 0, 0, 0), 12)).toEqual([
      new Date(2019, 10, 22),
      new Date(2019, 10, 29),
      new Date(2019, 11, 6),
      new Date(2019, 11, 13),
      new Date(2019, 11, 20),
      new Date(2019, 11, 27),
      new Date(2020, 0, 3),
      new Date(2020, 0, 10),
      new Date(2020, 0, 17),
      new Date(2020, 0, 24),
      new Date(2020, 0, 31),
      new Date(2020, 1, 7)
    ]);
  });
  it("works with bi_weekly option", () => {
    expect(
      getPaydays("bi_weekly", new Date(2019, 10, 22, 0, 0, 0), 12)
    ).toEqual([
      new Date(2019, 10, 22),
      new Date(2019, 11, 6),
      new Date(2019, 11, 20),
      new Date(2020, 0, 3),
      new Date(2020, 0, 17),
      new Date(2020, 0, 31),
      new Date(2020, 1, 14),
      new Date(2020, 1, 28),
      new Date(2020, 2, 13),
      new Date(2020, 2, 27),
      new Date(2020, 3, 10),
      new Date(2020, 3, 24)
    ]);
  });
  it("works with semi_monthly option", () => {
    expect(
      getPaydays("semi_monthly", new Date(2019, 10, 30, 0, 0, 0), 12, {
        semiMonthly: [15, 30]
      })
    ).toEqual([
      null,
      new Date(2019, 10, 30),
      new Date(2019, 11, 15),
      new Date(2019, 11, 30),
      new Date(2020, 0, 15),
      new Date(2020, 0, 30),
      new Date(2020, 1, 15),
      new Date(2020, 1, 29),
      new Date(2020, 2, 15),
      new Date(2020, 2, 30),
      new Date(2020, 3, 15),
      new Date(2020, 3, 30)
    ]);
  });
  it("works with monthly option", () => {
    expect(
      getPaydays("monthly", new Date(2019, 10, 30, 0, 0, 0), 12, {
        monthly: 30
      })
    ).toEqual([
      new Date(2019, 10, 30),
      new Date(2019, 11, 30),
      new Date(2020, 0, 30),
      new Date(2020, 1, 29),
      new Date(2020, 2, 30),
      new Date(2020, 3, 30),
      new Date(2020, 4, 30),
      new Date(2020, 5, 30),
      new Date(2020, 6, 30),
      new Date(2020, 7, 30),
      new Date(2020, 8, 30),
      new Date(2020, 9, 30)
    ]);
  });
});
