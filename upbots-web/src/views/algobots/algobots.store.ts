import { mutationTree, actionTree } from 'typed-vuex'
import { algoBotsService, globalService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'
import {
  IPerfSubscriptionCycles,
  IBotPerformanceSubscriptionSnapshotById,
  IPerfeesBotWallets,
  IAlgobotsSubscriptionAudits,
  EErrorsMessage
} from '@/types'
import { PERFEES_EVENT_ACTION } from '@/store/modules/action-types'

import { IAllowedExchange, IAllowedExchangeWithPairsDto } from '@/views/trade/trade-types'
import { IPerfeesUserWallet } from '@/types/perfees/perfees.types'

import { useGlobal } from '@/global-setup/global.composition.setup'

const state = () => ({
  performanceSubscriptionCyclesData: [] as IPerfSubscriptionCycles[],
  botPerformanceSubscriptionSnapshotData: {} as IBotPerformanceSubscriptionSnapshotById,
  perfeesBotWalletsData: [] as IPerfeesBotWallets[],
  perfeesUserWalletData: {} as IPerfeesUserWallet,
  subscriptionAuditsData: [] as IAlgobotsSubscriptionAudits[],
  compatibleExchanges: [] as IAllowedExchange[],
  tradingSettings: [] as IAllowedExchangeWithPairsDto[],
  exchange: {} as any,
  performanceCyclesUpdated: false
})

const { accounts } = useGlobal()

const mutations = mutationTree(state, {
  setPerformanceSubscriptionCycles (state, payload: IPerfSubscriptionCycles[]) {
    state.performanceSubscriptionCyclesData = payload
  },

  setBotPerformanceSubscriptionSnapshot (state, payload: IBotPerformanceSubscriptionSnapshotById) {
    state.botPerformanceSubscriptionSnapshotData = payload
  },

  setPerfeesBotWallets (state, payload: IPerfeesBotWallets[]) {
    state.perfeesBotWalletsData = payload
  },

  setAlgoBotsSubscriptionAudits (state, payload: IAlgobotsSubscriptionAudits[]) {
    state.subscriptionAuditsData = payload
  },

  setPerfeesUserWalletData (state, payload: IPerfeesUserWallet) {
    state.perfeesUserWalletData = payload
  },

  setCompatibleExchanges (state, payload: IAllowedExchange[]) {
    state.compatibleExchanges = payload
  },

  setTradingSettings (state, payload: IAllowedExchangeWithPairsDto[]) {
    state.tradingSettings = payload
  },

  setExchange (state, payload: any) {
    if (accounts.value.length) {
      state.exchange = payload
    } else {
      state.exchange = {}
    }
  },

  updatedPerformanceCycles (state) {
    state.performanceCyclesUpdated = !state.performanceCyclesUpdated
  }
})

const actions = actionTree({ state, mutations }, {
  async fetchPerformanceSubscriptionCyclesById ({ commit }, { id, isNotify }: { id: string; isNotify?: boolean; }) {
    try {
      const res = await algoBotsService.getPerformanceSubscriptionCyclesById(id)
      commit('setPerformanceSubscriptionCycles', res.data)

      if (isNotify && !res.data.length) {
        appNotify({ type: 'warning', message: 'You haven\'t any orders yet' })
      }

      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchBotPerformanceSubscriptionSnapshotById ({ commit }, id: string) {
    try {
      const res = await algoBotsService.getBotPerformanceSubscriptionSnapshotById(id)
      commit('setBotPerformanceSubscriptionSnapshot', res.data)

      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchBotWallets ({ commit }) {
    try {
      const res = await algoBotsService.getPerfeesBotWallets()
      commit('setPerfeesBotWallets', res.data)

      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchSubscriptionsAuditsById ({ commit }, id: string) {
    try {
      const res = await algoBotsService.getAlgoBotsSubscriptionAuditsById(id)
      commit('setAlgoBotsSubscriptionAudits', res.data)

      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchUserWallet ({ commit }) {
    try {
      const res = await globalService.getPerfeesUserWallet()
      commit('setPerfeesUserWalletData', res.data)

      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchTradingSettings ({ commit }) {
    try {
      const res = await globalService.getSettingsExchanges()
      commit('setCompatibleExchanges', res.data.compatibleExchanges)
      commit('setTradingSettings', res.data.tradingSettings)
      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },
  [PERFEES_EVENT_ACTION] ({ commit }) {
    commit('updatedPerformanceCycles')
  }
})

export const algobotsStore = {
  namespaced: true,

  state,
  mutations,
  actions
}
