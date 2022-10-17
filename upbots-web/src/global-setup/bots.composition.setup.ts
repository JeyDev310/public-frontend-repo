import { reactive, toRefs, computed } from 'vue'

import { vuex } from '@/store'
import { algoBotsService } from '@/services'
import {
  ISubscriptedBots,
  IPerfSubscriptionCycles,
  IAlgoBotSubscription,
  EErrorsMessage,
  IBotSnapshot,
  TCategory,
  ECategory
} from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'
import { routeNames } from '@/router'

/* BOTS STATE */
const state = reactive({
  bots: [] as IBotSnapshot[],
  botsLoading: true as boolean,
  allAndSubscriptedBotsLoading: false as boolean,
  subscriptedBots: [] as ISubscriptedBots[],
  performanceSubscriptionCycles: [] as IPerfSubscriptionCycles[][],
  // mostPopularBots: [] as IBotSnapshot[], // NOT USED FOR NOW
  // mostPopularBotsLoading: true as boolean, // NOT USED FOR NOW
  totalActiveBots: 0 as number
})

/* COMPUTED */
const getSortedBotsByPerf = computed((): IBotSnapshot[] => {
  return state.bots.sort((a, b) => (b.perfSnapshots?.allmonths || 0) - (a.perfSnapshots?.allmonths || 0))
})

const getCurrentFeeOff = computed(() => vuex.staking.benefit.currentFeeOff)

function getBotDetailedRedirectRoute (category: TCategory): string {
  if (category === ECategory.UserBot) {
    return routeNames.myBotDetailed
  } else {
    return routeNames.algoBotDetailed
  }
}

/* HELPER FUNCTIONS */
function getMinFeePercent (currentFee: number): string {
  const maxDiscountPercent = 65

  if (currentFee === 0) return '0'
  return (currentFee * (100 - maxDiscountPercent) / (100 - getCurrentFeeOff.value)).toFixed(1)
}

/* FETCH DATA */
async function fetchAllBots (): Promise<void> {
  state.botsLoading = true
  try {
    const { data } = await algoBotsService.getPerformanceBotsSnapshot()

    // Get %fee off and calculate new %fee for all bots
    await vuex.staking.fetchStakingBenefit()
    const currentFeeOff = vuex.staking.benefit.currentFeeOff

    if (currentFeeOff) {
      data.map(el => {
        el.perfFees.percent = el.perfFees.percent * (100 - currentFeeOff) / 100
      })
    }

    state.bots = data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  } finally {
    state.botsLoading = false
  }
}

async function fetchSubscriptedBots (): Promise<ISubscriptedBots[]> {
  try {
    const res = await algoBotsService.getAlgobotsSubscriptions()
    state.subscriptedBots = res.data

    return res.data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    return []
  }
}

async function fetchPerformanceSubscriptionCyclesById (id: string): Promise<IPerfSubscriptionCycles[]> {
  try {
    const res = await algoBotsService.getPerformanceSubscriptionCyclesById(id)
    return res.data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    return []
  }
}

async function fetchPerformanceSubscriptionCycles (): Promise<void> {
  const data: IPerfSubscriptionCycles[][] = await Promise.all(state.subscriptedBots.map(async ({ id }) => {
    return await fetchPerformanceSubscriptionCyclesById(id)
  }))

  state.performanceSubscriptionCycles = data
}

// NOT USED FOR NOW
// async function fetchMostPopularBots (): Promise<void> {
//   state.mostPopularBotsLoading = true
//   try {
//     const res = await algoBotsService.getMostPopularBots()
//     const data = res.data.map((bot: IPopularBot) => {
//       const exItem = state.bots.find((i) => i.id === bot.botId)
//       if (exItem) return { ...exItem, followers: bot.followers }
//     }).filter(y => y !== undefined) as IBotSnapshot[]

//     state.mostPopularBots = data
//   } catch (error) {
//     appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
//   } finally {
//     state.mostPopularBotsLoading = false
//   }
// }

async function fetchAlgoBotsTotalActiveBots (): Promise<void> {
  try {
    const res = await algoBotsService.getAlgoBotsTotalActiveBots()
    state.totalActiveBots = res.data
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

async function fetchAllAndSubscriptedBots (): Promise<void> {
  state.allAndSubscriptedBotsLoading = true
  await Promise.all([fetchAllBots(), fetchSubscriptedBots()])
  state.allAndSubscriptedBotsLoading = false
}

async function confirmChangeActivation (value: boolean): Promise<boolean> {
  return appConfirm({
    title: `${!value ? 'Pause' : 'Resume'} your bot`,
    body: `Are you sure you want to ${!value ? 'pause' : 'resume'} this bot?`,
    actionsName: ['Cancel', `${!value ? 'Pause' : 'Resume'}`]
  })
}

async function changeActivation (row: IAlgoBotSubscription, value: boolean): Promise<void> {
  try {
    let res: any = {}
    if (value) {
      res = await algoBotsService.resumeActivation({ botId: row.botId, subId: row.id })
    } else {
      res = await algoBotsService.pauseActivation(row.id)
    }
    row.enabled = res.data.enabled
  } catch (error) {
    appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
  }
}

/* EXPORT USE BOTS */
export const useBots = function () {
  return {
    ...toRefs(state),

    getSortedBotsByPerf,

    getMinFeePercent,

    fetchAllBots,
    fetchSubscriptedBots,
    fetchPerformanceSubscriptionCycles,
    fetchAlgoBotsTotalActiveBots,
    fetchAllAndSubscriptedBots,
    confirmChangeActivation,
    changeActivation,
    getBotDetailedRedirectRoute
  }
}
