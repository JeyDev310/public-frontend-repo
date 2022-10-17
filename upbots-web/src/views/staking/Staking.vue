<template>
  <div class="flex flex-col flex-grow w-full mt-10 overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Staking</h2>
    </Portal>

    <!-- WALLET BUTTON -->
    <Portal to="h-two">
      <StakingWallet
        :connectedWallet="connectedWallet"
        :onWalletConnected="onWalletConnected"
        :isIncorrectNetwork="isIncorrectNetwork"
      />
    </Portal>

    <!-- TAB -->
    <div class="staking__crypto-currency-buttons flex flex-shrink-0 self-center w-full mb-20 md:mb-30 px-12">
      <AppButtonsGroup
        v-model="configTab"
        :options="configTabs"
        type="filled"
        width="100%"
        class="w-full"
        @change="handleTabChange"
      />
    </div>

    <!-- CONTENT -->
    <div class="flex flex-col w-full overflow-y-auto custom-scrollbar">
      <!-- SUMMARY -->
      <div
        class="
        flex
        flex-col
        md:flex-row
        md:items-center
        justify-center
        space-y-20
        mt-20
        md:space-x-20
        4xl:space-x-24
        md:space-y-0
        "
      >
        <StakingSummaryCard
          v-for="(item, index) in summaryData"
          :key="index"
          :data="item"
          :configTab="configTab"
          class="staking__summary-card w-full"
        />
      </div>

      <!-- DETAIL CARDS -->
      <div
        class="
        flex
        flex-col
        lg:flex-row
        items-center
        lg:items-stretch
        lg:justify-center
        space-y-40
        lg:space-y-0
        lg:space-x-20
        4xl:space-x-24
        mt-40
        "
      >
        <StakingMainCard
          v-for="(item, index) in stakingCardData
            .filter((card) => configTab !== 'eth' || card.pages.bsc !== '/ubxt-vault')"
          :key="index"
          :data="item"
          :configTab="configTab"
        />
      </div>

      <!-- STAKING BENEFIT -->
      <StakingBenefit />

      <!-- FOOTER -->
      <StakingFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

// eslint-disable-next-line import/no-named-default
import { default as Web3 } from 'web3'

import { routeNames } from '@/router'

import { useWindowSize } from '@vueuse/core'

import { formatNumber } from '@/core/helpers'

import { vuex } from '@/store'
import { http, localStorageService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'

import { useWeb3 } from '@/global-setup/web3/web3.composition.setup'

import StakingSummaryCard from './components/StakingSummaryCard.vue'
import StakingMainCard from './components/StakingMainCard.vue'
import StakingWallet from '@/views/staking/components/StakingWallet.vue'
import StakingFooter from '@/views/staking/components/StakingFooter.vue'
import StakingBenefit from '@/views/staking/components/StakingBenefit.vue'

import pairAbiFile from '@/utils/contract/abisushipair.json'
import bscPairAbiFile from '@/utils/contract/abicakepair.json'
import uniPairAbiFile from '@/utils/contract/abiunipair.json'
import bscStakingAbiFile from '@/utils/contract/abibscstaking.json'
import vaultAbiFile from '@/utils/contract/abivault.json'
import bscErc20AbiFile from '@/utils/contract/abibscubxt.json'
import stakingAbiFile from '@/utils/contract/abistaking.json'
import erc20AbiFile from '@/utils/contract/abiubxt.json'

const USDTETHPairAddress = process.env.VUE_APP_ETH_USDT_PAIR_ADDRESS
const UBXTPairAddress = process.env.VUE_APP_UBXT_PAIR_ADDRESS
const bscUBXTPairAddress = process.env.VUE_APP_BSC_UBXT_PAIR_ADDRESS
const bscStakingAddress = process.env.VUE_APP_BSC_STAKING_ADDRESS
const bscContractAddress = process.env.VUE_APP_BSC_UBXT_ADDRESS
const bscLpAddress = process.env.VUE_APP_BSC_LP_ADDRESS
const stakingAddress = process.env.VUE_APP_STAKING_ADDRESS
const ethLpAddress = process.env.VUE_APP_LP_ADDRESS
const contractAddress = process.env.VUE_APP_UBXT_ADDRESS
const vaultAddress = '0xeD1e97E62730E83F1d56459C9025eB88F7F1E576'

export default defineComponent({
  name: 'Staking',

  components: {
    StakingSummaryCard,
    StakingMainCard,
    StakingWallet,
    StakingFooter,
    StakingBenefit
  },

  /* REDIRECT TO 404 IF DAPP NOT DETECTED */
  beforeRouteEnter (to, from, next) {
    const { width } = useWindowSize()
    const { isDAppBrowser } = useWeb3()

    if (width.value <= 479) {
      if (!isDAppBrowser.value) {
        return next({ name: routeNames.notFound })
      }
    }
    next()
  },

  setup () {
    const pairAbi: any = pairAbiFile
    const bscPairAbi: any = bscPairAbiFile
    const uniPairAbi: any = uniPairAbiFile
    const bscStakingAbi: any = bscStakingAbiFile
    const vaultAbi: any = vaultAbiFile
    const bscErc20Abi: any = bscErc20AbiFile
    const stakingAbi: any = stakingAbiFile
    const erc20Abi: any = erc20AbiFile

    const connectedWallet = ref('')
    const web3Modal = ref<any>(null)
    const networkId = ref(1)
    const finalPriceUbxt = ref(0)
    const bscUbxtStaked = ref(0)
    const bscLpStakedTotal = ref(0)
    const bscTotalLp = ref(0)
    const vaultUSDTStaked = ref(0)
    const bscFinalPriceUbxt = ref(0)
    const bscTotalUbxt = ref(0)
    const bscBalance = ref(0)
    const balance = ref(0)
    const ubxtBalance = ref(0)
    const bscUbxtBalance = ref(0)
    const bscTotalAllocPoint = ref(0)
    const bscTokenPerBlock = ref(0)
    const ubxtStaked = ref(0)
    const lpStakedTotal = ref(0)
    const totalLp = ref(0)
    const totalUbxt = ref(0)
    const totalAllocPoint = ref(0)
    const tokenPerBlock = ref(0)
    const farmAPY = ref(0)
    const lpFarmAPY = ref(0)
    const vaultFarmAPY = ref(0)
    const bscFarmAPY = ref(0)
    const bscLpFarmAPY = ref(0)

    const configTab = computed({
      get () {
        return vuex.staking.configTab as string
      },
      set (value: string) {
        return value
      }
    })

    const handleTabChange = (tab: string) => vuex.staking.updateConfigTab(tab)

    const isIncorrectNetwork = computed(() =>
      (configTab.value === 'eth' && networkId.value !== 1) || (configTab.value === 'bsc' && networkId.value !== 56))
    const web3 = ref<Web3 | null>(null)
    const configTabs = [
      { label: 'ETH', value: 'eth' },
      { label: 'BSC', value: 'bsc' }
    ]

    const summaryData = computed(() => [
      { title: 'Total Value Locked', value: configTab.value === 'eth' ? balance.value : bscBalance.value, type: 'currency', usdValue: -1 },
      { title: 'UBXT Price', value: configTab.value === 'eth' ? finalPriceUbxt.value : bscFinalPriceUbxt.value, type: 'currency', usdValue: -1 },
      { title: 'My UBXT Balance', value: configTab.value === 'eth' ? ubxtBalance.value : bscUbxtBalance.value, type: '', usdValue: configTab.value === 'eth' ? formatNumber(ubxtBalance.value * finalPriceUbxt.value) : formatNumber(bscUbxtBalance.value * bscFinalPriceUbxt.value) }
    ])

    const aprToApy = (val: number) => 100 * (Math.pow(1 + val / 36500, 365) - 1)

    const stakingCardData = computed(() => [
      {
        title: 'UBXT Staking',
        description: 'Stake UBXT - Earn UBXT',
        coinList: ['ubxt'],
        percentAPR: configTab.value === 'eth' ? farmAPY.value : bscFarmAPY.value,
        percentAPY: aprToApy(configTab.value === 'eth' ? farmAPY.value : bscFarmAPY.value),
        coinStakedTotal: configTab.value === 'eth' ? ubxtStaked.value : bscUbxtStaked.value,
        pages: {
          eth: '/ubxt-staking',
          bsc: '/ubxt-bsc-staking'
        }
      },
      {
        title: configTab.value === 'eth' ? 'UBXT - ETH LP' : 'UBXT - BUSD LP',
        description:
          configTab.value === 'eth'
            ? 'Stake UBXT/ETH-UNI-LPV2 - Earn UBXT'
            : 'Stake UBXT - BUSD LP & earn UBXT',
        coinList:
          configTab.value === 'eth' ? ['ubxt', 'eth-circle'] : ['ubxt', 'busd'],
        percentAPR: configTab.value === 'eth' ? lpFarmAPY.value : bscLpFarmAPY.value,
        percentAPY: aprToApy(configTab.value === 'eth' ? lpFarmAPY.value : bscLpFarmAPY.value),
        coinStakedTotal: configTab.value === 'eth' ? lpStakedTotal.value : bscLpStakedTotal.value,
        pages: {
          eth: '/ubxt-eth-lp-staking',
          bsc: '/ubxt-busd-lp-staking'
        }
      },
      {
        title: 'USDT Vault',
        description: 'Stake USDT & earn UBXT',
        coinList: ['usdt'],
        percentAPR: vaultFarmAPY.value,
        percentAPY: aprToApy(vaultFarmAPY.value),
        coinStakedTotal: vaultUSDTStaked.value,
        pages: {
          bsc: '/ubxt-vault'
        }
      }
    ])

    const getPriceUBXT = async () => {
      if (web3.value !== null && networkId.value === 1) {
        const ubxtEthContract = new web3.value.eth.Contract(pairAbi, UBXTPairAddress)

        const data = await ubxtEthContract.methods.getReserves().call()
        const ubxtEthPrice = data._reserve0 / data._reserve1
        const usdtEthContract = new web3.value.eth.Contract(pairAbi, USDTETHPairAddress)

        const data2 = await usdtEthContract.methods.getReserves().call()
        const usdtEthPrice = data2._reserve0 / data2._reserve1 / Math.pow(10, 12)

        finalPriceUbxt.value = 1 / (ubxtEthPrice * usdtEthPrice)
      }
    }

    const getBSCPriceUBXT = async () => {
      if (web3.value != null && networkId.value === 56) {
        const bscUbxtBusdContract = new web3.value.eth.Contract(bscPairAbi, bscUBXTPairAddress)
        const data = await bscUbxtBusdContract.methods.getReserves().call()
        const ubxtBusdPrice = data._reserve0 / data._reserve1
        bscFinalPriceUbxt.value = 1 / ubxtBusdPrice
      }
    }

    const getBSCTotalUbxtStaked = async () => {
      if (web3.value != null && networkId.value === 56) {
        const contract = new web3.value.eth.Contract(bscStakingAbi, bscStakingAddress)
        bscUbxtStaked.value = await contract.methods.totalStakedUBXT().call()
        bscUbxtStaked.value = bscUbxtStaked.value / Math.pow(10, 18)
        bscTotalUbxt.value = bscFinalPriceUbxt.value * bscUbxtStaked.value
      }
    }

    const getBSCTotalPancakeLpStaked = async () => {
      if (web3.value != null && networkId.value === 56) {
        const contract = new web3.value.eth.Contract(bscPairAbi, bscLpAddress)
        bscLpStakedTotal.value = await contract.methods.balanceOf(bscStakingAddress).call()
        bscLpStakedTotal.value = bscLpStakedTotal.value / Math.pow(10, 18)
        const lpPrice = 0.52
        bscTotalLp.value = lpPrice * bscLpStakedTotal.value
      }
    }

    const getVaultUSDTStaked = async () => {
      if (web3.value != null && networkId.value === 56) {
        const contract = new web3.value.eth.Contract(vaultAbi, vaultAddress)
        vaultUSDTStaked.value = (await contract.methods._stakedTokenPool().call()) / Math.pow(10, 18)
      }
    }

    const getBSCTotalValueLocked = async () => {
      if (web3.value != null && networkId.value === 56) {
        await getBSCPriceUBXT()
        await getBSCTotalUbxtStaked()
        await getBSCTotalPancakeLpStaked()
        await getVaultUSDTStaked()
        bscBalance.value = bscTotalUbxt.value + bscTotalLp.value + vaultUSDTStaked.value
      }
    }

    const getBSCERC20Balance = async () => {
      if (web3.value != null && networkId.value === 56) {
        const contract = new web3.value.eth.Contract(bscErc20Abi, bscContractAddress)
        bscUbxtBalance.value = await contract.methods.balanceOf(connectedWallet.value).call()
        bscUbxtBalance.value = bscUbxtBalance.value / Math.pow(10, 18)
      }
    }

    const getBSCTokenPerBlock = async () => {
      if (web3.value != null && networkId.value === 56) {
        const contract = new web3.value.eth.Contract(bscStakingAbi, bscStakingAddress)
        bscTotalAllocPoint.value = await contract.methods.totalAllocPoint().call()
        bscTokenPerBlock.value = await contract.methods.tokenPerBlock().call()
        bscTokenPerBlock.value = bscTokenPerBlock.value / Math.pow(10, 18)
      }
    }

    const getBSCFarmAPY = async () => {
      if (web3.value != null && networkId.value === 56) {
        await getBSCTokenPerBlock()
        const blockPerYear = 20 * 60 * 24 * 365
        let poolInfo
        let bscPoolAllocPoint
        let bscTokenPerBlock2
        const contract = new web3.value.eth.Contract(bscStakingAbi, bscStakingAddress)
        poolInfo = await contract.methods.poolInfo(0).call()
        if (poolInfo) {
          bscPoolAllocPoint = poolInfo[1]
        }
        bscTokenPerBlock2 = (bscTokenPerBlock.value * bscPoolAllocPoint) / bscTotalAllocPoint.value
        const apy = !bscUbxtStaked.value ? 0
          : ((bscTokenPerBlock2 * blockPerYear * bscFinalPriceUbxt.value * 1.0) /
          (bscUbxtStaked.value * bscFinalPriceUbxt.value)) * 100
        bscFarmAPY.value = apy
        poolInfo = await contract.methods.poolInfo(2).call()
        if (poolInfo) {
          bscPoolAllocPoint = poolInfo[1]
        }
        bscTokenPerBlock2 = (bscTokenPerBlock.value * bscPoolAllocPoint) / bscTotalAllocPoint.value
        const lpPrice = 0.52
        const lpApy = !bscLpStakedTotal.value
          ? 0
          : ((bscTokenPerBlock2 * blockPerYear * bscFinalPriceUbxt.value * 1.0) /
            (bscLpStakedTotal.value * lpPrice)) * 100
        bscLpFarmAPY.value = lpApy
      }
    }

    const getTotalUbxtStaked = async () => {
      if (web3.value != null && networkId.value === 1) {
        const contract = new web3.value.eth.Contract(stakingAbi, stakingAddress)
        ubxtStaked.value = await contract.methods.totalStakedUBXT().call()
        ubxtStaked.value = ubxtStaked.value / Math.pow(10, 18)
        totalUbxt.value = finalPriceUbxt.value * ubxtStaked.value
      }
    }

    const getTotalUniLpStaked = async () => {
      if (web3.value != null && networkId.value === 1) {
        const contract = new web3.value.eth.Contract(uniPairAbi, ethLpAddress)
        lpStakedTotal.value = await contract.methods.balanceOf(stakingAddress).call()
        lpStakedTotal.value = lpStakedTotal.value / Math.pow(10, 18)
        const lpPrice = 29
        totalLp.value = lpPrice * lpStakedTotal.value
      }
    }

    const getTotalValueLocked = async () => {
      if (web3.value != null && networkId.value === 1) {
        await getPriceUBXT()
        await getTotalUbxtStaked()
        await getTotalUniLpStaked()
        balance.value = totalUbxt.value + totalLp.value
      }
    }

    const getTokenPerBlock = async () => {
      if (web3.value != null && networkId.value === 1) {
        const contract = new web3.value.eth.Contract(stakingAbi, stakingAddress)
        totalAllocPoint.value = await contract.methods.totalAllocPoint().call()
        tokenPerBlock.value = await contract.methods.tokenPerBlock().call()
        tokenPerBlock.value = tokenPerBlock.value / Math.pow(10, 18)
      }
    }

    const getFarmAPY = async () => {
      if (web3.value != null && networkId.value === 1) {
        await getTokenPerBlock()
        const blockPerYear = 6560 * 365
        let poolInfo
        let poolAllocPoint
        let tokenPerBlock2
        const contract = new web3.value.eth.Contract(stakingAbi, stakingAddress)
        poolInfo = await contract.methods.poolInfo(0).call()
        if (poolInfo) {
          poolAllocPoint = poolInfo[1]
        }
        tokenPerBlock2 = (tokenPerBlock.value * poolAllocPoint) / totalAllocPoint.value
        const lpPrice = 29
        const apy = !ubxtStaked.value
          ? 0 : ((tokenPerBlock2 * blockPerYear * finalPriceUbxt.value * 1.0) /
           (ubxtStaked.value * finalPriceUbxt.value)) * 100
        farmAPY.value = apy
        poolInfo = await contract.methods.poolInfo(1).call()
        if (poolInfo) {
          poolAllocPoint = poolInfo[1]
        }
        tokenPerBlock2 = (tokenPerBlock.value * poolAllocPoint) / totalAllocPoint.value
        const lpApy = !lpStakedTotal.value
          ? 0 : ((tokenPerBlock2 * blockPerYear * finalPriceUbxt.value * 1.0) / (lpStakedTotal.value * lpPrice)) * 100
        lpFarmAPY.value = lpApy
      }
    }

    const getERC20Balance = async () => {
      if (web3.value != null && networkId.value === 1) {
        const contract = new web3.value.eth.Contract(erc20Abi, contractAddress)
        ubxtBalance.value = await contract.methods.balanceOf(connectedWallet.value).call()
        ubxtBalance.value = ubxtBalance.value / Math.pow(10, 18)
      }
    }

    const getUbxtStaked = async () => {
      if (web3.value === null) return
      let contract = null
      if (networkId.value === 1) {
        contract = new web3.value.eth.Contract(stakingAbi, stakingAddress)
      } else if (networkId.value === 56) {
        contract = new web3.value.eth.Contract(bscStakingAbi, bscStakingAddress)
      }

      if (contract != null) {
        const ubxtStake = await contract.methods
          .userInfo(0, connectedWallet.value)
          .call()
        const amount = ubxtStake.amount / Math.pow(10, 18)
        await vuex.staking.setStakingAmount({ ubxtStakingAmount: amount, walletAddress: connectedWallet.value })
        await vuex.staking.fetchStakingAmount()
        await vuex.staking.fetchStakingBenefit()
      }
    }

    const onWalletDisconnected = () => {
      connectedWallet.value = ''
      web3.value = null
      if (web3Modal.value) {
        web3Modal.value.clearCachedProvider()
      }
    }

    const fetchWalletData = async () => {
      if (web3.value != null) {
        try {
          const accounts = await web3.value.eth.getAccounts()
          if (accounts.length !== 0) {
            networkId.value = await web3.value.eth.net.getId()
            connectedWallet.value = accounts[0]
            if (networkId.value === 1) {
              await getERC20Balance()
              await getTotalValueLocked()
              await getFarmAPY()
            } else {
              await getBSCERC20Balance()
              await getBSCTotalValueLocked()
              await getBSCFarmAPY()
            }

            await getUbxtStaked()
          } else {
            onWalletDisconnected()
          }
        } catch (error) {
          appNotify({ type: 'warning', message: "Couldn't fetch wallet details" })
        }
      }
    }

    const onWalletConnected = (provider: any, modal: any) => {
      if (modal != null) {
        web3Modal.value = modal
      }
      if (provider != null) {
        provider.removeAllListeners()
        provider.on('accountsChanged', fetchWalletData)
        provider.on('chainChanged', fetchWalletData)
        provider.on('disconnect', onWalletDisconnected)
        web3.value = new Web3(provider)
        fetchWalletData()
      } else {
        onWalletDisconnected()
      }
    }

    const fetchApr = async () => {
      try {
        const { data }: { data: any; } = await http.get(
          'https://s.belt.fi/info/all.json'
        )
        const info = data.info.BSC.vaultPools.find((e: any) => e.name === '4Belt')
        vaultFarmAPY.value = info ? info.totalAPR * 0.89 : 0
      } catch (error) {
        appNotify({ type: 'error', message: "Couldn't fetch APR for vault" })
      }
    }

    function setActiveTab () {
      if (!localStorageService.hasKey('stakingConfigTab')) {
        localStorageService.setItem('stakingConfigTab', 'eth')
        vuex.staking.updateConfigTab(localStorageService.getItem('stakingConfigTab') as string)
      }
    }

    onMounted(() => {
      setActiveTab()
      fetchApr()
    })

    return {
      connectedWallet,
      isIncorrectNetwork,
      onWalletConnected,
      configTab,
      configTabs,
      handleTabChange,
      summaryData,
      stakingCardData
    }
  }
})
</script>

<style lang="scss" scoped>
.staking {
  &__crypto-currency-buttons {
    max-width: 400px;
  }

  &__summary-card {
    @media(min-width: 767px) {
      max-width: 500px;
    }
  }
}
</style>
