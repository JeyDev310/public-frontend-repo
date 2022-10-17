import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { cexService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'
import {
  fixedDecimal,
  generateCexDistributionChartData,
  portfolioFilterUrl,
  parseTotalCexEvolutionData
} from '@/core/helpers'
import {
  IAccount,
  IPortfolioEvolutionChart,
  ICexDistribution,
  ICexDistributionChart,
  ICexPortfolio,
  EErrorsMessage
} from '@/types'
import dayjs from 'dayjs'

import { useGlobal } from '@/global-setup/global.composition.setup'

const state = () => ({
  loading: false as boolean,
  accounts: [] as IAccount[],
  selectedWallets: [] as string[],
  distributionChart: {} as ICexDistributionChart,
  distributionTable: {} as ICexDistribution,
  portfolioEvolution: {} as IPortfolioEvolutionChart,
  portfolioCEXsError: false as boolean // TODO
})

/* USE GLOBAL SETUP */
const { getFavoriteCurrency, accounts, filterChartByDate } = useGlobal()

const getters = getterTree(state, {
  getLoadingStatus (state) {
    return state.loading
  },

  getSelectedWallets (state) {
    return state.selectedWallets
  },

  getAccounts (state) {
    return state.accounts
  },

  getDistributionChart (state) {
    return generateCexDistributionChartData(state.distributionChart)
  },

  getDistributionTable (state) {
    if (!state || !state.distributionTable) {
      return []
    }
    return Object.keys(state.distributionTable).map((key) => {
      return {
        coin: key,
        amount: state.distributionTable[key].currencyAmount,
        btc: state.distributionTable[key].btc
      }
    }).sort((a, b) => b.btc - a.btc)
  },

  getPortfolioEvolution (state) {
    return state.portfolioEvolution
  },

  getCexBalance (state) {
    function filterEmptyData<TValue> (value: TValue | null | undefined): value is TValue {
      return value !== null && value !== undefined
    }

    const selectedAccounts = state.selectedWallets.map((name) => state.accounts.find((account) =>
      account.name === name)).filter(filterEmptyData)

    return {
      btc: selectedAccounts.reduce((acc: number, b: IAccount) => acc + b.total.btc, 0)
    }
  },

  getPortfolioCEXsError (state) {
    return state.portfolioCEXsError
  }
})

const mutations = mutationTree(state, {
  setLoadingStatus (state, payload: boolean) {
    state.loading = payload
  },

  setAccounts (state, payload: IAccount[]) {
    state.accounts = payload
  },

  setSelectedWallets (state, payload: string[]) {
    state.selectedWallets = payload
  },

  setDistributionChart (state, payload: ICexPortfolio) {
    state.distributionChart = payload.distribution
  },

  setDistributionTable (state, payload: ICexPortfolio) {
    state.distributionTable = payload.distribution
  },

  setPortfolioEvolution (state, payload: IPortfolioEvolutionChart) {
    state.portfolioEvolution = payload
  },

  setPortfolioCEXsError (state, payload: boolean) {
    state.portfolioCEXsError = payload
  }
})

const actions = actionTree({ state, getters, mutations }, {
  async fetchCEXPortfolioData ({ commit, dispatch }) {
    commit('setLoadingStatus', true)

    try {
      const { data } = await cexService.getAllPortfolios()
      if (!data) return

      commit('setAccounts', data.accounts)
      commit('setSelectedWallets', data.accounts.map((wallet: IAccount) => wallet.name))

      await dispatch('fetchPortfolioDistribution', data)
      await dispatch('fetchPortfolioEvolution')
    } catch (error) {
      commit('setPortfolioCEXsError', true)
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
    commit('setLoadingStatus', false)
  },

  async fetchPortfolioDistribution ({ state, commit }, payload = null) {
    if (state.selectedWallets.length === 0) {
      const emptyWallet = {
        accounts: [] as IAccount[],
        aggregated: { btc: 0, eur: 0, usd: 0 },
        distribution: {} as ICexDistributionChart,
        ignoredCurrencies: [] as string[]
      }
      commit('setDistributionTable', emptyWallet)
      commit('setDistributionChart', emptyWallet)
      return
    }
    commit('setLoadingStatus', true)

    try {
      let tableData = payload
      if (payload === null) {
        tableData = await cexService.getPortfolioByUrlAndConFig(
          portfolioFilterUrl({ selectedWallets: state.selectedWallets })
        )
        tableData = tableData.data
      }
      commit('setDistributionTable', tableData)
      // let chartData = payload
      // if (payload === null) {
      //   chartData = await cexService.getPortfolioByUrlAndConFig(
      //     portfolioFilterUrl({ selectedWallets: state.selectedWallets, take: 8 })
      //   )
      //   chartData = chartData.data
      // }
      // commit('setDistributionChart', chartData)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
    commit('setLoadingStatus', false)
  },

  async fetchPortfolioEvolution ({ state, commit }) {
    commit('setLoadingStatus', true)

    try {
      const end = dayjs().format('YYYY-MM-DD')
      let start = ''
      const timeFrame = filterChartByDate.value

      if (timeFrame === 'all') {
        start = '1970-01-01'
      } else {
        const [num, type]: any = timeFrame.split(',')
        start = dayjs().subtract(Number(num), type).format('YYYY-MM-DD')
      }

      const { data } = await cexService.fetchPortfolioEvolution(start, end)

      if (state.selectedWallets.length) {
        const { parsedData, labels } = parseTotalCexEvolutionData({
          keys: accounts.value,
          selectedWallets: state.selectedWallets,
          result: data.accounts
        })

        const payload: IPortfolioEvolutionChart = {
          labels: labels as unknown as string[],
          datasets: [
            {
              name: 'BTC', data: parsedData.map((d: any) => fixedDecimal(d.btc, 8, 0))
            },
            {
              name: getFavoriteCurrency.value.label,
              data: parsedData.map((d: any) => fixedDecimal(d[getFavoriteCurrency.value.value], 2, 0))
            }
          ]
        }

        commit('setPortfolioEvolution', payload)
      } else {
        commit('setPortfolioEvolution', { labels: [], datasets: []})
      }
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
    commit('setLoadingStatus', false)
  },

  async handleToggleWallet ({ state, commit, dispatch }, name: string) {
    commit('setLoadingStatus', true)

    const selected = state.selectedWallets.includes(name)
      ? state.selectedWallets.filter((i: string) => i !== name)
      : [...state.selectedWallets, name]

    commit('setSelectedWallets', selected)
    await dispatch('fetchPortfolioDistribution')
    await dispatch('fetchPortfolioEvolution')
    commit('setLoadingStatus', false)
  }
})

export const cexStore = {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
