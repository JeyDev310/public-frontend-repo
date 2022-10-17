import { RouteRecordRaw } from 'vue-router'

const BuyUBXT = () => import('@/views/buy-ubxt/BuyUBXT.vue' /* webpackChunkName: "BuyUBXT" */)

export const buyUBXTRouteNames = {
  buyUBXT: 'buy-ubxt'
}

export const buyUBXTRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: buyUBXTRouteNames.buyUBXT,
    component: BuyUBXT
  }
]
