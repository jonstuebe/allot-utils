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
export interface InitialBill {
  name: string;
  amount: number;
  due: {
    monthly?: number;
    annually?: [number, number];
  };
}
export interface Bill extends InitialBill {
  dueDates: Date[];
}
