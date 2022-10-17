<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppCard default state:</h2>

      <AppCard class="flex flex-col items-center justify-center p-20">
        <h2>title</h2>
        <h3>subtitle</h3>
        <p>paragraph</p>
      </AppCard>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppCard custom color state:</h2>

      <AppCard class="flex flex-col items-center justify-center p-20" :is-default-background="false">
        <h2>title</h2>
        <h3>subtitle</h3>
        <p>paragraph</p>
      </AppCard>

      <AppCard class="custom-color flex flex-col items-center justify-center p-20" :is-default-background="false">
        <h2>title</h2>
        <h3>subtitle</h3>
        <p>paragraph</p>
      </AppCard>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppCard radius state:</h2>

      <AppCard class="flex flex-col items-center justify-center p-20" rounded="rounded-full">
        <h2>title</h2>
        <h3>subtitle</h3>
        <p>paragraph</p>
      </AppCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgCard'
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}

.custom-color {
  @apply bg-tradewind;
}
</style>
