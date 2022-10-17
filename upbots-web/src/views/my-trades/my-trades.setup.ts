import { computed, reactive, toRefs } from 'vue'

import { appNotify } from '@/components/stateless/notifications'

import { algoBotsService, tradeService } from '@/services'
import { EErrorsMessage, IMyOpenTrade, IMyTradeHistory, IMyTrades } from '@/types'

import { useBots } from '@/global-setup/bots.composition.setup'

/* MY TRADES STATE */
const state = reactive({
  myTradesLoading: true as boolean,
  activeBotsLoading: true as boolean,
  openTrades: [] as IMyOpenTrade[],
  prices: {} as { [pair: string]: number; },
  tradeHistory: [] as IMyTradeHistory[],
  myTrades: [] as IMyTrades[]
})

/* USE BOTS SETUP */
const {
  subscriptedBots,
  fetchAlgoBotsTotalActiveBots,
  fetchSubscriptedBots
} = useBots()

/* GET COUNT OF SUBSCRIBED BOTS */
const getSubscribedBots = computed((): number => subscriptedBots.value.filter((x) => x.enabled).length)

/* ROUND FRACTION HELPER FUNCTION */
function roundFraction (val: number, pos: number): number {
  const pow = Math.pow(10, pos)
  return Math.round((val + Number.EPSILON) * pow) / pow
}

/* GET OPEN TRADES DATA */
const getOpenTrades = computed({
  get () { return state.openTrades },
  set (value: IMyOpenTrade[]) { return value }
})

/* GET TRADE HISTORY DATA */
const getTradeHistory = computed({
  get () { return state.tradeHistory },
  set (value: IMyTradeHistory[]) { return value }
})

/* GET 7 DAYS PROFIT */
const get7daysProfit = computed((): number => {
  const nowTime = new Date().getTime() // in milliseconds
  return state.myTrades.filter((i) => (
    i.botId && !i.open && nowTime - new Date(i.closeAt).getTime() <= 604800000 // 7 days in milliseconds
  )).map((el) => el.realisedGain.usd).reduce((a: number, b: number) => a + b, 0)
})

/* GET TOTAL PROFIT */
const getTotalProfit = computed((): number => {
  return state.myTrades.filter((i) => i.botId && !i.open)
    .map((el) => el.realisedGain.usd)
    .reduce((a: number, b: number) => a + b, 0)
})

/* FETCH PRICE */
async function fetchPrice ({ exchange, symbol }: { exchange: string; symbol: string; }): Promise<void> {
  try {
    const res = await tradeService.getPrice({ exchange, symbol })
    state.prices = { ...state.prices, [symbol]: res.data && res.data.result ? res.data.result.price.last : 0 }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

/* FETCH OPEN TRADES DATA */
function fetchOpenTrades (): void {
  const trades = []
  const validTrades = state.myTrades.filter((i) => i.botId)

  const duplicates: any = []
  for (const bot of validTrades) {
    if (bot.botName.length === 0 || duplicates.includes(bot.botId)) {
      continue
    }
    // if (bot.performanceFee && bot.performanceFee.performedStep && bot.performanceFee.performedStep !== 'OPENED') {
    //   continue
    // }
    const pair = Object.values(bot.pair[0])
    let delimiter = ''
    switch (bot.exch.toLowerCase()) {
      case 'ftx':
        delimiter = '|'
        break
      case 'kucoin':
        delimiter = '-'
        break
      // case 'binance':
      // case 'huobi':
      //   delimiter = ''
      //   break
    }
    const symbol = `${bot.pair[0].base}${delimiter}${bot.pair[0].quote}`

    const trade = {
      bot: bot.botName[0],
      botId: bot.botId,
      // side: 'BUY', Need to wait for API update
      pair: pair,
      date: bot.openAt,
      open: bot.open,
      amount: roundFraction(bot.qExec || 0, 6),
      totalExecuted: ((bot.qExec || 0) * bot.entryPrice),
      entryPrice: bot.entryPrice,
      pairLabel: symbol,
      currentProfitPercentage: bot.profitPercentage || 0,
      currentGain: bot.realisedGain ? bot.realisedGain.usd : 0
    }

    fetchPrice({ exchange: bot.exch, symbol })
    trades.push(trade)
    duplicates.push(bot.botId)
  }

  state.openTrades = trades.filter((i) => i.open)
}

/* FETCH TRADE HISTORY DATA */
function fetchTradeHisotry (): void {
  const trades: IMyTradeHistory[] = []
  const validTrades = state.myTrades.filter((i) => i.botId && !i.open && i.botName.length > 0)

  for (const bot of validTrades) {
    const trade = {
      bot: bot.botName[0],
      pair: Object.values(bot.pair[0]),
      started: bot.openAt,
      completed: bot.closeAt,
      amount: roundFraction(bot.qExec || 0, 6),
      totalExecuted: ((bot.qExec || 0) * bot.entryPrice),
      profitPercentage: bot.profitPercentage || 0,
      totalGained: bot.realisedGain ? bot.realisedGain.usd : 0
    }
    trades.push(trade)
  }

  state.tradeHistory = trades
}

/* FETCH MY TRADES DATA */
async function fetchMyTrades (): Promise<void> {
  try {
    const res = await algoBotsService.getMyTrades()
    state.myTrades = res.data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

/* FETCH MY TRADES DATA */
async function fetchMyTradesData (): Promise<void> {
  await fetchMyTrades()
  if (!state.myTrades.length) {
    state.myTradesLoading = false
    return
  }

  fetchOpenTrades()
  fetchTradeHisotry()
  state.myTradesLoading = false
}

/* FETCH ACTIVE BOTS DATA */
async function fetchActiveBots (): Promise<void> {
  await Promise.all([fetchAlgoBotsTotalActiveBots(), fetchSubscriptedBots()])
  state.activeBotsLoading = false
}

/* INIT MY TRADES DATA */
function initMyTradesData (): void {
  fetchMyTradesData()
  fetchActiveBots()
}

/* EXPORT USE MY TRADES */
export const useMyTrades = function () {
  return {
    ...toRefs(state),

    getOpenTrades,
    getTradeHistory,
    getTotalProfit,
    get7daysProfit,
    getSubscribedBots,

    fetchMyTradesData,
    initMyTradesData
  }
}
