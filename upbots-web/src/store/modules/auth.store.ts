import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { router, routeNames } from '@/router'
import { authService, accountService, localStorageService } from '@/services'
import {
  EErrorsMessage,
  ERoles,
  IConfirmNewIpRequestPayload,
  ILoginRequestPayload,
  IRegisterRequestPayload,
  IUpdateUserData,
  IUser
} from '@/types'
import { appNotify } from '@/components/stateless/notifications'

const state = () => ({
  token: localStorageService?.getItem(process.env.VUE_APP_LOCAL_STORAGE_TOKEN_NAME || '') as string,
  user: localStorageService?.getItem(process.env.VUE_APP_LOCAL_STORAGE_USER_NAME || '') as IUser
})

const getters = getterTree(state, {
  user (state): IUser {
    return state.user
  },

  token (state): string {
    return state.token
  },

  isAuthenticated (state): boolean {
    return !!state.token
  },

  is2FaEnabled (state): boolean {
    return state.user.totpRequired
  },

  userAvatar (state): { type: string; value: string; } {
    if (state.user?.picture) {
      return state.user.picture?.data
        ? { type: 'img', value: `data:${state.user.picture.mimetype};base64,${state.user.picture.data}` }
        : { type: 'text', value: state.user.firstname[0].toUpperCase() }
    } else {
      return { type: 'text', value: '' }
    }
  },

  isDeveloperUser (state): boolean {
    if (state.user && state.token) return !!state.user.roles.find((el: any) => el === ERoles.DEVELOPER)
    return false
  },

  isAdmin (state): boolean {
    return !!state.user.roles.find((role: string) => role === ERoles.ADMIN)
  }
})

const mutations = mutationTree(state, {
  setToken (state, payload: string | null) {
    if (payload) {
      localStorageService.setItem(process.env.VUE_APP_LOCAL_STORAGE_TOKEN_NAME || '', payload)
      state.token = payload
    } else {
      localStorageService.removeItem(process.env.VUE_APP_LOCAL_STORAGE_TOKEN_NAME || '')
      state.token = ''
    }
  },

  setUser (state, payload: IUser | null) {
    if (payload) {
      localStorageService.setItem(process.env.VUE_APP_LOCAL_STORAGE_USER_NAME || '', { email: payload.email, roles: payload.roles })
      state.user = payload
    } else {
      localStorageService.setItem(process.env.VUE_APP_LOCAL_STORAGE_USER_NAME || '', {})
      state.user = {} as IUser
    }
  },

  updateUser (state, payload: IUpdateUserData) {
    state.user = { ...state.user, ...payload }
    localStorageService.setItem(process.env.VUE_APP_LOCAL_STORAGE_USER_NAME || '', { email: state.user.email, roles: state.user.roles })
  }
})

const actions = actionTree({ state, getters, mutations }, {
  async login ({ commit }, payload: ILoginRequestPayload): Promise<void> {
    const { data } = await authService.login(payload)

    commit('setToken', data.access_token)

    if (!data.require2FA) {
      commit('setUser', data.user)
      router.replace({ name: routeNames.home })
    }
  },

  async confirmNewIp ({ commit }, payload: IConfirmNewIpRequestPayload): Promise<void> {
    const { data } = await authService.confirmNewIp(payload)

    commit('setToken', data.access_token)

    if (!data.require2FA) {
      commit('setUser', data.user)
      router.replace({ name: routeNames.home })
    }
  },

  async register ({ commit }, payload: IRegisterRequestPayload): Promise<void> {
    const { data } = await authService.register(payload)

    commit('setToken', data.access_token)
    commit('setUser', data.user)
  },

  async fetchUserInfo ({ commit }): Promise<IUser> {
    try {
      const { data } = await accountService.getAccountInfo()

      commit('setUser', data)

      return data
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      return {} as IUser
    }
  },

  async updateUser ({ commit }, payload: IUser): Promise<void> {
    try {
      const { data } = await accountService.updateAccount(payload)

      commit('updateUser', data.user)

      if (data) {
        appNotify({ type: 'success', message: 'Profile updated successfully' })
      }
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  }
})

export const authStore = {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
