import { RouteRecordRaw } from 'vue-router'

const Keys = () => import('./Keys.vue' /* webpackChunkName: "Keys" */)

export const keysRouteNames = {
  keys: 'keys'
}

export const keysRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: keysRouteNames.keys,
    component: Keys
  }
]
