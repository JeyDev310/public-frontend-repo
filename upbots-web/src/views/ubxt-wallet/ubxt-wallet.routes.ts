import { RouteRecordRaw } from 'vue-router'

const UBXTWallet = () => import('@/views/ubxt-wallet/UBXTWallet.vue' /* webpackChunkName: "UBXTWallet" */)

export const ubxtWalletRouteNames = {
  ubxtWallet: 'ubxt-wallet',
  ubxtBalance: 'balance',
  devMode: 'dev-mode'
}

export const ubxtWalletRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: ubxtWalletRouteNames.ubxtWallet,
    component: UBXTWallet
  },
  {
    path: 'balance',
    name: ubxtWalletRouteNames.ubxtBalance,
    component: UBXTWallet
  },
  {
    path: 'dev-mode',
    name: ubxtWalletRouteNames.devMode,
    component: UBXTWallet
  }
]
