import { RouteRecordRaw } from 'vue-router'

const Introduction = () => import('./Introduction.vue' /* webpackChunkName: "Introduction" */)

export const introductionRouteNames = {
  introduction: 'introduction'
}

export const introductionRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: introductionRouteNames.introduction,
    component: Introduction
  }
]
