import { computed, reactive, toRefs } from 'vue'

/* SERVICES | TYPES | NOTIFY */
import { algoBotsService } from '@/services'
import {
  EErrorsMessage,
  IAlgobotsSubscriptionAudits,
  IBotSnapshot,
  IBotSubscription,
  IPerfSubscriptionCycles,
  IUserBotWebhookMessage
} from '@/types'
import { appNotify } from '@/components/stateless/notifications'

/* USE GLOBAL SETUP */
import { useGlobal } from '@/global-setup/global.composition.setup'

/* STATE */
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
  botPerfSubscriptionCycles: [] as IPerfSubscriptionCycles[],
  botPerfSubscriptionCyclesLoading: false as boolean,
  botWebhooks: {} as IUserBotWebhookMessage,
  botWebhooksLoading: false as boolean
})

/* USE GLOBAL SETUP */
const { availableAccounts } = useGlobal()

const getAccount = computed(() => availableAccounts.value.find((el) => el.id === state.subscriptionBot.apiKeyRef))

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

async function fetchWebhooksById (botId: string): Promise<void> {
  state.botWebhooksLoading = true
  try {
    const { data } = await algoBotsService.getWebhooksById(botId)
    state.botWebhooks = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.botWebhooksLoading = false
  }
}

/* EXPORT USE BOTS */
export const useMyBotDetailed = function () {
  return {
    ...toRefs(state),
    getAccount,
    setBotGlobalLoading,
    fetchBotSnapshotById,
    fetchBotSubscriptionById,
    fetchSubscriptionAuditsById,
    fetchBaseAvailable,
    fetchBotPerformanceSubscriptionCyclesById,
    fetchWebhooksById
  }
}
