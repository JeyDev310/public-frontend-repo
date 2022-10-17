export interface IDeFiGeneralCoin {
  tickerSymbol: string;
  balance: number;
  usdValue: number;
}

interface ISushiswapData {
  stake: IDeFiGeneralCoin;
}

interface IDeFiCompoundCoin {
  tickerSymbol: string;
  balance: number;
  usdValue: number;
  apr: number;
}

export interface IGeneralProjectData {
  tokens: IDeFiGeneralCoin[];
  totalUsdValue: number;
}

export interface IAaveData {
  [subTitle: string]: IDeFiGeneralCoin[];
}

export interface ICompoundData {
  [subTitle: string]: IDeFiCompoundCoin[][];
}

export interface IProjectData {
  address?: string;
  uniswapV2?: IGeneralProjectData[];
  pancakeswap?: IGeneralProjectData[];
  balancer?: IGeneralProjectData[];
  curve?: IGeneralProjectData[];
  aave?: IAaveData;
  compound?: ICompoundData;
  sushiswap?: ISushiswapData;
}

export interface IToken {
  address: string;
  contractTickerSymbol: string;
  contractLogoUrl: string;
  balance: number;
  quote: number;
  blockchain: 'eth' | 'bsc';
}

export interface IDexBalancesDto {
  addressList: string[];
  quoteCurrency: 'usd';
  quoteCurrencyConversionRates: {
    btc: number;
    eur: number;
  };
  tokens: IToken[];
  projects: IProjectData[];
}

export interface IDexWallet {
  label: string;
  address: string;
  allWallets?: boolean;
}

export interface IDexEvolutionAmount {
  btc: number;
  date: Date;
}

export interface IDexAssetSummary {
  address: string;
  evolution: IDexEvolutionAmount[];
}

interface IDexAssetsEvolutionAmount {
  btc: number;
  date: Date;
}

export interface IDexAssetDto {
  address: string;
  evolution: IDexAssetsEvolutionAmount[];
}

export interface IUSDConverstion {
  [key: string]: number;
}

export interface IVeeValidateAddDexWallet {
  label: string;
  address: string;
}

export type TAddDexWallet = IVeeValidateAddDexWallet
