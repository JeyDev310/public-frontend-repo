import { RouteRecordRaw } from 'vue-router'

const Home = () => import('./Home.vue' /* webpackChunkName: "Home" */)

export const homeRouteNames = {
  home: 'rootPage'
}

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: 'home',
    name: homeRouteNames.home,
    component: Home
  }
]
