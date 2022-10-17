import { authRouteNames } from '@/views/auth/auth.routes' /* AUTH */
import { introductionRouteNames } from '@/views/introduction/introduction.routes' /* INTRODUCTION */
import { homeRouteNames } from '@/views/home/home.routes' /* HOME */
import { portfolioRouteNames } from '@/views/portfolio/portfolio.routes' /* PORTFOLIO */
import { algobotsRouteNames } from '@/views/algobots/algobots.routes' /* ALGOBOTS */
import { algobotsActiveRouteNames } from '@/views/algobots-active/algobots-active.routes' /* ALGO ACTIVE BOTS */
import { createMyBotRouteNames } from '@/views/create-my-bot/create-my-bot.routes' /* CREATE MY BOT */
import { myBotDetailedRouteNames } from '@/views/my-bot-detailed/my-bot-detailed.routes' /* MY BOT DETAILED */
import { myTradesRouteNames } from '@/views/my-trades/my-trades.routes' /* MY TRADES */
import { tradeRouteNames } from '@/views/trade/trade.routes' /* TRADE */
import { stakingRouteNames } from '@/views/staking/staking.routes' /* STAKING */
import { ubxtWalletRouteNames } from '@/views/ubxt-wallet/ubxt-wallet.routes' /* UBXT WALLET */
import { ubxtBridgeRouteNames } from '@/views/ubxt-bridge/ubxt-bridge.routes' /* UBXT BRIDGE */
import { comingSoonRouteNames } from '@/views/coming-soon/coming-soon.routes' /* COMING SOON */
import { profileRouteNames } from '@/views/profile/profile.routes' /* PROFILE */
import { keysRouteNames } from '@/views/keys/keys.routes' /* KEYS  */
import { notificationsRouteNames } from '@/views/notifications/notifications.routes' /* NOTIFICATIONS */
import { termsConditionsRouteNames } from '@/views/terms-conditions/terms-conditions.routes' /* TERMS */
import { privacyPolicyRouteNames } from '@/views/privacy-policy/privacy-policy.routes' /*  PRIVACY */
import { ubxtInfoRouteNames } from '@/views/ubxt-info/ubxt-info.routes' /* UBXT INFO */
import { buyUBXTRouteNames } from '@/views/buy-ubxt/buy-ubxt.routes' /* BUY UBXT */
import { referralRouteNames } from '@/views/referral/referral.routes' /* REFERRAL */
import { adminRouteNames } from '@/views/admin/admin.routes' /* ADMIN */
import { copyTradingRouteNames } from '@/views/copy-trading/copy-trading.routes' /* COPY TRADING */

// import { swapRouteNames } from '@/views/swap/swap.routes' /* SWAP */

/* COMING SOON ROUTES */
import { learningRouteNames } from '@/views/learning/learning.routes' /* LEARNING */
import { signalProvidersRouteNames } from '@/views/signal-providers/signal-providers.routes' /* SIGNAL PROVIDERS */

export const routeNames = {
  rootPage: 'rootPage',
  auth: 'auth',
  notFound: 'notFound',

  ...authRouteNames,
  ...introductionRouteNames,
  ...homeRouteNames,
  ...portfolioRouteNames,
  ...algobotsRouteNames,
  ...algobotsActiveRouteNames,
  ...tradeRouteNames,
  ...createMyBotRouteNames,
  ...myBotDetailedRouteNames,
  ...stakingRouteNames,
  ...ubxtWalletRouteNames,
  ...ubxtBridgeRouteNames,
  ...comingSoonRouteNames,
  ...profileRouteNames,
  ...keysRouteNames,
  ...notificationsRouteNames,
  ...termsConditionsRouteNames,
  ...privacyPolicyRouteNames,
  ...ubxtInfoRouteNames,
  ...buyUBXTRouteNames,
  ...referralRouteNames,
  ...myTradesRouteNames,
  ...learningRouteNames,
  ...copyTradingRouteNames,
  ...signalProvidersRouteNames,
  ...adminRouteNames
  // ...swapRouteNames,
}
