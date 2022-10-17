import { EPositionType } from '@/types'

const tradingErrorList: {
  exchange: string;
  errorReason: string;
  description: string;
}[] = [
  { exchange: '*', errorReason: 'balanceFetching', description: 'Error: BalanceFetching' },
  { exchange: '*', errorReason: 'saveTracking', description: 'Error: SaveTracking' },
  { exchange: '*', errorReason: 'feedOrder', description: 'Error: FeedOrder' },
  { exchange: '*', errorReason: 'ExchangeNotAllowed', description: 'Error: ExchangeNotAllowed' },
  { exchange: '*', errorReason: 'GetMinimumCost', description: 'Error: GetMinimumCost' },
  { exchange: '*', errorReason: 'GetMinAmount', description: 'Error: GetMinAmount' },
  { exchange: '*', errorReason: 'NewExchangeClientAndLoad', description: 'Error: NewExchangeClientAndLoad' },
  { exchange: '*', errorReason: 'TickerGetLastPrice', description: 'Error: TickerGetLastPrice' },
  { exchange: '*', errorReason: 'botMaxAmount', description: 'Error: BotMaxAmount' },
  { exchange: '*', errorReason: 'minCost', description: 'Error: Not enough quote capital to trade' },
  { exchange: '*', errorReason: 'minAmount', description: 'Error: Not enough base capital to trade' },
  { exchange: '*', errorReason: 'pricePrecision', description: 'Error: PricePrecision' },
  { exchange: '*', errorReason: 'quantityPrecision', description: 'Error: QuantityPrecision' },
  { exchange: '*', errorReason: 'openedQuantity', description: 'Error: OpenedQuantity' },
  { exchange: '*', errorReason: 'unexpectedPositionRequest', description: 'Error: UnexpectedPositionRequest' },
  { exchange: '*', errorReason: 'strategyNotAllowed', description: 'Error: Strategy Not Allowed' },
  { exchange: 'binance', errorReason: '-1013', description: 'Error: UnexpectedPositionRequest' },
  { exchange: 'binance', errorReason: '-2019', description: 'Error: Margin is insufficient.' }
]

export interface IAlgobotTradingErrorMessage {
  title: string;
  description: string;
}

export const algobotTradingErrorMessage = (activityData: any): IAlgobotTradingErrorMessage => {
  const message: IAlgobotTradingErrorMessage = {
    title: '',
    description: 'The bot was not able to pass the order, could be due to exchange connexion issue or api settings'
  }

  let tradingError = tradingErrorList.find((item) => item.errorReason === activityData.errorReason)
  if (!tradingError && !activityData.oTrackId?.completed && activityData.oTrackId?.errorReason) {
    tradingError = tradingErrorList.find((item) => item.errorReason === activityData.oTrackId?.errorReason)
  }
  if (tradingError) {
    message.title = tradingError.description
    if (tradingError.errorReason === 'strategyNotAllowed') {
      message.description = activityData.error
    } else if (tradingError.errorReason === 'minCost') {
      const coefficient = activityData.positionType !== EPositionType.FIXED ? activityData.accountPercent : 1
      const balance = activityData.balance * coefficient
      message.description = `quote amount: ${balance}${activityData.currency}`
    } else if (tradingError.errorReason === 'minAmount') {
      message.description = `base amount: ${activityData.balance}${activityData.currency}`
    } else if (tradingError.errorReason === 'balanceFetching') {
      if (activityData.error.includes('<APIError> code=-2015, msg=Invalid API-key, IP, or permissions for action')) { // binance
        message.description = 'Invalid API-key, IP, or permissions for action'
      } else if (activityData.error.includes('APIError: status=401, message=Not logged in')) { // ftx
        message.description = 'Invalid API-key, IP, or permissions for action'
      } else if (activityData.error.includes('{"code":"400003","msg":"KC-API-KEY not exists"}')) { // kucoin
        message.description = 'Invalid API-key, IP, or permissions for action'
      } else if (activityData.error.includes('{"code":"400004","msg":"Invalid KC-API-PASSPHRASE"}')) { // kucoin
        message.description = 'Invalid API-key, IP, or permissions for action'
      } else if (activityData.error.includes('"err-code":"api-signature-not-valid","err-msg"')) { // huobi
        message.description = 'Invalid API-key, IP, or permissions for action'
      }
    } else {
      message.description = ''
    }
  } else {
    message.title = 'Error: Exchange API issue'
  }
  return message
}
