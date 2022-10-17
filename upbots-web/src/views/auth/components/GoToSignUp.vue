<template>
  <p
    class="
      text-let-it-snow
      md:text-bluster-blue
      md:dark:text-blair
      text-center
      text-base
      4xl:text-md2
      5xl:text-xl
      mt-24
      md:mt-30
    "
  >
    Don’t have an account?
    <router-link
      :to="{ name: routeNames.register }"
      class="text-white font-bold md:text-bianchi-green md:font-normal"
    >
      Sign Up
    </router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routeNames } from '@/router'

export default defineComponent({
  name: 'GoToSignUp',

  setup () {
    return { routeNames }
  }
})
</script>
