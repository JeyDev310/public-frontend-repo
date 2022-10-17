import { http } from '@/services'
import { IStakingBenefit } from '@/types'

class StakingService {
  getStakingStatus () {
    return http.get<IStakingBenefit>('/staking-level/status')
  }

  setStakingAmount (payload: { ubxtStakingAmount: number; walletAddress: string; }) {
    return http.put('/account/staking-amount', payload)
  }
}

export const stakingService = new StakingService()
