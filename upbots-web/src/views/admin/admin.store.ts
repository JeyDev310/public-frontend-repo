
import { getterTree, mutationTree, actionTree } from 'typed-vuex'

import { adminService } from './admin.services'
import { appNotify } from '@/components/stateless/notifications'
import { IActiveUser, IActiveUserChart } from './admin.types'
import { EErrorsMessage } from '@/types'

import dayjs from 'dayjs'

const state = () => ({
  loadingActiveUser: false as boolean,
  loadingActiveUserChart: false as boolean,
  activeDay: 2 as number,
  activePeriod: '1,week' as string,
  activeUsers: [] as IActiveUser[],
  activeUserChart: { labels: [], data: []} as IActiveUserChart
})

const getters = getterTree(state, {
  getLoadingActiveUser (state) {
    return state.loadingActiveUser
  },

  getLoadingActiveUserChart (state) {
    return state.loadingActiveUserChart
  },

  getActiveDay (state) {
    return state.activeDay
  },

  getActivePeriod (state) {
    return state.activePeriod
  },

  getActiveUsers (state) {
    return state.activeUsers
  },

  getActiveUserChart (state) {
    return state.activeUserChart
  }
})

const mutations = mutationTree(state, {
  setLoadingActiveUser (state, payload: boolean) {
    state.loadingActiveUser = payload
  },

  setLoadingActiveUserChart (state, payload: boolean) {
    state.loadingActiveUserChart = payload
  },

  setActiveDay (state, payload: number) {
    state.activeDay = payload
  },

  setActiveUsers (state, payload: IActiveUser[]) {
    state.activeUsers = payload
  },

  setActivePeriod (state, payload: string) {
    state.activePeriod = payload
  },

  setActiveUserChart (state, payload: IActiveUserChart) {
    state.activeUserChart = payload
  }
})

const actions = actionTree({ state, mutations }, {
  async fetchActiveUsersByActiveDay ({ state, commit }) {
    commit('setLoadingActiveUser', true)
    try {
      const dateTo = dayjs()
      const dateFrom = dateTo.subtract(state.activeDay, 'day').toDate()

      const res = await adminService.getDailyActiveUsers(dateFrom, dateTo.toDate())
      commit('setActiveUsers', res.data)
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    } finally {
      commit('setLoadingActiveUser', false)
    }
  },

  async fetchActiveUserChart ({ state, commit }) {
    let activeDays = 0
    const data = [] as number[]
    const labels = [] as string[]

    try {
      commit('setLoadingActiveUserChart', true)
      switch (state.activePeriod) {
        case '1,week':
          activeDays = 7
          break
        case '2,weeks':
          activeDays = 14
          break
        case '1,month':
          activeDays = 30
          break
        case '3,months':
          activeDays = 90
          break
        case '6,months':
          activeDays = 180
          break
      }

      const today = dayjs()

      const dateTo = Array.from(Array(activeDays), (_, index) => index + 1)
        .map((_, i) => today.subtract(i, 'day').toDate()).reverse()

      await Promise.all(dateTo.map(async (date) => {
        const dateFrom = dayjs(date).subtract(state.activeDay, 'day').toDate()
        const res = await adminService.getDailyActiveUsers(dateFrom, date)

        data.push(res.data.length)
        labels.push(dayjs(date).format('YYYY-MM-DD'))
      }))
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    } finally {
      commit('setActiveUserChart', { labels, data })
      commit('setLoadingActiveUserChart', false)
    }
  },

  async updateActiveDay ({ commit, dispatch }, day: number) {
    try {
      commit('setActiveDay', day)
      await dispatch('fetchActiveUsersByActiveDay')
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async updateActivePeriod ({ commit, dispatch }, period: string) {
    try {
      commit('setActivePeriod', period)
      await dispatch('fetchActiveUserChart')
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  async generateFile ({ state }) {
    let header = ['email', 'firstname'].join(',') + '\n'
    state.activeUsers.map((x:any) => [x.email, x.firstname]).forEach((arr: string[]) => (header += arr.join(',') + '\n'))
    const csvData = new Blob([header], { type: 'text/csv' })
    const csvUrl = URL.createObjectURL(csvData)
    const hiddenElement = document.createElement('a')
    hiddenElement.href = csvUrl
    hiddenElement.target = '_blank'
    hiddenElement.download = `active_user-${dayjs().format('YYYY-MM-DD')}.csv`
    hiddenElement.click()
  }
})

export const adminStore = {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
