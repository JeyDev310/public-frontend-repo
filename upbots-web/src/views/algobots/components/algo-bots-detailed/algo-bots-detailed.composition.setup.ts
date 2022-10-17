import { computed, reactive, toRefs } from 'vue'

import { algoBotsService, globalService } from '@/services'
import {
  EErrorsMessage,
  IAlgobotsSubscriptionAudits,
  IBotPerformanceSubscriptionSnapshotById,
  IBotSnapshot,
  IBotSubscription,
  IPerfSubscriptionCycles
} from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { usePerfees } from '@/global-setup/perfees.composition.setup'

const state = reactive({
  botGlobalLoading: false as boolean,
  bot: {} as IBotSnapshot,
  botLoading: false as boolean,
  subscriptionBot: {} as IBotSubscription,
  subscriptionBotLoading: false as boolean,
  baseUSDTAvailable: 0 as number,
  baseAvailableLoading: false as boolean,
  botSubscriptionAudits: [] as IAlgobotsSubscriptionAudits[],
  subscriptionAuditsLoading: false as boolean,
  botPerfSubscriptionSnapshot: {} as IBotPerformanceSubscriptionSnapshotById,
  botPerfSubscriptionSnapshotLoading: false as boolean,
  botPerformanceCycles: [] as any,
  botPerformanceCyclesLoading: false as boolean,
  botPerfSubscriptionCycles: [] as IPerfSubscriptionCycles[],
  botPerfSubscriptionCyclesLoading: false as boolean,
  ubxtPrice: 0 as number,
  ubxtPriceLoading: false as boolean
})

/* USE GLOBAL SETUP */
const { availableAccounts } = useGlobal()

/* USE PERFEES SETUP */
const { perfeesUserWallet, perfeesBotWallet } = usePerfees()

const getAccount = computed(() => availableAccounts.value.find((el) => el.id === state.subscriptionBot.apiKeyRef))

const getMiniumUbxtToDeposit = computed((): number => {
  if (state.ubxtPrice === 0) return 0
  return (state.baseUSDTAvailable / state.ubxtPrice) * 0.01
})

const isTradableAmount = computed((): boolean => {
  const botTradingAmount = perfeesBotWallet.value.amount - perfeesBotWallet.value.debtAmount +
  perfeesBotWallet.value.creditAmount
  const userTradingAmount = perfeesUserWallet.value.amount - perfeesUserWallet.value.debtAmount +
  perfeesUserWallet.value.creditAmount
  const realTradingAmount = perfeesBotWallet.value.autoRefill ? userTradingAmount : botTradingAmount
  return realTradingAmount > getMiniumUbxtToDeposit.value
})

function setBotGlobalLoading (value: boolean): void {
  state.botGlobalLoading = value
}

async function fetchBotSnapshotById (botId: string): Promise<void> {
  state.botLoading = true
  try {
    const { data } = await algoBotsService.getBotSnapshotById(botId)

    state.bot = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.botLoading = false
  }
}

async function fetchBotSubscriptionById (botId: string): Promise<void> {
  state.subscriptionBotLoading = true
  try {
    const { data } = await algoBotsService.getBotSubscriptionById(botId)

    state.subscriptionBot = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.subscriptionBotLoading = false
  }
}

async function fetchSubscriptionAuditsById (id: string): Promise<void> {
  state.subscriptionAuditsLoading = true
  try {
    const { data } = await algoBotsService.getAlgoBotsSubscriptionAuditsById(id)

    state.botSubscriptionAudits = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.subscriptionAuditsLoading = false
  }
}

async function fetchBaseAvailable (id: string, quote = 'USDT'): Promise<void> {
  state.baseAvailableLoading = true
  try {
    const { data } = await algoBotsService.getPortfolioTradeBalance(id)

    if (Object.keys(data).length && Object.keys(data.freeBalances).length) {
      state.baseUSDTAvailable = (data.freeBalances ? data.freeBalances[quote] : 0) ?? 0
    } else {
      state.baseUSDTAvailable = 0
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.baseAvailableLoading = false
  }
}

async function fetchBotPerformanceSubscriptionSnapshotById (id: string): Promise<void> {
  state.botPerfSubscriptionSnapshotLoading = true
  try {
    const { data } = await algoBotsService.getBotPerformanceSubscriptionSnapshotById(id)

    state.botPerfSubscriptionSnapshot = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.botPerfSubscriptionSnapshotLoading = false
  }
}

async function fetchPerformanceBotCyclesById (id: string): Promise<void> {
  state.botPerformanceCyclesLoading = true
  try {
    const { data } = await algoBotsService.getPerformanceBotCycles(id)

    /* DATA FOR SUBSCRIPTED BOTS */
    if (Object.keys(state.subscriptionBot).length) {
      if (data.find(elem => elem.botVer === '2')) {
        state.botPerformanceCycles = data.filter(elem => elem.botVer === '2')
      } else {
        state.botPerformanceCycles = data
      }
    } else {
      if (data.find(elem => elem.botVer === '2')) {
        state.botPerformanceCycles = data.filter(elem => elem.botVer === '2')
      } else {
        state.botPerformanceCycles = data.filter(elem => !elem.open)
      }
    }
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.botPerformanceCyclesLoading = false
  }
}

async function fetchBotPerformanceSubscriptionCyclesById (id: string): Promise<void> {
  state.botPerfSubscriptionCyclesLoading = true
  try {
    const { data } = await algoBotsService.getPerformanceSubscriptionCyclesById(id)
    state.botPerfSubscriptionCycles = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.botPerfSubscriptionCyclesLoading = false
  }
}

async function fetchCryptoPriceCoinGecko (): Promise<void> {
  const symbol = { cryptoSymbol: 'upbots', fiatSymbol: 'usd' }
  state.ubxtPriceLoading = true
  try {
    const { data }: any = await globalService.getMarketValueHistory(symbol)
    state.ubxtPrice = data.prices.pop()[1]
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.ubxtPriceLoading = false
  }
}

/* EXPORT USE BOTS */
export const useAlgoBotsDetailed = function () {
  return {
    ...toRefs(state),

    getAccount,
    isTradableAmount,
    getMiniumUbxtToDeposit,

    setBotGlobalLoading,
    fetchBotSnapshotById,
    fetchBotSubscriptionById,
    fetchSubscriptionAuditsById,
    fetchBaseAvailable,
    fetchBotPerformanceSubscriptionSnapshotById,
    fetchPerformanceBotCyclesById,
    fetchBotPerformanceSubscriptionCyclesById,
    fetchCryptoPriceCoinGecko
  }
}
