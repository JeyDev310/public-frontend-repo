export interface ICoinPriceData {
  // eslint-disable-next-line camelcase
  market_caps: [number, number][];
  prices: [number, number][];
  // eslint-disable-next-line camelcase
  total_volumes: [number, number][];
}

export interface ICoinPriceResponsePayload {
  cryptoSymbol: string;
  fiatSymbol: string;
  data: ICoinPriceData;
}

export interface ICoinItem {
  title: string;
  name: string;
  symbol: string;
  srcCoin: string;
}

export interface ICoinPriceRequestPayload {
  cryptoSymbol: string;
  fiatSymbol: string;
}

interface IPriceChange {
  percentage: number;
  absolute: number;
}

interface ICurrentPrice {
  last: number;
  high: number;
  low: number;
  change: IPriceChange;
}

interface ICurrentPriceSummary {
  price: ICurrentPrice;
  volume: number;
  volumeQuote: number;
}

export interface ICurrentPriceSummaryResult {
  result: ICurrentPriceSummary;
}

export enum ECryptoCurrency {
  BTC = 'BTC',
  ETH = 'ETH',
  BUSD = 'BUSD',
  BNB = 'BNB',
  AVAX = 'AVAX',
  UBXT = 'UBXT',
  LINK = 'LINK',
  TOMO = 'TOMO',
  USDT = 'USDT',
  XBT = 'XBT',
  FTT = 'FTT',
  ETC = 'ETC',
  BAT = 'BAT',
  CAKE = 'CAKE',
  SHIB = 'SHIB'
}

export enum EAccount {
  BINANCE = 'binance',
  KUCOIN = 'kucoin',
  HUOBI = 'huobi',
  FTX = 'ftx',
  COINBASEPRO = 'coinbasepro',
  BinanceUS = 'binance-us',
  KucoinFuture = 'kucoin-future',
  BinanceFuture = 'binance-future',
  FtxFuture = 'ftx-future'
}

export enum EAccountType {
  SPOT = 'spot',
  FUTURE = 'future'
}

export interface ICryptoPriceLatest {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number; // volumeBase
  volumeto: number; // volumeQuote
  close: number;
  conversionType: string;
  conversionSymbol: string;
}

export interface ICryptoPrice {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  Ignored?: boolean;
  RateLimit: any;
  // latest tick on an hourly base
  Latest: ICryptoPriceLatest;
  // latest tick on the previous day based on CEST time
  LatestPreviousDay: ICryptoPriceLatest;
  Data: {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    HourlyData: ICryptoPriceLatest[];
    DailyData: ICryptoPriceLatest[];
  };
}
