export enum ETransferType {
  SET = 'SET',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

export interface IAlgoBotStats {
  ownerId: string;
  name: string;
  botRef: string;
  totalUsers: number;
  totalRealisedUbxtGain: number;
  openedTradeAmount: number;
  lastTradeAmount: number;
  activatedAt?: string;
}
