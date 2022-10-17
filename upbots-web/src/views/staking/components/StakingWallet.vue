<template>
  <div class="mr-10 md:mr-16 4xl:mr-30">
    <AppButton
      class="wallet-btn flex items-center justify-center relative"
      :size="is3XL ? 'md' : !is4XL ? 'xlg' : 'lg'"
      @click="!isWalletConnected ? onConnectWallet() : onOpenInfoWallet()"
    >
      <AppIcon
        name="wallet-secondary"
        :size="is3XL ? '14' : !is4XL ? '20' : '16'"
        class="mr-0 md:mr-10"
      />
      <mq-layout mq="lg+">
        <p v-if="!isWalletConnected" class="text-white font-semibold leading-1">Connect to Wallet</p>
        <p v-else class="text-white font-semibold leading-1">
          {{ $filters.truncString(connectedWallet) }}
        </p>
      </mq-layout>

      <!-- CONNECT STATUS -->
      <mq-layout
        mq="sm-md"
        class="
          metamask-btn__status
          absolute
          -top-2
          -right-2
          w-14
          h-14
          rounded-full
        "
        :class="!isWalletConnected ? 'bg-red-400' : 'bg-green-400'"
      >
        <div />
      </mq-layout>

      <!-- NETWORK ERROR MESSAGE -->
      <span
        v-if="isIncorrectNetwork"
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
        Please select the right network.
      </span>
    </AppButton>

    <!-- MODAL -->
    <AppModal v-model="isWalletInfoModalOpen">
      <div class="flex flex-col items-center w-full space-y-20">
        <h2 class="text-seal-blue dark:text-white text-center text-xl font-semibold">Your wallet:</h2>

        <AppInput v-model="walletAddress" allowCopy readonly class="w-full" @on-copy="copyWalletAddress()" />

        <AppButton class="metamask-modal-btn" @click="onWalletLogout()">Logout</AppButton>
      </div>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

import { appNotify } from '@/components/stateless/notifications'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

// eslint-disable-next-line import/no-named-default
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

export default defineComponent({
  name: 'StakingWallet',
  props: {
    connectedWallet: {
      type: String,
      required: true
    },

    onWalletConnected: {
      type: Function,
      required: true
    },

    isIncorrectNetwork: {
      type: Boolean,
      required: true
    }
  },

  setup (props) {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is3XL, is4XL } = useCustomBreakpoints()

    const walletAddress = computed(() => props.connectedWallet)
    const isWalletConnected = computed(() => props.connectedWallet.length !== 0)
    const isWalletInfoModalOpen = ref(false)

    async function onConnectWallet () {
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: `${process.env.VUE_APP_WEB3_PROVIDER_INFURA_ID}`
            }
          }
        }
      })
      const provider = (web3Modal.cachedProvider === 'walletconnect' || web3Modal.cachedProvider === 'injected')
        ? await web3Modal.connectTo(web3Modal.cachedProvider)
        : await web3Modal.connect()

      props.onWalletConnected(provider, web3Modal)
    }

    onMounted(onConnectWallet)

    function onOpenInfoWallet () {
      isWalletInfoModalOpen.value = true
    }

    function onWalletLogout () {
      props.onWalletConnected(null)
      isWalletInfoModalOpen.value = false
    }

    function copyWalletAddress () {
      const tempInput = document.createElement('input')
      tempInput.value = props.connectedWallet
      document.body.appendChild(tempInput)
      tempInput.select()
      document.execCommand('copy')
      document.body.removeChild(tempInput)
      appNotify({ type: 'info', message: 'Copied to clipboard' })
    }

    return {
      is3XL,
      is4XL,
      walletAddress,
      isWalletConnected,
      isWalletInfoModalOpen,

      onConnectWallet,
      onOpenInfoWallet,
      copyWalletAddress,
      onWalletLogout
    }
  }
})
</script>

<style lang="scss" scoped>
.wallet-btn {
  &.is-primary {
    @media (max-width: 767px) {
      @apply p-0 rounded-full w-40 h-40;
    }
  }
}

.metamask-modal-btn {
  min-width: 150px;
}
</style>
