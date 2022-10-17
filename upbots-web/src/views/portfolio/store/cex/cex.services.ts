/* eslint-disable no-prototype-builtins */
import { http } from '@/services'
import { ICexPortfolio } from '@/types'

class CexService {
  getAllPortfolios () {
    return http.get<ICexPortfolio>('/portfolio/filter/all')
  }

  getPortfolioByName (q: string) {
    return http.get<ICexPortfolio>(`/portfolio/filter?q=${q}`)
  }

  getPortfolioByUrlAndConFig (payload: any) {
    return http.get<ICexPortfolio>(payload.url, payload.config)
  }

  fetchPortfolioEvolution (start: string, end: string) {
    return http.get<ICexPortfolio>('/portfolio/evolution', { params: { start, end } })
  }

  fetchUserSummary () {
    return http.get<ICexPortfolio>('/portfolio/summary')
  }
}

export const cexService = new CexService()
