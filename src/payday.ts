import {
  addWeeks,
  addMonths,
  setDate as setDayOfMonth,
  getDate as getDayOfMonth,
  getDay as getDayOfWeek,
  startOfDay,
  addDays,
  lastDayOfMonth,
  isAfter
} from "date-fns";

import { PayFrequencyEnum } from "./types";

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
  payFrequency: PayFrequencyEnum,
  startOn: Date,
  opts?: { monthly?: number }
): Date[] {
  startOn = startOfDay(startOn);

  let paydays: Date[] = [];
  let generate: boolean = true;

  while (generate) {
    let monthPaydays;
    let curIndex: number = paydays.length;
    let lastPaydayGenerated = paydays[paydays.length - 1];

    switch (payFrequency) {
      case PayFrequencyEnum.weekly:
        monthPaydays = addWeeks(startOn, curIndex);
        break;

      case PayFrequencyEnum.biWeekly:
        monthPaydays = addWeeks(startOn, curIndex * 2);
        break;

      case PayFrequencyEnum.semiMonthly:
        monthPaydays = getSemiMonthlyForMonth(addMonths(startOn, curIndex));
        break;

      case PayFrequencyEnum.monthly:
        if (!opts || !opts.monthly) {
          throw new Error("monthly required when providing monthly");
        }
        const dayOfMonth = opts.monthly as number;
        if (getDayOfMonth(startOn) !== dayOfMonth) {
          throw new Error(
            "startOn date must match the value provided to opts.monthly"
          );
        }

        monthPaydays = addMonths(startOn, curIndex);
        break;
    }

    paydays = paydays.concat(monthPaydays);
    if (isAfter(lastPaydayGenerated, addMonths(new Date(), 3))) {
      generate = false;
    }
  }
  return paydays;
}
