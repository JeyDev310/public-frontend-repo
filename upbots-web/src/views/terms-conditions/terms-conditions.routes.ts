import { RouteRecordRaw } from 'vue-router'

const TermsConditions = () => import('@/views/terms-conditions/TermsConditions.vue' /* webpackChunkName: "TermsConditions" */)

export const termsConditionsRouteNames = {
  termsConditions: 'terms-conditions'
}

export const termsConditionsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: termsConditionsRouteNames.termsConditions,
    component: TermsConditions
  }
]
