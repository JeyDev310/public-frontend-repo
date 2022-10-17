<template>
  <!-- TUTORIAL -->
  <template v-if="!isExternalWindow() && isMD && isShowTuto">
    <Tutorial @on-close="handleCloseTuto" />
  </template>

  <!-- AUTH PAGES -->
  <template v-else>
    <!-- WM (should add relative) in default mode should remove relative -->
    <div class="auth__inner flex flex-col flex-grow justify-start overflow-y-auto custom-scrollbar">
      <!-- WM  -->
      <!-- <HeroWMSection /> -->

      <!-- WM (should add z-10) in default mode should remove z-10 -->
      <div
        class="
          auth__container
          flex
          flex-col
          flex-grow
          justify-center
          flex-shrink-0
          w-full
          mx-auto
          py-20
          4xl:py-40
          px-24
        "
      >
        <div class="md:flex flex-col justify-center pt-30 md:pt-0">
          <!-- TITLE and SUBTITLE-->
          <transition name="fade" mode="out-in">
            <div class="flex flex-col items-center justify-center mx-auto">
              <div v-if="getQuery" class="text-center mb-20">
                <span class="text-white font-semibold md:text-md">
                  {{ `You've been invited by ${getQuery}` }}
                </span>
              </div>

              <!-- WM -->
              <!-- <img
              src="/img/winter-mode/sidebar-logo-wm.svg"
              alt="logo"
              class="w-40 h-40 5xl:h-50 5xl:w-50 mr-8"
            > -->

              <!-- Default mode -->
              <img
                src="/img/logos/logo-full.png"
                alt="logo"
                class="h-40"
              >
            </div>
          </transition>

          <router-view #default="{ Component }">
            <mq-layout mq="lg+" class="mt-20 4xl:mt-40">
              <transition name="fade" mode="out-in">
                <AppCard class="shadow-200 dark:shadow-100 rounded-xl1 px-50 py-30 4xl:p-60 5xl:p-80">
                  <component :is="Component" />
                </AppCard>
              </transition>
            </mq-layout>

            <mq-layout mq="sm-md" class="mt-30 md:mt-80">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </mq-layout>
          </router-view>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from '@/router'

import { localStorageService } from '@/services'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import Tutorial from '@/views/tutorial/Tutorial.vue'

/* WM */
// import HeroWMSection from '@/components/winter-mode/HeroWMSection.vue'

export default defineComponent({
  name: 'AuthLayout',

  components: { Tutorial },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE GLOBAL SETUP */
    const { isDarkMode } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD } = useCustomBreakpoints()

    const isShowTuto = ref<boolean>(false)

    function isExternalWindow (): boolean {
      if (window.opener && !window.opener.closed) {
        return true
      }
      return false
    }

    function getTutorial (): void {
      if (!localStorageService.hasKey('upbots_tutorial')) {
        localStorageService.setItem('upbots_tutorial', true)
        isShowTuto.value = localStorageService.getItem('upbots_tutorial') as boolean
      } else {
        isShowTuto.value = localStorageService.getItem('upbots_tutorial') as boolean
      }
    }

    function handleCloseTuto (value: boolean): void {
      localStorageService.setItem('upbots_tutorial', value)
      isShowTuto.value = localStorageService.getItem('upbots_tutorial') as boolean
    }

    const getQuery = computed((): string => route.name === 'register' ? (route.query?.userName as string) : '')

    onMounted(() => { getTutorial() })

    return {
      route,
      isMD,
      isDarkMode,
      isShowTuto,
      getQuery,
      getTutorial,
      handleCloseTuto,
      isExternalWindow
    }
  }
})
</script>

<style lang="scss">
.auth {
  @media(min-width: 3000px) {
    &__container {
      max-width: 800px;
    }
  }

  @media(max-width: 2999px) {
    &__container {
      max-width: 560px;
    }
  }

  @media(min-width: 768px) {
    &__inner {
      background: url('/img/auth/auth-bg.jpg') no-repeat top center / cover,
      linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1696) 78.16%),
      linear-gradient(101.45deg, #60BCB5 22.36%, #7F86FF 93.31%);
    }
  }

  @media(max-width: 767px) {
    &__inner {
      background: url('/img/auth/auth-bg-mobile.jpg') no-repeat top center / cover,
      linear-gradient(128.47deg, #378C9C 21.26%, #8482D2 78.06%),
      linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%), #37404D;
      .auth {
        &__button {
          min-width: 205px;

          &.button {
            min-height: 46px;
          }
        }
      }
    }
  }
}
</style>
