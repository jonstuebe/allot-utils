import { getPaydays } from "./payday";

describe("getPaydays", () => {
  it("returns an array of dates", () => {
    expect(
      getPaydays("bi-weekly", new Date(2019, 10, 22, 0, 0, 0), 12)
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
});
