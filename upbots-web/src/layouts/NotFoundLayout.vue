<template>
  <!-- TODO (NEED UPDATE IT WHEN DESIGN WILL BE READY) -->
  <div class="flex flex-col flex-grow items-center justify-center w-full p-20 md:p-30">
    <h1
      class="
        not-found-page__title
        text-bluster-blue
        dark:text-cloudless
        font-bold
        text-center
        leading-1
        mb-40
      "
    >
      404
    </h1>

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
  name: 'NotFoundLayout',

  setup () {
    return { routeNames }
  }
})
</script>

<style lang="scss" scoped>
.not-found-page {
  &__title {
    @media(min-width: 768px) {
      font-size: 200px;
    }

    @media(max-width: 767px) {
      font-size: 100px;
    }
  }
}
</style>
