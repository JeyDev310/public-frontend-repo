<template>
  <div
    class="
      sidebar
      fixed
      top-0
      bottom-0
      left-0
      flex
      flex-col
      bg-white
      dark:bg-primary-dark-radial
      dark:shadow-100
      pt-24
      transition-all
      duration-200
      z-100
    "
    :class="{ 'is-open': isSidebarOpen }"
  >
    <div
      class="sidebar__expand flex items-center justify-center w-36 h-36 absolute rounded-full cursor-pointer"
      :class="getModeName"
      @click="[(isSidebarOpen = !isSidebarOpen), (isSubListOpen = false)]"
    >
      <AppIcon
        name="chevron-right"
        size="22"
        class="absolute text-md text-cowgirl-blue dark:text-promise-keeping transform duration-300"
        :class="{ 'transform rotate-180': isSidebarOpen }"
      />
    </div>

    <!-- SIDEBAR TOP -->
    <div class="flex items-center pl-14 pr-10 mb-40">
      <router-link :to="{ name: routeNames.home }" class="sidebar__logo-inner flex-shrink-0">
        <!-- WM -->
        <!-- <img
          src="/img/winter-mode/sidebar-logo-wm.svg"
          alt="sidebar-logo-wm"
          class="flex-shrink-0 w-full h-full object-cover"
        > -->

        <!-- Default mode -->
        <img
          src="/img/logos/logo.png"
          alt="sidebar-logo"
          class="flex-shrink-0 w-full h-full object-cover"
        >
      </router-link>

      <transition
        enter-active-class="transition transform"
        enter-from-class="w-0 -translate-x-10 opacity-0"
        enter-to-class="translate-x-0 opacity-100 w-auto"
        leave-active-class="transform duration-100 transition"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-10"
      >
        <div v-if="isSidebarOpen" class="flex items-center ml-10">
          <span class="dark:text-white text-chicory-flower text-3xl font-extrabold">UPBOTS</span>
        </div>
      </transition>
    </div>

    <!-- SIDEBAR NAV AVAILABLE -->
    <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <ul class="flex flex-col">
        <router-link
          v-for="item of sidebarNav"
          :key="item.route"
          #default="{ navigate, isActive }"
          :to="{ name: item.route }"
          custom
        >
          <!-- IF SIDEBAR ITEM HAS SUBITEMS -->
          <template v-if="item.subListItems && item.subListItems.length">
            <!-- PREVIEW IF SIDEBAR CLOSED -->
            <li
              v-if="!isSidebarOpen"
              class="sidebar__nav-item"
              :class="{ 'is-active': isActive }"
              @click="navigate()"
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
            </li>

            <!-- PREVIEW IF SIDEBAR OPEN -->
            <li
              v-else
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

              <transition
                enter-active-class="transition transform"
                enter-from-class="w-0 -translate-x-10 opacity-0"
                enter-to-class="translate-x-0 opacity-100 w-auto"
                leave-active-class="transform duration-100 transition"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-10"
              >
                <!-- soaring-eagle -->
                <div v-if="isSidebarOpen" class="flex items-center">
                  <p class="sidebar__nav-title">{{ item.label }}</p>

                  <AppIcon
                    name="chevron-thin"
                    size="12"
                    class="sidebar__nav-title"
                    :class="isSubListOpen && 'transform rotate-180'"
                  />
                </div>
              </transition>
            </li>

            <!-- SUBITEMS -->
            <template v-if="isSubListOpen && isSidebarOpen">
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

                  <transition
                    enter-active-class="transition transform"
                    enter-from-class="w-0 -translate-x-10 opacity-0"
                    enter-to-class="translate-x-0 opacity-100 w-auto"
                    leave-active-class="transform duration-100 transition"
                    leave-from-class="opacity-100 translate-x-0"
                    leave-to-class="opacity-0 -translate-x-10"
                  >
                    <!-- soaring-eagle -->
                    <p v-if="isSidebarOpen" class="sidebar__nav-title">
                      {{ subItem.label }}
                    </p>
                  </transition>
                </li>
              </router-link>
            </template>
          </template>

          <!-- WITHOUT SUBITEMS -->
          <AppTooltip
            v-else
            :content="item.betaLabel || item.label"
            :disabled="isSidebarOpen"
            placement="right"
            class="flex"
          >
            <li
              class="sidebar__nav-item"
              :class="{ 'is-active': isActive }"
              @click="[navigate(), (isSidebarOpen = false), (isSubListOpen = false)]"
            >
              <AppIcon
                :name="item.icon"
                size="20"
                class="
                  sidebar__nav-icon
                  relative
                  flex
                  items-center
                  justify-center
                  text-chicory-flower
                  transition
                  duration-300
                "
              >
                <!-- IS BETA -->
                <template v-if="!isSidebarOpen">
                  <span
                    v-if="item.isBeta"
                    class="absolute -right-6 -top-4 h-8 w-8 bg-deep-aquamarine rounded-full ml-10"
                  />
                </template>
              </AppIcon>

              <transition
                enter-active-class="transition transform"
                enter-from-class="w-0 -translate-x-10 opacity-0"
                enter-to-class="translate-x-0 opacity-100 w-auto"
                leave-active-class="transform duration-100 transition"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-10"
              >
                <!-- soaring-eagle -->
                <p v-if="isSidebarOpen" class="sidebar__nav-title">
                  <span>{{ item.label }}</span>

                  <!-- IS BETA -->
                  <span v-if="item.isBeta" class="sidebar__nav-title--beta ml-10">beta</span>
                </p>
              </transition>
            </li>
          </AppTooltip>
        </router-link>
      </ul>

      <!-- SIDEBAR DIVIDER -->
      <div
        class="sidebar__nav-divider-inner mt-16 mb-16"
        :class="{ 'is-active': isSidebarOpen }"
      >
        <div class="sidebar__nav-divider w-full h-1 bg-cowgirl-blue dark:bg-bianchi-green" />
      </div>

      <!-- SIDEBAR NAV COMING SOON -->
      <div class="flex flex-col">
        <p
          class="
            sidebar__coming-soon-title
            w-full
            mx-auto
            mb-9
            text-cowgirl-blue
            dark:text-bianchi-green
            text-sm
            text-center
          "
        >
          Coming Soon
        </p>

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
                class="sidebar__nav-icon flex items-center justify-center
                text-chicory-flower transition duration-300"
              />
              <transition
                enter-active-class="transition transform"
                enter-from-class="w-0 -translate-x-10 opacity-0"
                enter-to-class="translate-x-0 opacity-100 w-auto"
                leave-active-class="transform duration-100 transition"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-10"
              >
                <p v-if="isSidebarOpen" class="sidebar__nav-title">
                  {{ label }}
                </p>
              </transition>
            </li>
          </router-link>
        </ul>
      </div>

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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { router, routeNames } from '@/router'
import { availableRoutes, notAvailableRoutes } from '@/core/configs/sidebar.config'

import { vuex } from '@/store'

import { useGlobal } from '@/global-setup/global.composition.setup'

import SidebarMetaMask from '@/components/sidebar/SidebarMetaMask.vue'
import SidebarThemeSwitch from '@/components/sidebar/SidebarThemeSwitch.vue'
import SidebarCommunity from '@/components/sidebar/SidebarCommunity.vue'
import SidebarPrivacyPolicy from '@/components/sidebar/SidebarPrivacyPolicy.vue'

export default defineComponent({
  name: 'Sidebar',

  components: {
    SidebarMetaMask,
    SidebarCommunity,
    SidebarPrivacyPolicy,
    SidebarThemeSwitch
  },

  setup () {
    const { getModeName } = useGlobal()

    const isSidebarOpen = ref<boolean>(false)
    const isSubListOpen = ref<boolean>(false)

    const sidebarNav = availableRoutes
    const sidebarNavComingSoon = notAvailableRoutes

    vuex.notifications.openWebsocketConnection()

    return {
      routeNames,
      router,
      getModeName,
      isSidebarOpen,
      sidebarNav,
      sidebarNavComingSoon,
      isSubListOpen
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  width: 75px;

  &.is-open {
    @apply absolute top-0;
    width: 276px;
    transition-delay: 0s;
  }

  &__expand {
    right: -18px;
    top: 80px;
    box-shadow: 0px 9px 27px rgba(0, 0, 0, 0.25);

    &.is-dark {
      background: linear-gradient(
          105.7deg,
          #566c8b 23.43%,
          rgba(45, 59, 80, 0.56) 138.75%
        ),
        linear-gradient(282.45deg, #303946 44.34%, #3d4959 83.93%),
        linear-gradient(0deg, #37404d, #37404d), #c4c4c4;
    }

    &.is-light {
      @apply bg-white;
    }
  }

  /* WM */
  // &__logo-inner {
  //   width: 45px;
  //   height: 47px;
  // }

  /* Default mode */
  &__logo-inner {
    width: 45px;
    height: 45px;
  }

  &__nav-item {
    @apply flex items-center justify-start py-12 px-24 mb-2 last:mb-0 cursor-pointer;

    &:hover {
      .sidebar {
        &__nav-icon {
          @apply text-deep-aquamarine;
        }

        &__nav-title {
          @apply text-deep-aquamarine dark:text-let-it-snow;
        }
      }
    }

    &.is-active {
      .sidebar {
        &__nav-icon {
          @apply text-deep-aquamarine;
        }

        &__nav-title {
          @apply text-deep-aquamarine dark:text-let-it-snow;
        }
      }
    }
  }

  &__nav-title {
    @apply
      ml-20
      text-soaring-eagle
      font-semibold text-base lg:text-sm
      transition duration-300 whitespace-nowrap;

    &--beta {
      @apply bg-tradewind text-white py-2 px-6 rounded-sm;
    }
  }

  &__nav-icon {
    width: 20px;
    height: 20px;
  }

  &__nav-divider-inner {
    padding: 0 15px;

    &.is-active {
      padding: 0 34px;
    }
  }

  &__coming-soon-title {
    max-width: 60px;
  }
}
</style>
