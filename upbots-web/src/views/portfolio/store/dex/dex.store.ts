import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import dayjs from 'dayjs'
import { dexService } from '@/services'
import {
  reduceProjectData,
  generateDexPortfolioEvolution,
  generateDexDistributionChartData,
  generateDexDistributionData,
  calculateTotalAssets,
  calculateTotalDebts
} from '@/core/helpers'
import {
  IDistributionTableData,
  IPortfolioEvolutionChart,
  IAccount,
  IUSDConverstion,
  IToken,
  IDexWallet,
  IProjectData,
  IDexAssetSummary,
  EErrorsMessage
} from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { allDexWalletsOption } from '@/views/portfolio/store/dex/consts'

import { useGlobal } from '@/global-setup/global.composition.setup'

const state = () => ({
  loading: false as boolean,
  usdConversionRates: {} as IUSDConverstion,
  wallets: [] as IDexWallet[],
  formattedWallets: [] as IAccount[],
  assetEvolution: [] as IDexAssetSummary[],
  selectedWallet: allDexWalletsOption as IDexWallet,
  tokens: [] as IToken[],
  projectsDataList: [] as IProjectData[],
  projectsData: {} as IProjectData,
  distribution: [] as IDistributionTableData[],
  evolution: {} as IPortfolioEvolutionChart
})

/* USE GLOBAL SETUP */
const { getFavoriteCurrency, filterChartByDate } = useGlobal()

const getters = getterTree(state, {
  getLoadingStatus (state) {
    return state.loading
  },

  getNetworth (state) {
    const networth =
    calculateTotalAssets(state.tokens, state.projectsDataList, state.selectedWallet) -
    calculateTotalDebts(state.projectsDataList, state.selectedWallet)

    return {
      btc: networth * (state.usdConversionRates.btc || 0)
    }
  },

  getCapital (state) {
    const capital = calculateTotalAssets(state.tokens, state.projectsDataList, state.selectedWallet)
    return {
      btc: capital * state.usdConversionRates.btc,
      conversionDate: new Date()
    }
  },

  getDebts (state) {
    const totalDebts = calculateTotalDebts(state.projectsDataList, state.selectedWallet)
    return {
      btc: totalDebts * state.usdConversionRates.btc
    }
  },

  getWallets (state) {
    return state.wallets
  },

  getAccounts (state): IAccount[] {
    const wallets = state.wallets.map((wallet) => {
      return {
        label: wallet.label,
        address: wallet.address,
        allWallets: false
      }
    })

    return wallets.map((wallet) => {
      const coins = generateDexDistributionData(state.tokens, wallet, state.usdConversionRates)
      return {
        exchange: '',
        id: '',
        name: wallet.label,
        total: {
          btc: coins.reduce((acc, b: IDistributionTableData) => acc + b.btc, 0)
        }
      }
    })
  },

  getSelectedWallets (state) {
    if (state.selectedWallet.allWallets === true) return state.wallets.map((x) => x.label)
    return [state.selectedWallet.label]
  },

  getProjectsData (state) {
    return state.projectsData
  },

  getProjectsDataList (state) {
    return state.projectsDataList
  },

  getDistributionTable (state) {
    return state.distribution
  },

  getDistributionChart (state) {
    return generateDexDistributionChartData(state.distribution)
  },

  getPortfolioEvolution (state): IPortfolioEvolutionChart {
    return state.evolution
  }
})

const mutations = mutationTree(state, {
  setLoadingStatus (state, payload: boolean) {
    state.loading = payload
  },

  setTokens (state, payload: IToken[]) {
    state.tokens = payload
  },

  setSelectedWallet (state, payload: IDexWallet) {
    state.selectedWallet = payload
  },

  setWallets (state, payload: IDexWallet[]) {
    state.wallets = payload
  },

  setConversionRates (state, payload: IUSDConverstion) {
    state.usdConversionRates = payload
  },

  setProjectDataList (state, payload: IProjectData[]) {
    state.projectsDataList = payload
  },

  setProjectData (state, payload: IProjectData) {
    state.projectsData = payload
  },

  setAssetEvolution (state, payload: IDexAssetSummary[]) {
    state.assetEvolution = payload
  },

  setDistributionData (state, payload: IDistributionTableData[]) {
    state.distribution = payload
  },

  setEvolutionChartData (state, payload: IPortfolioEvolutionChart) {
    state.evolution = payload
  }
})

const actions = actionTree({ state, getters, mutations }, {
  async fetchDexWallets ({ commit }) {
    try {
      commit('setLoadingStatus', true)

      const { data } = await dexService.getWallets()

      if (!data) return

      commit('setWallets', data)
      commit('setSelectedWallet', allDexWalletsOption)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
    commit('setLoadingStatus', false)
  },

  async fetchDexBalance ({ state, commit, dispatch }) {
    const liveFetch = false

    const addresses = state.wallets.map(({ address }) => address)

    if (addresses.length === 0) {
      commit('setTokens', [])
      // commit('setProjectDataList', [])
      // commit('setProjectData', {})
    } else {
      try {
        commit('setLoadingStatus', true)
        const { data } = await dexService.getBalance(addresses, liveFetch)

        commit('setTokens', data.tokens)
        commit('setConversionRates', data.quoteCurrencyConversionRates)
        // commit('setProjectDataList', data.projects)
        // commit('setProjectData', reduceProjectData(data.projects, state.selectedWallet))
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    await dispatch('updateAssetSummary')
    await dispatch('generateDistributionData')
    await dispatch('generateEvolutionChart')

    commit('setLoadingStatus', false)
  },

  async updateAssetSummary ({ state, commit }) {
    try {
      commit('setLoadingStatus', true)

      const { data } = await dexService.updateAssetSummary([])

      // Filter previously deleted wallet
      const filteredData = data.filter(({ address }) => state.wallets.map(({ address }) => address).includes(address))

      const payload = filteredData.map((elem) => {
        return {
          address: elem.address,
          evolution: elem.evolution.filter((evo, i) => {
            if (i === elem.evolution.length - 1) {
              return true
            }
            return !dayjs(evo.date).isSame(dayjs(elem.evolution[i + 1].date), 'day')
          })
        }
      })

      commit('setAssetEvolution', payload)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
    commit('setLoadingStatus', false)
  },

  generateDistributionData ({ state, commit }) {
    const data = generateDexDistributionData(state.tokens, state.selectedWallet,
      state.usdConversionRates)

    commit('setDistributionData', data)
  },

  generateEvolutionChart ({ state, commit }) {
    let payload

    if (state.wallets.length === 0 || state.assetEvolution.length === 0) {
      payload = { labels: [], datasets: []}
    } else {
      const timeFrame = filterChartByDate.value
      const favoriteCurrency = getFavoriteCurrency.value

      payload = generateDexPortfolioEvolution(state.selectedWallet,
        state.assetEvolution, timeFrame, favoriteCurrency.value) as IPortfolioEvolutionChart
    }

    commit('setEvolutionChartData', payload)
  },

  async handleWalletChange ({ state, commit, dispatch }, payload: IDexWallet) {
    commit('setLoadingStatus', true)

    commit('setSelectedWallet', payload)
    commit('setProjectData', reduceProjectData(state.projectsDataList, payload))

    await dispatch('generateDistributionData')
    await dispatch('generateEvolutionChart')

    commit('setLoadingStatus', false)
  },

  async handleToggleWallet ({ state, dispatch }, name: string) {
    const selected = state.wallets.find(({ label }) => label === name)

    if (!selected) return

    await dispatch('handleWalletChange', selected)
  },

  async deleteWallet ({ state, commit, dispatch }, payload: string) {
    const wallet = state.wallets.find((wallet) => wallet.label === payload)

    if (!wallet) return

    try {
      commit('setLoadingStatus', true)
      const { data } = await dexService.deleteWallet(wallet)

      if (data) {
        const wallets = state.wallets.filter(({ address }) => address !== wallet.address)

        commit('setWallets', wallets)

        await dispatch('fetchDexBalance')
        await dispatch('handleWalletChange', allDexWalletsOption)
      }
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
    commit('setLoadingStatus', false)
  },

  async addNewWallet ({ state, commit, dispatch }, wallet: IDexWallet) {
    try {
      commit('setLoadingStatus', true)
      const { data } = await dexService.upDateWallets(wallet)

      if (data) {
        commit('setWallets', [...state.wallets, wallet])
        await dispatch('fetchDexBalance')
        await dispatch('handleWalletChange', wallet)
      }
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
    commit('setLoadingStatus', false)
  }
})

export const dexStore = {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
