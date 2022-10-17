<template>
  <AppCard
    :is-default-background="false"
    class="my-trades-card relative text-center lg:text-left px-20 xl:px-24 py-12"
  >
    <h3 class="font-semibold text-white text-md md:text-lg lg:text-4xl">
      <slot />
    </h3>

    <p class="text-white text-sm md:text-base 2xl:text-md">{{ title }}</p>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'MyTradesCard',

  props: {
    title: {
      type: String as PropType<string>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.my-trades-card {
  background: linear-gradient(120deg, #68E7DD 10%, #307E88 80%), #68E7DD;
  @media(max-width: 767px) {
    min-height: 70px;
  }
}
</style>
