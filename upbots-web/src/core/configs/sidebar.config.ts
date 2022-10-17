import { routeNames } from '@/router'
import { TSidebar } from '@/types'

const sidebarNav: TSidebar[] = [
  {
    route: routeNames.introduction,
    label: 'Get Started',
    icon: 'intro',
    isComingSoon: false,
    exact: true,
    isMobilePreview: true
  },
  {
    route: routeNames.home,
    label: 'Dashboard',
    icon: 'dashboard',
    isComingSoon: false,
    exact: true,
    isMobilePreview: true
  },
  {
    route: routeNames.portfolio,
    label: 'Portfolio Monitoring',
    icon: 'portfolio',
    isComingSoon: false,
    exact: false,
    isMobilePreview: true
  },
  {
    route: routeNames.algoBots,
    label: 'Algo Rental',
    icon: 'algo-bots-active',
    isComingSoon: false,
    exact: false,
    isMobilePreview: true
  },
  {
    route: routeNames.myActiveBots,
    label: 'My Active Bots',
    icon: 'algo-bots',
    isComingSoon: false,
    exact: false,
    isMobilePreview: true
  },
  {
    route: routeNames.createMyBot,
    label: 'Create My Bot',
    isBeta: true,
    betaLabel: 'Create My Bot (beta)',
    icon: 'create-bot',
    isComingSoon: false,
    exact: false,
    isMobilePreview: true
  },
  {
    route: routeNames.copyTrading,
    label: 'Copy Trading',
    icon: 'algo-bots',
    isComingSoon: false,
    exact: false,
    isMobilePreview: true
  },
  {
    route: routeNames.myTrades,
    label: 'My Trades',
    icon: 'my-trade',
    isComingSoon: false,
    exact: false,
    isMobilePreview: false
  },
  {
    route: routeNames.manualTrade,
    label: 'Manual Trade',
    icon: 'manual-trade',
    isComingSoon: false,
    exact: false,
    isMobilePreview: true
  },
  {
    route: routeNames.staking,
    label: 'Staking',
    icon: 'staking',
    isComingSoon: false,
    exact: false,
    isMobilePreview: false
  },
  {
    route: routeNames.ubxtBridge,
    label: 'UBXT Bridge',
    icon: 'infinite',
    isComingSoon: false,
    exact: false,
    isMobilePreview: false
  },
  {
    route: routeNames.ubxtWallet,
    label: 'UBXT Wallet',
    icon: 'ubxt-wallets',
    isComingSoon: false,
    exact: false,
    isMobilePreview: false
  },
  {
    route: routeNames.comingSoon,
    label: 'Upcoming Features',
    icon: 'clock',
    isComingSoon: true,
    exact: false,
    isMobilePreview: false
  }
  // {
  //   route: routeNames.swap,
  //   label: 'Swap',
  //   icon: 'swap',
  //   isComingSoon: false,
  //   exact: false,
  //   isMobilePreview: false
  // },
]

export const availableRoutes = sidebarNav.filter(navItem => !navItem.isComingSoon)
export const notAvailableRoutes = sidebarNav.filter(navItem => navItem.isComingSoon)
export const mobileMenu = sidebarNav.filter(navItem => navItem.isMobilePreview)
