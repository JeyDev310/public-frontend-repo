export interface IDexagRequest {
  to: string;
  from: string;
  toAmount?: number;
  limitAmount: number;
  discluded?: string;
  dex: 'all';
}

export interface ITableColumn {
  dex: string;
  name: string;
  nameDesc?: string;
  price: string;
  total: string;
  markup: string;
}

export interface IExchangeData {
  id: string;
  checked: boolean;
  label: string;
}
