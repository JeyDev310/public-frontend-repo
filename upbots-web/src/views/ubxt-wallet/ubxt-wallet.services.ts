import { http } from '@/services'
import { IAlgoBotStats, IUserTransaction } from '@/types'

class UBXTWalletService {
  getUserBotsStats () {
    return http.get<IAlgoBotStats[]>('/performance/user-bots-stats')
  }

  userWalletTransfer (payload: any) {
    return http.post('/perfees/user-wallet-transfer', payload)
  }

  getUserTransactions () {
    return http.get<IUserTransaction[]>('/perfees/user-transactions')
  }
}

export const ubxtWalletService = new UBXTWalletService()
