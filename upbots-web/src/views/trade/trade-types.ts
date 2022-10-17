import { EUserFriendlyOrderStatus, TIndexedArray } from '@/types'

export enum EKeyTypes {
  Binance = 'binance',
  BinanceUS = 'binance-us',
  Kucoin = 'kucoin',
  KucoinFuture = 'kucoin-future',
  Ftx = 'ftx',
  Huobi = 'huobi'
}

export interface IAccount {
  id: string;
  name: string;
  created: string;
  exchange: string;
  type: string;
  quoteCurrency?: string;
  publicKey: string;
  valid: boolean;
  lastHealthCheck: string;
  updated: string;
  displayName?: string;
}

export interface ICompatibleExchanges {
  enabled: boolean;
  key: string;
  label: string;
  name: string;
  soon: boolean;
}

enum EDigitsCountingPrecisionMode {
  DECIMAL_PLACES = 'DECIMAL_PLACES', // 0,
  SIGNIFICANT_DIGITS = 'SIGNIFICANT_DIGITS', // 1,
  TICK_SIZE = 'TICK_SIZE', // 2,
}

interface IPrecision {
  amount: number;
  price: number;
  base: number;
  quote: number;
}

interface IMinMax {
  min: number;
  max: number;
}

interface ILimits {
  amount: IMinMax;
  price: IMinMax;
  cost: IMinMax;
}

export interface ITradingSettingsPair {
  baseCurrency: string;
  contractSize?: number;
  createdAt: string;
  exchange: string;
  future: boolean;
  isFavourite?: boolean;
  label?: string;
  limits: ILimits;
  market: string;
  name?: string;
  precision: IPrecision;
  precisionMode: EDigitsCountingPrecisionMode;
  quoteCurrency: string;
  spot: boolean;
  swap: boolean;
  symbol: string;
  symbolForData: string;
  symbolLabel: string;
  tradingAllowed: boolean;
  type: string;
  updatedAt: string;
  margin?: boolean;
}

export interface ITradingSettings extends ICompatibleExchanges {
  pairs: ITradingSettingsPair[];
}

export interface ISettingsExchange {
  compatibleExchanges: ICompatibleExchanges[];
  tradingSettings: ITradingSettings[];
}

interface IChange {
  percentage: number;
  absolute: number;
}

interface IPrice {
  change: IChange;
  high: number;
  last: number;
  low: number;
}

export interface IPairSummary {
  exchange: string;
  price: IPrice;
  symbol: string;
  symbolForData: string;
  symbolLabel: string;
  volume: number;
  volumeQuote: number;
}

export interface IPairFilter {
  value?: string | number;
  label?: string;
  headerLabel?: boolean;
}

interface IAllowance {
  account: string;
  cost: number;
  remaining: number;
  remainingPaid: number;
}

interface IOrderBookResult {
  asks: [number, number];
  bids: [number, number];
  sequence?: string;
  seqNum?: number;
  time?: number;
}

/* HUOBI RETURN (allowance, result) */
/* BINANCE | BINANCEUS RETURN (allowance, result) */
/* FTX RETURN (asks, bids) */
/* KUCOIN RETURN (asks, bids, sequence, time) */
export interface IOrderBook {
  asks?: [number, number][];
  bids?: [number, number][];
  allowance?: IAllowance;
  result?: IOrderBookResult;
  sequence?: string;
  time?: number;
}

export interface IFormattedOrderBook {
  id: number;
  amount: number;
  price: number;
  total: number;
  progressBarColor: string;
  percentage?: number;
}

export interface ITradeHistory {
  allowance?: IAllowance;
  result: TIndexedArray<number>;
}

export interface IFormattedTradeHistory {
  id: number;
  time: string;
  price: number;
  amount: number;
}

interface IPortfolioDistributionCurrency {
  btc: number;
  currency: string;
  currencyAmount: number;
  eur: number;
  percentage: number;
  usd: number;
}

export interface IPortfolioDistribution {
  [currency: string]: IPortfolioDistributionCurrency;
}

interface IPortfolioIgnoredCurrencies {
  name: string;
}

export enum EOrderSideType {
  BUY = 'Buy',
  SELL = 'Sell',
}

interface IAggregated {
  btc: number;
  eur: number;
  usd: number;
}

interface ITotal {
  btc: number;
  eur: number;
  usd: number;
}

interface IPofolioAccountSubAccounts {
  name: string;
}

interface IPortfolioAccount {
  error: boolean;
  exchange: string;
  id: string;
  name: string;
  subAccounts: IPofolioAccountSubAccounts[];
  total: ITotal;
}

export interface IPortfolio {
  accounts: IPortfolioAccount[];
  aggregated: IAggregated;
  distribution: IPortfolioDistribution;
  ignoredCurrencies: IPortfolioIgnoredCurrencies;
}

export interface IBalance {
  coin: string;
  amount: number;
  btc: number;
  value: number;
}
export interface IFreeBalances {
  [currency: string]: number;
}

export interface IAccountTradeBalance {
  exchange: string;
  freeBalances: IFreeBalances;
}

export interface ICreatedOrderData {
  exchange: string;
  accountName: string;
  apiKeyRef: string;
  symbol: string;
  side: string;
  type: string;
  quantity: number;
  totalValue: string;
  price: number;
}

export interface IOrderInputOptions {
  precision: number;
  max: number;
  step: number;
}

export interface IAllowedExchange {
  name: string;
  label: string;
  enabled: boolean;
  soon: boolean;
}

interface IMarketPairSettingDto {
  exchange: string;
  symbolLabel: string;
  symbol: string;
  baseCurrency: string;
  quoteCurrency: string;
  tradingAllowed: boolean;
  type?: string;
  spot?: boolean;
  margin?: boolean;
  swap?: boolean;
  future?: boolean;
  precisionMode: EDigitsCountingPrecisionMode;
  limits: ILimits;
  precision: IPrecision;
  symbolForData: string;
  market: string;
  contractSize?: number;
}

export interface IAllowedExchangeWithPairsDto extends IAllowedExchange {
  pairs: IMarketPairSettingDto[];
}

export interface IPairItem {
  label: string;
  value: string | number;
  headerLabel?: boolean;
}

export interface IPairSelectionCoins {
  stableCoins: IPairItem[];
  alts: IPairItem[];
}

export interface IPriceSummary {
  exchange: string;
  price: IPrice;
  symbol: string;
  symbolLabel: string;
  symbolForData: string;
  volume: number;
  volumeQuote: number;
}

export interface IExchangeSettings {
  compatibleExchanges: IAllowedExchange[];
  tradingSettings: IAllowedExchangeWithPairsDto[];
}

export enum EOrderType {
  LIMIT = 'Limit',
  MARKET = 'Market',
}

export enum EInitiator {
  DIRECT = 'direct',
  MSTRAT = 'mstrat',
  ALGOBOT = 'algobot',
  USERBOT = 'userbot'
}

export interface ICompletion {
  qExec: number;
  pExec: number;
  cumulQuoteCost: number;
}

export interface IMyOrder {
  aborted: boolean;
  completed: boolean;
  completion?: ICompletion;
  // eslint-disable-next-line camelcase
  created_at: string;
  errorAt?: string;
  errorReason?: string;
  exch: string;
  exchKeyId: string;
  id: string;
  initiator: EInitiator;
  orderType: EOrderType;
  priceAsked: string;
  qtyBaseAsked: string;
  qtyQuoteAsked?: any;
  sbl: string;
  side: EOrderSideType;
  // eslint-disable-next-line camelcase
  updated_at: string;
  userId: string;
  userOrderStatus: EUserFriendlyOrderStatus;
  botId?: string;
  botSubId?: string;
  stratId?: string;
  ctx?: string;
  ctxBot?: string;
  cycleSequence?: number;
  signalId?: string;
  events: Array<any>;
  error?: string;
}
