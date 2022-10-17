<template>
  <div :class="wrapperClasses" class="flex items-center space-x-30">
    <!-- Dark -->
    <AppTooltip content="Dark mode" class="flex">
      <AppIcon
        name="moon"
        :size="size"
        color-light="inherit"
        color-dark="inherit"
        :class="['cursor-pointer transition', { 'opacity-20 hover:opacity-40': !isDarkMode }]"
        @click.stop.prevent="onThemeChanged(true)"
      />
    </AppTooltip>

    <!-- Light -->
    <AppTooltip content="Light mode" class="flex">
      <AppIcon
        name="sun"
        :size="size"
        color-light="inherit"
        color-dark="inherit"
        :class="[`cursor-pointer transition`, { 'opacity-20 hover:opacity-40': isDarkMode }]"
        @click.stop.prevent="onThemeChanged(false)"
      />
    </AppTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppThemeToggle',

  props: {
    wrapperClasses: {
      type: String as PropType<string>,
      default: 'text-nile-blue dark:text-white'
    },

    size: {
      type: String as PropType<string>,
      default: '30'
    }
  },

  setup () {
    const { onThemeChanged, isDarkMode } = useGlobal()

    return { isDarkMode, onThemeChanged }
  }
})
</script>
