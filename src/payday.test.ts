import { getPaydays } from "./payday";
import { format } from "date-fns";

describe("getPaydays", () => {
  it("works with weekly option", () => {
    expect(
      getPaydays("weekly", new Date(2019, 10, 22, 0, 0, 0), 12).map(date =>
        format(date, "MM-dd-y")
      )
    ).toEqual([
      "11-22-2019",
      "11-29-2019",
      "12-06-2019",
      "12-13-2019",
      "12-20-2019",
      "12-27-2019",
      "01-03-2020",
      "01-10-2020",
      "01-17-2020",
      "01-24-2020",
      "01-31-2020",
      "02-07-2020"
    ]);
  });
  it("works with bi_weekly option", () => {
    expect(
      getPaydays("bi_weekly", new Date(2019, 10, 22, 0, 0, 0), 12).map(date =>
        format(date, "MM-dd-y")
      )
    ).toEqual([
      "11-22-2019",
      "12-06-2019",
      "12-20-2019",
      "01-03-2020",
      "01-17-2020",
      "01-31-2020",
      "02-14-2020",
      "02-28-2020",
      "03-13-2020",
      "03-27-2020",
      "04-10-2020",
      "04-24-2020"
    ]);
  });
  it("works with semi_monthly option", () => {
    expect(
      getPaydays(
        "semi_monthly",
        new Date(2019, 10, 15, 0, 0, 0),
        12
      ).map(date => format(date, "MM-dd-y"))
    ).toEqual([
      "11-15-2019",
      "11-29-2019",
      "12-13-2019",
      "12-31-2019",
      "01-15-2020",
      "01-31-2020",
      "02-14-2020",
      "02-28-2020",
      "03-13-2020",
      "03-31-2020",
      "04-15-2020",
      "04-30-2020"
    ]);
  });
  it("works with monthly option", () => {
    expect(
      getPaydays("monthly", new Date(2019, 10, 30, 0, 0, 0), 12, {
        monthly: 30
      }).map(date => format(date, "MM-dd-y"))
    ).toEqual([
      "11-30-2019",
      "12-30-2019",
      "01-30-2020",
      "02-29-2020",
      "03-30-2020",
      "04-30-2020",
      "05-30-2020",
      "06-30-2020",
      "07-30-2020",
      "08-30-2020",
      "09-30-2020",
      "10-30-2020"
    ]);
  });
});
