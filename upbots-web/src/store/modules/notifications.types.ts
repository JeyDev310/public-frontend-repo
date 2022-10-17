// mutation types
export const WS_ALREADY_CONNECTED = 'WS_ALREADY_CONNECTED'
export const WS_ALREADY_DISCONNECTED = 'WS_ALREADY_DISCONNECTED'
export const WS_ABORT_CONNECTION = 'WS_ABORT_CONNECTION'
export const WS_CONNECTING = 'WS_CONNECTING'
export const WS_DISCONNECTING = 'WS_DISCONNECTING'
export const WS_ORDER_EVENT = 'ws_order_event'
export const WS_PERFEES_EVENT = 'ws_perfees_event'

// socket.io-extended reserved value: DO NOT EDIT this sting value or websocket communication will be broken
export const SOCKET_IO_CONNECT = 'SOCKET_CONNECT'
export const SOCKET_IO_DISCONNECT = 'SOCKET_DISCONNECT'
export const SOCKET_IO_RECONNECT_ATTEMPT = 'SOCKET_RECONNECT_ATTEMPT'
export const SOCKET_IO_RECONNECT_FAILED = 'SOCKET_RECONNECT_FAILED'

// message type
export interface IOrderEventPayload {
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
  exDelay: number;
  accountRef: string;
  userId: string;
  source: string;
  pAsk: string;
  pExec: string;
  cumulQuoteCost: string;
  initiator: string;
  // error: string; //do not expose technical error (only error reason)
  errorReason: string;
}
