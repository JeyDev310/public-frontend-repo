
import { mutationTree, actionTree } from 'typed-vuex'

import { referralService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'
import { EErrorsMessage } from '@/types'

const state = () => ({
  invitor: {} as any,
  invitees: [] as any[],
  transactions: [] as any[]
})

const mutations = mutationTree(state, {
  setInvitor (state, payload: any) {
    state.invitor = payload
  },
  setInvitees (state, payload: any[]) {
    state.invitees = payload
  },
  setTransactions (state, payload: any[]) {
    state.transactions = payload
  }
})

const actions = actionTree({ state, mutations }, {
  async fetchUserReferral ({ commit }) {
    try {
      const res = await referralService.getUserReferral()
      const data = res.data
      commit('setInvitor', data.invitor)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },
  async fetchUserReferees ({ commit }) {
    try {
      const res = await referralService.getUserReferees()
      const data = res.data
      // commit('setInvitor', data.invitor)
      commit('setInvitees', data.invitees)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },
  async fetchReferralTransactions ({ commit }) {
    try {
      const res = await referralService.getReferralTransactions()
      const data = res.data
      commit('setTransactions', data)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  }
})

export const referralStore = {
  namespaced: true,

  state,
  mutations,
  actions
}
