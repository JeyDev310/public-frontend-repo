export interface IBtcAmount {
  [currency: string]: number;
}

export interface IAccount {
  exchange: string;
  id: string;
  name: string;
  total: IBtcAmount;
}

export interface IEvolutionData {
  name: string;
  data: number[];
}

export interface IPortfolioEvolutionChart {
  labels: string[];
  datasets: IEvolutionData[];
}

export interface IDistributionTableData {
  coin: string;
  amount: number;
  btc: number;
  blockchain?: 'eth' | 'bsc';
}

export interface IDistributionChartData {
  btc: number;
  currency: string;
  currencyAmount: number;
  percentage: number;
  blockchain?: 'eth' | 'bsc';
}
