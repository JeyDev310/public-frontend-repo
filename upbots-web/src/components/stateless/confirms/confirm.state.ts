import { ref } from 'vue'
import { IConfirm, IConfirmRaw } from './confirm.types'

export const list = ref<IConfirm[]>([])

export function appConfirm (payload: IConfirmRaw | string): Promise<boolean> {
  return new Promise((resolve) => {
    const actionsName = ['Cancel', 'Ok']
    const confirm = {} as IConfirm

    confirm.id = Date.now()
    confirm.resolve = resolve

    if (typeof payload === 'string') {
      confirm.title = payload
      confirm.actionsName = actionsName
    } else {
      confirm.title = payload.title
      confirm.body = payload.body
      confirm.actionsName = payload.actionsName || actionsName
    }

    list.value.push(confirm as IConfirm)
  })
}

export function removeById (nId: number) {
  list.value = list.value.filter(({ id }) => id !== nId)
}
