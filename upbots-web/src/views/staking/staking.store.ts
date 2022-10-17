
import { mutationTree, actionTree } from 'typed-vuex'
import { globalService, localStorageService, stakingService } from '@/services'
import { EErrorsMessage, IStakingBenefit, IStakingUBXTAmount } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

const state = () => ({
  configTab: localStorageService?.getItem('stakingConfigTab' || '') || 'eth' as null | string,
  stakingAmountData: { ubxtStakingAmount: 0, botsAccess: false } as IStakingUBXTAmount,
  benefit: {
    currentFeeOff: 0,
    latestLevel: 0,
    accessCommunityBots: false,
    accessCreateBot: false,
    prizeNFT: ''
  } as IStakingBenefit
})

const mutations = mutationTree(state, {
  setConfigTab (state, payload: string) {
    state.configTab = payload
  },

  setBenefit (state, payload:IStakingBenefit) {
    state.benefit = payload
  },

  setAmount (state, payload: IStakingUBXTAmount) {
    state.stakingAmountData = payload
  }
})

const actions = actionTree({ state, mutations }, {
  updateConfigTab ({ commit }, tab: string) {
    commit('setConfigTab', tab)
    localStorageService.setItem('stakingConfigTab', tab)
  },

  async fetchStakingBenefit ({ commit }) {
    try {
      const res = await stakingService.getStakingStatus()
      commit('setBenefit', res?.data)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async fetchStakingAmount ({ commit }) {
    try {
      const res = await globalService.getStakingAmount()
      commit('setAmount', res?.data)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async setStakingAmount ({ dispatch }, payload: { ubxtStakingAmount: number; walletAddress: string; }) {
    try {
      await stakingService.setStakingAmount(payload)
      await dispatch('fetchStakingAmount')
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  }
})

export const stakingStore = {
  namespaced: true,

  state,
  mutations,
  actions
}
