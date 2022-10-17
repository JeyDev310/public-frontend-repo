import { RouteRecordRaw } from 'vue-router'

const Trade = () => import('./Trade.vue')

export const tradeRouteNames = {
  manualTrade: 'manual-trade'
}

export const tradeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: tradeRouteNames.manualTrade,
    component: Trade
  }
]
