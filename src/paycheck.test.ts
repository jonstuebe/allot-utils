import { createPaycheck } from "./paycheck";

describe("createPaycheck", () => {
  it("returns a paycheck object", () => {
    const paycheck = createPaycheck({
      amount: 1200,
      date: new Date(2019, 11, 1, 0, 0, 0, 0),
      source: "Acme Computing Inc."
    });
    expect(paycheck).toEqual({
      amount: 1200,
      date: new Date(2019, 11, 1, 0, 0, 0, 0),
      source: "Acme Computing Inc."
    });
  });
});
