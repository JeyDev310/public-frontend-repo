import { computed, reactive, toRefs } from 'vue'

/* ROUTER */
import { router, routeNames } from '@/router'

/* NOTIFY */
import { appNotify } from '@/components/stateless/notifications'

/* SERVICES | TYPES */
import { globalService, localStorageService, tradeService } from '@/services'
import { createMyBotService } from './create-my-bot.services'
import {
  IEntry,
  IUserBotCreateDto
} from '@/views/create-my-bot/create-my-bot.types'
import {
  EBotStratType,
  EErrorsMessage,
  IKey,
  TIndexedObject,
  TStratType
} from '@/types'
import {
  EAccount,
  EAccountType,
  ECryptoCurrency
} from '@/types/crypto.types'
import {
  IAccount,
  IAccountTradeBalance,
  ICompatibleExchanges,
  IPairSummary,
  ITradingSettings,
  ITradingSettingsPair
} from '@/views/trade/trade-types'

/* USE GLOBAL */
import { useGlobal } from '@/global-setup/global.composition.setup'

/* STATIC DATA */
const tradingExchanges: TIndexedObject<string> = Object.freeze({
  binance: 'binance',
  'binance-us': 'binance-us',
  'binance-future': 'binance-future',
  kucoin: 'kucoin',
  'kucoin-future': 'kucoin-future',
  ftx: 'ftx',
  huobi: 'huobi'
})
const strategyOptions: { value: TStratType; label: string; }[] = [
  { value: 'LONG', label: 'Long' },
  { value: 'SHORT', label: 'Short' },
  { value: 'LONG_SHORT', label: 'Long & Short' }
]
const orderTypeOptions: { value: number; label: string; }[] = [
  { value: 1, label: 'Limit' },
  { value: 2, label: 'Market' }
]
const leverageOptions: { value: number; label: string; }[] = [
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 3, label: '3x' },
  { value: 5, label: '5x' }
]
const trigger = 'Trading View Webhook'

/* USE GLOBAL | USE TRADE SETUP */
const { accounts } = useGlobal()

/* STATE */
const state = reactive({
  myBotPriceSummary: {} as {[key: string]: IPairSummary;},
  myBotPriceSummaryLoading: false as boolean,
  myBotCompatibleExchanges: [] as ICompatibleExchanges[],
  myBotTradingSettings: [] as ITradingSettings[],
  myBotAvailablePairs: [] as ITradingSettingsPair[],
  myBotFavourites: localStorageService.getItem<[]>('favouritePairs') || [] as string[],
  myBotAvailableAccounts: [] as IKey[],
  myBotAccountTradeBalance: {} as IAccountTradeBalance,
  myBotAccount: {} as IKey,
  myBotPair: {} as ITradingSettingsPair,
  myBotGlobalLoading: false as boolean,

  myBotName: '' as string,
  myBotStrategy: 'LONG' as TStratType,
  myBotEntry: {
    long: {
      orderType: 1,
      sizePosition: [100],
      leverage: 1
    },
    short: {
      orderType: 1,
      sizePosition: [100],
      leverage: 1
    }
  } as IEntry,
  myBotExitAlert: true as boolean,
  myBotInitialCapAllowed: 0 as number,
  myBotPairQuoteCurrency: '' as string,
  myBotBaseAvailable: 0 as number,
  myBotInitialCap: 0 as number
})

const isAllowCreate = computed((): boolean => {
  return !!state.myBotName && !!Object.keys(state.myBotAccount).length && !!Object.keys(state.myBotPair).length
})

const isFutureAccount = computed((): boolean => {
  const exchange = state.myBotAccount?.exchange
  if (Object.keys(state.myBotAccount).length && state.myBotAccount.exchange) {
    return (
      exchange.toLowerCase() === EAccount.KucoinFuture ||
      exchange.toLowerCase() === EAccount.BinanceFuture ||
      exchange.toLowerCase() === EAccount.FTX
    )
  }
  return false
})

const getDisabledStrategyOptions = computed((): string[] => {
  if (!state.myBotAvailableAccounts.length) {
    return [strategyOptions[0].value, strategyOptions[1].value, strategyOptions[2].value]
  } else {
    if (state.myBotAccount && !isFutureAccount.value) return [strategyOptions[1].value, strategyOptions[2].value]
    return []
  }
})

function setAvailableAccounts (): void {
  state.myBotAvailableAccounts = accounts.value.filter((el) => el.exchange === tradingExchanges[el.exchange])
}

function setAccount (account?: IKey): void {
  if (account && Object.keys(account).length) {
    state.myBotAccount = account
  } else {
    state.myBotAccount = state.myBotAvailableAccounts.length ? state.myBotAvailableAccounts[0] : {} as IKey
  }
}

async function fetchPriceSummary (): Promise<void> {
  try {
    const { data } = await globalService.getPriceSummary({ params: { exchange: state.myBotAccount?.exchange } })
    if (data.length) {
      data.forEach((el) => { state.myBotPriceSummary[el.symbolForData] = el })
    } else {
      state.myBotPriceSummary = {}
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

function setPair (payload?: ITradingSettingsPair): void {
  if (payload) {
    state.myBotPair = payload
  } else {
    if (state.myBotAvailablePairs) {
      const exDefaultPair = state.myBotAvailablePairs.find((pair) =>
        pair.baseCurrency === ECryptoCurrency.BTC && pair.quoteCurrency === ECryptoCurrency.USDT
      )

      state.myBotPair = state.myBotAvailablePairs.find((pair) =>
        pair.baseCurrency === exDefaultPair?.baseCurrency &&
          pair.quoteCurrency === exDefaultPair?.quoteCurrency
      ) || state.myBotAvailablePairs[0]
    } else {
      state.myBotPair = {} as ITradingSettingsPair
    }
  }
}

function setSettings (): void {
  if (!Object.keys(state.myBotTradingSettings).length) {
    state.myBotAvailablePairs = []
    setPair({} as ITradingSettingsPair)
    return
  }

  const tradingSettingsByAccount = state.myBotTradingSettings.find((ex) => ex.name === state.myBotAccount?.exchange)

  // IF PAIR ENABLED //
  if (tradingSettingsByAccount && tradingSettingsByAccount.enabled) {
    state.myBotAvailablePairs = []

    // FORMATTED PAIRS //
    tradingSettingsByAccount.pairs
      .map((pair) => {
        const pairSymbol = `${pair.baseCurrency}${pair.quoteCurrency}`

        // Filter exchange gives wrong format
        if (
          tradingSettingsByAccount.name === EAccount.HUOBI && pair.symbolForData !== pairSymbol.toLocaleLowerCase()
        ) return

        // Filter Duplicated Pairs from selected exchange
        const favourite = state.myBotFavourites?.includes(pairSymbol)

        const basePair = pair.baseCurrency === ECryptoCurrency.XBT ? ECryptoCurrency.BTC : pair.baseCurrency // for bitmex XBT is BTC

        state.myBotAvailablePairs?.push({
          ...pair,
          isFavourite: favourite,
          label: `${basePair}/${pair.quoteCurrency}`,
          name: `${pair.baseCurrency}/${pair.quoteCurrency}`
        })
      })

    /* SET TRADING ALLOWED DATA */
    state.myBotAvailablePairs = state.myBotAvailablePairs.filter((p) => p.tradingAllowed)

    if (state.myBotAccount?.type === EAccountType.SPOT) {
      state.myBotAvailablePairs = state.myBotAvailablePairs.filter((x) => x.type === EAccountType.SPOT)
    }

    setPair()
  }
}

function setFavouritePair (payload: ITradingSettingsPair): void {
  const selected: string[] = state.myBotFavourites.includes(payload.symbol)
    ? state.myBotFavourites.filter((i: string) => i !== payload.symbol)
    : [...state.myBotFavourites, payload.symbol]

  state.myBotFavourites = selected
  localStorageService.setItem('favouritePairs', selected)
  setSettings()
}

async function fetchSettingsExchanges (): Promise<void> {
  try {
    const { data } = await globalService.getSettingsExchanges()
    state.myBotCompatibleExchanges = data.compatibleExchanges as ICompatibleExchanges[]
    state.myBotTradingSettings = data.tradingSettings as ITradingSettings[]
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function fetchTradingBalance (): Promise<void> {
  if (!Object.keys(state.myBotAccount).length) {
    state.myBotAccountTradeBalance = {} as IAccountTradeBalance
    return
  }

  try {
    const res = await tradeService.getTradeBalance(state.myBotAccount.id)
    state.myBotAccountTradeBalance = res.data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

function setMyBotGlobalLoading (loading: boolean): void {
  state.myBotGlobalLoading = loading
}

function setPairQuoteCurrency (): void {
  state.myBotPairQuoteCurrency = Object.keys(state.myBotPair).length ? state.myBotPair.quoteCurrency : ''
}

function setBaseAvailable (): void {
  state.myBotBaseAvailable = state.myBotAccountTradeBalance?.freeBalances[state.myBotPairQuoteCurrency] || 0
  state.myBotInitialCap = Number(state.myBotBaseAvailable.toFixed(2))
}

function setDefaultStrategy (): void {
  state.myBotStrategy = strategyOptions[0].value
}

function onChangeInitialCap (item: number[]): void {
  state.myBotInitialCap = Number(((state.myBotBaseAvailable / 100) * item[0]).toFixed(2))
}

async function fetchQuotePrice (): Promise<void> {
  if (!Object.keys(state.myBotPair).length) {
    state.myBotInitialCapAllowed = 0
    return
  }

  const quoteUSDTCap = 25
  try {
    if (state.myBotPair.quoteCurrency === ECryptoCurrency.USDT) {
      state.myBotInitialCapAllowed = quoteUSDTCap
    } else {
      const res = await globalService.getPriceSummary(
        { params: { exchange: state.myBotAccount?.exchange } }
      )

      const quoteCurrency = state.myBotPair.quoteCurrency.toLocaleLowerCase()
      const baseCurrency = state.myBotPair.baseCurrency.toLocaleLowerCase()
      const symbol = `${baseCurrency}${quoteCurrency}`

      const price = res.data.find((item) => item.symbolForData === symbol)?.price?.last
      if (price) {
        state.myBotInitialCapAllowed = 25 / price
      } else {
        state.myBotInitialCapAllowed = 0
      }
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function createNewBot (): Promise<void> {
  if (!Object.keys(state.myBotAccount).length || !Object.keys(state.myBotPair).length) {
    return
  }

  const data: IUserBotCreateDto = {
    name: state.myBotName,
    accountId: state.myBotAccount.id,
    base: state.myBotPair.baseCurrency,
    quote: state.myBotPair.quoteCurrency,
    stratType: (
      state.myBotStrategy === EBotStratType.LONG || state.myBotStrategy === EBotStratType.SHORT
        ? state.myBotStrategy
        : EBotStratType.LongShort
    ),
    orderType: 'MARKET',
    position: state.myBotEntry.long.sizePosition[0] / 100.0,
    leverage: state.myBotStrategy === EBotStratType.LONG ? 1 : state.myBotEntry.long.leverage,
    webhook: { exitTrigger: state.myBotExitAlert }
  }

  try {
    const isInitialCapAllowed = state.myBotInitialCap >= state.myBotInitialCapAllowed

    if (!isInitialCapAllowed) {
      const initialCapWarningMsg = `
        Minimum initial capital allowed is ${state.myBotInitialCapAllowed.toFixed(2)} ${state.myBotPair.quoteCurrency}
      `
      appNotify({ type: 'warning', message: initialCapWarningMsg })
      return
    }

    await createMyBotService.createMyBot(data)
    appNotify({ type: 'success', message: 'Bot successfully created' })
    router.push({ name: routeNames.myActiveBots })
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

function resetData (): void {
  state.myBotName = ''
  state.myBotStrategy = 'LONG'
  state.myBotEntry.long.orderType = 1
  state.myBotEntry.long.sizePosition = [100]
  state.myBotEntry.long.leverage = 1
  state.myBotEntry.short.orderType = 1
  state.myBotEntry.short.sizePosition = [100]
  state.myBotEntry.short.leverage = 1
  state.myBotInitialCapAllowed = 0
  state.myBotPairQuoteCurrency = ''
  state.myBotBaseAvailable = 0
  state.myBotInitialCap = 0
  state.myBotPriceSummary = {}
  state.myBotCompatibleExchanges = []
  state.myBotTradingSettings = []
  state.myBotAvailablePairs = []
  state.myBotFavourites = []
  state.myBotAvailableAccounts = []
  state.myBotAccountTradeBalance = {} as IAccountTradeBalance
  state.myBotAccount = {} as IKey
  state.myBotPair = {} as ITradingSettingsPair
}

async function onChangeAccount (account: IAccount): Promise<void> {
  setMyBotGlobalLoading(true)
  try {
    setAccount(account)
    await fetchPriceSummary()
    setSettings()
    await fetchTradingBalance()
    await fetchQuotePrice()
    setPairQuoteCurrency()
    setBaseAvailable()
  } finally {
    setMyBotGlobalLoading(false)
  }
}

async function fetchInitData (): Promise<void> {
  setAvailableAccounts()

  if (state.myBotAvailableAccounts.length) {
    setMyBotGlobalLoading(true)
    try {
      setAccount()
      await fetchPriceSummary()
      await fetchSettingsExchanges()
      setSettings()
      await fetchTradingBalance()
      await fetchQuotePrice()
      setPairQuoteCurrency()
      setBaseAvailable()
      setMyBotGlobalLoading(false)
    } finally {
      setMyBotGlobalLoading(false)
    }
  } else {
    resetData()
  }
}

export const useCreateMyBot = function () {
  return {
    ...toRefs(state),
    strategyOptions,
    getDisabledStrategyOptions,
    orderTypeOptions,
    leverageOptions,
    isAllowCreate,
    isFutureAccount,
    trigger,
    setPair,
    setFavouritePair,
    setMyBotGlobalLoading,
    setDefaultStrategy,
    setBaseAvailable,
    setPairQuoteCurrency,
    onChangeInitialCap,
    fetchQuotePrice,
    createNewBot,
    fetchInitData,
    onChangeAccount,
    fetchTradingBalance
  }
}
