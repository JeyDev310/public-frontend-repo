import { http } from '@/services'
class ReferralService {
  getReferralLinkUrl (ref: string, userName: string) {
    const originURL = window.location.origin
    return originURL + `/auth/register?ref=${ref}&userName=${userName}`
  }

  getUserReferral () {
    return http.get<any>('/perfees/user-referral')
  }

  getUserReferees () {
    return http.get<any>('/perfees/user-referees')
  }

  getReferralTransactions () {
    return http.get<any>('/perfees/referral-transactions')
  }
}

export const referralService = new ReferralService()
