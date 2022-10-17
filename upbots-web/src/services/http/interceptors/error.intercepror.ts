import { AxiosError } from 'axios'
import { router, routeNames } from '@/router'
import { vuex } from '@/store'
import { appNotify } from '@/components/stateless/notifications'

let invalidCredentials = false

export const errorInterceptor = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    if (vuex.auth.token) {
      invalidCredentials = true
    }

    vuex.auth.setToken(null)
    vuex.auth.setUser(null)

    router.push({ name: routeNames.login }).then(() => {
      if (invalidCredentials) {
        appNotify({ type: 'info', message: 'Your session has expired or is invalid, Please reconnect' }, true)
        invalidCredentials = false
      }
    })
  }

  // global error handler
  return Promise.reject(error)
}
