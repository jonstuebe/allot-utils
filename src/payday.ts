import {
  addWeeks,
  addMonths,
  setDate as setDayOfMonth,
  getDate as getDayOfMonth
} from "date-fns";

export function getPaydays(
  type: "weekly" | "bi_weekly" | "semi_monthly" | "monthly",
  startOn: Date,
  numPaydays = 12,
  opts?: { biMonthly?: [number, number]; monthly?: number }
): Array<Date | null> {
  switch (type) {
    case "weekly":
      return new Array(numPaydays).fill(startOn).map((payday, index) => {
        return addWeeks(payday, index);
      });
    case "bi_weekly":
      return new Array(numPaydays).fill(startOn).map((payday, index) => {
        return addWeeks(payday, index * 2);
      });
    case "semi_monthly":
      if (!opts || !opts.biMonthly) {
        throw new Error("biMonthly required when providing semi_monthly");
      }
      const [dayOne, dayTwo] = opts.biMonthly as [number, number];
      if (
        getDayOfMonth(startOn) !== dayOne &&
        getDayOfMonth(startOn) !== dayTwo
      ) {
        throw new Error(
          "startOn date must match one of the values provided to opts.biMonthly"
        );
      }

      return new Array(Math.ceil(numPaydays / 2))
        .fill(startOn)
        .map((payday, index) => {
          return [
            index === 0 && getDayOfMonth(payday) === dayTwo
              ? null
              : addMonths(setDayOfMonth(payday, dayOne), index),
            addMonths(setDayOfMonth(payday, dayTwo), index)
          ];
        })
        .reduce((acc, cur) => acc.concat(cur), []);
    case "monthly":
      if (!opts || !opts.monthly) {
        throw new Error("monthly required when providing monthly");
      }
      const dayOfMonth = opts.monthly as number;
      if (getDayOfMonth(startOn) !== dayOfMonth) {
        throw new Error(
          "startOn date must match the value provided to opts.monthly"
        );
      }

      return new Array(numPaydays).fill(startOn).map((payday, index) => {
        return addMonths(payday, index);
      });
  }
}
