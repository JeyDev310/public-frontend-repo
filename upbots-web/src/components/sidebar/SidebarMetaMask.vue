<template>
  <!-- METAMASK -->
  <div
    class="flex flex-shrink-0 items-center justify-start py-12 px-24 mb-2 cursor-pointer"
    @click="checkMetamaskEnabled"
  >
    <img
      src="/img/cryptocoins/ubxt.svg"
      alt="ubxt"
      class="sidebar-metamask__icon flex-shrink-0 w-full h-full object-cover"
    >

    <transition
      enter-active-class="transition transform"
      enter-from-class="w-0 -translate-x-10 opacity-0"
      enter-to-class="translate-x-0 opacity-100 w-auto"
      leave-active-class="transform duration-100 transition"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-10"
    >
      <p v-if="isSidebarOpen" class="sidebar-metamask__title">
        Add UBXT to Metamask
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Web3 from 'web3'

import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'SidebarMetaMask',

  props: {
    isSidebarOpen: {
      type: Boolean as PropType<boolean>,
      require: true
    }
  },

  setup () {
    const web3 = new Web3()

    const contractAddress = process.env.VUE_APP_WEB3_UBXTOKEN_PROXY_CONTRACT_ADDRESS

    async function checkMetamaskEnabled () {
      if (typeof web3.eth.givenProvider !== 'undefined') {
        if (web3.eth.givenProvider) {
          await web3.eth.givenProvider.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: contractAddress,
                symbol: 'UBXT',
                decimals: 18,
                image: `${window.location.origin}${'/img/cryptocoins/ubxt.svg'}`
              }
            }
          })
        }
      } else {
        appNotify({ type: 'warning', message: 'Please install MetaMask!' })
      }
    }

    return { checkMetamaskEnabled }
  }
})
</script>

<style lang="scss" scoped>
.sidebar-metamask {
  &__icon {
    width: 20px;
    height: 20px;
  }

  &__title {
    @apply
    font-semibold
    text-soaring-eagle
    dark:hover:text-let-it-snow
    hover:text-deep-aquamarine
    ml-20
    whitespace-nowrap
    transition
    duration-300
    text-sm
    md:text-base
    lg:text-sm
  }
}
</style>
