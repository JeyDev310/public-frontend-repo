import { RouteRecordRaw } from 'vue-router'

const Referral = () => import('@/views/referral/Referral.vue' /* webpackChunkName: "Referral" */)

export const referralRouteNames = {
  referral: 'referral'
}

export const referralRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: referralRouteNames.referral,
    component: Referral
  }
]
