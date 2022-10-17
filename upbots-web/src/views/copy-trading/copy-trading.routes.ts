import { RouteRecordRaw } from 'vue-router'

const CopyTrading = () => import('./CopyTrading.vue' /* webpackChunkName: "CopyTrading" */)

export const copyTradingRouteNames = {
  copyTrading: 'copy-trading'
}

export const copyTradingRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: copyTradingRouteNames.copyTrading,
    component: CopyTrading
  }
]
