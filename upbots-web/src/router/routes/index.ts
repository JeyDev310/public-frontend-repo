import { RouteRecordRaw } from 'vue-router'

/* ROUTE NAMES */
import { routeNames } from '../index'

/* PAGES ROUTE */
import { authRoutes } from '@/views/auth/auth.routes' /* AUTH */
import { introductionRoutes } from '@/views/introduction/introduction.routes' /* INTRODUCTION */
import { homeRoutes } from '@/views/home/home.routes' /* HOME */
import { portfolioRoutes } from '@/views/portfolio/portfolio.routes' /* PORTFOLIO */
import { algobotsRoutes } from '@/views/algobots/algobots.routes' /* ALGOBOTS */
import { algobotsActiveRoutes } from '@/views/algobots-active/algobots-active.routes' /* ALGO ACTIVE BOTS */
import { createMyBotRoutes } from '@/views/create-my-bot/create-my-bot.routes' /* CREATE MY BOT */
import { myBotDetailedRoutes } from '@/views/my-bot-detailed/my-bot-detailed.routes' /* MY BOT DETAILED */
import { myTradesRoutes } from '@/views/my-trades/my-trades.routes' /* MY TRADES */
import { tradeRoutes } from '@/views/trade/trade.routes' /* TRADE */
import { stakingRoutes } from '@/views/staking/staking.routes' /* STAKING */
import { ubxtWalletRoutes } from '@/views/ubxt-wallet/ubxt-wallet.routes' /* UBXT WALLET */
import { ubxtBridgeRoutes } from '@/views/ubxt-bridge/ubxt-bridge.routes' /* UBXT BRIDGE */
import { comingSoonRoutes } from '@/views/coming-soon/coming-soon.routes'
import { profileRoutes } from '@/views/profile/profile.routes' /* PROFILE */
import { keysRoutes } from '@/views/keys/keys.routes' /* KEYS */
import { notificationsRoutes } from '@/views/notifications/notifications.routes' /* NOTIFICATIONS */
import { ubxtInfoRoutes } from '@/views/ubxt-info/ubxt-info.routes' /* UBXT INFO */
import { buyUBXTRoutes } from '@/views/buy-ubxt/buy-ubxt.routes' /* BUY UBXT */
import { referralRoutes } from '@/views/referral/referral.routes' /* REFERRAL */
import { termsConditionsRoutes } from '@/views/terms-conditions/terms-conditions.routes' /* TERMS */
import { privacyPolicyRoutes } from '@/views/privacy-policy/privacy-policy.routes' /* PRIVACY */
import { playgroundRoutes } from '@/playground/playground.routes' /* PLAYGROUND */
import { bannersSettingsRoutes } from '@/views/banners-settings/banners-settings.routes' /* BANNERS SETTINGS */
import { adminCreateBotRoutes } from '@/views/admin-create-bot/admin-create-bot.routes' /* ADMIN CREATE BOT */
import { adminRoutes } from '@/views/admin/admin.routes' /* ADMIND */
import { copyTradingRoutes } from '@/views/copy-trading/copy-trading.routes' /* COPY TRADING */

// import { swapRoutes } from '@/views/swap/swap.routes' /* SWAP */

/* COMING SOON PAGES */
import { learningRoutes } from '@/views/learning/learning.routes' /* LEARNING */
import { signalProvidersRoutes } from '@/views/signal-providers/signal-providers.routes' /* SIGNAL PROVIDERS */

/* LAYOUTS */
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')
const NotFoundLayout = () => import('@/layouts/NotFoundLayout.vue')
const EmptyLayout = () => import('@/layouts/EmptyLayout.vue')

/* EXPORT ALL ROUTES */
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: routeNames.auth,
    redirect: { name: routeNames.login },
    component: AuthLayout,
    children: authRoutes
  },

  {
    path: '/introduction',
    redirect: { name: routeNames.introduction },
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: introductionRoutes
  },

  {
    path: '/',
    redirect: { name: routeNames.home },
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: homeRoutes
  },

  {
    path: '/portfolio',
    meta: { requiresAuth: true },
    redirect: { name: routeNames.portfolioSummary },
    component: DefaultLayout,
    children: portfolioRoutes
  },

  {
    path: '/algo-bots',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: algobotsRoutes
  },

  {
    path: '/my-active-bots',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: algobotsActiveRoutes
  },

  {
    path: '/manual-trade',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: tradeRoutes
  },

  {
    path: '/staking',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: stakingRoutes
  },

  {
    path: '/ubxt-wallet',
    meta: { requiresAuth: true },
    redirect: { name: routeNames.ubxtBalance },
    component: DefaultLayout,
    children: ubxtWalletRoutes
  },

  {
    path: '/ubxt-bridge',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: ubxtBridgeRoutes
  },

  {
    path: '/coming-soon',
    component: DefaultLayout,
    children: comingSoonRoutes
  },

  {
    path: '/profile',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: profileRoutes
  },

  {
    path: '/keys',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: keysRoutes
  },

  {
    path: '/notifications',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: notificationsRoutes
  },

  {
    path: '/ubxt-info',
    component: DefaultLayout,
    children: ubxtInfoRoutes
  },

  {
    path: '/buy-ubxt',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: buyUBXTRoutes
  },

  {
    path: '/referral',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: referralRoutes
  },

  {
    path: '/terms-conditions',
    component: EmptyLayout,
    children: termsConditionsRoutes
  },

  {
    path: '/privacy-policy',
    component: EmptyLayout,
    children: privacyPolicyRoutes
  },

  {
    path: '/create-my-bot',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: createMyBotRoutes
  },

  {
    path: '/my-bot',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: myBotDetailedRoutes
  },

  {
    path: '/learning',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: learningRoutes
  },

  {
    path: '/copy-trading',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: copyTradingRoutes
  },

  {
    path: '/signal-providers',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: signalProvidersRoutes
  },

  {
    path: '/my-trades',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: myTradesRoutes
  },

  {
    path: '/admin',
    meta: { requiresAuth: true, requiresAdmin: true },
    component: DefaultLayout,
    children: adminRoutes
  },

  {
    path: '/banners-settings',
    meta: { requiresAuth: true, requiresAdmin: true },
    component: DefaultLayout,
    children: bannersSettingsRoutes
  },

  {
    path: '/admin-create-bot',
    meta: { requiresAuth: true, requiresAdmin: true },
    component: DefaultLayout,
    children: adminCreateBotRoutes
  },

  ...playgroundRoutes,

  {
    path: '/:pathMatch(.*)*',
    name: routeNames.notFound,
    meta: { requiresAuth: true },
    component: NotFoundLayout
  }

  // {
  //   path: '/swap',
  //   meta: { requiresAuth: true },
  //   component: DefaultLayout,
  //   children: swapRoutes
  // },
]
