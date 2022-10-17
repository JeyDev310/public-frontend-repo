import { http } from './http'
import { ICoupons } from '@/types/user.types'
import { IPriceCoingecko } from '@/types/price/price.types'
import { IUserSettings } from '@/types/user/user-settings.types'

class UserService {
  activateUniqueCoupon (payload: string) {
    return http.post(`/coupons/activate/unique/${payload}`)
  }

  getUserCoupons () {
    return http.get<ICoupons[]>('/coupons/user')
  }

  getUserSettings () {
    return http.get<IUserSettings>('/usersettings')
  }

  updateUserSettings (payload: IUserSettings) {
    return http.put<boolean>('/usersettings/update/', payload)
  }

  getUserFavCurrencyRate (fsyms: string[], tsyms: string[]) {
    return http.get<IPriceCoingecko>('/price/coingecko', { params: { fsyms, tsyms } })
  }
}

export const userService = new UserService()
