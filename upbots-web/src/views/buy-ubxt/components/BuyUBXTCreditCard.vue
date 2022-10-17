<template>
  <div
    class="
      flex
      flex-col
      flex-shrink-0
      md:flex-shrink
      w-full
      pb-40
      md:pb-0
      md:pr-20
      lg:pr-40
      xl:pr-70
      overflow-y-auto
      custom-scrollbar
    "
  >
    <!-- TITLE -->
    <div class="flex flex-col items-end self-start mb-20 lg:mb-40">
      <h2 class="text-left md:text-md font-medium text-nile-blue dark:text-blair leading-1 mb-4">
        With Credit Card
      </h2>

      <h6 class="text-gull-gray leading-1 italic -mr-30">
        - By Indacoin
      </h6>
    </div>

    <!-- DESCRIPTION -->
    <p
      class="
        buy-ubxt-credit-card__desc
        flex flex-col
        w-full
        font-medium
        text-industrial-revolution
        dark:text-let-it-snow
        mb-40
        lg:mb-70
      "
    >
      <span>Buy securely on Indacoin with credit cards.</span>
      <span>The tokens will automatically added in your UpBots account.</span>
    </p>

    <!-- INDACOINT FRAME -->
    <div class="flex flex-col flex-grow self-center w-full items-center">
      <!-- INDACOIN WIDGET -->
      <iframe class="credit-card flex flex-col w-full" :src="url" />

      <!-- INDACOIN WIDGET COMING SOON STATE -->
      <!-- <AppCard
        class="
          credit-card
          is-coming-soon
          flex
          flex-col
          items-center
          justify-center
          self-center
          w-full
          shadow-200
          dark:shadow-100
          p-20
        "
      >
        <span class="text-nile-blue dark:text-let-it-snow font-bold text-xl">Coming Soon</span>
      </AppCard> -->
    </div>
    <div v-if="isAdblockDetected" class="flex flex-col flex-grow w-full pt-20">
      <MessageWidget icon-name="bulb" class="info-box__info-widget w-full">
        Please deactivate your adblocker to proceed with Indacoin.
      </MessageWidget>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { vuex } from '@/store'
import detectAdBlock from '@/utils/adblock-detector'

import MessageWidget from '@/components/MessageWidget.vue'

const IndacoinLink = 'https://indacoin.com/partner-widget/?partner=upbots&cur_from=USD&cur_to=UBXT'

export default defineComponent({
  name: 'BuyUBXTCreditCard',
  components: {
    MessageWidget
  },

  setup () {
    const isAdblockDetected = ref<boolean>(false)

    ;(async () => {
      const res = await detectAdBlock()
      isAdblockDetected.value = res
    })()

    const { email } = toRefs(vuex.auth.user)
    const getDepositEthAddress = computed(() => vuex.ubxtWallet?.perfeesUserWalletData?.depositAddressETH || '')
    const url = `${IndacoinLink}&user_id=${email.value}&address=${getDepositEthAddress.value}`

    return { url, isAdblockDetected }
  }
})
</script>

<style lang="scss" scoped>
.buy-ubxt-credit-card {
  &__desc {
    max-width: 600px;
  }
}
.credit-card {
  min-height: 395px;
  &.is-coming-soon {
    max-width: 300px;
  }
}

.info-box {
  @media(min-width: 2500px) {
    max-width: 800px;
    margin-left: -700px;

    &__info-widget {
      max-width: 700px;
    }
  }

  @media(min-width: 1920px) and (max-width: 2499px) {
    max-width: 522px;
    margin-left: -400px;
    max-height: 80px
  }

  @media(min-width: 768px) and (max-width: 2499px) {
    &__info-widget {
      max-width: 400px;
      max-height: 80px
    }
  }

  @media(min-width: 1440px) and (max-width: 1919px) {
    margin-left: -400px;
  }

  @media(min-width: 1280px) and (max-width: 1439px) {
    margin-left: -200px;
  }

  @media(min-width: 768px) and (max-width: 1919px) {
    max-width: 480px;
    max-height: 100px
  }

  @media(max-width: 767px) {
    max-width: 450px;
    max-height: 100px
  }
}
</style>
