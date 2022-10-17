import { RouteRecordRaw } from 'vue-router'

const Portfolio = () => import('./Portfolio.vue' /* webpackChunkName: "Portfolio" */)

export const portfolioRouteNames = {
  portfolio: 'portfolio',
  portfolioSummary: 'portfolioSummary',
  portfolioCexs: 'portfolioCexs',
  portfolioEth: 'portfolioEth'
}

export const portfolioRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: portfolioRouteNames.portfolio,
    component: Portfolio
  },
  {
    path: 'summary',
    name: portfolioRouteNames.portfolioSummary,
    component: Portfolio
  },
  {
    path: 'cexs',
    name: portfolioRouteNames.portfolioCexs,
    component: Portfolio
  },
  {
    path: 'eth',
    name: portfolioRouteNames.portfolioEth,
    component: Portfolio
  }
]
