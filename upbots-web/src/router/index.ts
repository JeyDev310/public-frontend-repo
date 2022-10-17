import { createRouter, createWebHistory, onBeforeRouteUpdate, useRoute } from 'vue-router'

import { routeNames } from './route-names'
import { routeGuard } from './route-guard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(routeGuard)

export {
  router,
  routes,
  routeNames,
  onBeforeRouteUpdate,
  useRoute
}
