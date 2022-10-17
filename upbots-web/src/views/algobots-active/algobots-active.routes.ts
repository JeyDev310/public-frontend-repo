import { RouteRecordRaw } from 'vue-router'

const MyActiveBots = () => import('@/views/algobots-active/MyActiveBots.vue' /* webpackChunkName: "MyActiveBots" */)

export const algobotsActiveRouteNames = {
  myActiveBots: 'my-active-bots'
}

export const algobotsActiveRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: algobotsActiveRouteNames.myActiveBots,
    component: MyActiveBots
  }
]
