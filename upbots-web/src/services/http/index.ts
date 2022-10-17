import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  requestInterceptor,
  responseInterceptor,
  errorInterceptor
} from '@/services/http/interceptors'
import { TIndexedObject } from '@/types'

class HttpService {
  readonly apiUrl: string
  private axios = {} as AxiosInstance

  constructor (apiUrl: string) {
    this.apiUrl = apiUrl
    this.createAxiosInstance()
    this.registerInterceptors()
  }

  get<T> (url: string, config?: AxiosRequestConfig) {
    // TODO: Use Axios GET in the staking page
    if (url.includes('s.belt.fi')) {
      return this.axios.get<T>(url, config)
    }
    return this.axios.get<T>(this.apiUrl + url, config)
  }

  put<T> (url: string, payload?: TIndexedObject, config?: AxiosRequestConfig) {
    return this.axios.put<T>(this.apiUrl + url, payload, config)
  }

  post<T> (url: string, payload?: TIndexedObject, config?: AxiosRequestConfig) {
    return this.axios.post<T>(this.apiUrl + url, payload, config)
  }

  patch<T> (url: string, payload: TIndexedObject, config?: AxiosRequestConfig) {
    return this.axios.patch<T>(this.apiUrl + url, payload, config)
  }

  delete<T> (url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(this.apiUrl + url, config)
  }

  private createAxiosInstance () {
    this.axios = axios.create()
  }

  private registerInterceptors () {
    this.axios.interceptors.response.use(
      (res: AxiosResponse) => responseInterceptor(res),
      (err: AxiosError) => errorInterceptor(err)
    )

    this.axios.interceptors.request.use(requestInterceptor)
  }
}

export const http = new HttpService(process.env.VUE_APP_ROOT_API as string + '/api')
