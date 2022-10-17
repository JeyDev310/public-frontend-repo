enum EPerformanceFeeSteps {
  READY = 'READY',
  OPENED = 'OPENED',
  PERFORMED = 'PERFORMED',
}

interface IPerformanceFee {
  paidAmount: number;
  performedStep: EPerformanceFeeSteps;
  remainedAmount: number;
}

interface IRealisedGain {
  btc: number;
  eur: number;
  ubxt: number;
  usd: number;
}

interface IPeriod {
  year: number;
  month: string;
  week: number;
  day: string;
}

enum EMeasuredObjects {
  BOT = 'BOT',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export interface IPerformanceBotCycles {
  openAt: string;
  botId?: string;
  botVer?: string;
  subBotId?: string;
  userId?: string;
  measuredObject: EMeasuredObjects;
  openPeriod: IPeriod;
  closeAt?: string;
  closePeriod: IPeriod;
  stratType: string;
  result: string;
  cycleSequence: number;
  open: boolean;
  sbl: string;
  exch: string;
  realisedGain?: IRealisedGain;
  performanceFee?: IPerformanceFee;
  profitPercentage?: number;
  profitPercentageUC?: number;
  entryPrice: number;
  closePrice?: number;
  qExec?: number;
}

type TBotStratType = 'LONG' | 'SHORT' | 'LONG_SHORT';

type TPositionType = 'fixed' | 'percent'

type TBotAccountType = 'spot' | 'future';

interface IBotAccountAllocated {
  maxamount: number;
  currency: string;
}

export interface ISubscriptedBots {
  id: string;
  botId: string;
  apiKeyRef: string;
  enabled: boolean;
  isOwner: boolean;
  botRunning: boolean;
  accountType: TBotAccountType;
  stratType: TBotStratType;
  createdAt?: string;
  updatedAt?: string;
  cycleSequence: number;
  status: number;
  accountPercent: number;
  positionType: TPositionType;
  positionAmount: number;
  accountLeverage: number;
  contractSize: number;
  baseAmount: number;
  openedQuantity: number;
  quote: string;
  accountAllocated: IBotAccountAllocated;
  error?: string;
  errorAt?: string;
  errorReason?: string;
  picture: {
    mimetype: string;
    data: string;
  };
}

export interface IAlgoBotSubscription {
  id: string;
  botId: string;
  apiKeyRef: string;
  enabled: boolean;
  isOwner: boolean;
  botRunning: boolean;
  stratType: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  positionType?: string;
  positionAmount?: number;
}

export interface IPerfSubscriptionCycles {
  closeAt: string;
  closePeriod: IPeriod;
  closePrice: number;
  cycleSequence: number;
  entryPrice: number;
  exch: string;
  measuredObject: EMeasuredObjects;
  open: false;
  openAt: string;
  openPeriod: IPeriod;
  performanceFee: IPerformanceFee;
  profitPercentage: number;
  profitPercentageUC: number;
  qExec: number;
  realisedGain: IRealisedGain;
  result: string;
  sbl: string;
  stratType: string;
  subBotId: string;
  userId: string;
}

interface IChartData {
  labels: string[];
  data: number[];
}

interface ICharts {
  [key: string]: IChartData;
}

type TBotMeasuredObjects = 'BOT' | 'SUBSCRIPTION'

type TBotSizes = 'MONTH6' | 'MONTH12' | 'ALLMONTH'

export interface IBotPerformanceSubscriptionSnapshotById {
  allmonths: number;
  allmonthsUC: number;
  botId: string;
  charts: ICharts;
  fees: number;
  maxDrawdown: number;
  measuredObject: TBotMeasuredObjects;
  month1: number;
  month1UC: number;
  month3: number;
  month3UC: number;
  month6: number;
  month6UC: number;
  size: TBotSizes;
  snapshotDate: string;
  stratType: TBotStratType;
  subBotId: string;
}

export enum EWalletStatuses {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  LOCKED = 'LOCKED',
}

export interface IPerfeesBotWallets {
  userId: string;
  botId: string;
  botSubId: string;
  amount: number;
  allocatedAmount: number;
  creditAmount: number;
  debtAmount: number;
  paidAmount: number;
  status: EWalletStatuses;
  autoRefill: boolean;
  botRef?: string;
  botName?: string;
  name?: string;
}

interface IEventEntity {
  at: string;
  status: string;
  exOrderId: string;
  side: string;
  sbl: string;
  exch: string;
  type: string;
  qOrig: string;
  qExec: string;
  qRem: string;
  qExecCumul: string;
  source: string;
  pAsk: string;
  pExec: string;
  cumulQuoteCost: string;
}

interface ICompletionEntity {
  qExec: number;
  pExec: number;
  cumulQuoteCost: number;
}

export enum EUserFriendlyOrderStatus {
  NA = 'na',
  CANCELED = 'cancelled',
  FILLED = 'filled',
  PARTIAL = 'partial',
  WAITING = 'waiting',
  FAILED = 'failed',
}

interface IOrderTrackingModel {
  id: string;
  botId: string;
  userId: string;
  exchKeyId: string;
  botSubId: string;
  stratId: string;
  ctxBot: string;
  ctx: string;
  side: string;
  orderType: string;
  priceAsked: string;
  qtyBaseAsked: string;
  qtyQuoteAsked?: any;
  sbl: string;
  exch: string;
  initiator: string;
  aborted: boolean;
  completed: boolean;
  cycleSequence: number;
  signalId: string;
  completion: ICompletionEntity;
  errorAt: string;
  errorReason: string;
  events: IEventEntity[];
  // eslint-disable-next-line camelcase
  created_at: string;
  // eslint-disable-next-line camelcase
  updated_at: string;
  userOrderStatus: EUserFriendlyOrderStatus;
}

export interface IAlgobotsSubscriptionAudits {
  botId: string;
  botSubId: string;
  userId: string;
  oTrackId: IOrderTrackingModel;
  accountPercent: number;
  status: number;
  position: string;
  followed: boolean;
  cycleSequence: number;
  createdAt: string;
  updatedAt: string;
  errorReason: string;
  errorAt: { type: string; };
  signalId: { type: string; };
  currency: { type: string; };
  exchange: { type: string; };
  balance: number;
}

export interface IPerfeesUserWallet {
  userId: string;
  amount: number;
  allocatedAmount: number;
  availableAmount: number;
  debtAmount: number;
  creditAmount: number;
  rewardCreditedForBots: boolean;
  depositAddressETH: string;
  depositAddressBSC: string;
  referral?: {
    myCode: string;
    invitedCode: string;
    totalEarned: number;
  };
}

interface IBotPerFeesDistr {
  burn: number;
  developer: number;
  pool: number;
  reserve: number;
  percent: number;
}

interface IBotPerfFees {
  address: string;
  distribution: IBotPerFeesDistr;
  percent: number;
}

interface IBotPerfSnapshots {
  allmonths: number;
  botId: string;
  charts: ICharts;
  fees: number;
  maxDrawdown: number;
  measuredObject: TBotMeasuredObjects;
  month1: number;
  month3: number;
  month6: number;
  size: TBotSizes;
  snapshotDate: string;
  stratType: TBotStratType;
}

interface IPicture {
  mimetype: string;
  data: string;
}

interface IRaters {
  id: string;
  user: string;
  vote: number;
  comment: string;
  reviewedAt: string;
}

export interface IWebhook {
  exitTrigger: boolean;
}

export type TCategory = 'algobot' | 'copybot' | 'userbot'

export enum ECategory {
  AlgoBot = 'algobot',
  CopyBot = 'copybot',
  UserBot = 'userbot'
}

export interface IBotSnapshot {
  id: string;
  name: string;
  botVer: string;
  description: string;
  base: string;
  quote: string;
  stratType: TBotStratType;
  category: TCategory;
  ownerId: string;
  updatedAt?: string;
  creator: string;
  picture: IPicture;
  avgtrades: number;
  lastMonthTrades: number;
  allocatedMaxAmount: number;
  allocatedCurrency: string;
  ratings: number;
  raters?: IRaters[];
  reviewerName: string;
  reviewerImg: string;
  reviewerBotRating: number;
  botRef: string;
  perfFees: IBotPerfFees;
  realOwnerId?: string;
  exchangesType: string[];
  priceDecimal: number;
  webhook: IWebhook;
  img: string;
  perfSnapshots: IBotPerfSnapshots;
}

export interface IBotSubscription {
  id: string;
  botId: string;
  apiKeyRef: string;
  enabled: true;
  isOwner: boolean;
  botRunning: boolean;
  accountType: TBotAccountType;
  stratType: TBotStratType;
  createdAt?: string;
  updatedAt?: string;
  cycleSequence: number;
  status: number;
  accountPercent: number;
  accountLeverage: number;
  contractSize: number;
  baseAmount: number;
  openedQuantity: number;
  accountAllocated: IBotAccountAllocated;
  positionType?: string;
  positionAmount?: number;
  quote?: string;
  error?: string;
  errorAt?: string;
  errorReason?: string;
}

// NOT USED FOR NOW
// export interface IPopularBot {
//   botId: string;
//   botName: string[];
//   followers: number;
//   amount: number;
// }

export interface IFollowBotRequest {
  botId: string;
  apiKeyRef: string;
  // quantity: number;
  // FIXME: only percentage should be sent (quantity is old specs)
  accountType: string;
  stratType: string;
  accountPercentage: number;
  accountLeverage?: number;
  contractSize?: number;
  baseAmount?: number;
  positionType?: string;
  positionAmount?: number;
}

export interface IRefill {
  userId: string;
  botId: string;
  botSubId: string;
  amount: number;
  allocatedAmount: number;
  creditAmount: number;
  debtAmount: number;
  paidAmount: number;
  status: EWalletStatuses;
  autoRefill: boolean;
  createdAt: string;
}

export interface IReviewRecord {
  user: string;
  picture: {
    mimetype: string;
    data: string;
  };
  vote: number;
  comment: string;
  reviewedAt: number; // valude of Date.getTime()
}

export enum EPositionType {
  FIXED = 'fixed',
  PERCENT = 'percent'
}

export enum EAlgoBotsCardType {
  Bot = 'bot',
  BestBot = 'best-bot',
  PopularBot = 'popular-bot'
}

export type TStratType = 'LONG' | 'SHORT' | 'LONG_SHORT'

export enum EBotStratType {
  LONG = 'LONG',
  SHORT = 'SHORT',
  LongShort = 'LONG_SHORT',
}

export type TOrderType = 'MARKET' | 'LIMIT'

export enum EBotSnapshotRef {
  SURGEBOTSXP = 'SURGEBOTSXP',
  SUPERTRADERLINK = 'SUPERTRADERLINK',
  SUPERTRADERBNB = 'SUPERTRADERBNB',
  HARSIBTC = 'HARSIBTC',
  AVAXUSDT1 = 'AVAXUSDT1',
  TOMOLO1 = 'TOMOLO1'
}

export enum EStrategy {
  LONG = 'long',
  SHORT = 'short',
  LongShort = 'long-short'
}

export interface IBotUpdate {
  name?: string;
  botVer?: string;
  description?: string;
  base?: string;
  quote?: string;
  stratType?: TBotStratType;
  category?: TCategory;
  ownerId?: string;
  avgtrades?: number;
}

interface IAllocated {
  username: string;
  userimg: string;
  botrating: number;
}

interface IMarket {
  base: string;
  quote: string;
}

interface IPercent {
  percent: number;
}

interface IReviews {
  username: string;
  userimg: string;
  botrating: number;
}

export interface IUpdateBotInfo {
  allocated: IAllocated;
  avgtrades: number;
  botRef: string;
  botVer: string;
  category: TCategory;
  createdAt: string;
  creator: string;
  description: string;
  enabled: boolean;
  exchangesType: string[];
  lastMonthTrades: number;
  market: IMarket;
  name: string;
  owner: string;
  perfFees: IPercent;
  priceDecimal: number;
  raters: string[];
  ratings: number;
  reviews: IReviews;
  stratType: TStratType;
  updatedAt: string;
  webhook: IWebhook;
}

export interface IUserBotWebhook {
  botId: string;
  stratType: string;
  position: string;
  userFilter?: string[];
  secret?: string;
}

export interface IUserBotWebhookMessage {
  webhookURL: string;
  messages: IUserBotWebhook[];
}

export enum EBotSorted {
  Performance = 'performance',
  Performance6M = 'performance_6m',
  Performance3M = 'performance_3m',
  Date = 'date'
}

export enum EBotStrategy {
  All = 'all'
}

export enum EBotStatus {
  Active = 'active',
  Inactive = 'inactive',
  Paused = 'paused',
}
