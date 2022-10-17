import { RouteRecordRaw } from 'vue-router'

const Admin = () => import('./Admin.vue' /* webpackChunkName: "Admin" */)

export const adminRouteNames = {
  admin: 'admin'
}

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: adminRouteNames.admin,
    component: Admin
  }
]
