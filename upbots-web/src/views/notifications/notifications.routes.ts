import { RouteRecordRaw } from 'vue-router'

const Notifications = () => import('./Notifications.vue' /* webpackChunkName: "Notifications" */)

export const notificationsRouteNames = {
  notifications: 'notifications'
}

export const notificationsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: notificationsRouteNames.notifications,
    component: Notifications
  }
]
