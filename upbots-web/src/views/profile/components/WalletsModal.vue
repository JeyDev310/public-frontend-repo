<template>
  <AppModal
    v-model="isModalOpen"
    :beforeClose="handleModalClose"
    :closeOnBackdrop="closeOnBackdrop"
    modalWidth="665"
  >
    <div class="text-seal-blue dark:text-white">
      <h2 class="text-center text-2xl font-semibold mb-60">Connect a wallet</h2>

      <div class="flex flex-col items-center md:px-70">
        <div
          v-for="(item, index) in walletsList"
          :key="index"
          class="flex justify-center w-full rounded-sm mb-24 last:mb-0 cursor-pointer"
        >
          <AppButton type="primary-border-filled" size="xlg" class="flex items-center justify-center w-full">
            <div class="w-24 h-24 mr-20">
              <img :src="require(`@/assets/images/wallets/${item.image}`)" class="w-full">
            </div>

            <span class="self-center font-semibold text-seal-blue dark:text-white">{{ item.label }}</span>
          </AppButton>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { appConfirm } from '@/components/stateless/confirms/confirm.state'

export default defineComponent({
  name: 'WalletsModal',

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    currentAccount: {
      type: String as PropType<string>,
      default: ''
    },

    closeOnBackdrop: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    isConfirm: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const isModalOpen = computed(() => props.modelValue)

    const walletsList: {image: string; label: string;}[] = [
      {
        image: 'metamask.svg',
        label: 'Metamask'
      },
      {
        image: 'trust-wallet.svg',
        label: 'Trust Wallet'
      },
      {
        image: 'wallet-connect.svg',
        label: 'WalletConnect'
      },
      {
        image: 'safepal-wallet.png',
        label: 'SafePal Wallet'
      },
      {
        image: 'math-wallet.png',
        label: 'MathWallet'
      },
      {
        image: 'token-pocket.svg',
        label: 'TokenPocket'
      }
    ]

    function handleModalClose () {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const close = props.isConfirm && await appConfirm({
          title: 'Confirm your action',
          body: 'Are you sure to close?'
        })
        resolve(close)
        emit('update:modelValue', false)
      })
    }

    return { isModalOpen, walletsList, handleModalClose }
  }
})
</script>
