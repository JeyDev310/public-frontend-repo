<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppLoader:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>size xs</p>
          <AppCard class="min-h-75 relative">
            <AppLoader class="rounded-xlg" size="xs" />
          </AppCard>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size sm:</p>
          <AppCard class="min-h-75 relative">
            <AppLoader class="rounded-xlg" size="sm" />
          </AppCard>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md:</p>
          <AppCard class="min-h-300 relative">
            <AppLoader class="rounded-xlg" size="md" />
          </AppCard>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg:</p>
          <AppCard class="min-h-300 relative">
            <AppLoader class="rounded-xlg" size="lg" />
          </AppCard>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size xlg:</p>
          <AppCard class="min-h-300 relative">
            <AppLoader class="rounded-xlg" size="xlg" />
          </AppCard>
        </div>

        <div class="flex flex-col space-y-10">
          <p>text default:</p>
          <AppCard class="min-h-300 flex flex-col items-center justify-center">
            <AppTextLoader />
          </AppCard>
        </div>

        <div class="flex flex-col space-y-10">
          <p>text title:</p>
          <AppCard class="min-h-300 flex flex-col items-center justify-center">
            <AppTextLoader text="Custom text" />
          </AppCard>
        </div>

        <div class="flex flex-col space-y-10">
          <p>text only dots:</p>
          <AppCard class="min-h-300 flex flex-col items-center justify-center">
            <AppTextLoader text="" />
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgLoader'
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
