
<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppToggle:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>primary</p>
          <AppToggle v-model="toggle" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>secondary</p>
          <AppToggle v-model="toggle" type="secondary" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>default</p>
          <AppToggle v-model="toggle" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>with text</p>
          <AppToggle v-model="toggle" activeLabel="Text 2" inactiveLabel="Text 1" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled</p>
          <AppToggle v-model="toggle" disabled />
        </div>

        <div class="flex flex-col space-y-10">
          <p>label click</p>
          <AppToggle v-model="toggle" labelClick activeLabel="Text 2" inactiveLabel="Text 1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import AppToggle from '@/components/stateless/AppToggle.vue'

export default defineComponent({
  name: 'PgToggle',

  components: { AppToggle },

  setup () {
    const toggle = ref(false)

    return { toggle }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
