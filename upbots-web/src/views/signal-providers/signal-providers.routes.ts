import { RouteRecordRaw } from 'vue-router'

const SignalProviders = () => import('./SignalProviders.vue' /* webpackChunkName: "SignalProviders" */)

export const signalProvidersRouteNames = {
  signalProviders: 'signal-providers'
}

export const signalProvidersRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: signalProvidersRouteNames.signalProviders,
    component: SignalProviders
  }
]
