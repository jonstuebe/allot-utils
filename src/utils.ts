import { isBefore, isAfter } from "date-fns";

export function isBetween(date: Date, start: Date, end: Date): Boolean {
  return isBefore(date, end) && isAfter(date, start);
}
