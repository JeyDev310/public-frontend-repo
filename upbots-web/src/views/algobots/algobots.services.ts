import { http } from '@/services'
import {
  ISubscriptedBots,
  IPerformanceBotCycles,
  IPerfSubscriptionCycles,
  IBotPerformanceSubscriptionSnapshotById,
  IPerfeesBotWallets,
  IAlgobotsSubscriptionAudits,
  IRefill,
  IFollowBotRequest,
  IMyTrades,
  IReviewRecord,
  IBotSnapshot,
  IBotSubscription,
  IBotUpdate,
  IUpdateBotInfo,
  IUserBotWebhookMessage
} from '@/types'
import { IPerfeesBotWallet } from '@/types/perfees/perfees.types'

class AlgoBotsService {
  getPerformanceBotsSnapshot () {
    return http.get<IBotSnapshot[]>('/performance/bots/snapshot/six-months')
  }

  getAlgobotsSubscriptions () {
    return http.get<ISubscriptedBots[]>('/algobots/subscriptions')
  }

  getMyTrades () {
    return http.get<IMyTrades[]>('/performance/my-trades')
  }

  getPerformanceBotCycles (id: string) {
    return http.get<IPerformanceBotCycles[]>(`/performance/bot/${id}/cycles/six-months`)
  }

  getAlgoBotsSubscriptionAuditsById (botId: string) {
    return http.get<IAlgobotsSubscriptionAudits[]>('/algobots/subscriptionaudits/', { params: { b: botId } })
  }

  getAlgoBotsTotalActiveBots () {
    return http.get<number>('/algobots/total-active-bots')
  }

  getPerformanceSubscriptionCyclesById (id: string) {
    return http.get<IPerfSubscriptionCycles[]>(`/performance/subscription/${id}/cycles/six-months`)
  }

  getBotPerformanceSubscriptionSnapshotById (id: string) {
    return http.get<IBotPerformanceSubscriptionSnapshotById>(`/performance/subscription/${id}/snapshot/six-months`)
  }

  getPerfeesBotWallets () {
    return http.get<IPerfeesBotWallets[]>('/perfees/bot-wallets')
  }

  getPerfeesBotWalletById (id: string) {
    return http.get<IPerfeesBotWallet>(`/perfees/bot-wallets/${id}`)
  }

  updateAccountPositionSize (payload: {
    subscriptionId: string;
    percentage: number;
    positionType: string;
    positionAmount: number;
  }) {
    return http.put('/algobots/subscription/position-size', payload)
  }

  updateAccountKey (payload: {subscriptionId: string; keyId: string; accountType: string;}) {
    return http.put('/algobots/subscription/accountkey', payload)
  }

  botWalletAutoRefill (payload: { botId: string; autoRefill: boolean;}) {
    return http.post<IRefill>('/perfees/bot-wallet-auto-refill', payload)
  }

  botWalletTransfer (payload: { botId: string; amount: number; transType?: string;}) {
    return http.post('/perfees/bot-wallet-transfer', payload)
  }

  pauseActivation (subId: string) {
    return http.put('/algobots/subscription/pause', { subId })
  }

  startActivation (data: IFollowBotRequest) {
    return http.post('/algobots/subscribe', data)
  }

  resumeActivation (payload: { botId: string; subId: string; }) {
    return http.put('/algobots/subscription/resume', payload)
  }

  deleteSubscription (payload: { botId: string; subId: string; }) {
    return http.delete(`/algobots/subscription/${payload.botId}/${payload.subId}`)
  }

  getPortfolioTradeBalance (payload: string) {
    return http.get<any>(`/portfolio/trade-balance/${payload}`)
  }

  getCurrentPerformanceFee (payload: { botId: string; botSubId: string; }) {
    return http.post<{result: number;}>('/perfees/calc-current-perfee', payload)
  }

  closePerformanceCycle (payload: { botId: string; botSubId: string; }) {
    return http.post('/perfees/performance-cycle-close', payload)
  }

  closeBotOrder (payload: { botId: string; botSubId: string; stratType: string; }) {
    return http.post('/algobots/close-bot-order', payload)
  }

  // NOT USED FOR NOW
  // getMostPopularBots () {
  //   return http.get<IPopularBot[]>('/algobots/ranking')
  // }

  getUserBotWebHook (payload: { botId: string; botSubId: string; }) {
    return http.get<any>(`/algobots/userbot/webhook?botId=${payload.botId}&botSubId=${payload.botSubId}`)
  }

  getAlgobotRating (payload: { botId: string; }) {
    return http.get<{ ratings: number; raters: number; myRating: number; myComment: string; }>(
      `/algobots/bot-rating/${payload.botId}`
    )
  }

  getAlgobotReview (payload: { botId: string; page: number; }) {
    return http.get<IReviewRecord[]>(
      `/algobots/bot-review/${payload.botId}/${payload.page}`
    )
  }

  submitAlgobotRating (payload: { botId: string; vote: number; comment: string;}) {
    return http.post('/algobots/rate-a-bot', payload)
  }

  getPricesHistory (payload: { crypto: string; fiat: string; days: number; }) {
    return http.get<any[]>(`/price/klines?crypto=${payload.crypto}&fiat=${payload.fiat}&days=${payload.days}`)
  }

  getBotSnapshotById (botId: string) {
    return http.get<IBotSnapshot>(`/performance/bot/${botId}/snapshot/six-months`)
  }

  getBotSubscriptionById (botId: string) {
    return http.get<IBotSubscription>(`/algobots/subscriptions/${botId}`)
  }

  getContractSize (payload: { exchange: string; base: string; quote: string; }) {
    return http.get<number>(`/settings/contract-size/${payload.exchange}/${payload.base}/${payload.quote}`)
  }

  updateBotInfo (botId: string, payload: IBotUpdate) {
    return http.put<IUpdateBotInfo>(`/algobots/${botId}`, payload)
  }

  getWebhooksById (botId: string) {
    return http.get<IUserBotWebhookMessage>(`/algobots/userbot/webhook/${botId}`)
  }
}

export const algoBotsService = new AlgoBotsService()
