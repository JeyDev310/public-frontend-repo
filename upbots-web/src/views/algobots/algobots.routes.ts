import { RouteRecordRaw } from 'vue-router'

const AlgoBots = () => import('./AlgoBots.vue' /* webpackChunkName: "AlgoBots" */)
const AlgoBotDetailed = () => import('./AlgoBotDetailed.vue' /* webpackChunkName: "AlgoBotDetailed" */)

export const algobotsRouteNames = {
  algoBots: 'algo-bots',
  algoBotDetailed: 'algo-bot-detailed',
  algoBotDetailedReviews: 'algo-bot-detailed-reviews'
}

export const algobotsRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: algobotsRouteNames.algoBots,
    component: AlgoBots
  },
  {
    path: ':id',
    name: algobotsRouteNames.algoBotDetailed,
    component: AlgoBotDetailed
  },
  {
    path: ':id/review',
    name: algobotsRouteNames.algoBotDetailedReviews,
    component: AlgoBotDetailed
  }
]
