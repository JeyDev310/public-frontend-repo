import { createStore } from 'vuex'
import { useAccessor } from 'typed-vuex'

import { authStore, notificationsStore, ubxtBridgeStore } from './modules'
import { algobotsStore } from '@/views/algobots/algobots.store'
import { homeStore } from '@/views/home/home.store'
import { cexStore } from '@/views/portfolio/store/cex/cex.store'
import { dexStore } from '@/views/portfolio/store/dex/dex.store'
import { ubxtWalletStore } from '@/views/ubxt-wallet/ubxt-wallet.store'
import { stakingStore } from '@/views/staking/staking.store'
import { referralStore } from '@/views/referral/referral.store'
import { adminStore } from '@/views/admin/admin.store'

const storePattern = {
  modules: {
    auth: authStore,
    notifications: notificationsStore,
    algobots: algobotsStore,
    home: homeStore,
    cex: cexStore,
    dex: dexStore,
    ubxtWallet: ubxtWalletStore,
    ubxtBridge: ubxtBridgeStore,
    staking: stakingStore,
    referral: referralStore,
    admin: adminStore
  }
}

export const store = createStore(storePattern)
export const vuex = useAccessor(store, storePattern)
