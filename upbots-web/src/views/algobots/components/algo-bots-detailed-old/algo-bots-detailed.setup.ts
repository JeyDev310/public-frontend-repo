import { computed, reactive, toRefs } from 'vue'
import { router } from '@/router'

import { truncString } from '@/core/helpers'

import { vuex } from '@/store'
import { algoBotsService, globalService } from '@/services'
import { ISubscriptedBots, EUBXTId, TIndexedArray, IPerfeesBotWallets, IBotSnapshot, ECategory } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useBots } from '@/global-setup/bots.composition.setup'
import { useAlgoBots } from '../../algobots.composition.setup'

const algoBotsDetailedState = reactive({
  algoBotsDetailedLoading: false
})

/* USE GLOBAL SETUP */
const { accounts } = useGlobal()

/* USE BOTS SETUP */
const { bots, subscriptedBots } = useBots()

/* USE ALGO BOTS SETUP */
const { getPerfBotCyclesDataById, getAlgobotsSubscriptionById } = useAlgoBots()

/* HELPER FUNCTION WHICH EXPAND TRUNC TEXT */
function expandText ({ isOpen, value }: { isOpen: boolean; value: string; }): string {
  if (!isOpen) return truncString(value, 80, 0)
  return value
}

// GET ALGOBOT BY BOT ID //
const getAlgobotByBotId = computed(() =>
  bots.value.find((e) => e.id === router.currentRoute.value.params.id) || {} as IBotSnapshot
)

// GET ALGOBOT SUBSCRIPTONS BY BOT ID //
const getAlgobotsSubscriptionByBotId = computed(() => {
  return subscriptedBots.value.find((e) => e.botId === router.currentRoute.value.params.id) || {} as ISubscriptedBots
})

// GET BOT PERFORMANCE SUBSCRIPTION AND SNAPSHOTS DATA //
const getBotPerfSubscriptionSnapshotData = computed(() => vuex.algobots.botPerformanceSubscriptionSnapshotData)

// GET PERFORMANCE SUBSCRIPTION CYCLES DATA //
const getPerfSubscriptionCyclesData = computed(() => vuex.algobots.performanceSubscriptionCyclesData)

// GET PERFEES BOT WALLETS DATA //
const getPerfeesBotWalletsData = computed(() => vuex.algobots.perfeesBotWalletsData)

// GET PERFEES BOT WALLETS BY ID //
const getPerfeesBotWalletsById = computed(() =>
  getPerfeesBotWalletsData.value.find((botWallet) =>
    botWallet.botId === router.currentRoute.value.params.id) || {} as IPerfeesBotWallets
)

// GET SUBSCRIPTION AUDITS DATA //
const getSubscriptionAuditsData = computed(() => vuex.algobots.subscriptionAuditsData)

// GET USER WALLET DATA //
const getUserWalletData = computed(() => vuex.algobots.perfeesUserWalletData)

const getTradingSettingsData = computed(() => vuex.algobots.tradingSettings)

const isPrivateBot = computed(() => getAlgobotByBotId.value?.category === ECategory.UserBot)

// FILTERS TAGS START //
const dummyTagsData: {
  botRef: string;
  botName: string;
  exchangesType: TIndexedArray<string>;
  priceDecimal: number;
}[] = [
  {
    botRef: 'OPTIMUSBTC',
    botName: 'Optimus V2 BTC',
    exchangesType: ['FTX', 'Binance', 'Kucoin'],
    priceDecimal: 2
  },
  {
    botRef: 'OPTIMUSETH',
    botName: 'Optimus V2 ETH',
    exchangesType: ['FTX', 'Binance', 'Kucoin'],
    priceDecimal: 2
  },
  {
    botRef: 'OPTIMUSBNB',
    botName: 'Optimus V2 BNB',
    exchangesType: ['FTX', 'Binance', 'Kucoin'],
    priceDecimal: 2
  },
  {
    botRef: 'AVAXUSDT1',
    botName: 'Community Bot AVAX',
    exchangesType: ['Binance', 'Kucoin'],
    priceDecimal: 2
  },
  {
    botRef: 'IROBOTBTC',
    botName: 'Sonny BTC',
    exchangesType: ['FTX', 'Binance', 'Kucoin'],
    priceDecimal: 2
  },
  {
    botRef: 'IROBOTETH',
    botName: 'Sonny ETH',
    exchangesType: ['FTX', 'Binance', 'Kucoin'],
    priceDecimal: 2
  },
  {
    botRef: 'IROBOTBNB',
    botName: 'Sonny BNB',
    exchangesType: ['FTX', 'Binance', 'Kucoin'],
    priceDecimal: 2
  },
  {
    botRef: 'TOMOLO1',
    botName: 'Community bot TOMO LO1',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'FRAMAV2ETH',
    botName: 'FRaMAV2 ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'ETHINFINITY',
    botName: 'ETH Infinity',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'SUPERTRADERETH',
    botName: 'SuperTrader ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'KuCoin-future', 'Binance-future'],
    priceDecimal: 2
  },
  {
    botRef: 'SUPERTRADERLINK',
    botName: 'SuperTrader LINK',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'KuCoin-future', 'Binance-future'],
    priceDecimal: 2
  },
  {
    botRef: 'SURGEBOTSXP',
    botName: 'Surge Bot SXP',
    exchangesType: ['Binance', 'Binance-future'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERBTC',
    botName: 'Spooner BTC',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERETH',
    botName: 'Spooner ETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERLINK',
    botName: 'Spooner LINK',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'SPOONERFTT',
    botName: 'Spooner FTT',
    exchangesType: ['FTX', 'Binance'],
    priceDecimal: 2
  },
  {
    botRef: 'PGBTC',
    botName: 'Swing Sniper: BTCUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'PGETH',
    botName: 'Swing Sniper: ETHUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'PGBNB',
    botName: 'Swing Sniper: BNBUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'PGTRX',
    botName: 'Swing Sniper: TRXUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 4
  },
  {
    botRef: 'PGBAT',
    botName: 'Gold Rush: BATUSDT',
    exchangesType: ['Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'PGMATIC',
    botName: 'Gold Rush: MATICUSDT',
    exchangesType: ['Binance', 'KuCoin', 'Huobi'],
    priceDecimal: 2
  },
  {
    botRef: 'PGDOGE',
    botName: 'Wow much profit: DOGEUSDT',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botName: 'WT ETH',
    botRef: 'WTETH',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botName: 'WT BNB',
    botRef: 'WTBNB',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botName: 'WT ETC',
    botRef: 'WTETC',
    exchangesType: ['Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botName: 'WT SOL',
    botRef: 'WTSOL',
    exchangesType: ['FTX', 'Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botName: 'WT CAKE',
    botRef: 'WTCAKE',
    exchangesType: ['Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botName: 'WT SHIB',
    botRef: 'WTSHIB',
    exchangesType: ['Binance', 'KuCoin'],
    priceDecimal: 2
  },
  {
    botRef: 'NLSFTT',
    botName: 'INERTIALGO SWING FTT',
    exchangesType: ['FTX', 'Binance'],
    priceDecimal: 2
  }
]

const getBotDummyTagsData = computed(() => {
  if (getPerfBotCyclesDataById.value?.botRef) {
    return dummyTagsData.find((tag) => tag.botRef === getPerfBotCyclesDataById.value?.botRef)
  } else {
    return null
  }
})

const getFilteredTagsByBotRef = computed(() => {
  if (getPerfBotCyclesDataById.value?.botRef) {
    const exEl = dummyTagsData.find((tag) => tag.botRef === getPerfBotCyclesDataById.value?.botRef)

    return exEl ? exEl.exchangesType.map((el) => el) : []
  } else {
    return []
  }
})

const getFilteredTags = computed(() => {
  if (
    getPerfBotCyclesDataById.value?.base &&
      getPerfBotCyclesDataById.value?.quote &&
      getPerfBotCyclesDataById.value?.stratType
  ) {
    const baseQuoteCurrency = (
      getPerfBotCyclesDataById.value.base + getPerfBotCyclesDataById.value.quote
    ).toUpperCase()
    const startType = getPerfBotCyclesDataById.value.stratType.toUpperCase()
    return [baseQuoteCurrency, startType, ...getFilteredTagsByBotRef.value]
  } else {
    return null
  }
})
// FILTER TAGS END //

// GET AVAILABLE KEYS (BINANCE, KUCOIN, FTX) + IMG //
const getAvailableExchanges = computed(() => {
  const acc = accounts.value.filter((el) => {
    return el.exchange === 'binance' || el.exchange === 'kucoin' || el.exchange === 'ftx' || el.exchange === 'binance-us' || el.exchange === 'huobi' ||
      el.exchange === 'kucoin-future' || el.exchange === 'binance-future'
  })

  const allowedExchangesForTrading = getTradingSettingsData.value.filter((ex) => ex.enabled).map((ex) => ex.name)

  return acc.map((el) => {
    const tradingAllowed = allowedExchangesForTrading.includes(el.exchange)

    return { ...el, img: `/img/cryptocoins/${el.exchange}.svg`, tradingAllowed }
  })
})

// GET ACCOUNT //
const getAccount = computed(() => {
  return getAvailableExchanges.value.find((el) => el.id === getAlgobotsSubscriptionById.value?.apiKeyRef)
})

// SET LOADING //
function setAlgoBotsDetailedLoading (payload: boolean): void {
  algoBotsDetailedState.algoBotsDetailedLoading = payload
}

// AUTO REFILL START //
async function fetchAutoRefill (): Promise<void> {
  const data = {
    botId: getPerfBotCyclesDataById.value?.id || '',
    autoRefill: getPerfeesBotWalletsById.value?.autoRefill || false
  }

  try {
    const res = await algoBotsService.botWalletAutoRefill(data)

    if (res?.status === 200) {
      vuex.algobots.fetchBotWallets()
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data?.message || 'Something went wrong' })
  }
}

async function setAutoRefill (botId: string, autoRefill: boolean): Promise<void> {
  const data = { botId, autoRefill }
  try {
    const res = await algoBotsService.botWalletAutoRefill(data)

    if (res?.status === 200) {
      vuex.algobots.fetchBotWallets()
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data?.message || 'Something went wrong' })
  }
}
// AUTO REFILL END //

// FETCH CRYPTO PRICE COIN GENKO //
const cryptoPriceCoinGecko = reactive<any>({
  data: {}
})
async function fetchCryptoPriceCoinGecko () {
  const data = { cryptoSymbol: EUBXTId.UBXTID, fiatSymbol: 'usd' }
  try {
    const res = await globalService.getMarketValueHistory(data)

    cryptoPriceCoinGecko.data[`${data.cryptoSymbol}/${data.fiatSymbol}`] = res.data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data?.message || 'Something went wrong' })
  }
}

export const useAlgoBotsDetailed = function () {
  return {
    ...toRefs(algoBotsDetailedState),

    getBotDummyTagsData,
    getFilteredTagsByBotRef,
    getFilteredTags,
    getAlgobotByBotId,
    getAlgobotsSubscriptionByBotId,
    getBotPerfSubscriptionSnapshotData,
    getPerfSubscriptionCyclesData,
    getSubscriptionAuditsData,
    getPerfeesBotWalletsById,
    getUserWalletData,
    getAccount,
    getAvailableExchanges,
    cryptoPriceCoinGecko,
    dummyTagsData,
    isPrivateBot,

    setAlgoBotsDetailedLoading,
    fetchAutoRefill,
    setAutoRefill,
    fetchCryptoPriceCoinGecko,
    expandText
  }
}
