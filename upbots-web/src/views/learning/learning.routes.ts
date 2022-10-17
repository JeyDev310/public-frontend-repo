
import { RouteRecordRaw } from 'vue-router'

const Learning = () => import('./Learning.vue' /* webpackChunkName: "Learning" */)

export const learningRouteNames = {
  learning: 'learning'
}

export const learningRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: learningRouteNames.learning,
    component: Learning
  }
]
