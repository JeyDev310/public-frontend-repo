
import { RouteRecordRaw } from 'vue-router'

const UBXTInfo = () => import('./UBXTInfo.vue' /* webpackChunkName: "UBXTInfo" */)

export const ubxtInfoRouteNames = {
  ubxtInfo: 'ubxt-info'
}

export const ubxtInfoRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: ubxtInfoRouteNames.ubxtInfo,
    component: UBXTInfo
  }
]
