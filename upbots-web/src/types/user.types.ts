import { TDropdownOption } from '@/types'

export enum ECouponTypes {
  UNIQUE = 'unique',
  GLOBAL = 'global',
}
export interface ICoupons {
  code: string;
  promoName: string;
  description: string;
  couponType: ECouponTypes;
  activated: boolean;
  activationDate?: Date;
  validFrom?: Date;
  validTo?: Date;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExchangeKey {
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
  img?: string;
}
export interface IFavoriteCurrency {
  value: string;
  label: string;
}

export interface IAlgobotFilterSetting {
  status: TDropdownOption;
  strategy: TDropdownOption;
  exchanges: string[];
  pairs: string[];
  sortedByValue: TDropdownOption;
}

export interface IUserSettings {
  userId?: string;
  darkMode?: boolean;
  favoriteCurrency?: IFavoriteCurrency;
  algobotFilters?: IAlgobotFilterSetting;
}
