import { http } from './http'
import { IFormatValidity } from '@/types/trades/trades.types'

class TradesService {
  getTradeFormatValidity (payload: { accExchange: string; symbol: string; baseCurrency: string; quoteCurrency: string;
    quantity: number; price: number; }) {
    const exch = payload.accExchange
    const symbol = payload.symbol
    const baseCurrency = payload.baseCurrency
    const quoteCurrency = payload.quoteCurrency
    const quantity = payload.quantity
    const price = payload.price

    return http.get<IFormatValidity>(
      `/trade/format-validity/${exch}?symbol=${symbol}&baseCurrency=${baseCurrency}
&quoteCurrency=${quoteCurrency}&quantity=${quantity}&price=${price}`
    )
  }
}

export const tradesService = new TradesService()
