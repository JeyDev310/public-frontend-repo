import { http } from './http'
import { IChangePassword, IUpdateUserData, IUser } from '@/types'

class AccountService {
  getAccountInfo () {
    return http.get<IUser>('/account/user')
  }

  updatePassword (payload: IChangePassword) {
    return http.put<IChangePassword>('/account/password', payload)
  }

  updateAccount (payload: IUser) {
    return http.put<{ user: IUpdateUserData; }>('/account/update', payload)
  }

  updateAvatar (payload: any) {
    return http.post('/account/picture', payload)
  }
}

export const accountService = new AccountService()
