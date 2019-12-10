import { addWeeks } from "date-fns";

export function getPaydays(
  type: "bi-weekly",
  startOn: Date,
  numPaydays = 12
): Date[] {
  if (type === "bi-weekly") {
    return new Array(numPaydays).fill(startOn).map((payday, index) => {
      return addWeeks(payday, index * 2);
    });
  }
  return [startOn];
}
