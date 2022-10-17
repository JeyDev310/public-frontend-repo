
import { mutationTree, actionTree } from 'typed-vuex'
import { globalService, ubxtWalletService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'
import { EErrorsMessage, IAlgoBotStats, IUserTransaction } from '@/types'
import { PERFEES_EVENT_ACTION } from '@/store/modules/action-types'
import { IPerfeesUserWallet } from '@/types/perfees/perfees.types'

const state = () => ({
  perfeesUserWalletData: {} as IPerfeesUserWallet,
  userTransactionsData: [] as IUserTransaction[],
  userBotsStatsData: [] as IAlgoBotStats[]
})

const mutations = mutationTree(state, {
  setPerfeesUserWalletData (state, payload: IPerfeesUserWallet) {
    state.perfeesUserWalletData = payload
  },

  setUserTransactionsData (state, payload: IUserTransaction[]) {
    state.userTransactionsData = payload
  },

  setUserBotsStats (state, payload: IAlgoBotStats[]) {
    state.userBotsStatsData = payload
  }
})

const actions = actionTree({ state, mutations }, {
  async fetchUserWallet ({ commit }) {
    try {
      const res = await globalService.getPerfeesUserWallet()
      commit('setPerfeesUserWalletData', res.data)

      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchUserTransactions ({ commit }) {
    try {
      const res = await ubxtWalletService.getUserTransactions()
      commit('setUserTransactionsData', res.data)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchUserBotsStats ({ commit }) {
    try {
      const res = await ubxtWalletService.getUserBotsStats()
      commit('setUserBotsStats', res.data)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },
  [PERFEES_EVENT_ACTION] () {
    this.dispatch('ubxtWallet/fetchUserWallet')
    this.dispatch('ubxtWallet/fetchUserTransactions')
  }
})

export const ubxtWalletStore = {
  namespaced: true,

  state,
  mutations,
  actions
}
