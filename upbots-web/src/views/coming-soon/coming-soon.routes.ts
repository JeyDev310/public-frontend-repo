import { RouteRecordRaw } from 'vue-router'

const ComingSoon = () => import('./ComingSoon.vue' /* webpackChunkName: "ComingSoon" */)

export const comingSoonRouteNames = {
  comingSoon: 'coming-soon'
}

export const comingSoonRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: comingSoonRouteNames.comingSoon,
    component: ComingSoon
  }
]
