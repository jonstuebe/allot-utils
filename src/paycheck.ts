import { Paycheck } from "./types";

export function createPaycheck({ amount = 0, ...paycheck }: Paycheck) {
  return { amount, ...paycheck };
}
