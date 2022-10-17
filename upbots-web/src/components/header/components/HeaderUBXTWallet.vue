<template>
  <mq-layout mq="lg+" class="group mr-10 md:mr-16 4xl:mr-30">
    <!-- UBXT BALANCE -->
    <router-link
      #default="{ navigate }"
      :to="{ name: routeNames.ubxtWallet }"
      custom
    >
      <div
        class="
          ubxt-balance__wrap
          flex
          justify-center
          items-center
          relative
          bg-blair
          bg-opacity-10
          group-hover:bg-opacity-30
          px-10
          rounded-full
          transition
          duration-300
          cursor-pointer
          lg:cursor-default
        "
        @click="isLG ? navigate() : null"
      >
        <!-- LOADER -->
        <AppLoader v-if="isUserWalletDataLoading" size="xs" class="rounded-full" />

        <!-- CONTENT -->
        <img
          src="/img/cryptocoins/ubxt.svg"
          alt="ubxt"
          class="w-20 h-20 3xl:w-22 3xl:h-22 4xl:w-30 4xl:h-30 rounded-full lg:mr-8 lg:cursor-pointer"
          @click="isLG ? null : navigate()"
        >
        <mq-layout
          mq="xl+"
          class="leading-1 font-medium text-sm 3xl:text-base 4xl:text-md"
          :class="isHeroPage ? 'text-blair' : 'dark:text-blair text-beguiling-blue'"
        >
          {{ formatNumber(getPerfeesUserWalletAmount) }} UBXT
        </mq-layout>
      </div>
    </router-link>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { routeNames } from '@/router'

import { vuex } from '@/store'

import { formatNumber } from '@/core/helpers'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'HeaderUBXTWallet',

  setup () {
    /* USE GLOBAL SETUP */
    const { isHeroPage, getPerfeesUserWalletAmount } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, isLG } = useCustomBreakpoints()

    const isUserWalletDataLoading = ref<boolean>(false)

    async function fetchUserWalletData (): Promise<void> {
      isUserWalletDataLoading.value = true

      try {
        await vuex.ubxtWallet.fetchUserWallet()
      } finally {
        isUserWalletDataLoading.value = false
      }
    }

    function initData () {
      // fetchUserWalletData() available only when screen width >= 768px (data shows only for tablet and desktop);
      if (!isMD.value) { fetchUserWalletData() }
    }

    initData()

    return {
      routeNames,
      formatNumber,
      isLG,
      isHeroPage,
      isUserWalletDataLoading,
      getPerfeesUserWalletAmount
    }
  }
})
</script>

<style lang="scss" scoped>
.ubxt-balance {
  @media(min-width: 2500px) {
    &__wrap {
      height: 60px;
    }
  }

  @media(min-width: 1920px) and (max-width: 2499px) {
    &__wrap {
      height: 42px;
    }
  }

  @media(max-width: 1919px) {
    &__wrap {
      @apply h-40;
    }
  }
}
</style>
