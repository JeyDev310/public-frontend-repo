<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppNoData:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppNoData />
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom title:</p>
          <AppNoData title="No data custom title" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>in AppCard:</p>
          <AppCard class="p-20">
            <AppNoData title="No data custom title" />
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgNoData'
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
