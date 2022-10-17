import { RouteRecordRaw } from 'vue-router'

const Swap = () => import('@/views/swap/Swap.vue' /* webpackChunkName: "Swap" */)

export const swapRouteNames = {
  swap: 'swap'
}

export const swapRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: swapRouteNames.swap,
    component: Swap
  }
]
