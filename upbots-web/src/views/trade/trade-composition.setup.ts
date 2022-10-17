import { computed, reactive, toRefs } from 'vue'

import { globalService, localStorageService } from '@/services'
import { tradeService } from './trade.services'
import { appNotify } from '@/components/stateless/notifications'

import {
  IAccount,
  ITradingSettingsPair,
  IPairSummary,
  IOrderBook,
  ITradeHistory,
  IPortfolio,
  IPortfolioDistribution,
  IAccountTradeBalance
} from './trade-types'
import { EErrorsMessage } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

const binanceBtcUsdt = {
  baseCurrency: 'BTC',
  createdAt: '2021-01-25T14:59:14.034Z',
  exchange: 'binance',
  future: false,
  isFavourite: true,
  limits: {
    amount: {
      max: 9000,
      min: 0.000001
    },
    price: {
      max: 1000000,
      min: 0.01
    },
    cost: {
      min: 10
    }
  },
  market: 'BTCUSDT',
  name: 'BTC/USDT',
  precision: { base: 8, quote: 8, amount: 6, price: 2 },
  precisionMode: 'DECIMAL_PLACES',
  quoteCurrency: 'USDT',
  spot: true,
  swap: null,
  symbol: 'BTCUSDT',
  symbolForData: 'btcusd-perpetual-future-inverse',
  symbolLabel: 'BTC/USDT',
  tradingAllowed: true,
  type: 'spot',
  updatedAt: '2021-08-09T01:00:06.464Z',
  label: 'BTC/USDT'
}

/* STATE */
const state = reactive({
  priceSummary: {} as {[key: string]: IPairSummary;},
  orderBook: {} as IOrderBook,
  orderBookFetchAllowed: false as boolean,
  currentPairPrice: 0 as number,
  tradeHistory: [] as ITradeHistory[],
  tradeHistoryFetchAllowed: false as boolean,
  accountBalance: {} as IPortfolioDistribution,
  portfolioLoading: false as boolean,
  accountTradeBalance: {} as IAccountTradeBalance,
  orderLoading: false as boolean
})

/* USE GLOBAL SETUP */
const {
  availableAccounts,
  defaultAccount,
  availablePairs,
  defaultPair,
  favourites,
  setSettings,
  setFavourites,
  fetchSettingsExchanges,
  setPriceSettingsLoading,
  setDefaultPair
} = useGlobal()

/* HELPER FUNCTIONS */
function formatNumber (lastPrice: number): number {
  if (!lastPrice) {
    return 0
  } else if (parseFloat(lastPrice.toFixed(2)) !== 0) {
    return 2
  } else {
    let i = 3
    while (parseFloat(lastPrice.toFixed(i)) === 0) i++
    return i
  }
}

const getBestPairs = computed((): ITradingSettingsPair[] => {
  return availablePairs.value
    .filter((i) => i.name === 'BTC/USDT' || i.name === 'LINK/BTC' || i.name === 'ETH/USDT')
})

const widgetSymbol = computed(() => {
  let exchange = binanceBtcUsdt.exchange.toUpperCase()
  let pairSymbol = `${binanceBtcUsdt.baseCurrency}${binanceBtcUsdt.quoteCurrency}`

  const isDataCond = (
    availableAccounts.value.length &&
     Object.keys(defaultAccount.value).length &&
     Object.keys(defaultPair.value).length
  )

  if (isDataCond) {
    if (defaultAccount.value.exchange === 'bitmex_test') {
      exchange = 'bitmex'
    } else if (defaultAccount.value.exchange === 'binance-us') {
      exchange = 'binanceus'
    } else {
      exchange = defaultAccount.value.exchange
    }

    const base = defaultPair.value.baseCurrency
    const quote = defaultPair.value.quoteCurrency

    pairSymbol = `${base}${quote}`
  }
  return `${exchange.toUpperCase()}:${pairSymbol}`
})

function setFavouritePair (payload: ITradingSettingsPair): void {
  const selected: string[] = favourites.value.includes(payload.symbol)
    ? favourites.value.filter((i: string) => i !== payload.symbol)
    : [...favourites.value, payload.symbol]

  setFavourites(selected)
  localStorageService.setItem('favouritePairs', selected)
  setSettings()
}

async function fetchPriceSummary (): Promise<void> {
  try {
    state.priceSummary = {}
    const res = await globalService.getPriceSummary({ params: { exchange: defaultAccount.value.exchange } })
    res.data.forEach((el) => { state.priceSummary[el.symbolForData] = el })
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function fetchPriceAndSettings (): Promise<void> {
  setPriceSettingsLoading(true)
  try {
    if (availableAccounts.value.length) {
      await fetchPriceSummary()
    } else {
      state.priceSummary = {} as {[key: string]: IPairSummary;}
    }

    await fetchSettingsExchanges()
  } finally {
    setPriceSettingsLoading(false)
  }
}

async function fetchOrderBook (): Promise<void> {
  let pairSymbol: string = defaultPair.value.symbolForData
  let requestURL = ''
  const isKucoinFtxAccounts = defaultAccount.value.exchange === 'kucoin' || defaultAccount.value.exchange === 'ftx'

  if (availableAccounts.value.length) {
    if (isKucoinFtxAccounts) {
      if (defaultAccount.value.exchange === 'ftx') {
        pairSymbol = pairSymbol.replace('/', '_')
      }

      requestURL = `/price/orderbook/${defaultAccount.value?.exchange}/${pairSymbol}`
    } else {
      requestURL = `/orderbook/${defaultAccount.value?.exchange}/${pairSymbol}`
    }
  } else {
    pairSymbol = binanceBtcUsdt.symbol
    requestURL = `/orderbook/${binanceBtcUsdt.exchange}/${pairSymbol}`
  }

  try {
    const res = await tradeService.getOrderBook(requestURL)
    state.orderBook = isKucoinFtxAccounts ? res.data : res.data.result
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function fetchOrderBookData (): Promise<void> {
  if (!state.orderBookFetchAllowed) return
  await fetchOrderBook()
  setTimeout(() => { fetchOrderBookData() }, 3000)
}

function setOrderBookFetchAllowed (payload: boolean): void {
  state.orderBookFetchAllowed = payload
}

async function fetchTradeHistory (): Promise<void> {
  let apiUrl = ''

  if (availableAccounts.value.length) {
    const exchangeValue = defaultAccount.value.exchange

    const exchange = exchangeValue === 'bitmex_test' ? 'bitmex' : exchangeValue

    apiUrl = `/tradehistory/${exchange}/${defaultPair.value.symbolForData}`

    if (exchange === 'kucoin' || exchange === 'ftx') {
      let pairSymbol = defaultPair.value.symbolForData
      if (exchange === 'ftx') {
        pairSymbol = pairSymbol.replace('/', '_')
      }
      apiUrl = `/price/orderhistories/${exchange}/${pairSymbol}`
    }
  } else {
    apiUrl = `/tradehistory/${binanceBtcUsdt.exchange}/${binanceBtcUsdt.symbol}`
  }

  try {
    const res = await tradeService.getTradeHistory(apiUrl)
    state.tradeHistory = res.data.result
  } catch (error) {
    state.tradeHistory = []
    state.tradeHistoryFetchAllowed = false
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function fetchTradeHistoryData (): Promise<void> {
  if (!state.tradeHistoryFetchAllowed) return
  await fetchTradeHistory()
  setTimeout(() => { fetchTradeHistoryData() }, 60000)
}

function setTradeHisotryFetchAllowed (payload: boolean): void {
  state.tradeHistoryFetchAllowed = payload
}

async function fetchPortfolio (): Promise<void> {
  if (!availableAccounts.value.length) return

  state.portfolioLoading = true

  try {
    const res: { data: IPortfolio; } = await tradeService.getPortfolioByName(defaultAccount.value.name)
    state.accountBalance = res.data.distribution
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.portfolioLoading = false
  }
}

function setOrderLoading (payload: boolean): void {
  state.orderLoading = payload
}

async function fetchTradingBalance (): Promise<void> {
  setOrderLoading(true)
  try {
    const res = await tradeService.getTradeBalance(defaultAccount.value.id)
    state.accountTradeBalance = res.data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    setOrderLoading(false)
  }
}

function setAccountValue (item: IAccount): void {
  defaultAccount.value = item
}

async function setAccount (item: IAccount): Promise<void> {
  defaultAccount.value = item
  await fetchPriceAndSettings()
  fetchOrderBook()
  fetchTradeHistory()
  fetchPortfolio()
  fetchTradingBalance()
}

async function setPair (item: ITradingSettingsPair): Promise<void> {
  setDefaultPair(item)

  fetchOrderBook()
  fetchTradeHistory()
  fetchPortfolio()
  fetchTradingBalance()
}

/* EXPORT USE BOTS */
export const useTrade = function () {
  return {
    ...toRefs(state),

    getBestPairs,
    widgetSymbol,
    binanceBtcUsdt,

    formatNumber,
    setSettings,
    setFavouritePair,
    fetchPriceSummary,
    fetchSettingsExchanges,
    fetchPriceAndSettings,
    setAccount,
    setPair,
    fetchOrderBook,
    fetchOrderBookData,
    setOrderBookFetchAllowed,
    fetchTradeHistoryData,
    setTradeHisotryFetchAllowed,
    fetchPortfolio,
    fetchTradingBalance,
    setOrderLoading,
    setAccountValue
  }
}
