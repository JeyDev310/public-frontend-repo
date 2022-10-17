import { RouteRecordRaw } from 'vue-router'

const Profile = () => import('./Profile.vue' /* webpackChunkName: "Profile" */)

export const profileRouteNames = {
  profile: 'profile'
}

export const profileRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: profileRouteNames.profile,
    component: Profile
  }
]
