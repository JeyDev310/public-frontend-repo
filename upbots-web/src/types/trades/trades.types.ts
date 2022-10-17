interface IPrecisionRules {
  amount: number;
  price: number;
  base: number;
  quote: number;
}

type TPrecisionMode = 'DECIMAL_PLACES' | 'SIGNIFICANT_DIGITS' | 'TICK_SIZE'

interface ISuggestedInput {
  quantity?: any;
  price?: any;
}

interface ICheckList {
  costLimit?: boolean;
  quantityPrecision?: boolean;
  quantityLimit?: boolean;
  pricePrecision?: boolean;
  priceLimit?: boolean;
}

export interface IFormatValidity {
  exchange: string;
  market: string;
  symbol: string;
  validity: boolean;
  checkList: ICheckList;
  suggestedInput: ISuggestedInput;
  comments: string;
  precisionMode: TPrecisionMode;
  precisionRules: IPrecisionRules;
}
