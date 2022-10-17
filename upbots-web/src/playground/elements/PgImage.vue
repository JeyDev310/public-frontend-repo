<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppImage:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppImage
            src="/img/robots/robot-type1.svg"
            alt="robot"
            width="117"
            height="146"
          />
        </div>

        <div class="flex flex-col space-y-10">
          <p>img class:</p>
          <AppImage
            src="/img/robots/robot-type1.svg"
            alt="robot"
            width="117"
            height="146"
            img-class="bg-alexandria"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgImage'
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
