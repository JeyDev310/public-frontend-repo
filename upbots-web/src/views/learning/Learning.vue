<template>
  <div class="flex flex-col flex-grow w-full">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Learning</h2>
    </Portal>

    <AppComingSoon />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Learning'
})
</script>
