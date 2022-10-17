<template>
  <div class="mr-10 md:mr-16 4xl:mr-30">
    <button
      class="
      metamask-btn
      flex
      items-center
      justify-center
      relative
      md:w-auto
      rounded-full
      md:rounded-sm
      md:py-5
      md:px-20
      "
      :class="!is3XL ? '3xl:h-36 4xl:h-44' : 'md:h-36'"
      @click="!isMetamaskConnected ? $emit('connect') : isMetamskInfoModalOpen = true"
    >
      <img
        src="/img/metamask/metamask.svg"
        alt="metamask"
        class="w-16 md:w-18 4xl:w-20 mr-0 md:mr-10"
      >

      <mq-layout mq="lg+">
        <p
          v-if="!isMetamaskConnected"
          class="text-white font-semibold md:text-sm lg:text-base 4xl:text-md"
        >
          Connect to MetaMask
        </p>

        <p v-else class="text-white font-semibold">{{ $filters.truncString(walletAddress) }}</p>
      </mq-layout>

      <!-- CONNECT STATUS -->
      <mq-layout
        mq="sm-md"
        class="
          metamask-btn__status
          absolute
          -top-2
          -right-2
          w-16
          h-16
          rounded-full
        "
        :class="!isMetamaskConnected ? 'bg-red-400' : 'bg-green-400'"
      >
        <div />
      </mq-layout>

      <!-- NETWORK ERROR MESSAGE -->
      <span
        v-if="!isCorrectNetwork && isMetamaskConnected"
        class="
          absolute
          -bottom-20
          left-1/2
          transform
          -translate-x-1/2
          whitespace-nowrap
          text-red-400
          text-xs
          md:text-sm
          leading-1
          font-semibold
        "
      >
        {{ networkErrorMessage }}
      </span>
    </button>

    <!-- MODAL -->
    <AppModal v-model="isMetamskInfoModalOpen">
      <div class="flex flex-col items-center w-full space-y-20">
        <h2 class="text-seal-blue dark:text-white text-center text-xl font-semibold">Your wallet:</h2>

        <AppInput
          v-model="walletAddress"
          disable
          allowCopy
          readonly
          class="w-full"
          @on-copy="e => (copyToClipboard({value: e}))"
        />

        <AppButton class="metamask-modal-btn" @click="logout()">Logout</AppButton>
      </div>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { copyToClipboard } from '@/core/helpers'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'AppMetamaskButton',

  props: {
    isMetamaskConnected: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    address: {
      type: String as PropType<string>,
      required: false
    },

    networkErrorMessage: {
      type: String as PropType<string>,
      required: false
    },

    isCorrectNetwork: {
      type: Boolean as PropType<boolean>,
      required: false
    }
  },

  emits: ['connect', 'disconnect'],

  setup (props, { emit }) {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is3XL } = useCustomBreakpoints()

    const isMetamskInfoModalOpen = ref<boolean>(false)
    const walletAddress = ref<string>('')

    function logout (): void {
      isMetamskInfoModalOpen.value = false
      walletAddress.value = ''

      emit('disconnect')
    }

    watch(() => props.address, () => {
      walletAddress.value = props.address as string
    })

    return {
      is3XL,
      isMetamskInfoModalOpen,
      walletAddress,
      copyToClipboard,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.metamask-btn {
  background: linear-gradient(69.8deg, #E8821E 21.44%, #FFFFFF 357.38%);
  &:hover {
    background: linear-gradient(69.8deg, #E8821E 21.44%, #FFFFFF 250.38%);
  }
  &:active {
    background: linear-gradient(69.8deg, #E8821E 21.44%, #FFFFFF 250.38%);
  }
}

.metamask-btn {
  @media(min-width: 2500px) {
    height: 44px;
  }

  @media(max-width: 767px) {
    height: 40px;
    width: 40px;
  }
}

.metamask-modal-btn {
  min-width: 150px;
}
</style>
