import {
  addWeeks,
  addMonths,
  setDate as setDayOfMonth,
  getDate as getDayOfMonth,
  getDay as getDayOfWeek,
  addDays,
  lastDayOfMonth,
  isAfter
} from "date-fns";

export function firstDayOfMonth(date: Date): Date {
  return setDayOfMonth(date, 1);
}

export function getSemiMonthlyForDate(date: Date): Date[] {
  let dates = [];

  let firstDate = setDayOfMonth(date, 15);
  switch (getDayOfWeek(firstDate)) {
    case 6:
      firstDate = addDays(firstDate, -1);
      break;
    case 0:
      firstDate = addDays(firstDate, -2);
      break;
  }
  if (isAfter(firstDate, date)) {
    dates.push(firstDate);
  }

  let secondDate = lastDayOfMonth(date);
  switch (getDayOfWeek(secondDate)) {
    case 6:
      secondDate = addDays(secondDate, -1);
      break;
    case 0:
      secondDate = addDays(secondDate, -2);
      break;
  }
  if (isAfter(secondDate, date)) {
    dates.push(secondDate);
  }

  return dates;
}

export function getSemiMonthlyForMonth(date: Date): Date[] {
  return getSemiMonthlyForDate(firstDayOfMonth(date));
}

export function getPaydays(
  type: "weekly" | "bi_weekly" | "semi_monthly" | "monthly",
  startOn: Date,
  numPaydays = 12,
  opts?: { monthly?: number }
): Array<Date> {
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
      return new Array(Math.ceil(numPaydays / 2))
        .fill(startOn)
        .map((payday, index) => {
          return getSemiMonthlyForMonth(addMonths(payday, index));
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
