import { isBetween, formatCurrency } from "./utils";

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

describe("formatCurrency", () => {
  it("returns in a dollars string format", () => {
    expect(formatCurrency(1250.5)).toEqual("$1,250.50");
  });
});
