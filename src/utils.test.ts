import { chunk, isBetween, formatCurrency, strToDate } from "./utils";

describe("isBetween", () => {
  it("return truthy", () => {
    expect(
      isBetween(
        new Date(2020, 0, 5),
        new Date(2020, 0, 1),
        new Date(2020, 0, 31)
      )
    ).toBeTruthy();
  });
  it("return falsy", () => {
    expect(
      isBetween(
        new Date(2020, 1, 5),
        new Date(2020, 0, 1),
        new Date(2020, 0, 31)
      )
    ).toBeFalsy();
  });
});

describe("strToDate", () => {
  it("returns a date object from a Date string", () => {
    expect(strToDate("2020-02-01").toISOString()).toEqual(
      "2020-02-01T07:00:00.000Z"
    );
  });
});

describe("formatCurrency", () => {
  it("returns in a dollars string format", () => {
    expect(formatCurrency(1250.5)).toEqual("$1,250.50");
  });
});

describe("chunk", () => {
  it("chunks into sets of two items", () => {
    expect(chunk([1, 10, 1, 10, 1, 10, 1], 2)).toEqual([
      [1, 10],
      [1, 10],
      [1, 10],
      [1]
    ]);
  });
});
