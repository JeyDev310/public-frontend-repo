export interface INotification {
  id: string;
  title: string;
  logtime: string;
  description?: string;
  exOrderId: string;
  orderTrack: string;
  status: string;
  type: string;
  side: string;
  sbl: string;
  exch: string;
  qOrig: string;
  qExec: string;
  qRem: string;
  qExecCumul: string;
  accountRef: string;
  userId: string;
  pAsk: string;
  pExec: string;
  cumulQuoteCost: string;
  initiator: string;
  errorReason: string;
  isRead: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
