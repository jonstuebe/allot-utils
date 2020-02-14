export type PayPeriods = PayPeriod[];
export interface PayPeriod {
  start: Date;
  end: Date;
  paychecks: Paychecks;
  bills: Bills;
}

export type Paychecks = Paycheck[];
export interface Paycheck {
  amount: number;
  source?: string;
  date: Date;
}

export type Bills = Bill[];
export type DayOfWeekIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type DayOfMonthIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30;
export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type YearIndexes = [MonthIndex, DayOfMonthIndex];
export interface InitialBill {
  name: string;
  amount: number;
  autoPay?: boolean;
  startOn: Date;
  due: {
    weekly?: DayOfWeekIndex;
    monthly?: DayOfMonthIndex;
    yearly?: YearIndexes;
  };
}
export interface Bill extends InitialBill {
  dueDates: Date[];
}
