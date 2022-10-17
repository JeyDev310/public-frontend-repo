interface IMyTradePair {
  base: string;
  quote: string;
}

export interface IMyTrades {
  botId: string;
  botName: string;
  exch: string;
  pair: IMyTradePair[];
  open: boolean;
  openAt: string;
  closeAt: string;
  qExec: number;
  entryPrice: number;
  closePrice: number;
  realisedGain: any;
  performanceFee: any;
  profitPercentage: number;
  profitPercentageUC: number;
  cycleSequence: number;
}

export interface IMyOpenTrade {
  bot: string;
  botId: string;
  pair: string[];
  date: string;
  amount: number;
  totalExecuted: number;
  entryPrice: number;
  pairLabel: string;
  currentProfitPercentage: number;
  currentGain: number;
}

export interface IMyTradeHistory {
  bot: string;
  pair: string[];
  started: string;
  completed: string;
  amount: number;
  totalExecuted: number;
  profitPercentage: number;
  totalGained: number;
}
