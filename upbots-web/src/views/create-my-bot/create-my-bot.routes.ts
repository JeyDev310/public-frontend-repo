import { RouteRecordRaw } from 'vue-router'

const CreateMyBot = () => import('../create-my-bot/CreateMyBot.vue' /* webpackChunkName: "CreateMyBot" */)

export const createMyBotRouteNames = {
  createMyBot: 'create-my-bot'
}

export const createMyBotRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: createMyBotRouteNames.createMyBot,
    component: CreateMyBot
  }
]
