import { http } from './http'

class BotService {
  getAll () {
    return http.get<any>('/algobots')
  }

  getOne (botId: string) {
    return http.get<any>(`/algobots/${botId}`)
  }

  postNewBot (payload: any) {
    return http.post('/algobots/admin/algobot', payload)
  }

  uploadBotImage (payload: any, botId: string) {
    return http.put(`/algobots/${botId}/picture`, payload)
  }

  updateBot (payload: any, botId: string) {
    return http.put(`/algobots/${botId}`, payload)
  }

  deleteBot (botId: string) {
    return http.delete(`/algobots/admin/algobot/${botId}`)
  }

  postTradingHistory (payload: any, botId: string) {
    return http.post(`/algobots/${botId}/trading-history`, payload)
  }

  getTradingHistory (botId: string) {
    return http.get(`/algobots/${botId}/trading-history`)
  }

  updateTheoricalCycles (botId: string) {
    return http.post(`/performance/${botId}/update-theorical-cycles`)
  }
}

export const botService = new BotService()
