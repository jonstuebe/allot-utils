import { createPaycheck } from "./paycheck";
import { createDate } from "./utils";

describe("createPaycheck", () => {
  it("returns a paycheck object", () => {
    const paycheck = createPaycheck({
      amount: 1200,
      estimated: 0,
      date: createDate(2019, 10, 1),
      jobId: "4g0CWwgqvTECAJY8MDki"
    });
    expect(paycheck).toEqual({
      amount: 1200,
      estimated: 0,
      date: createDate(2019, 10, 1),
      jobId: "4g0CWwgqvTECAJY8MDki"
    });
  });
});
