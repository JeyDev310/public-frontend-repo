type TPerfeesBotWalletStatuses = 'ENABLED' | 'DISABLED' | 'LOCKED'

type TTransferType = 'SET' | 'DEPOSIT' | 'WITHDRAW'

export interface IPerfeesBotWallet {
  allocatedAmount: number;
  amount: number;
  autoRefill: boolean;
  botId: string;
  createdAt: string;
  creditAmount: number;
  debtAmount: number;
  paidAmount: number;
  status: TPerfeesBotWalletStatuses;
  userId: string;
}

interface IPerfeesUserWalletTotalEarned {
  referral: number;
}

export interface IPerfeesUserWallet {
  allocatedAmount: number;
  amount: number;
  availableAmount: number;
  createdAt: string;
  creditAmount: number;
  debtAmount: number;
  depositAddressBSC: string;
  depositAddressETH: string;
  totalEarned: IPerfeesUserWalletTotalEarned;
  referral: number;
  userId: string;
}

export interface IWalletTransfer {
  amount: number;
  address: string;
  transferType: TTransferType;
  isETH?: boolean;
  confirmCode?: string;
}
