<template>
  <router-link
    :to="{ name: routeNames.login }"
    class="flex items-center text-white md:text-nile-blue md:dark:text-white mb-20"
  >
    <AppIcon
      name="arrow-long"
      :size="is4XL ? '20' : is6XL ? '22' : '18'"
      class="mr-7"
    />

    <span class="4xl:text-base 5xl:text-md">Back to Sign In</span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routeNames } from '@/router'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'BackToSignIn',

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is6XL } = useCustomBreakpoints()

    return { is4XL, is6XL, routeNames }
  }
})
</script>
