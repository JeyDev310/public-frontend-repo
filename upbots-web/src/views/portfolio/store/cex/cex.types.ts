import { IBtcAmount, IAccount } from '@/types'

export interface ICexDistributionAmount extends IBtcAmount {
  [currency: string]: any;
  percentage: number;
  currency: string;
  currencyAmount: number;
}

export interface ICexDistribution {
  [currency: string]: ICexDistributionAmount;
}

export interface ICexDistributionChart extends ICexDistribution {
  other: ICexDistributionAmount;
}

export interface ICexPortfolio {
  accounts: IAccount[];
  aggregated: IBtcAmount;
  distribution: ICexDistributionChart;
  ignoredCurrencies: string[];
}
