import { RouteRecordRaw } from 'vue-router'

const MyTrades = () => import('@/views/my-trades/MyTrades.vue' /* webpackChunkName: "MyTrades" */)

export const myTradesRouteNames = {
  myTrades: 'my-trades'
}

export const myTradesRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: myTradesRouteNames.myTrades,
    component: MyTrades
  }
]
