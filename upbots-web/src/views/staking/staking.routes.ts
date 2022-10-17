
import { RouteRecordRaw } from 'vue-router'

const Staking = () => import('./Staking.vue' /* webpackChunkName: "Staking" */)
const UbxtBscStaking = () => import('./components/staking-pages/UbxtBscStaking.vue' /* webpackChunkName: "UbxtBscStaking" */)
const UbxtBusdLpStaking = () => import('./components/staking-pages/UbxtBusdLpStaking.vue' /* webpackChunkName: "UbxtBusdLpStaking" */)
const UbxtEthLpStaking = () => import('./components/staking-pages/UbxtEthLpStaking.vue' /* webpackChunkName: "UbxtEthLpStaking" */)
const UbxtStaking = () => import('./components/staking-pages/UbxtStaking.vue' /* webpackChunkName: "UbxtStaking" */)
const UbxtVault = () => import('./components/staking-pages/UbxtVault.vue' /* webpackChunkName: "UbxtVault" */)
const UBXTStakingReward = () => import('./components/staking-pages/UBXTStakingReward.vue' /* webpackChunkName: "UBXTStakingReward" */)

export const stakingRouteNames = {
  staking: 'staking',
  bscStaking: 'ubxt-bsc-staking',
  busdLpStaking: 'ubxt-busd-lp-staking',
  ethLpStaking: 'ubxt-eth-lp-staking',
  ubxtStaking: 'ubxt-staking',
  ubxtVaultStaking: 'ubxt-vault',
  ubxtStakingReward: 'ubxt-staking-reward'
}

export const stakingRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: stakingRouteNames.staking,
    component: Staking
  },
  {
    path: '/ubxt-bsc-staking',
    name: stakingRouteNames.bscStaking,
    component: UbxtBscStaking
  },
  {
    path: '/ubxt-busd-lp-staking',
    name: stakingRouteNames.busdLpStaking,
    component: UbxtBusdLpStaking
  },
  {
    path: '/ubxt-eth-lp-staking',
    name: stakingRouteNames.ethLpStaking,
    component: UbxtEthLpStaking
  },
  {
    path: '/ubxt-staking',
    name: stakingRouteNames.ubxtStaking,
    component: UbxtStaking
  },
  {
    path: '/ubxt-vault',
    name: stakingRouteNames.ubxtVaultStaking,
    component: UbxtVault
  },
  {
    path: '/ubxt-staking-reward',
    name: stakingRouteNames.ubxtStakingReward,
    component: UBXTStakingReward
  }
]
