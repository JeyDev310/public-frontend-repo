<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppIcon:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppIcon />
        </div>

        <div class="flex flex-col space-y-10">
          <p>name:</p>
          <AppIcon name="info" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size:</p>
          <AppIcon name="info" size="30" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgIcon'
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
