export interface IActiveUser {
  email: string;
  firstname: string;
  login: Date;
}
export interface IActiveUserChart {
  labels: string[];
  data: number[];
}

export interface IActivePeriod {
  value: string;
  label: string;
}
