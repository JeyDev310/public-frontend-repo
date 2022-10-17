import { http } from '@/services'

class PortfolioService {
  getAllPortfolios () {
    return http.get('/portfolio/filter/all')
  }

  getPortfolioByName (q: string) {
    return http.get(`/portfolio/filter?q=${q}`)
  }
}

export const portfolioService = new PortfolioService()
