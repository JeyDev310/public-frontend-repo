<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppTag:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>size sm</p>
          <AppTag :data="tagText" size="sm" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md</p>
          <AppTag :data="tagText" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg</p>
          <AppTag :data="tagText" size="lg" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>primary</p>
          <AppTag :data="tagText" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>secondary</p>
          <AppTag :data="tagText" type="secondary" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>tertiary</p>
          <AppTag :data="tagText" type="tertiary" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>slot</p>
          <AppTag type="tertiary">
            Slot Content
          </AppTag>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgTag',

  setup () {
    const tagText = 'AppTag'

    return { tagText }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
