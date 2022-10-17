export enum ETransactionTypes {
  TRANSFER = 'TRANSFER',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  PERFORMANCE_FEE = 'PERFORMANCE_FEE',
}

export enum ETransactionStatuses {
  PENDING = 'PENDING',
  TRANSFERRING = 'TRANSFERRING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CONFIRMED = 'CONFIRMED',
}

enum EFeeRecipientType {
  DEVELOPER = 'DEVELOPER',
  BURN = 'BURN',
  POOL = 'POOL',
  RESERVE = 'RESERVE',
  GROUP = 'GROUP',
}

export interface IUserTransaction {
  transactionId?: string;
  userId?: string;
  botId: string;
  botName?: string;
  type: ETransactionTypes;
  subType?: string;
  completed?: boolean;
  status: ETransactionStatuses;
  address?: string;
  amount: number;
  totalAmount?: number;
  hash?: string;
  group?: EFeeRecipientType;
  confirmations?: number;
  confirmPercent?: number;
  explorer?: string;
  error?: string;
  extra?: any;
}
