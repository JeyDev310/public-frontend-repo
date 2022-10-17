<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppLoader:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>default: <code>{{ '<AppSkeleton />' }}</code></p>
          <AppSkeleton />
        </div>

        <div class="flex flex-col space-y-10">
          <p>card: <code>{{ '<AppSkeleton type="pieChart" />' }}</code></p>
          <AppSkeleton type="card" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>pie: <code>{{ '<AppSkeleton type="pieChart" />' }}</code></p>
          <AppSkeleton type="pieChart" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>line-chart: <code>{{ '<AppSkeleton type="lineChart" />' }}</code></p>
          <AppSkeleton type="lineChart" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>table: <code>{{ '<AppSkeleton type="table" view-box="0 0 1000 550" />' }}</code></p>
          <AppSkeleton type="table" view-box="0 0 1000 550" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgSkeleton'
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
