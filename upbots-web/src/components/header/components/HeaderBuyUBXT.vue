<template>
  <router-link
    #default="{ navigate }"
    :to="{ name: routeNames.buyUBXT }"
    custom
  >
    <div
      class="
        header__nav-menu-item-wrap
        group
        rounded-full
        mr-10
        md:mr-16
        4xl:mr-30
        last:mr-0
        cursor-pointer
      "
      @click="navigate()"
    >
      <div
        class="
          header__nav-menu-item
          flex
          items-center
          justify-center
          w-full
          h-full
          bg-blair
          md:group-hover:bg-opacity-30
          rounded-full
          transition
          duration-300
        "
        :class="!isHeroMobilePage ? 'text-blair bg-opacity-10' : 'text-white bg-opacity-30'"
      >
        <AppIcon
          name="credit-card"
          class="header__nav-menu-item--icon transition duration-300"
          :class="!isHeroMobilePage ? 'text-blair' : 'text-white'"
          :size="is3XL ? '20' : !is4XL ? '30' : '22'"
        />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routeNames } from '@/router'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'HeaderBuyUBXT',

  setup () {
    /* USE GLOBAL SETUP */
    const { isHeroMobilePage } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is3XL, is4XL } = useCustomBreakpoints()

    return { routeNames, is3XL, is4XL, isHeroMobilePage }
  }
})
</script>

<style lang="scss" scoped>
.header {
  &__nav-menu-item-wrap {
    &:active {
      .header {
        &__nav-menu-item {
          @apply bg-opacity-100;

          &--icon {
            @apply text-white;
          }
        }
      }
    }

    @media(min-width: 2500px) {
      @apply w-60 h-60;
    }

    @media(min-width: 1920px) and (max-width: 2499px) {
      height: 42px;
      width: 42px;
    }

    @media(max-width: 1919px) {
      @apply h-40 w-40;
    }
  }
}
</style>
