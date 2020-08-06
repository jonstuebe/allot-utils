export interface Job {
  company: string;
  payFrequency: PayFrequencyEnum;
  startOn: Date;
}

export enum PayFrequencyEnum {
  biWeekly = "bi_weekly",
  weekly = "weekly",
  semiMonthly = "semi_monthly",
  monthly = "monthly"
}

export type PayPeriods = PayPeriod[];
export interface PayPeriod {
  start: Date;
  end: Date;
  paychecks: Paychecks;
  bills: Bills;
}

export type Paychecks = Paycheck[];
export interface Paycheck {
  estimated: number;
  amount?: number;
  date: Date;
  jobId: string;
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
  | 30
  | 31;
export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type YearIndexes = [MonthIndex, DayOfMonthIndex];

export interface BillDue {
  weekly?: DayOfWeekIndex;
  monthly?: DayOfMonthIndex;
  yearly?: YearIndexes;
}

export interface Bill {
  name: string;
  type?: "source" | "snapshot";
  estimated: number;
  amount?: number;
  autoPay?: boolean;
  due: BillDue;
  startOn: Date;
  paid?: boolean;
  paidOn?: Date;
}
