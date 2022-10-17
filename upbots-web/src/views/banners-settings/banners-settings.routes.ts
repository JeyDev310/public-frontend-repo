import { RouteRecordRaw } from 'vue-router'

const BannersSettings = () => import('./BannersSettings.vue' /* webpackChunkName: "BannersSettings" */)

export const bannersSettingsRouteNames = {
  banner: 'banner'
}

export const bannersSettingsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: bannersSettingsRouteNames.banner,
    component: BannersSettings
  }
]
