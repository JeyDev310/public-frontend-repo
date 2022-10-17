import { RouteRecordRaw } from 'vue-router'

const UbxtBridge = () => import('./UbxtBridge.vue')

export const ubxtBridgeRouteNames = {
  ubxtBridge: 'ubxt-bridge'
}

export const ubxtBridgeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: ubxtBridgeRouteNames.ubxtBridge,
    component: UbxtBridge
  }
]
