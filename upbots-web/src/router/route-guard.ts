import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { vuex } from '@/store'
import { routeNames } from '@/router'

export const routeGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  /* matched routes which has "requiresAuth" */
  if (to.matched.some((record) => record.meta?.requiresAuth)) {
    /* redirect the user to LOGIN if not matched */
    if (!vuex.auth.isAuthenticated || !vuex.auth.user) {
      next({ name: routeNames.login })
    } else {
      if (to.matched.some((record) => record.meta?.requiresAdmin)) {
        /* if user no ADMIN deny acceess */
        if (!vuex.auth.isAdmin) {
          next({ name: routeNames.rootPage })
        } else {
          next()
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
}
