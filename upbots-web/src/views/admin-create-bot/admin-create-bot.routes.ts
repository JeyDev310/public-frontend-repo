import { RouteRecordRaw } from 'vue-router'

const AdminCreateBot = () => import('./AdminCreateBot.vue' /* webpackChunkName: "AdminCreateBot" */)

export const adminCreateBotRouteNames = {
  adminCreateBot: 'admin-create-bot'
}

export const adminCreateBotRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: adminCreateBotRouteNames.adminCreateBot,
    component: AdminCreateBot
  }
]
