import { mutationTree, actionTree, getterTree } from 'typed-vuex'
import { appNotify } from '@/components/stateless/notifications'
import { ICoinPriceResponsePayload, ICoinPriceRequestPayload, ICoinPriceData } from '@/types/crypto.types'
import { globalService } from '@/services'

const state = () => ({
  marketPriceData: {} as {[pair: string]: ICoinPriceData;}
})

const getters = getterTree(state, {
  marketPriceData (state): {[pair: string]: ICoinPriceData;} {
    return state.marketPriceData
  }
})

const mutations = mutationTree(state, {
  setMarketPriceData (state, payload: ICoinPriceResponsePayload) {
    state.marketPriceData[`${payload.cryptoSymbol}/${payload.fiatSymbol}`] = payload.data
  }
})

const actions = actionTree({ state, mutations }, {
  async fetchMarketValueData ({ commit }, payload: ICoinPriceRequestPayload) {
    return globalService.getMarketValueHistory(payload)
      .then((res: any) => {
        const data: ICoinPriceResponsePayload = {
          cryptoSymbol: payload.cryptoSymbol,
          fiatSymbol: payload.fiatSymbol,
          data: res.data
        }
        commit('setMarketPriceData', data)
      })
      .catch((error) => {
        appNotify({ type: 'error', message: error.response.data.message || 'Could not load the market price data.' })
      })
  }
})

export const homeStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
