import { RouteRecordRaw } from 'vue-router'

const Playground = () => import('./Playground.vue' /* webpackChunkName: "Playground" */)

const context = require.context('@/playground/elements', true, /\.vue$/)

export const playgroundElementRoutes: Array<RouteRecordRaw | any> = context.keys().map(context).map((m: any) => {
  return m?.default.name ? {
    path: m.default.name.toLowerCase(),
    name: m.default.name,
    component: m.default
  } : null
}).filter(r => r)

export const playgroundRouteNames = {
  playground: 'playground'
}

export const playgroundRoutes: RouteRecordRaw[] = [
  {
    path: '/playground',
    name: playgroundRouteNames.playground,
    meta: { requiresAuth: true },
    component: Playground,
    children: playgroundElementRoutes
  }
]
