
<template>
  <ul class="navigation flex relative z-10" :class="getModeName">
    <router-link
      v-for="{ route, icon } of mobileNav"
      :key="route"
      #default="{ navigate, isActive }"
      :to="{ name: route }"
      custom
    >
      <li class="navigation__nav-item" @click="navigate">
        <AppIcon
          :name="icon"
          size="25"
          class="flex items-center justify-center transition duration-300"
          :class="isActive ? 'text-chicory-flower dark:text-deep-aquamarine' : 'text-light-steel-blue'"
        />
      </li>
    </router-link>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { routeNames } from '@/router'
import { TSidebar } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'MobileNav',

  setup () {
    const { getModeName } = useGlobal()

    const isSidebarOpen = ref<boolean>(false)

    const mobileNav: TSidebar[] = [
      {
        route: routeNames.home,
        label: 'Dashboard',
        icon: 'home-mobile',
        exact: true
      },
      {
        route: routeNames.portfolio,
        label: 'Portfolio Monitoring',
        icon: 'portfolio-mobile',
        exact: false
      },
      {
        route: routeNames.algoBots,
        label: 'Algo Bots',
        icon: 'algo-bots-mobile',
        exact: false
      },
      {
        route: routeNames.keys,
        label: 'Keys',
        icon: 'keys-mobile',
        exact: false
      },
      {
        route: routeNames.manualTrade,
        label: 'Manual Trade',
        icon: 'manual-trade-mobile',
        exact: false
      }
    ]

    return { isSidebarOpen, getModeName, mobileNav }
  }
})
</script>

<style lang="scss" scoped>
.navigation {
  height: 58px;
  &.is-dark {
    background:
    linear-gradient(115.43deg, #41536D -21.78%, rgba(28, 38, 53, 0.56) 74.93%),
    linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%);
    box-shadow: 0px -8px 27px rgba(0, 0, 0, 0.25);
  }

  &.is-light {
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(282.45deg, #303946 44.34%, #3D4959 83.93%);
    box-shadow: 0px -8px 27px #D6E1EF;
  }

  &__nav-item {
    @apply flex items-center justify-center py-16 cursor-pointer;
    width: 25%;
  }
}
</style>
