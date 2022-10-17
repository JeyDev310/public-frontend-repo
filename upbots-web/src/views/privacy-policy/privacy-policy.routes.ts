import { RouteRecordRaw } from 'vue-router'

const PrivacyPolicy = () => import('@/views/privacy-policy/PrivacyPolicy.vue' /* webpackChunkName: "PrivacyPolicy" */)

export const privacyPolicyRouteNames = {
  privacyPolicy: 'privacy-policy'
}

export const privacyPolicyRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: privacyPolicyRouteNames.privacyPolicy,
    component: PrivacyPolicy
  }
]
