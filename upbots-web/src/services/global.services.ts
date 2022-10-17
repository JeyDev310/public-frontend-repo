import { http } from './http'

/* TYPES */
import { IPerfeesUserWallet } from '@/types/perfees/perfees.types'
import { ICoinPriceData, ICoinPriceRequestPayload, ICryptoPrice } from '@/types/crypto.types'
import { IExchangeSettings, IPriceSummary } from '@/views/trade/trade-types'

class GlobalService {
  getPerfeesUserWallet () {
    return http.get<IPerfeesUserWallet>('/perfees/user-wallet')
  }

  getMarketValueHistory (payload: ICoinPriceRequestPayload) {
    return http.get<ICoinPriceData>(`/price/history?crypto=${payload.cryptoSymbol}&fiat=${payload.fiatSymbol}`)
  }

  getStakingAmount () {
    return http.get<{botsAccess: boolean; ubxtStakingAmount: number;}>('/account/staking-amount')
  }

  getSettingsExchanges () {
    return http.get<IExchangeSettings>('/settings/exchanges')
  }

  getPriceSummary (payload: any) {
    return http.get<IPriceSummary[]>('/price/summary', payload)
  }

  getCryptoPrice (payload: { accExchange: string; base: string; quote: string; }) {
    return http.get<ICryptoPrice>(
      `/cryptoPrice/${payload.accExchange}/${payload.base}/${payload.quote}`
    )
  }
}

export const globalService = new GlobalService()
