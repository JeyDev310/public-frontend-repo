<template>
  <div class="flex flex-grow overflow-y-hidden">
    <!-- SIDEBAR TABLET - MOBILE -->
    <mq-layout mq="lg+">
      <Sidebar />
    </mq-layout>

    <!-- SIDEBAR MOBILE -->
    <mq-layout mq="sm-md">
      <SidebarMobile />
    </mq-layout>

    <!-- PAGE -->
    <div class="default-layout__offset flex flex-col flex-grow relative ml-0 overflow-y-auto custom-scrollbar">
      <AppLoader v-if="loading" />

      <template v-else>
        <!-- HEADER -->
        <Header />

        <!-- CONTENT -->
        <router-view #default="{ Component }">
          <div
            class="default-layout__page-wrap flex flex-grow md:pb-20 pb-20 4xl:pb-40"
            :class="[
              !isHeroPage && 'px-20 overflow-y-auto custom-scrollbar',
              !isHeroPageStyle && 'overflow-y-auto custom-scrollbar'
            ]"
            :style="defaultLayoutSpaceToTop"
          >
            <transition name="fade" mode="out-in">
              <component :is="Component" class="flex-grow" />
            </transition>
          </div>
        </router-view>

        <!-- MOBILE NAVIGATION (MOBILE) -->
        <mq-layout mq="sm-md" class="relative mt-auto z-100">
          <MobileNav />
        </mq-layout>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { vuex } from '@/store'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'
import { useWeb3 } from '@/global-setup/web3/web3.composition.setup'

import Sidebar from '@/components/sidebar/Sidebar.vue'
import SidebarMobile from '@/components/sidebar/SidebarMobile.vue'
import Header from '@/components/header/Header.vue'
import MobileNav from '@/components/MobileNav.vue'

export default defineComponent({
  name: 'DefaultLayout',

  components: { Sidebar, SidebarMobile, MobileNav, Header },

  setup () {
    /* USE GLOBAL SETUP */
    const {
      isHeroPage,
      isHeroMobilePage,
      fetchUserSettings,
      setThemeMode,
      fetchAccounts
    } = useGlobal()

    /* USE WEB3 SETUP */
    const { detectWalletBrowser } = useWeb3()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL } = useCustomBreakpoints()

    const isHeroPageStyle = computed((): boolean => isHeroPage.value && !isMD.value)
    const defaultLayoutSpaceToTopDesktop = computed((): string => {
      if (!isHeroPageStyle.value) return ''
      return is4XL.value ? 'margin-top: -94px' : 'margin-top: -124px'
    })

    const isHeroPageMobileStyle = computed((): boolean => isHeroMobilePage.value && isMD.value)
    const defaultLayoutSpaceToTopMobile = computed((): string => {
      if (!isHeroPageMobileStyle.value) return ''
      return 'margin-top: -84px; z-index: 1;'
    })

    const defaultLayoutSpaceToTop = computed((): string =>
      !isMD.value ? defaultLayoutSpaceToTopDesktop.value : defaultLayoutSpaceToTopMobile.value
    )

    const loading = ref<boolean>(false)

    async function initData (): Promise<void> {
      loading.value = true

      try {
        await vuex.auth.fetchUserInfo()
        await fetchUserSettings()
        await fetchAccounts()
        setThemeMode()
        detectWalletBrowser()
      } finally {
        loading.value = false
      }
    }
    initData()

    return { loading, isHeroPage, isHeroPageStyle, defaultLayoutSpaceToTop }
  }
})
</script>

<style lang="scss" scoped>
.default-layout {
  &__page-wrap {
    transition: margin-top 0.3s;
  }

  @media(min-width: 768px) {
    &__offset {
      margin-left: 75px;
    }
  }
}
</style>
