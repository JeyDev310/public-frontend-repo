import { http } from '@/services'
import { TEditKey, TCreateKey, IKey } from '@/types'

class KeysService {
  get () {
    return http.get<IKey[]>('/keys')
  }

  update (payload: TEditKey) {
    return http.put<TEditKey>('/keys', payload)
  }

  delete (id: string) {
    return http.delete<string>(`/keys/${id}`)
  }

  add (payload: TCreateKey) {
    return http.post<TCreateKey>('/keys', payload)
  }
}

export const keysService = new KeysService()
