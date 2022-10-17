<template>
  <div class="flex w-full flex-col text-nile-blue dark:text-let-it-snow mt-40 lg:mt-0">
    <h2
      class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-20"
    >
      Withdraw
    </h2>

    <p class="text-center mb-28">
      To withdraw your UBXT, please fill in the following information.
      Your request will be processed within 48 hours
    </p>

    <div class="flex flex-col md:flex-row items-center md:space-x-40 space-y-10 md:space-y-0 mb-40">
      <p class="text-nile-blue dark:text-let-it-snow">Network:</p>

      <div class="flex items-center justify-center md:justify-start w-full md:w-auto space-x-10 md:space-x-20">
        <!-- MAINTENANCE WORK (HIDDEN FOR NOW) -->
        <AppTooltip
          :trigger="!isMD ? 'hover' : 'click'"
          placement="top"
          content="Due to high gas fees the withdrawal on ETH are temporarly deactivated."
          class="flex"
        >
          <AppRadio v-model="networkToggleValue" label="ETH (9,5$ fees)" input-value="eth" disabled />
        </AppTooltip>
        <AppRadio v-model="networkToggleValue" label="BSC (0,5$ fees)" input-value="bsc" />
      </div>
    </div>

    <div class="flex flex-col w-full">
      <AppInput
        v-model="withdrawAddress"
        name="address"
        label="Address to withdraw"
        placeholder="Please enter address"
        size="lg"
        class="mb-30"
      />

      <div class="flex flex-col mb-40">
        <AppInputNumber
          v-model="withdrawAmount"
          :min="minAmount"
          :max="getPerfeesUserWalletAvailableAmount"
          name="amount"
          :label="getAmountLabel"
          placeholder="Please enter value"
          :is-arrow="false"
          size="lg"
          :disabled="!isStakingDataReady"
        />

        <p class="text-nile-blue dark:text-let-it-snow text-sm italic mt-8">
          Min ${{ minAmountInUsd }} ( {{ isStakingDataReady ? `${Math.ceil(minAmount)} UBXT` : 'calculating...' }} )
        </p>
      </div>

      <!-- SUBMIT BUTTON -->
      <AppButton class="w-full mt-auto" :disabled="isWithdrawing" @click="onWithdraw()">Withdraw</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

import Web3 from 'web3'

import { vuex } from '@/store'
import { ubxtWalletService } from '@/services'
import { EErrorsMessage } from '@/types'
import { stakingHelpers } from '@/views/staking/staking.helpers'
import { appNotify } from '@/components/stateless/notifications'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'UBXTWithdrawModal',

  emits: ['hideModal'],

  setup (_, { emit }) {
    const { isMD } = useCustomBreakpoints()

    const minAmountInUsd = 20 // min amount to withdrawal, in usd

    const web3 = new Web3()

    const ubxtAvailable = ref<number>(1000.12345)
    const networkToggleValue = ref<string>('bsc')
    const withdrawAmount = ref<number>(0)
    const withdrawAddress = ref<string>('')
    const isStakingDataReady = ref<boolean>(false)
    const isWithdrawing = ref<boolean>(false)

    const getPerfeesUserWalletAvailableAmount = computed(() => {
      if (vuex.ubxtWallet?.perfeesUserWalletData) return vuex.ubxtWallet.perfeesUserWalletData.availableAmount
      return 0
    })

    const minAmount = computed(() => {
      const stakingData = stakingHelpers.getData()
      const price = isStakingDataReady.value ? stakingData[networkToggleValue.value].finalPriceUbxt : 0.029
      return minAmountInUsd / price
    })

    const isWithdrawable = computed(() => {
      const amountIsValid = withdrawAmount.value > minAmount.value &&
      withdrawAmount.value <= getPerfeesUserWalletAvailableAmount.value
      const addressIsValid = web3.utils.isAddress(withdrawAddress.value)
      return amountIsValid && addressIsValid
    })

    const getAmountLabel = computed(() => {
      const value = getPerfeesUserWalletAvailableAmount.value ? getPerfeesUserWalletAvailableAmount.value.toFixed(2) : 0
      return `Amount - fees included ( ${value} UBXT available)`
    })

    async function onWithdraw () {
      if (!isWithdrawable.value) return false
      if (isWithdrawing.value) return false

      isWithdrawing.value = true
      const payload = {
        amount: withdrawAmount.value,
        address: withdrawAddress.value,
        transferType: 'WITHDRAW',
        isETH: networkToggleValue.value === 'eth'
      }

      try {
        const res = await ubxtWalletService.userWalletTransfer(payload) as { status: number; data: any; }
        if (res.status === 200) {
          if (res.data?.result) {
            await Promise.all([vuex.algobots.fetchUserWallet(), vuex.algobots.fetchBotWallets()])
            appNotify({ type: 'success', message: `${res.data.amount} UBXT has been withdrawn` })
          } else {
            appNotify({ type: 'error', message: 'The amount is insufficient for fees' })
          }
        }
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        emit('hideModal')
      }
      isWithdrawing.value = false
    }

    async function initData (): Promise<void> {
      try {
        await stakingHelpers.calcOnlyPrices()
        isStakingDataReady.value = true
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    onMounted(() => { initData() })

    return {
      isMD,
      withdrawAddress,
      minAmountInUsd,
      withdrawAmount,
      ubxtAvailable,
      networkToggleValue,
      isWithdrawable,
      isStakingDataReady,
      isWithdrawing,
      getPerfeesUserWalletAvailableAmount,
      getAmountLabel,
      minAmount,
      onWithdraw
    }
  }
})
</script>
