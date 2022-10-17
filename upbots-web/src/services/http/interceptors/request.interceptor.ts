import { AxiosRequestConfig } from 'axios'
import { vuex } from '@/store'

export const requestInterceptor = async (requestConfig: AxiosRequestConfig) => {
  requestConfig.headers.Authorization = `Bearer ${vuex.auth.token}`

  return requestConfig
}
