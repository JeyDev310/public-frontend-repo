import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { getCurrentInstance } from 'vue'
import { notificationsService } from '@/services'
import { EErrorsMessage, INotification } from '@/types'
import { appNotify } from '@/components/stateless/notifications'
import { ORDER_EVENT_ACTION, PERFEES_EVENT_ACTION } from '@/store/modules/action-types'
import {
  IOrderEventPayload,
  SOCKET_IO_CONNECT,
  SOCKET_IO_DISCONNECT,
  SOCKET_IO_RECONNECT_ATTEMPT,
  WS_ALREADY_CONNECTED,
  WS_ALREADY_DISCONNECTED,
  WS_CONNECTING,
  WS_DISCONNECTING,
  WS_ABORT_CONNECTION,
  WS_ORDER_EVENT,
  WS_PERFEES_EVENT
} from '@/store/modules/notifications.types'

const state = () => ({
  isConnected: false,
  clientId: '',
  reconnectAttempts: 0,
  reconnectFailed: false,
  notifications: [] as INotification[],
  orderEvents: [] as IOrderEventPayload[]
})

const getters = getterTree(state, {
  hasUnread (state) {
    return state.notifications.some(n => !n.isRead)
  },

  getUnreadNotifCount (state) {
    return !state.notifications ? 0 : state.notifications.filter((x) => !x.isRead).length
  }
})

const mutations = mutationTree(state, {
  setNotification (state, payload: INotification[]) {
    state.notifications = payload
  },

  [WS_ALREADY_CONNECTED]: function (state) { console.info('WS_ALREADY_CONNECTED', state) },

  [WS_ALREADY_DISCONNECTED]: function (state) { console.info('WS_ALREADY_DISCONNECTED', state) },

  [WS_CONNECTING]: function (state) { console.info('WS_CONNECTING', state) },

  [WS_DISCONNECTING]: function (state) { console.info('WS_DISCONNECTING', state) },

  [WS_ABORT_CONNECTION]: function (state) { console.info('WS_ABORT_CONNECTION', state) },

  [SOCKET_IO_CONNECT]: function (state) {
    const app: any = getCurrentInstance()
    const socket = app.config.globalProperties.$socket
    // auto wired by socket.io-extended
    state.isConnected = true
    state.reconnectFailed = false
    state.clientId = socket.id
  },

  [SOCKET_IO_DISCONNECT]: function (state) {
    state.isConnected = false
    state.clientId = ''
  },

  [SOCKET_IO_RECONNECT_ATTEMPT]: function (state, attempt: number) {
    state.reconnectAttempts = attempt
  },

  [SOCKET_IO_RECONNECT_ATTEMPT]: function (state) {
    // reconnect_failed Fired when the client couldn’t reconnect within reconnectionAttempts
    state.reconnectFailed = true
  },

  [WS_ORDER_EVENT]: function (state, payload: IOrderEventPayload) {
    state.orderEvents.push(payload)
  }
})

const actions = actionTree({ state, getters, mutations }, {
  async fetchNotifications ({ commit }) {
    try {
      const res = await notificationsService.fetchAll()
      commit('setNotification', res.data)
      return res
    } catch (error) {
      appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
    }
  },

  openWebsocketConnection ({ commit, rootGetters }) {
    const app: any = getCurrentInstance()
    const socket = app.appContext.config.globalProperties.$socket
    const token = rootGetters['auth/token']

    if (!token) {
      commit(WS_ABORT_CONNECTION)
      return
    }

    if (socket.connected) {
      commit(WS_ALREADY_CONNECTED)
    } else {
      socket.io.opts.transportOptions = {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      }
      socket.connect()
      commit(WS_CONNECTING)
    }

    socket.on(WS_ORDER_EVENT, (data: any) => {
      this.dispatch(`notifications/${ORDER_EVENT_ACTION}`, data)
    })

    socket.on(WS_PERFEES_EVENT, (data: any) => {
      this.dispatch(`algobots/${PERFEES_EVENT_ACTION}`, data)
      this.dispatch(`ubxtWallet/${PERFEES_EVENT_ACTION}`, data)
    })
  },

  closeWebsocketConnection ({ commit }) {
    const app: any = getCurrentInstance()
    const socket = app.appContext.config.globalProperties.$socket
    if (socket.disconnected) {
      commit(WS_ALREADY_DISCONNECTED)
    } else {
      socket.disconnect()
      commit(WS_DISCONNECTING)
    }
  },

  [ORDER_EVENT_ACTION] ({ dispatch, commit }, message: IOrderEventPayload) {
    if (message) {
      commit(WS_ORDER_EVENT, message)
      let eventText = `${message.exch} ${message.sbl} ${message.side} order ${message.status}`
      if (message.status === 'FILLED') {
        eventText += ` ${message.qExec} @ ${message.pExec}`
      } else if (message.status === 'NEW') {
        eventText += ` ${message.qOrig} @ ${message.pAsk}` // limit order do not have a pExec yet
      }

      if (message.status === 'ERROR') {
        appNotify({ type: 'error', message: eventText })
      } else if (message.status === 'FILLED' || message.status === 'NEW') {
        appNotify({ type: 'success', message: eventText })
      } else {
        appNotify({ type: 'warning', message: eventText })
      }
      dispatch('fetchNotifications')
    }
  }
})

export const notificationsStore = {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
