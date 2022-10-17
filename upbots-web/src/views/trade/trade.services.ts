import { http } from '@/services'
import { ICurrentPriceSummaryResult } from '@/types/crypto.types'
import { IPortfolio, IMyOrder, ITradeHistory, IAccountTradeBalance } from '../trade/trade-types'

export const tradeService = {
  getPrice ({ exchange, symbol }: { exchange: string; symbol: string; }) {
    return http.get<ICurrentPriceSummaryResult>(`/price/${exchange}/${symbol}`)
  },

  /* TODO ADD TYPE */
  getOrderBook (payload: string) {
    return http.get<any>(payload)
  },

  getTradeHistory (payload: string) {
    return http.get<ITradeHistory>(payload)
  },

  getTradeFormatValidity (payload: any) {
    return http.get(`/trade/format-validity/${payload.exchange}`, payload.params)
  },

  getTradeDirectOrders () {
    return http.get<IMyOrder[]>('/trade/directorders')
  },

  getTradeBalance (payload: string) {
    return http.get<IAccountTradeBalance>(`/portfolio/trade-balance/${payload}`)
  },

  getPortfolioByName (q: string) {
    return http.get<IPortfolio>(`/portfolio/filter?q=${q}`)
  },

  putTradeDirectorderCancel (id: string) {
    return http.put(`/trade/directorder/cancel/${id}`)
  },

  createDirectOrder (payload: any) {
    return http.post<any>('/trade/directorder', payload)
  }
}
