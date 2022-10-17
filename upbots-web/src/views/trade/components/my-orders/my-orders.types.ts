import { EUserFriendlyOrderStatus } from '@/types'
import {
  EInitiator,
  EOrderSideType,
  EOrderType,
  ICompletion,
  ITradingSettingsPair
} from '../../trade-types'

export interface IOrder {
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

export interface IOrderFormatted {
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
  accountName: string;
  baseCurrency: string;
  quoteCurrency: string;
}

export interface IEnabledExchanges {
  [currency: string]: ITradingSettingsPair[];
}
