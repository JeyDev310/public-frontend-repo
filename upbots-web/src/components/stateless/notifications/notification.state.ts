import { ref } from 'vue'
import { IAppNotification } from './notification.types'
import { vuex } from '@/store'

export const list = ref<IAppNotification[]>([])

export function appNotify (a: IAppNotification, noAuth = false) {
  if (vuex.auth.token || noAuth) {
    a.id = Date.now()
    list.value.push(a)
  }
}

export function removeById (nId: number) {
  list.value = list.value.filter(({ id }) => id !== nId)
}
