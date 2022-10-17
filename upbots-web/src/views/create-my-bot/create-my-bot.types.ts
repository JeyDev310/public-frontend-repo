import { IWebhook, TOrderType, TStratType } from '@/types'

export interface IUserBotCreateDto {
  name: string;
  accountId: string;
  base: string;
  quote: string;
  stratType: TStratType; // LONG, SHORT, LONG_SHORT
  orderType: TOrderType; // LIMIT, MARKET
  position: number;
  leverage: number;
  webhook: IWebhook;
}

interface IEntryLongShort {
  orderType: number;
  sizePosition:number[];
  leverage: number;
}

export interface IEntry {
  [key: string]: IEntryLongShort;
}
