<template>
  <div class="flex w-full flex-col text-nile-blue dark:text-let-it-snow px-20">
    <h2 class="text-xl md:text-2xl text-seal-blue dark:text-white-lilac text-center font-semibold mb-20">Top Up</h2>

    <p class="text-center mb-30">
      To credit your UpBots account, you can transfer your UBXTs on the following address
    </p>

    <div class="flex items-center space-x-6 mb-6">
      <div class="flex items-center">
        <p class="text-nile-blue dark:text-let-it-snow leading-1">ERC20</p>
        <img
          src="/img/cryptocoins/eth.svg"
          alt="ERC20"
          class="w-18 h-18 rounded-full ml-4"
        >
      </div>
      <p class="text-nile-blue dark:text-let-it-snow leading-1">&#38;</p>
      <div class="flex items-center">
        <p class="text-nile-blue dark:text-let-it-snow leading-1">BSC</p>
        <img
          src="/img/cryptocoins/bnb.svg"
          alt="BSC"
          class="w-18 h-18 rounded-full ml-4"
        >
      </div>
    </div>
    <AppInput
      ref="depositEthAddressRef"
      v-model="getDepositEthAddress"
      :disabled="!getDepositEthAddress"
      class="w-full"
      size="xlg"
      readonly
      allow-copy
      @on-copy="getDepositEthAddress && copyEthLink()"
    />
    <!-- <AppInput
      ref="depositBscAddressRef"
      v-model="getDepositBscAddress"
      readonly
      label="Binance Smart Chain"
      size="xlg"
      class="mt-10"
    >
      <template #append>
        <AppIcon
          name="copy"
          size="18"
          class="flex items-center justify-center px-10 cursor-pointer"
          @click="copyBscLink()"
        />
      </template>
    </AppInput> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { vuex } from '@/store'
import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'UBXTTopUpModal',

  setup () {
    const depositEthAddressRef = ref()
    const depositBscAddressRef = ref()

    const getDepositEthAddress = computed(() => {
      if (vuex.ubxtWallet?.perfeesUserWalletData) return vuex.ubxtWallet.perfeesUserWalletData.depositAddressETH
      return ''
    })

    const getDepositBscAddress = computed(() => {
      if (vuex.ubxtWallet?.perfeesUserWalletData) return vuex.ubxtWallet.perfeesUserWalletData.depositAddressBSC
      return ''
    })

    function copyEthLink () {
      const tempInput = document.createElement('input')
      tempInput.value = getDepositEthAddress.value
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      appNotify({ type: 'info', message: 'Copied to clipboard' })
    }

    function copyBscLink () {
      const copyText: any = depositBscAddressRef.value.$el.children[1].children[0]
      copyText.select()
      document.execCommand('copy')
      appNotify({ type: 'info', message: 'Copy binance smart chain address to clipboard' })
    }

    return {
      depositEthAddressRef,
      depositBscAddressRef,
      getDepositEthAddress,
      getDepositBscAddress,
      copyEthLink,
      copyBscLink
    }
  }
})
</script>
