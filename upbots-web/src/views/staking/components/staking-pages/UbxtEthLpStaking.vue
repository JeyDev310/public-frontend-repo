<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <router-link :to="{ name: routeNames.staking }">
        <!-- DESKTOP -->
        <mq-layout mq="lg+" class="flex items-center">
          <AppIcon
            name="back"
            size="30"
            class="transition duration-300 text-nile-blue dark:text-tradewind"
          />
          <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl ml-10">
            UBXT-ETH LP Staking
          </h2>
        </mq-layout>

        <!-- MOBILE -->
        <mq-layout mq="sm-md" class="flex items-cetner">
          <AppIcon
            name="back"
            size="24"
            class="text-nile-blue dark:text-tradewind"
          />

          <span class="text-nile-blue dark:text-let-it-snow text-sm font-semibold ml-8">Back</span>
        </mq-layout>
      </router-link>
    </Portal>

    <!-- WALLET BUTTON -->
    <Portal to="h-two">
      <StakingWallet
        :connectedWallet="connectedWallet"
        :onWalletConnected="onWalletConnected"
        :isIncorrectNetwork="isIncorrectNetwork"
      />
    </Portal>

    <!-- MOBILE PAGE TITLE -->
    <mq-layout mq="sm-md">
      <span class="text-nile-blue dark:text-let-it-snow text-base font-semibold">UBXT-ETH LP Staking</span>
    </mq-layout>

    <!-- CONTENT -->
    <div class="flex flex-col w-full pb-20 mt-20 md:mt-10 overflow-y-auto custom-scrollbar">
      <!-- OVERVIEW CARDS -->
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
          class="ubxt-eth-lp-staking__summary-card w-full"
        />
      </div>

      <!-- DETAIL CARDS -->
      <div
        class="
        flex
        flex-col
        space-y-40
        lg:flex-row
        lg:justify-center
        items-center
        lg:items-stretch
        lg:space-y-0
        mt-40
        lg:space-x-20
        4xl:space-x-24
        "
      >
        <StakingEarnCard :data="ubxtEarnedData" class="ubxt-eth-lp-staking__card w-full">
          <div class="vault__button w-full mx-auto mt-40">
            <AppButton
              type="primary-border-filled"
              size="xlg"
              class="w-full"
              @click="claimPendingReward"
            >
              Claim
            </AppButton>
          </div>
        </StakingEarnCard>

        <StakingEarnCard :data="ubxtStakedData" class="ubxt-eth-lp-staking__card w-full">
          <div v-if="isApproved" class="flex space-x-16 mt-40">
            <AppButton
              type="primary-border-filled"
              size="xlg" class="w-full"
              disabled
              @click="isDepositModalOpen = true"
            >
              Add UBXT-ETH LP
            </AppButton>
            <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="isWithdrawModalOpen = true">
              Claim & Withdraw
            </AppButton>
          </div>
          <div v-else class="vault__button w-full mx-auto mt-40">
            <AppButton type="primary-border-filled" size="xlg" class="w-full" disabled @click="approveLPStake">
              Approve
            </AppButton>
          </div>

          <p class="text-beguiling-blue dark:text-white text-center mt-16">
            Fees : Deposit 0%, Withdrawal 0,3%
          </p>
        </StakingEarnCard>
      </div>

      <!-- FOOTER -->
      <StakingFooter />

      <MessageWidget icon-name="info-circle" class="ubxt-eth-lp-staking__message mx-auto mt-40">
        <div class="flex flex-col space-y-4 md:space-y-10 text-sm md:text-base">
          <p>
            Following the migration of the performance fees system on BSC, and from Wednesday, January 5th, 12:00pm,
            the LP UNI ETH stacking pool will no longer have any farming allocation,
            in order to focus on other pools and blockchain.
          </p>
          <p>The liquidity present on UNISWAP will be reallocated to other DEX or for the buyout of UBXT. </p>
          <p>The pool will still be visible until February 28th. </p>
        </div>
      </MessageWidget>

      <!-- DEPOST LP MODAL -->
      <AppModal v-model="isDepositModalOpen">
        <div class="flex items-center justify-center mb-36">
          <div class="flex justify-center mr-8">
            <img
              v-for="coin in ['ubxt', 'eth-circle']" :key="coin"
              :src="`/img/cryptocoins/${coin}.svg`"
              :alt="coin" class="w-36 h-36 rounded-full -ml-20 first:ml-0"
            >
          </div>
          <div>
            <h2 class="text-seal-blue dark:text-white text-center text-xl">Deposit UBXT-ETH LP</h2>
            <p class="text-seal-blue dark:text-white text-center text-xl">& Earn UBXT</p>
          </div>
        </div>

        <div class="flex items-center mb-36">
          <AppInputNumber v-model="depositValue" size="sm" class="w-full">
            <template #append>
              <div class="flex items-center justify-center absolute px-10 h-full cursor-pointer text-white"
                   style="right: 36px"
                   @click="depositValue = lpBalance"
              >
                <span class="text-shakespeare underline text-sm">Max</span>
              </div>
            </template>
          </AppInputNumber>
        </div>

        <div class="flex items-center justify-center mb-36">
          <span class="text-md text-seal-blue dark:text-white mr-8">Total available:</span>
          <span class="text-md text-seal-blue dark:text-white font-bold">{{ lpBalance }}</span>
        </div>

        <div class="w-full">
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="w-full"
            @click="depositLPStake"
          >
            Confirm
          </AppButton>
        </div>
      </AppModal>

      <!-- DEPOST LP MODAL -->
      <AppModal v-model="isWithdrawModalOpen">
        <div class="flex items-center justify-center mb-36">
          <div class="flex justify-center mr-8">
            <img
              v-for="coin in ['ubxt', 'eth-circle']" :key="coin"
              :src="`/img/cryptocoins/${coin}.svg`"
              :alt="coin" class="w-36 h-36 rounded-full -ml-20 first:ml-0"
            >
          </div>
          <div>
            <h2 class="text-seal-blue dark:text-white text-center text-xl">Withdraw UBXT-ETH LP</h2>
          </div>
        </div>

        <div class="flex items-center mb-36">
          <AppInputNumber v-model="withdrawValue" size="sm" class="w-full">
            <template #append>
              <div class="flex items-center justify-center absolute px-10 h-full cursor-pointer text-white"
                   style="right: 36px"
                   @click="withdrawValue = amount"
              >
                <span class="text-shakespeare underline text-sm">Max</span>
              </div>
            </template>
          </AppInputNumber>
        </div>

        <div class="flex justify-between">
          <div class="flex items-center justify-center mb-36">
            <span class="text-md text-seal-blue dark:text-white mr-8">Converted:</span>
            <span class="text-md text-seal-blue dark:text-white font-bold">
              ~ {{ conversionRateUBXT ? conversionRateUBXT.toFixed(2) : 0 }} USD
            </span>
          </div>

          <div class="flex items-center justify-center mb-36">
            <span class="text-md text-seal-blue dark:text-white mr-8">Total available:</span>
            <span class="text-md text-seal-blue dark:text-white font-bold">{{ amount }}</span>
          </div>
        </div>

        <div class="w-full">
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="w-full"
            @click="withdrawLPStake"
          >
            Confirm
          </AppButton>
        </div>
      </AppModal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { routeNames } from '@/router'
// eslint-disable-next-line import/no-named-default
import { default as Web3 } from 'web3'
import { BigNumber } from 'bignumber.js'
import { appNotify } from '@/components/stateless/notifications'
import { formatNumber } from '@/core/helpers'

import StakingEarnCard from '@/views/staking/components/StakingEarnCard.vue'
import StakingFooter from '@/views/staking/components/StakingFooter.vue'
import StakingWallet from '@/views/staking/components/StakingWallet.vue'
import StakingSummaryCard from '@/views/staking/components/StakingSummaryCard.vue'
import MessageWidget from '@/components/MessageWidget.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stakingAbi = require('@/utils/contract/abistaking.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lpAbi = require('@/utils/contract/abiunipair.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pairAbi = require('@/utils/contract/abisushipair.json')

const stakingAddress = process.env.VUE_APP_STAKING_ADDRESS
const USDTETHPairAddress = process.env.VUE_APP_ETH_USDT_PAIR_ADDRESS
const UBXTPairAddress = process.env.VUE_APP_UBXT_PAIR_ADDRESS
const lpAddress = process.env.VUE_APP_LP_ADDRESS

export default defineComponent({
  name: 'UbxtEthLpStaking',

  components: {
    StakingEarnCard,
    StakingFooter,
    StakingWallet,
    StakingSummaryCard,
    MessageWidget
  },

  setup () {
    const connectedWallet = ref('')
    const web3Modal = ref<any>(null)
    const isIncorrectNetwork = ref(false)
    const web3 = ref<Web3 | null>(null)
    const isApproved = ref(false)
    const isDepositModalOpen = ref(false)
    const isWithdrawModalOpen = ref(false)
    const globalAPY = ref(0)
    const amount = ref(0)
    const lpStake = ref<any>(null)
    const totalLPStaked = ref(0)
    const ubxtEarned = ref(0)
    const lpBalance = ref(0)
    const poolAllocationLP = ref(0)
    const totalAllocPoint = ref(0)
    const poolAllocPoint = ref(0)
    const tokenPerBlock = ref(0)
    const finalPriceUbxt = ref(0)
    const withdrawValue = ref(0)
    const depositValue = ref(0)

    const stakingContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(stakingAbi, stakingAddress)
      }
      return null
    })
    const lpContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(lpAbi, lpAddress)
      }
      return null
    })
    const ubxtEthContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(pairAbi, UBXTPairAddress)
      }
      return null
    })
    const usdtEthContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(pairAbi, USDTETHPairAddress)
      }
      return null
    })

    const summaryData = computed(() => [
      { title: 'Total staked in the pool', value: totalLPStaked.value, usdValue: formatNumber(totalLPStaked.value * finalPriceUbxt.value) },
      { title: 'APR', value: globalAPY.value, type: 'percent', usdValue: -1 },
      { title: 'Your % in the pool', value: poolAllocationLP.value, type: 'percent', usdValue: -1 }
    ])
    const ubxtEarnedData = computed(() => ({
      title: 'UBXT EARNED',
      coin: 'ubxt',
      value: ubxtEarned.value,
      valueUsd: ubxtEarned.value * finalPriceUbxt.value
    }))
    const ubxtStakedData = computed(() => ({
      title: 'UBXT-ETH LP STAKED',
      coin: 'ubxt',
      value: amount.value,
      valueUsd: amount.value * finalPriceUbxt.value
    }))
    const conversionRateUBXT = computed(() => depositValue.value * finalPriceUbxt.value)

    const getPendingRewardUBXT = async () => {
      if (stakingContract.value != null) {
        ubxtEarned.value =
          (await stakingContract.value.methods
            .pendingToken(1, connectedWallet.value)
            .call()) / Math.pow(10, 18)
      }
    }

    const getLPBalance = async () => {
      if (lpContract.value != null) {
        lpBalance.value =
          (await lpContract.value.methods.balanceOf(connectedWallet.value).call()) /
          Math.pow(10, 18)
      }
    }

    const lpStakedAmount = async () => {
      if (stakingContract.value != null) {
        lpStake.value = await stakingContract.value.methods
          .userInfo(1, connectedWallet.value)
          .call()
        amount.value = lpStake.value.amount / Math.pow(10, 18)
      }
    }

    const getTotalLPStaked = async () => {
      if (lpContract.value != null) {
        totalLPStaked.value =
          (await lpContract.value.methods.balanceOf(stakingAddress).call()) /
          Math.pow(10, 18)
      }
    }

    const poolPercentage = async () => {
      if (amount.value === 0 || totalLPStaked.value === 0) {
        poolAllocationLP.value = 0
      } else {
        poolAllocationLP.value = (amount.value / totalLPStaked.value) * 100
      }
    }

    const getTokenPerBlock = async () => {
      if (stakingContract.value != null) {
        totalAllocPoint.value = await stakingContract.value.methods
          .totalAllocPoint()
          .call()
        const poolInfo = await stakingContract.value.methods.poolInfo(1).call()
        if (poolInfo) {
          poolAllocPoint.value = poolInfo[1]
        }
        tokenPerBlock.value =
          (await stakingContract.value.methods.tokenPerBlock().call()) /
          Math.pow(10, 18)
      }
    }

    const getPriceUBXT = async () => {
      if (ubxtEthContract.value != null && usdtEthContract.value != null) {
        const dataUbxt = await ubxtEthContract.value.methods
          .getReserves()
          .call()
        const dataEth = await usdtEthContract.value.methods
          .getReserves()
          .call()
        const ubxtEthPrice = dataUbxt._reserve0 / dataUbxt._reserve1
        const usdtEthPrice = dataEth._reserve0 / dataEth._reserve1 / Math.pow(10, 12)
        finalPriceUbxt.value = 1 / (ubxtEthPrice * usdtEthPrice)
      }
    }

    const getFarmAPY = async () => {
      const blockPerYear = 6560 * 365
      const tokenPerBlockRelative =
        (tokenPerBlock.value * poolAllocPoint.value) / totalAllocPoint.value
      const lpPrice = 29
      globalAPY.value =
        totalLPStaked.value === 0
          ? 0
          : ((tokenPerBlockRelative * blockPerYear * finalPriceUbxt.value * 1.0) /
              (totalLPStaked.value * lpPrice)) *
            100
    }

    const getApproved = async () => {
      if (lpContract.value != null) {
        const allowBalance = await lpContract.value.methods.allowance(connectedWallet.value, stakingAddress).call()
        isApproved.value = !new BigNumber(allowBalance).isZero()
      }
    }

    const onWalletDisconnected = () => {
      if (web3Modal.value) {
        web3Modal.value.clearCachedProvider()
      }
      connectedWallet.value = ''
      web3.value = null
    }

    const fetchWalletData = async () => {
      if (web3.value != null) {
        try {
          const accounts = await web3.value.eth.getAccounts()
          if (accounts.length !== 0) {
            isIncorrectNetwork.value = (await web3.value.eth.net.getId()) !== 1
            connectedWallet.value = accounts[0]

            await lpStakedAmount()
            await getTotalLPStaked()
            await getTokenPerBlock()
            await getPriceUBXT()
            getPendingRewardUBXT()
            getLPBalance()
            poolPercentage()
            getFarmAPY()
            getApproved()
          } else {
            onWalletDisconnected()
          }
        } catch (error) {
          appNotify({ type: 'error', message: "Couldn't fetch wallet details" })
        }
      }
    }

    const onWalletConnected = (provider: any, modal: any) => {
      if (modal != null) {
        web3Modal.value = modal
      }
      if (provider != null) {
        provider.on('accountsChanged', fetchWalletData)
        provider.on('chainChanged', fetchWalletData)
        provider.on('disconnect', onWalletDisconnected)
        web3.value = new Web3(provider)
        fetchWalletData()
      } else {
        onWalletDisconnected()
      }
    }

    const claimPendingReward = () => {
      if (stakingContract.value != null) {
        if (ubxtEarned.value > 0) {
          stakingContract.value.methods
            .deposit(1, 0)
            .send({
              from: connectedWallet.value,
              maxPriorityFeePerGas: null,
              maxFeePerGas: null
            })
            .on('receipt', () => {
              appNotify({
                type: 'success',
                message: 'Rewards claimed successfully!'
              })
              fetchWalletData()
            })
            .on('error', () => {
              appNotify({
                type: 'error',
                message: "Couldn't claim pending rewards."
              })
            })
        } else {
          appNotify({
            type: 'error',
            message: 'Incorrect Input.'
          })
        }
      }
    }

    const withdrawLPStake = async () => {
      if (stakingContract.value != null) {
        isWithdrawModalOpen.value = false
        if (withdrawValue.value > 0 && withdrawValue.value <= amount.value) {
          let withdrawV = new BigNumber(withdrawValue.value).multipliedBy(
            Math.pow(10, 18)
          )
          const lpBalance = new BigNumber(
            (
              await stakingContract.value.methods
                .userInfo(1, connectedWallet.value)
                .call()
            ).amount
          )
          if (withdrawV.gt(lpBalance)) {
            withdrawV = lpBalance
          }
          stakingContract.value.methods
            .withdraw(1, `0x${withdrawV.toString(16)}`)
            .send({
              from: connectedWallet.value,
              maxPriorityFeePerGas: null,
              maxFeePerGas: null
            })
            .on('receipt', () => {
              appNotify({
                type: 'success',
                message: 'Withdraw LP Success!'
              })
              fetchWalletData()
            })
            .on('error', () => {
              appNotify({
                type: 'error',
                message: 'Withdraw LP Failed!'
              })
            })
        } else {
          appNotify({
            type: 'error',
            message: 'Incorrect Input.'
          })
        }
      }
    }

    const approveLPStake = async () => {
      if (lpContract.value != null) {
        lpContract.value.methods
          .approve(
            stakingAddress,
            `0x${new BigNumber(2).pow(256).minus(1).toString(16)}`
          )
          .send({
            from: connectedWallet.value,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          })
          .on('receipt', () => {
            isApproved.value = true
            appNotify({
              type: 'success',
              message: 'Approve LP success!'
            })
          })
          .on('error', () => {
            appNotify({
              type: 'error',
              message: 'Approve LP Failed!'
            })
          })
      }
    }

    const depositLPStake = async () => {
      if (lpContract.value != null && stakingContract.value != null) {
        isDepositModalOpen.value = false

        if (depositValue.value > 0 && depositValue.value <= lpBalance.value) {
          let depositV = new BigNumber(depositValue.value).multipliedBy(
            Math.pow(10, 18)
          )
          const lpBal = new BigNumber(
            await lpContract.value.methods.balanceOf(connectedWallet.value).call()
          )
          if (depositV.gt(lpBal)) {
            depositV = lpBal
          }
          stakingContract.value.methods
            .deposit(1, `0x${depositV.toString(16)}`)
            .send({
              from: connectedWallet.value,
              maxPriorityFeePerGas: null,
              maxFeePerGas: null
            })
            .on('receipt', () => {
              appNotify({
                type: 'success',
                message: 'Deposit LP success!'
              })
              fetchWalletData()
            })
            .on('error', () => {
              appNotify({
                type: 'error',
                message: 'Deposit LP Failed!'
              })
            })
        } else {
          appNotify({
            type: 'error',
            message: 'Incorrect Input!'
          })
        }
      }
    }

    return {
      routeNames,

      connectedWallet,
      isIncorrectNetwork,
      onWalletConnected,
      isApproved,
      ubxtEarnedData,
      ubxtStakedData,
      isDepositModalOpen,
      isWithdrawModalOpen,
      amount,
      lpStake,
      ubxtEarned,
      lpBalance,
      totalAllocPoint,
      poolAllocPoint,
      tokenPerBlock,
      finalPriceUbxt,
      withdrawValue,
      depositValue,
      claimPendingReward,
      withdrawLPStake,
      approveLPStake,
      depositLPStake,
      summaryData,
      conversionRateUBXT
    }
  }
})
</script>

<style lang="scss" scoped>
.vault {
  &__card {
    height: 100px;
  }
  &__button {
    max-width: 280px;
  }
}

.ubxt-eth-lp-staking {
  @media(min-width: 768px) {
    &__card,
    &__summary-card {
      max-width: 500px;
    }
  }

  &__message {
    max-width: 1000px;
  }
}
</style>
