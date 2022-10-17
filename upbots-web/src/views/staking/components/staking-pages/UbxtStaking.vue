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
            UBXT Staking
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
      <span class="text-nile-blue dark:text-let-it-snow text-base font-semibold">UBXT Staking</span>
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
          class="ubxt-staking__staking-card w-full"
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
        <AppCard class="ubxt-staking__card flex flex-grow flex-col w-full pb-24 px-30">
          <div class="flex justify-center w-full -mt-20">
            <img
              :src="`/img/cryptocoins/${ubxtEarnedData.coin}.svg`"
              :alt="ubxtEarnedData.coin" class="w-60 h-60 bg-white rounded-full -ml-20 first:ml-0"
            >
          </div>

          <div
            class="w-full font-medium text-lg 2xl:text-xl text-beguiling-blue dark:text-white text-center mt-24 mb-16"
          >
            {{ ubxtEarnedData.title }}
          </div>

          <div class="flex justify-around mt-30">
            <div class="flex flex-col text-center">
              <span
                class="
                font-semibold
                text-xl
                xl:text-lg
                2xl:text-3xl
                text-beguiling-blue
                dark:text-white
                flex
                justify-center
                items-center"
              >
                {{ !isNaN(ubxtEarnedData.value) ? formatNumber(ubxtEarnedData.value) : 'N/A' }}
                <span
                  v-if="ubxtEarnedData.valueUsd >= 0"
                  class="
                  text-beguiling-blue
                  dark
                  font-semibold
                  text-base
                  ml-8"
                >
                  ${{ formatNumber(ubxtEarnedData.valueUsd) }}
                </span>
              </span>
              <span class="text-beguiling-blue dark:text-white">Farming reward (1)</span>
            </div>
            <div class="flex flex-col text-center">
              <span
                class="
                font-semibold
                text-xl
                xl:text-lg
                2xl:text-3xl
                text-beguiling-blue
                dark:text-white
                flex
                justify-center
                items-center"
              >
                {{ !isNaN(ubxtEarnedData.valuePerf) ? formatNumber(ubxtEarnedData.valuePerf) : 'N/A' }}
                <span
                  v-if="ubxtEarnedData.valuePerfUsd >= 0"
                  class="
                  text-beguiling-blue
                  dark
                  font-semibold
                  text-base
                  ml-8"
                >
                  ${{ formatNumber(ubxtEarnedData.valuePerfUsd) }}
                </span>
              </span>
              <span class="text-beguiling-blue dark:text-white">Perf fees reward (2)</span>
            </div>
          </div>

          <div class="vault__button block w-full mx-auto mt-40">
            <AppButton
              type="primary-border-filled"
              size="xlg"
              class="w-full"
              @click="claimPendingRewardUBXT"
            >
              Claim
            </AppButton>
          </div>

          <p class="text-beguiling-blue dark:text-white text-center mt-16">
            Farm APY {{ globalAPY.toFixed(1) }}% + Fees APY {{ feeAPY.toFixed(1) }}%
          </p>
        </AppCard>

        <StakingEarnCard :data="ubxtStakedData" class="ubxt-staking__card w-full">
          <div class="flex flex-col justify-end h-full mt-40">
            <div v-if="isApproved" class="flex w-full space-x-16">
              <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="isDepositModalOpen = true">
                Add UBXT
              </AppButton>
              <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="isWithdrawModalOpen = true">
                Claim &amp; Withdraw
              </AppButton>
            </div>
            <div v-else class="vault__button w-full mx-auto">
              <AppButton type="primary-border-filled" size="xlg" class="w-full" @click="approveUbxtStake">
                Approve
              </AppButton>
            </div>

            <p class="text-beguiling-blue dark:text-white text-center mt-16">
              Fees : Deposit 0%, Withdrawal 0,3%
            </p>
          </div>
        </StakingEarnCard>
      </div>

      <!-- FOOTER -->
      <StakingFooter />

      <!-- DEPOST LP MODAL -->
      <AppModal v-model="isDepositModalOpen">
        <div class="flex items-center justify-center mb-36">
          <div class="flex justify-center mr-8">
            <img
              src="/img/cryptocoins/ubxt.svg"
              alt="ubxt" class="w-36 h-36 rounded-full -ml-20 first:ml-0"
            >
          </div>
          <div>
            <h2 class="text-seal-blue dark:text-white text-center text-xl">Deposit UBXT</h2>
            <p class="text-seal-blue dark:text-white text-center text-xl">& Earn UBXT</p>
          </div>
        </div>

        <div class="flex items-center mb-36">
          <AppInputNumber v-model="depositValue" size="sm" class="w-full">
            <template #append>
              <div class="flex items-center justify-center absolute px-10 h-full cursor-pointer text-white"
                   style="right: 36px"
                   @click="depositValue = ubxtBalance"
              >
                <span class="text-shakespeare underline text-sm">Max</span>
              </div>
            </template>
          </AppInputNumber>
        </div>

        <div class="flex items-center justify-center mb-36">
          <span class="text-md text-seal-blue dark:text-white mr-8">Total available:</span>
          <span class="text-md text-seal-blue dark:text-white font-bold">{{ ubxtBalance }}</span>
        </div>

        <div class="w-full">
          <AppButton
            type="primary-border-filled"
            size="xlg"
            class="w-full"
            @click="depositUbxtStake"
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
              src="/img/cryptocoins/ubxt.svg"
              alt="ubxt" class="w-36 h-36 rounded-full -ml-20 first:ml-0"
            >
          </div>
          <div>
            <h2 class="text-seal-blue dark:text-white text-center text-xl">Withdraw UBXT</h2>
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
            @click="withdrawUbxtStake"
          >
            Confirm
          </AppButton>
        </div>
      </AppModal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { routeNames } from '@/router'
// eslint-disable-next-line import/no-named-default
import { default as Web3 } from 'web3'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { http } from '@/services'
import { appNotify } from '@/components/stateless/notifications'
import { formatNumber } from '@/core/helpers'

import { vuex } from '@/store'

import StakingEarnCard from '@/views/staking/components/StakingEarnCard.vue'
import StakingFooter from '@/views/staking/components/StakingFooter.vue'
import StakingWallet from '@/views/staking/components/StakingWallet.vue'
import StakingSummaryCard from '@/views/staking/components/StakingSummaryCard.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stakingAbi = require('@/utils/contract/abistaking.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pairAbi = require('@/utils/contract/abisushipair.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ubxtAbi = require('@/utils/contract/abimubxt.json')

const stakingAddress = process.env.VUE_APP_STAKING_ADDRESS
const UBXTPairAddress = process.env.VUE_APP_UBXT_PAIR_ADDRESS
const USDTETHPairAddress = process.env.VUE_APP_ETH_USDT_PAIR_ADDRESS
const ubxtAddress = process.env.VUE_APP_UBXT_ADDRESS

dayjs.extend(duration)

export default defineComponent({
  name: 'UbxtStaking',

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
    const globalAPY = ref(0)
    const amount = ref(0)
    const totalUbxtStaked = ref(0)
    const ubxtEarned = ref(0)
    const feeAPY = ref(0)
    const estimatedAnnualPerfees = ref(0)
    const ubxtPerfFeeEarned = ref(0)
    const ubxtBalance = ref(0)
    const sharedUbxt = ref(0)
    const poolAllocationUbxt = ref(0)
    const totalAllocPoint = ref(0)
    const poolAllocPoint = ref(0)
    const tokenPerBlock = ref(0)
    const finalPriceUbxt = ref(0)
    const withdrawValue = ref(0)
    const depositValue = ref(0)
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)

    const stakingContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(stakingAbi, stakingAddress)
      }
      return null
    })
    const usdtEthContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(pairAbi, USDTETHPairAddress)
      }
      return null
    })
    const ubxtContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(ubxtAbi, ubxtAddress)
      }
      return null
    })
    const ubxtEthContract = computed(() => {
      if (web3.value != null) {
        return new web3.value.eth.Contract(pairAbi, UBXTPairAddress)
      }
      return null
    })

    const ubxtEarnedData = computed(() => ({
      title: 'UBXT EARNED',
      coin: 'ubxt',
      value: ubxtEarned.value,
      valuePerf: ubxtPerfFeeEarned.value,
      valueUsd: ubxtEarned.value * finalPriceUbxt.value,
      valuePerfUsd: ubxtPerfFeeEarned.value * finalPriceUbxt.value
    }))
    const ubxtStakedData = computed(() => ({
      title: 'UBXT STAKED',
      coin: 'ubxt',
      value: amount.value,
      valueUsd: amount.value * finalPriceUbxt.value
    }))
    const conversionRateUBXT = computed(() => depositValue.value * finalPriceUbxt.value)

    const summaryData = computed(() => [
      { title: 'Total Estimated APR (1)', value: globalAPY.value + feeAPY.value, type: 'percent' },
      { title: 'Next Epoch In (2)', value: `${hours.value}:${minutes.value}:${seconds.value}` },
      { title: 'Total UBXT Shared (2)', value: sharedUbxt.value, usdValue: formatNumber(sharedUbxt.value * finalPriceUbxt.value) },
      { title: 'Your % in the pool', value: poolAllocationUbxt.value, type: 'percent' }
    ])

    const getUbxtBalance = async () => {
      if (ubxtContract.value != null) {
        ubxtBalance.value =
          (await ubxtContract.value.methods.balanceOf(connectedWallet.value).call()) /
          Math.pow(10, 18)
      }
    }

    const ubxtStakedAmount = async () => {
      if (stakingContract.value != null) {
        const ubxtStake = await stakingContract.value.methods
          .userInfo(0, connectedWallet.value)
          .call()
        amount.value = ubxtStake.amount / Math.pow(10, 18)
        vuex.staking.setStakingAmount({ ubxtStakingAmount: amount.value, walletAddress: connectedWallet.value })
      }
    }

    const getTotalUbxtStaked = async () => {
      if (stakingContract.value != null) {
        totalUbxtStaked.value =
          (await stakingContract.value.methods.totalStakedUBXT().call()) /
          Math.pow(10, 18)
      }
    }

    const poolPercentage = async () => {
      if (amount.value === 0 || totalUbxtStaked.value === 0) {
        poolAllocationUbxt.value = 0
      } else {
        poolAllocationUbxt.value = (amount.value / totalUbxtStaked.value) * 100
      }
    }

    const getTokenPerBlock = async () => {
      if (stakingContract.value != null) {
        totalAllocPoint.value = await stakingContract.value.methods
          .totalAllocPoint()
          .call()
        const poolInfo = await stakingContract.value.methods.poolInfo(0).call()
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
      globalAPY.value =
        totalUbxtStaked.value === 0
          ? 0
          : ((tokenPerBlockRelative * blockPerYear * finalPriceUbxt.value * 1.0) /
              (totalUbxtStaked.value * finalPriceUbxt.value)) *
            100
    }

    const getApproved = async () => {
      if (ubxtContract.value != null) {
        const allowBalance = await ubxtContract.value.methods
          .allowance(connectedWallet.value, stakingAddress)
          .call()
        isApproved.value = !new BigNumber(allowBalance).isZero()
      }
    }

    const ubxtSharedInNext = async () => {
      if (stakingContract.value != null && ubxtContract.value != null) {
        const perfPoolAddress = await stakingContract.value.methods.perfPool().call()
        sharedUbxt.value = (await ubxtContract.value.methods.balanceOf(perfPoolAddress).call()) / Math.pow(10, 18)
      }
    }

    const getPendingTokenReward = async () => {
      if (stakingContract.value != null) {
        ubxtEarned.value =
          (await stakingContract.value.methods.pendingToken(0, connectedWallet.value).call()) / Math.pow(10, 18)
      }
    }

    const getPendingUBXTReward = async () => {
      if (stakingContract.value != null) {
        ubxtPerfFeeEarned.value =
          (await stakingContract.value.methods.pendingUBXTReward(connectedWallet.value).call()) / Math.pow(10, 18)
      }
    }

    const getFeeAPY = () => {
      feeAPY.value = !totalUbxtStaked.value ? 0 : (estimatedAnnualPerfees.value * 100.0) / totalUbxtStaked.value
    }

    const getEstimatedAnnualPerfees = async () => {
      try {
        const { data }: { data: any; } = await http.get(
          '/perfees/estimated-annual-perfees'
        )
        estimatedAnnualPerfees.value = data
      } catch (error) {
        appNotify({ type: 'error', message: "Couldn't fetch estimated annual perf fees" })
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
            isIncorrectNetwork.value = (await web3.value.eth.net.getId()) !== 1
            connectedWallet.value = accounts[0]

            await getTotalUbxtStaked()
            await getTokenPerBlock()
            await getPriceUBXT()
            await ubxtStakedAmount()
            await getEstimatedAnnualPerfees()
            getUbxtBalance()
            ubxtSharedInNext()
            getPendingTokenReward()
            getPendingUBXTReward()
            poolPercentage()
            getFarmAPY()
            getFeeAPY()
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

    const timer = () => {
      setInterval(() => {
        let currentTime = new Date()
        const localoffset = -(currentTime.getTimezoneOffset() / 60)
        const destoffset = 0
        const offset = destoffset - localoffset
        currentTime = new Date(new Date().getTime() + offset * 3600 * 1000)

        let eventTime =
          new Date(currentTime.getUTCFullYear(), currentTime.getMonth(), currentTime.getDate(), 0, 0, 0, 0)
        eventTime = new Date(eventTime.getTime() + 24 * 3600 * 1000)
        const duration = dayjs.duration(dayjs(eventTime).diff(currentTime))
        hours.value = duration.hours()
        minutes.value = duration.minutes()
        seconds.value = duration.seconds()
      }, 1000)
    }

    onMounted(timer)

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

    const claimPendingRewardUBXT = () => {
      if (stakingContract.value != null) {
        if (ubxtEarned.value > 0) {
          stakingContract.value.methods
            .deposit(0, 0)
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

    const withdrawUbxtStake = async () => {
      if (stakingContract.value != null) {
        isWithdrawModalOpen.value = false
        if (withdrawValue.value > 0 && withdrawValue.value <= amount.value) {
          let withdrawV = new BigNumber(withdrawValue.value).multipliedBy(
            Math.pow(10, 18)
          )
          const ubxtBalance = new BigNumber(
            (
              await stakingContract.value.methods
                .userInfo(0, connectedWallet.value)
                .call()
            ).amount
          )
          if (withdrawV.gt(ubxtBalance)) {
            withdrawV = ubxtBalance
          }
          stakingContract.value.methods
            .withdraw(0, `0x${withdrawV.toString(16)}`)
            .send({
              from: connectedWallet.value,
              maxPriorityFeePerGas: null,
              maxFeePerGas: null
            })
            .on('receipt', () => {
              appNotify({
                type: 'success',
                message: 'Withdraw UBXT Success!'
              })
              fetchWalletData()
            })
            .on('error', () => {
              appNotify({
                type: 'error',
                message: 'Withdraw UBXT Failed!'
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

    const approveUbxtStake = async () => {
      if (ubxtContract.value != null) {
        ubxtContract.value.methods
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
              message: 'Approve UBXT success!'
            })
          })
          .on('error', () => {
            appNotify({
              type: 'error',
              message: 'Approve UBXT Failed!'
            })
          })
      }
    }

    const depositUbxtStake = async () => {
      if (ubxtContract.value != null && stakingContract.value != null) {
        isDepositModalOpen.value = false

        if (depositValue.value > 0 && depositValue.value <= ubxtBalance.value) {
          let depositV = new BigNumber(depositValue.value).multipliedBy(
            Math.pow(10, 18)
          )
          const ubxtBal = new BigNumber(
            await ubxtContract.value.methods.balanceOf(connectedWallet.value).call()
          )
          if (depositV.gt(ubxtBal)) {
            depositV = ubxtBal
          }
          stakingContract.value.methods
            .deposit(0, `0x${depositV.toString(16)}`)
            .send({
              from: connectedWallet.value,
              maxPriorityFeePerGas: null,
              maxFeePerGas: null
            })
            .on('receipt', () => {
              appNotify({
                type: 'success',
                message: 'Deposit UBXT success!'
              })
              fetchWalletData()
            })
            .on('error', () => {
              appNotify({
                type: 'error',
                message: 'Deposit UBXT Failed!'
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
      globalAPY,
      feeAPY,
      ubxtEarnedData,
      ubxtStakedData,
      isDepositModalOpen,
      isWithdrawModalOpen,
      amount,
      totalUbxtStaked,
      ubxtEarned,
      ubxtPerfFeeEarned,
      ubxtBalance,
      totalAllocPoint,
      poolAllocPoint,
      tokenPerBlock,
      finalPriceUbxt,
      withdrawValue,
      depositValue,
      claimPendingRewardUBXT,
      withdrawUbxtStake,
      approveUbxtStake,
      depositUbxtStake,
      summaryData,
      isApproved,
      conversionRateUBXT,
      formatNumber
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

.ubxt-staking {
  @media(min-width: 768px) {
    &__card,
    &__staking-card {
      max-width: 500px;
    }
  }
}
</style>
