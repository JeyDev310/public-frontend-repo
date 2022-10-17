<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppCryptoCoinChecker:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>Default state:</p>
          <AppCryptoCoinChecker />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Icon state:</p>
          <AppCryptoCoinChecker icon-name="btc" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Icon size:</p>
          <AppCryptoCoinChecker icon-name="btc" :icon-size="1.2" :img-size="18" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>Is colored:</p>
          <AppCryptoCoinChecker icon-name="btc" :icon-size="1.2" :img-size="18" :is-colored="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgCryptoCoinChecker'
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
