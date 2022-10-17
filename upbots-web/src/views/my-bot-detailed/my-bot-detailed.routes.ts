import { RouteRecordRaw } from 'vue-router'

const MyBotDetailed = () => import('./MyBotDetailed.vue' /* webpackChunkName: "MyBotDetailed" */)

export const myBotDetailedRouteNames = {
  myBot: 'my-bot',
  myBotDetailed: 'my-bot-detailed'
}

export const myBotDetailedRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: myBotDetailedRouteNames.myBot,
    component: MyBotDetailed
  },
  {
    path: ':id',
    name: myBotDetailedRouteNames.myBotDetailed,
    component: MyBotDetailed
  }
]
