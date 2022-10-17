export interface ITableHeaders {
  property: string;
  label: string;
  sortable?: boolean;
  show?: boolean;
  cellClasses?: string;
  width?: number;
  minWidth?: number;
}

export interface ITableSort {
  order: string;
  orderBy: string;
}

export type TIndexedObject<T = any> = {
  [key: string]: T;
}

export type TNullableField<T> = T | null

export type TIndexedArray<T> = Array<T | any>

export type TCallback = <T>(t?: T) => void;

export type TCallbackFn<T extends unknown[] = [], R = void> = (...args: T) => R

export type TSidebar = {
  route: string;
  label: string;
  icon: string;
  isComingSoon?: boolean;
  betaLabel?: string;
  isBeta?: boolean;
  exact: boolean;
  isMobilePreview?: boolean;
  subListItems?: TSidebar[];
  isDAppPage?: boolean;
}

export type TDropdownOption = {
  label: string;
  value: string | number;
}
