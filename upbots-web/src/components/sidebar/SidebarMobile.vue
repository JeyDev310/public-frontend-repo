<template>
  <transition
    enter-active-class="transition transform"
    enter-from-class="w-0 -translate-x-20 opacity-0"
    enter-to-class="translate-x-0 opacity-100 w-auto"
    leave-active-class="transform duration-100 transition"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-20"
  >
    <div
      v-if="isSidebarOpen"
      class="
        fixed
        top-0
        bottom-0
        left-0
        flex
        md:hidden
        w-full
        bg-black
        bg-opacity-30
        overflow-y-auto
        custom-scrollbar
        z-100
      "
      @click="backdropClick"
    >
      <div
        class="
          sidebar
          flex
          flex-col
          bg-white
          dark:bg-primary-dark-radial
          dark:shadow-100
          pt-24
          overflow-y-auto
          custom-scrollbar
        "
        @click.stop
      >
        <!-- SIDEBAR TOP -->
        <div class="sidebar__top flex flex-col mb-20 px-20">
          <div class="flex items-center">
            <router-link
              :to="{ name: routeNames.home }"
              class="user-avatar relative rounded-full flex-shrink-0 mr-18"
            >
              <img
                v-if="userAvatar.type === 'img'"
                :src="userAvatar.value"
                class="w-full rounded-full"
              >
              <div
                v-else
                class="
                  flex
                  items-center
                  justify-center
                  w-full
                  h-full
                  text-industrial-gray
                  dark:text-white
                  font-medium
                  text-xl
                  border-2
                  border-chicory-flower
                  dark:border-blair
                  rounded-full
                "
              >
                {{ userAvatar.value }}
              </div>
            </router-link>

            <div class="flex items-center text-chicory-flower dark:text-white font-semibold mr-10">
              <AppTruncatedTooltip :content="getUser.firstname" />
            </div>

            <AppIcon
              name="cross-thin"
              size="32"
              class="text-light-steel-blue ml-auto"
              @click="isSidebarOpen = false"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center w-full px-20 space-x-5 mb-20">
            <p class="text-chicory-flower dark:text-light-steel-blue font-medium">
              My Balance:
            </p>
            <p class="text-chicory-flower dark:text-white font-semibold">
              {{ formatNumber(getPerfeesUserWalletAmount) }} UBXT
            </p>
          </div>
        </div>

        <!-- SIDEBAR NAV AVAILABLE -->
        <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
          <ul class="flex flex-col">
            <router-link
              v-for="item of sidebarMobileNav"
              :key="item.route"
              #default="{ navigate, isActive }"
              :to="{ name: item.route }"
              custom
            >
              <!-- IF ITEM HAS SUBITEMS -->
              <template v-if="item.subListItems && item.subListItems.length">
                <!-- ITEM PREVIEW -->
                <li
                  class="sidebar__nav-item"
                  :class="{ 'is-active': isActive }"
                  @click="isSidebarOpen ? (isSubListOpen = !isSubListOpen) : null"
                >
                  <AppIcon
                    :name="item.icon"
                    size="20"
                    class="
                      sidebar__nav-icon
                      flex
                      items-center
                      justify-center
                      text-chicory-flower
                      transition
                      duration-300
                    "
                  />

                  <p class="sidebar__nav-title">{{ item.label }}</p>

                  <AppIcon
                    name="chevron-thin"
                    size="12"
                    class="sidebar__nav-title"
                    :class="isSubListOpen && 'transform rotate-180'"
                  />
                </li>

                <!-- SUBITEMS -->
                <template v-if="isSubListOpen">
                  <router-link
                    v-for="subItem of item.subListItems"
                    :key="subItem.route"
                    #default="{ navigate: subNavigate, isExactActive: isSubExactActive }"
                    :to="{ name: subItem.route }"
                    custom
                  >
                    <li
                      class="sidebar__nav-item"
                      :class="{ 'is-active': isSubExactActive }"
                      @click="[subNavigate(), (isSidebarOpen = false), (isSubListOpen = false)]"
                    >
                      <div class="sidebar__nav-icon" />
                      <p class="sidebar__nav-title">{{ subItem.label }}</p>
                    </li>
                  </router-link>
                </template>
              </template>

              <!-- WITHOUT SUBITEMS -->
              <template v-else>
                <li
                  v-if="!(item.isDAppPage && !!dappPagesList.includes(item.route))"
                  class="sidebar__nav-item"
                  :class="[
                    { 'is-active': isActive },
                    { 'is-disabled': (item.isDAppPage && !!dappPagesList.includes(item.route)) }
                  ]"
                  @click="[
                    (item.isDAppPage && !!dappPagesList.includes(item.route)) ? null : navigate(),
                    (isSidebarOpen = false),
                    (isSubListOpen = false)
                  ]"
                >
                  <AppIcon
                    :name="item.icon"
                    size="20"
                    class="
                      sidebar__nav-icon
                      flex
                      items-center
                      justify-center
                      text-chicory-flower
                      transition
                      duration-300
                    "
                  />

                  <p class="sidebar__nav-title">{{ item.label }}</p>

                  <!-- IS BETA -->
                  <span v-if="item.isBeta" class="sidebar__nav-title--beta ml-10">beta</span>
                </li>
              </template>
            </router-link>
          </ul>

          <!-- SIDEBAR DIVIDER -->
          <div class="sidebar__nav-divider-inner mt-16 mb-16">
            <div class="sidebar__nav-divider w-full h-1 bg-cowgirl-blue dark:bg-bianchi-green" />
          </div>

          <!-- SIDEBAR NAV COMING SOON -->
          <div class="flex flex-col">
            <p class="sidebar__coming-soon-title">Coming Soon</p>

            <ul class="flex flex-col">
              <router-link
                v-for="{ label, route, icon } of sidebarNavComingSoon"
                :key="route"
                #default="{ navigate, isActive }"
                :to="{ name: route }"
                custom
              >
                <li
                  class="sidebar__nav-item"
                  :class="{ 'is-active': isActive }"
                  @click="[navigate(), (isSidebarOpen = false)]"
                >
                  <AppIcon
                    :name="icon"
                    size="20"
                    class="
                      sidebar__nav-icon
                      flex
                      items-center
                      justify-center
                      text-chicory-flower
                      transition
                      duration-300
                     "
                  />
                  <p class="sidebar__nav-title">{{ label }}</p>
                </li>
              </router-link>
            </ul>

            <!-- METAMASK CONNECTION -->
            <SidebarMetaMask :is-sidebar-open="isSidebarOpen" />

            <!-- THEME -->
            <SidebarThemeSwitch :is-sidebar-open="isSidebarOpen" />

            <!-- COMMUNITY LINKS -->
            <SidebarCommunity :is-sidebar-open="isSidebarOpen" />

            <!-- PRIVACY POLICY LINKS -->
            <SidebarPrivacyPolicy :is-sidebar-open="isSidebarOpen" />
          </div>
        </div>
      </div>
    </div>
  </transition>

  <Portal to="mobile-menu-trigger">
    <div
      v-if="!isMobileMenuIcon"
      class="flex flex-col items-center mr-10 md:mr-0"
      @click="isSidebarOpen = true"
    >
      <AppIcon
        name="menu"
        :class="!isHeroMobilePage ? 'text-beguiling-blue dark:text-blair' : 'text-white'"
        size="28"
      />
    </div>
  </Portal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { routeNames, useRoute } from '@/router'
import { TSidebar } from '@/types'
import { notAvailableRoutes } from '@/core/configs/sidebar.config'
import { vuex } from '@/store'
import { formatNumber } from '@/core/helpers'
import { useWeb3 } from '@/global-setup/web3/web3.composition.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

import SidebarMetaMask from '@/components/sidebar/SidebarMetaMask.vue'
import SidebarThemeSwitch from '@/components/sidebar/SidebarThemeSwitch.vue'
import SidebarCommunity from '@/components/sidebar/SidebarCommunity.vue'
import SidebarPrivacyPolicy from '@/components/sidebar/SidebarPrivacyPolicy.vue'

export default defineComponent({
  name: 'SidebarMobile',

  components: {
    SidebarMetaMask,
    SidebarCommunity,
    SidebarPrivacyPolicy,
    SidebarThemeSwitch
  },

  setup () {
    const route = useRoute()

    /* USE WEB3 */
    const { isDAppBrowser } = useWeb3()

    /* USE GLOBAL SETUP */
    const { isHeroMobilePage, getPerfeesUserWalletAmount } = useGlobal()

    const sidebarMobileNav: TSidebar[] = [
      {
        route: routeNames.introduction,
        label: 'Get Started',
        icon: 'intro',
        exact: true,
        isDAppPage: false
      },
      {
        route: routeNames.home,
        label: 'Dashboard',
        icon: 'home-mobile',
        exact: true,
        isDAppPage: false
      },
      {
        route: routeNames.portfolio,
        label: 'Portfolio Monitoring',
        icon: 'portfolio-mobile',
        exact: false,
        isDAppPage: false
      },
      {
        route: routeNames.algoBots,
        label: 'Algo Rental',
        icon: 'algo-bots-active',
        exact: false,
        isDAppPage: false
      },
      {
        route: routeNames.myActiveBots,
        label: 'My Active Bots',
        icon: 'algo-bots',
        exact: false,
        isDAppPage: false
      },
      {
        route: routeNames.createMyBot,
        label: 'Create My Bot',
        isBeta: true,
        betaLabel: 'Create My Bot (beta)',
        icon: 'create-bot',
        exact: false,
        isDAppPage: false
      },
      {
        route: routeNames.copyTrading,
        label: 'Copy Trading',
        icon: 'algo-bots',
        exact: false,
        isDAppPage: false
      },
      {
        route: routeNames.myTrades,
        label: 'My Trades',
        icon: 'my-trade',
        isComingSoon: false,
        exact: false
      },
      {
        route: routeNames.manualTrade,
        label: 'Manual Trade',
        icon: 'manual-trade-mobile',
        exact: false,
        isDAppPage: false
      },
      {
        route: routeNames.staking,
        label: 'Staking',
        icon: 'staking',
        exact: false,
        isDAppPage: true
      },
      {
        route: routeNames.ubxtBridge,
        label: 'UBXT Bridge',
        icon: 'infinite',
        exact: false,
        isDAppPage: true
      },
      {
        route: routeNames.ubxtWallet,
        label: 'UBXT Wallet',
        icon: 'ubxt-wallets',
        exact: false,
        isDAppPage: false
      }
      // {
      //   route: routeNames.swap,
      //   label: 'Swap',
      //   icon: 'swap',
      //   exact: false,
      //   isDAppPage: true
      // },
    ]

    const dappPagesList = computed(() => {
      if (isDAppBrowser.value) return []
      // here you can add routes which containe web3 func part */
      return [routeNames.staking, routeNames.ubxtBridge]
    })

    const isSidebarOpen = ref<boolean>(false)

    const sidebarNavComingSoon = notAvailableRoutes

    const userAvatar = computed(() => vuex.auth.userAvatar)

    const getUser = computed(() => vuex.auth.user)

    const isSubListOpen = ref<boolean>(false)

    /* ROUTE NAMES TO SHOW MOBILE ARROW BACK ICON */
    const notAvailableRouteNames: string[] = [
      routeNames.algoBotDetailed,
      routeNames.myBotDetailed,
      routeNames.bscStaking,
      routeNames.bscStaking,
      routeNames.ethLpStaking,
      routeNames.ubxtVaultStaking,
      routeNames.ubxtStakingReward
    ]
    const isMobileMenuIcon = computed(() => notAvailableRouteNames.includes(route.name as string))

    vuex.notifications.openWebsocketConnection()

    function backdropClick () {
      isSidebarOpen.value = false
      isSubListOpen.value = false
    }

    // INIT SIDEBAR MOBILE DATA //
    function initSidebarMobileData () {
      vuex.ubxtWallet.fetchUserWallet()
    }
    initSidebarMobileData()

    return {
      routeNames,
      formatNumber,

      isDAppBrowser,
      isHeroMobilePage,

      dappPagesList,
      sidebarMobileNav,
      isSidebarOpen,
      isSubListOpen,
      sidebarNavComingSoon,
      userAvatar,
      getUser,
      getPerfeesUserWalletAmount,
      isMobileMenuIcon,
      backdropClick
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  width: 90%;
  padding-bottom: 58px;

  &__expand {
    @apply absolute
      flex items-center justify-center
      overflow-hidden
      w-30 h-30
      bg-sea-swimmer
      dark:bg-blue-syzygy
      rounded-full
      cursor-pointer;

    top: 70px;
    right: -15px;

    .icon-chevron-bold {
      right: 8px;

      &.is-active {
        right: 11px;
      }
    }
  }

  &__logo-inner {
    width: 45px;
    height: 45px;
  }

  &__nav-item {
    @apply flex items-center justify-start py-12 mb-2 last:mb-0;
    padding-left: 20px;
    padding-right: 20px;

    &:not(.is-disabled) {
      &.is-active {
        .sidebar {
          &__nav-icon {
            @apply text-pool-blue;
          }

          &__nav-title {
            @apply text-pool-blue dark:text-let-it-snow;
          }
        }
      }
    }

    &.is-disabled {
      .sidebar {
        &__nav-icon {
          @apply text-opacity-50;
        }

        &__nav-title {
          @apply text-opacity-50;
        }
      }
    }
  }

  &__nav-title {
    @apply ml-20
      text-soaring-eagle
      font-semibold text-sm
      transition duration-300;

    &--beta {
      @apply bg-tradewind text-white text-sm py-2 px-6 rounded-sm;
    }
  }

  &__nav-icon {
    width: 25px;
    height: 25px;
  }

  &__nav-divider-inner {
    padding: 0 15px;

    &.is-active {
      padding: 0 34px;
    }
  }

  &__coming-soon-title {
    @apply w-full mx-auto text-cowgirl-blue dark:text-bianchi-green text-sm text-center mb-9;
  }

  .user-avatar {
    height: 56px;
    width: 56px;
  }
}
</style>
