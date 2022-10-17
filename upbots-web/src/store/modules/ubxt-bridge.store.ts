import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import axios from 'axios'
import { IUbxtBridgeServerInfo, IUbxtBridgeState } from '@/types/ubxt-bridge.types'

const anyswapURL = 'https://bridgeapi.anyswap.exchange/v2'

const $httpAnyswap = axios.create({
  baseURL: anyswapURL
})

const state = () => ({
  walletConnected: false,
  metamaskAccountLink: '',
  serverInfo: {},
  ethUbxtContractAddress: '0x8564653879a18C560E7C0Ea0E084c516C62F5653',
  bscUbxtContractAddress: '0xbbeb90cfb6fafa1f69aa130b7341089abeef5811',
  eth2bscDepositAddress: '0x533e3c0e6b48010873B947bddC4721b1bDFF9648',
  bridgeWay: true,
  networkId: 1
} as IUbxtBridgeState)

const getters = getterTree(state, {
  getWalletConnected (state) {
    return state.walletConnected
  },

  getMetamaskAccountLink (state) {
    return state.metamaskAccountLink
  },

  getServerInfo (state) {
    return state.serverInfo
  },

  getBridgeWay (state) {
    return state.bridgeWay
  },

  getNetworkId (state) {
    return state.networkId
  }
})

const mutations = mutationTree(state, {
  setWalletConnected (state, payload: any) {
    state.walletConnected = payload
  },

  setMetamaskAccountLink (state, payload: any) {
    state.metamaskAccountLink = payload
  },

  setServerInfo (state, payload: any) {
    state.serverInfo = payload
  },

  setBridgeWay (state, payload: any) {
    state.bridgeWay = payload
  },

  setNetworkId (state, payload: any) {
    state.networkId = payload
  }
})

const actions = actionTree({ state, getters, mutations }, {
  updateWalletConnected ({ commit }, walletConnected: any) {
    commit('setWalletConnected', walletConnected)
  },

  updateMetamaskAccountLink ({ commit }, metamaskAccountLink: any) {
    commit('setMetamaskAccountLink', metamaskAccountLink)
  },

  fetchServerInfo ({ commit }) {
    const bscNetId = 56
    const link = `/serverInfo/${bscNetId}`
    return $httpAnyswap.get<IUbxtBridgeServerInfo>(link).then((response: any) => {
      const payload = response && response.data
      const ubxtv3 = payload && payload.ubxtv3
      const serverInfo = ubxtv3 || null
      commit('setServerInfo', serverInfo)
      return serverInfo
    })
  },

  registerAccount (_, account: string) {
    const chainId = 56
    const pairId = 'UBXTv3'
    const link = `/register/${account}/${chainId}/${pairId}`
    return $httpAnyswap.get(link).then(() => {
      Promise.resolve()
    })
  }
})

export const ubxtBridgeStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
