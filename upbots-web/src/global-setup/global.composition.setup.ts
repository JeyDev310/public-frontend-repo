import { computed, reactive, toRefs } from 'vue'
import { router, routeNames } from '@/router'

import { useDark } from '@vueuse/core'

import { vuex } from '@/store'
import { globalService, keysService, localStorageService, userService } from '@/services'
import { IUserSettings, IAlgobotFilters } from '@/types/user/user-settings.types'
import { ICompatibleExchanges, ITradingSettings, ITradingSettingsPair } from '@/views/trade/trade-types'
import { EErrorsMessage, ICoupons, IKey, TIndexedObject } from '@/types'
import { IPriceCoingecko } from '@/types/price/price.types'
import { EAccount, EAccountType, ECryptoCurrency } from '@/types/crypto.types'
import { appNotify } from '@/components/stateless/notifications'

import { generateTotalBalance, generateTotalEvolutionChart, symbolChecker } from '@/core/helpers'

const allowedTradeExchanges: TIndexedObject<string> = Object.freeze({
  binance: 'binance',
  'binance-us': 'binance-us',
  kucoin: 'kucoin',
  ftx: 'ftx',
  huobi: 'huobi',
  coinbasepro: 'coinbasepro',
  'kucoin-future': 'kucoin-future',
  'binance-future': 'binance-future',
  'ftx-future': 'ftx-future'
})

const allowedTradeNotFutureExchanges: TIndexedObject<string> = Object.freeze({
  binance: 'binance',
  'binance-us': 'binance-us',
  kucoin: 'kucoin',
  ftx: 'ftx',
  huobi: 'huobi'
})

const defaultBotFilterSettings: IAlgobotFilters = Object.freeze({
  status: { label: 'All', value: 'all' },
  strategy: { label: 'All', value: 'all' },
  exchanges: [],
  pairs: [],
  sortedByValue: { label: '3m perf %', value: 'performance_3m' },
  isMyBots: false
})

const state = reactive({
  userSettings: {
    algobotFilters: defaultBotFilterSettings,
    darkMode: localStorageService?.getItem('darkMode') as boolean
  } as IUserSettings,
  userCoupons: [] as ICoupons[],
  favoriteCurrencyBtcRate: 0 as number,
  accounts: [] as IKey[],
  availableAccounts: [] as IKey[],
  defaultAccount: {} as IKey,
  accountsLoading: false as boolean,
  favourites: localStorageService.getItem<[]>('favouritePairs') || [] as string[],
  compatibleExchanges: [] as ICompatibleExchanges[],
  tradingSettings: [] as ITradingSettings[],
  availablePairs: [] as ITradingSettingsPair[],
  defaultPair: {} as ITradingSettingsPair,
  priceSettingsLoading: false as boolean,
  filterChartByDate: '2,weeks'

})

const isDark = useDark()

const isDarkMode = computed((): boolean => state.userSettings.darkMode)
const getModeName = computed((): 'is-light' | 'is-dark' => isDarkMode.value ? 'is-dark' : 'is-light')

function setThemeMode (): void {
  isDark.value = isDarkMode.value
}

const getFavoriteCurrency = computed(() => state.userSettings.favoriteCurrency || {})

const getCurrencySymbol = computed(() => symbolChecker(getFavoriteCurrency.value.value))

const getCexBalance = computed(() => vuex.cex.getCexBalance)
const getDexBalance = computed(() => vuex.dex.getNetworth)

const getTotalBalance = computed(() => generateTotalBalance(getCexBalance.value, getDexBalance.value))
const getPortfolioCEXsError = computed(() => vuex.cex.getPortfolioCEXsError) // TODO

const getCexEvolution = computed(() => vuex.cex.getPortfolioEvolution)
const getDexEvolution = computed(() => vuex.dex.getPortfolioEvolution)
const getTotalEvolution = computed(() => generateTotalEvolutionChart(getCexEvolution.value, getDexEvolution.value))

const heroPages = [routeNames.home, routeNames.algoBots]
const isHeroPage = computed(() => heroPages.includes(router.currentRoute.value.name as string))

const heroMobilePages = [routeNames.home]
const isHeroMobilePage = computed(() => heroMobilePages.includes(router.currentRoute.value.name as string))

const hasCoupons = computed(() => !!state.userCoupons.length)
const hasCouponsWithCorrectPromo = computed((): boolean => {
  return state.userCoupons.some((c) => c.promoName === process.env.VUE_APP_STAKING_PROMONAME)
})

/* GET UBXT BALANCE */
const getPerfeesUserWalletAmount = computed((): number => vuex.ubxtWallet.perfeesUserWalletData?.amount || 0)
const getPerfeesUserWalletAvailableAmount =
  computed((): number => vuex.ubxtWallet.perfeesUserWalletData?.availableAmount || 0)

/* FUNCTIONS RELATED TO ACCOUNTS */
const getNotFutureAccounts = computed((): IKey[] => {
  return state.availableAccounts.filter((el) => el.exchange === allowedTradeNotFutureExchanges[el.exchange])
})

function setAvailableAccounts (): void {
  if (state.accounts.length) {
    state.availableAccounts = state.accounts.filter((el) => el.exchange === allowedTradeExchanges[el.exchange])
  } else {
    state.availableAccounts = [] as IKey[]
  }
}

function setDefaultAccount (isFutureAccounts: boolean): void {
  if (state.accounts.length) {
    const getBinanceAccounts = state.accounts.filter((el) => el.exchange === allowedTradeExchanges.binance)

    let availableAccounts: IKey[] = []

    if (!isFutureAccounts) {
      availableAccounts = state.availableAccounts.filter((el) =>
        el.exchange === allowedTradeNotFutureExchanges[el.exchange])
    }

    if (getBinanceAccounts.length) {
      state.defaultAccount = getBinanceAccounts[0]
    } else {
      state.defaultAccount = !isFutureAccounts ? availableAccounts[0] : state.availableAccounts[0]
    }
  } else {
    state.defaultAccount = {} as IKey
  }
}

function setAccountLoading (value: boolean) {
  state.accountsLoading = value
}
async function fetchAccounts (): Promise<void> {
  try {
    setAccountLoading(true)
    const res = await keysService.get()
    state.accounts = res.data

    setAvailableAccounts()
    setDefaultAccount(false)
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    setAccountLoading(false)
  }
}
/* FUNCTIONS RELATED TO ACCOUNTS */

/* FUNCTIONS RELATED TO TRADING SETTINGS | PAIR */
function setPriceSettingsLoading (payload: boolean): void {
  state.priceSettingsLoading = payload
}

function setFavourites (payload: string[]): void {
  state.favourites = payload
}

function setDefaultPair (payload?: ITradingSettingsPair): void {
  if (payload) {
    state.defaultPair = payload
  } else {
    const exDefaultPair = state.availablePairs.find((pair) =>
      pair.baseCurrency === ECryptoCurrency.BTC && pair.quoteCurrency === ECryptoCurrency.USDT
    )

    state.defaultPair = state.availablePairs.find((pair) =>
      pair.baseCurrency === exDefaultPair?.baseCurrency &&
        pair.quoteCurrency === exDefaultPair?.quoteCurrency
    ) || state.availablePairs[0]
  }
}

function setTradingAllowed (): void {
  state.availablePairs = state.availablePairs.filter((p) => p.tradingAllowed)
}

function setSettings (): void {
  // IF NO ACCOUNTS AVAILABLE SET PAIRS TO [] //
  if (!getNotFutureAccounts.value.length) return

  // FIND EX SETTINGS PAIR //
  const exSettingsPair = state.tradingSettings.find((ex) => ex.name === state.defaultAccount.exchange)

  // IF PAIR ENABLED //
  if (exSettingsPair && exSettingsPair.enabled) {
    state.availablePairs = []

    // FORMATTED PAIRS //
    exSettingsPair.pairs
      .map((pair) => {
        const pairSymbol = `${pair.baseCurrency}${pair.quoteCurrency}`

        // Filter exchange gives wrong format
        if (exSettingsPair.name === EAccount.HUOBI && pair.symbolForData !== pairSymbol.toLocaleLowerCase()) return

        // Filter Duplicated Pairs from selected exchange
        const favourite = state.favourites.includes(pairSymbol)

        const basePair = pair.baseCurrency === ECryptoCurrency.XBT ? ECryptoCurrency.BTC : pair.baseCurrency // for bitmex XBT is BTC

        state.availablePairs.push({
          ...pair,
          isFavourite: favourite,
          label: `${basePair}/${pair.quoteCurrency}`,
          name: `${pair.baseCurrency}/${pair.quoteCurrency}`
        })
      })

    /* SET TRADING ALLOWED DATA */
    setTradingAllowed()

    /* IF ACCOUNT TYPE === 'spot' THEN NEED FILTER IT BY 'spot' */
    if (state.defaultAccount.type === EAccountType.SPOT) {
      state.availablePairs = state.availablePairs.filter((x) => x.type === EAccountType.SPOT)
    }

    /* SET PAIR */
    setDefaultPair()
  }
}

function setCompatibleExchanges (value: ICompatibleExchanges[]): void {
  state.compatibleExchanges = value as ICompatibleExchanges[]
}

function setTradingSettings (value: ITradingSettings[]): void {
  state.tradingSettings = value as ITradingSettings[]
}

async function fetchSettingsExchanges (): Promise<void> {
  try {
    if (state.accounts.length) {
      const res = await globalService.getSettingsExchanges()
      setCompatibleExchanges(res.data.compatibleExchanges as ICompatibleExchanges[])
      setTradingSettings(res.data.tradingSettings as ITradingSettings[])
      setSettings()
    } else {
      setCompatibleExchanges([] as ICompatibleExchanges[])
      setTradingSettings([] as ITradingSettings[])
      state.availablePairs = [] as ITradingSettingsPair[]
      state.defaultPair = {} as ITradingSettingsPair
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}
/* FUNCTIONS RELATED TO TRADING SETTINGS | PAIR */

async function fetchPortfolioData (): Promise<void> {
  await vuex.dex.fetchDexWallets()
  await Promise.all([vuex.cex.fetchCEXPortfolioData(), vuex.dex.fetchDexBalance()])
}

async function fetchUserFavoriteCurrencyBtcRate (): Promise<IPriceCoingecko> {
  try {
    const favCurrencyCoinNames = ['bitcoin']
    const favCurrencyNames = [state.userSettings.favoriteCurrency.value]

    const { data } = await userService.getUserFavCurrencyRate(favCurrencyCoinNames, favCurrencyNames)
    const rate = data.bitcoin[state.userSettings.favoriteCurrency.value]

    state.favoriteCurrencyBtcRate = rate

    return data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    return {} as IPriceCoingecko
  }
}

async function fetchUserSettings (): Promise<IUserSettings> {
  try {
    const { data } = await userService.getUserSettings()
    if (data.algobotFilters) {
      state.userSettings = data
    } else {
      state.userSettings = { ...data, algobotFilters: defaultBotFilterSettings }
    }

    /* SET LIGHT | DARK MODE FOR TAILWIND */
    localStorageService.setItem('darkMode', state.userSettings.darkMode)

    await fetchUserFavoriteCurrencyBtcRate()

    return data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    return {} as IUserSettings
  }
}

async function updateUserSettings (payload: IUserSettings): Promise<void> {
  try {
    const { data } = await userService.updateUserSettings(payload)

    if (data) {
      state.userSettings = payload

      /* SET LIGHT | DARK MODE FOR TAILWIND */
      localStorageService.setItem('darkMode', state.userSettings.darkMode)
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function fetchUserCoupons (): Promise<ICoupons[]> {
  try {
    const { data } = await userService.getUserCoupons()

    const filteredData = data.filter((coupon) => coupon.activated)

    state.userCoupons = filteredData.map((coupon) => {
      return {
        code: coupon.code,
        promoName: coupon.promoName,
        description: coupon.description,
        couponType: coupon.couponType,
        activated: coupon.activated
      }
    })

    return data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    return [] as ICoupons[]
  }
}

function setAlgoBotFilters (payload: IAlgobotFilters): void {
  state.userSettings.algobotFilters = { ...payload }
}

export function getConvertedCurrency (amount: number): number {
  return state.favoriteCurrencyBtcRate * amount
}

async function onThemeChanged (value: boolean): Promise<void> {
  isDark.value = value
  await updateUserSettings({ ...state.userSettings, darkMode: value })
}

function setFilterChartByDate (payload: string) {
  state.filterChartByDate = payload
}

export const useGlobal = () => {
  return {
    ...toRefs(state),

    isDarkMode,
    getModeName,
    getFavoriteCurrency,
    getCurrencySymbol,
    getTotalBalance,
    getPortfolioCEXsError,
    getCexEvolution,
    getDexEvolution,
    getTotalEvolution,
    heroPages,
    isHeroPage,
    heroMobilePages,
    isHeroMobilePage,
    getPerfeesUserWalletAmount,
    getPerfeesUserWalletAvailableAmount,
    getCexBalance,
    getDexBalance,
    getNotFutureAccounts,
    hasCoupons,
    hasCouponsWithCorrectPromo,
    setDefaultAccount,
    setAccountLoading,
    setThemeMode,
    setCompatibleExchanges,
    setTradingSettings,
    fetchAccounts,
    setDefaultPair,
    fetchSettingsExchanges,
    setSettings,
    setFavourites,
    setPriceSettingsLoading,
    fetchPortfolioData,
    onThemeChanged,
    getConvertedCurrency,
    fetchUserSettings,
    fetchUserCoupons,
    updateUserSettings,
    setAlgoBotFilters,
    setFilterChartByDate
  }
}
