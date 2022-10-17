<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <router-link :to="{ name: routeNames.staking }">
        <!-- DESKTOP -->
        <mq-layout mq="lg+" class="flex items-center">
          <AppIcon
            name="arrow-long"
            size="30"
            class="transition duration-300 text-nile-blue dark:text-tradewind"
          />

          <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl ml-10">
            UBXT-BUSD LP Staking
          </h2>
        </mq-layout>

        <!-- MOBILE -->
        <mq-layout mq="sm-md">
          <span class="text-nile-blue dark:text-let-it-snow text-sm font-semibold">Go back</span>
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
      <span class="text-nile-blue dark:text-let-it-snow text-base font-semibold">UBXT-BUSD LP Staking</span>
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
          class="ubxt-busd-lp-staking__summary-card w-full"
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
        <StakingEarnCard :data="ubxtEarnedData" class="ubxt-busd-lp-staking__card w-full">
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

        <StakingEarnCard :data="ubxtStakedData" class="ubxt-busd-lp-staking__card w-full">
          <div v-if="isApproved" class="flex space-x-16 mt-40">
            <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="isDepositModalOpen = true">
              Add UBXT-BUSD LP
            </AppButton>
            <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="isWithdrawModalOpen = true">
              Claim & Withdraw
            </AppButton>
          </div>
          <div v-else class="vault__button w-full mx-auto mt-40">
            <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="approveLPStake">
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

      <!-- DEPOST LP MODAL -->
      <AppModal v-model="isDepositModalOpen">
        <div class="flex items-center justify-center mb-36">
          <div class="flex justify-center mr-8">
            <img
              v-for="coin in ['ubxt', 'busd']" :key="coin"
              :src="`/img/cryptocoins/${coin}.svg`"
              :alt="coin" class="w-36 h-36 rounded-full -ml-20 first:ml-0"
            >
          </div>
          <div>
            <h2 class="text-seal-blue dark:text-white text-center text-xl">Deposit UBXT-BUSD LP</h2>
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
              v-for="coin in ['ubxt', 'busd']" :key="coin"
              :src="`/img/cryptocoins/${coin}.svg`"
              :alt="coin" class="w-36 h-36 rounded-full -ml-20 first:ml-0"
            >
          </div>
          <div>
            <h2 class="text-seal-blue dark:text-white text-center text-xl">Withdraw UBXT-BUSD LP</h2>
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

import StakingEarnCard from '@/views/staking/components/StakingEarnCard.vue'
import StakingFooter from '@/views/staking/components/StakingFooter.vue'
import StakingWallet from '@/views/staking/components/StakingWallet.vue'
import StakingSummaryCard from '@/views/staking/components/StakingSummaryCard.vue'
import { formatNumber } from '@/core/helpers'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stakingAbi = require('@/utils/contract/abistaking.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lpPairAbi = require('@/utils/contract/abicakepair.json')

const stakingAddress = process.env.VUE_APP_BSC_STAKING_ADDRESS
const UBXTPairAddress = process.env.VUE_APP_BSC_UBXT_PAIR_ADDRESS
const lpAddress = process.env.VUE_APP_BSC_LP_ADDRESS

export default defineComponent({
  name: 'UbxtBusdLpStaking',

  components: {
    StakingEarnCard,
    StakingFooter,
    StakingWallet,
    StakingSummaryCard
  },

  setup () {
    const connectedWallet = ref('')
    const web3Modal = ref<any>(null)
    const isIncorrectNetwork = ref(false)
    const web3 = ref<Web3 | null>(null)
    const isApproved = ref(false)
    const isDepositModalOpen = ref(false)
    const isWithdrawModalOpen = ref(false)
    const bscLpFarmAPY = ref(0)
    const poolTotal = ref(0)
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
        return new web3.value.eth.Contract(lpPairAbi, lpAddress)
      }
      return null
    })
    const bscUbxtBusdContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(lpPairAbi, UBXTPairAddress)
      }
      return null
    })

    const summaryData = computed(() => [
      { title: 'Total staked in the pool', value: totalLPStaked.value, usdValue: formatNumber(totalLPStaked.value * finalPriceUbxt.value) },
      { title: 'APR', value: bscLpFarmAPY.value, type: 'percent', usdValue: -1 },
      { title: 'Your % in the pool', value: poolAllocationLP.value, type: 'percent', usdValue: -1 }
    ])
    const ubxtEarnedData = computed(() => ({
      title: 'UBXT EARNED',
      coin: 'ubxt',
      value: ubxtEarned.value,
      valueUsd: ubxtEarned.value * finalPriceUbxt.value
    }))
    const ubxtStakedData = computed(() => ({
      title: 'UBXT-BUSD LP STAKED',
      coin: 'ubxt',
      value: amount.value,
      valueUsd: amount.value * finalPriceUbxt.value
    }))
    const conversionRateUBXT = computed(() => depositValue.value * finalPriceUbxt.value)

    const getPendingRewardUBXT = async () => {
      if (stakingContract.value != null) {
        ubxtEarned.value =
          (await stakingContract.value.methods
            .pendingToken(2, connectedWallet.value)
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
          .userInfo(2, connectedWallet.value)
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
        const poolInfo = await stakingContract.value.methods.poolInfo(2).call()
        if (poolInfo) {
          poolAllocPoint.value = poolInfo[1]
        }
        tokenPerBlock.value =
          (await stakingContract.value.methods.tokenPerBlock().call()) /
          Math.pow(10, 18)
      }
    }

    const getPriceUBXT = async () => {
      if (bscUbxtBusdContract.value != null) {
        const data = await bscUbxtBusdContract.value.methods
          .getReserves()
          .call()
        const ubxtBusdPrice = data._reserve0 / data._reserve1
        finalPriceUbxt.value = 1 / ubxtBusdPrice
      }
    }

    const getFarmAPY = async () => {
      const blockPerYear = 20 * 60 * 24 * 365
      const tokenPerBlockRelative =
        (tokenPerBlock.value * poolAllocPoint.value) / totalAllocPoint.value
      const lpPrice = 0.52
      bscLpFarmAPY.value =
        totalLPStaked.value === 0
          ? 0
          : ((tokenPerBlockRelative * blockPerYear * finalPriceUbxt.value * 1.0) /
              (totalLPStaked.value * lpPrice)) *
            100
    }

    const getApproved = async () => {
      if (lpContract.value != null) {
        const allowBalance = await lpContract.value.methods
          .allowance(connectedWallet.value, stakingAddress)
          .call()
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
            isIncorrectNetwork.value = (await web3.value.eth.net.getId()) !== 56
            connectedWallet.value = accounts[0]
            await getPendingRewardUBXT()
            await getLPBalance()
            await lpStakedAmount()
            await getTotalLPStaked()
            await getTokenPerBlock()
            await getPriceUBXT()
            poolPercentage()
            getFarmAPY()
            getApproved()
          } else {
            onWalletDisconnected()
          }
        } catch {
          appNotify({
            type: 'warning',
            message: "Couldn't fetch wallet details"
          })
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
            .deposit(2, 0)
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
                .userInfo(2, connectedWallet.value)
                .call()
            ).amount
          )
          if (withdrawV.gt(lpBalance)) {
            withdrawV = lpBalance
          }
          stakingContract.value.methods
            .withdraw(2, `0x${withdrawV.toString(16)}`)
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
            .deposit(2, `0x${depositV.toString(16)}`)
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
      poolTotal,
      ubxtEarnedData,
      ubxtStakedData,
      isDepositModalOpen,
      isWithdrawModalOpen,
      amount,
      lpStake,
      totalLPStaked,
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

.ubxt-busd-lp-staking {
  @media(min-width: 768px) {
    &__card,
    &__summary-card {
      max-width: 500px;
    }
  }
}
</style>
