<template>
  <div class="flex flex-col flex-grow w-full">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Signal Providers</h2>
    </Portal>

    <AppComingSoon />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SignalProviders'
})
</script>

<style lang="scss" scoped>
.coming-soon {
  &__bg {
    &:after {
      @apply absolute inset-0;
      content: '';
      background: rgba(6, 6, 6, 0.7);
    }
  }
  &__title {
    font-size: 100px;
  }
  &__desc {
    max-width: 800px;
  }
}
</style>
