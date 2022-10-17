import { http } from '@/services'
import { IDexBalancesDto, IDexWallet, IDexAssetSummary, IDexAssetDto } from './dex.types'

class DexService {
  getBalance (addresses: string[], liveFetch: boolean) {
    return http.get<IDexBalancesDto>(`/dex-monitoring/balance?addresses=${addresses.join(',')}&liveFetch=${liveFetch}`)
  }

  getWallets () {
    return http.get<IDexWallet[]>('/dex-monitoring/wallet')
  }

  upDateWallets (wallet: IDexWallet) {
    return http.put('/dex-monitoring/wallet', [wallet])
  }

  updateAssetSummary (previousAssets: IDexAssetSummary[]) {
    return http.post<IDexAssetDto[]>('/dex-monitoring/evolution', previousAssets)
  }

  deleteWallet (wallet: IDexWallet) {
    return http.delete('/dex-monitoring/wallet', { params: { address: wallet.address } })
  }
}

export const dexService = new DexService()
