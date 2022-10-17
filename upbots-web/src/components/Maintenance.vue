<template>
  <div class="flex flex-col flex-grow items-center justify-center w-full p-20 md:p-30">
    <div class="meintenance__img w-full md:w-auto mb-45">
      <img src="/img/logos/upbots-robot-1.svg" alt="ubpots-robot" class="w-full h-full">
    </div>

    <h1 class="text-2xl md:text-5xl text-bluster-blue dark:text-cloudless font-semibold text-center mb-20">
      Hang on! We are under maintenance
    </h1>

    <p class="md:text-md text-nile-blue dark:text-soaring-eagle font-medium text-center mb-30">
      It will not take a long time till we get the error fixed. We will live again in.
    </p>

    <router-link #default="{ navigate }" :to="{ name: routeNames.home }" custom>
      <AppButton type="primary-border-filled" size="xlg" @click="navigate()">
        Go to Home page
      </AppButton>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routeNames } from '@/router'

export default defineComponent({
  name: 'Maintenance',

  setup () {
    return { routeNames }
  }
})
</script>

<style lang="scss" scoped>
.meintenance {
  &__img {
    @media(max-width: 767px) {
      max-width: 140px;
    }
  }
}
</style>
