<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppRadio:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>size sm:</p>
          <AppRadio v-model="radioDefault" label="Default" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md:</p>
          <AppRadio v-model="radioDefault" label="Default" size="md" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg:</p>
          <AppRadio v-model="radioDefault" label="Default" size="lg" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppRadio v-model="radioDefault" label="Default" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>selected:</p>
          <AppRadio v-model="radioSelected" label="Selected" input-value="20" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>toggle:</p>
          <div class="flex items-center space-x-10">
            <AppRadio v-model="radioToggle" label="Toggle" class="mr-20" />
            <AppRadio v-model="radioToggle" label="Toggle" input-value="21" />
          </div>
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled:</p>
          <div class="flex items-center space-x-10">
            <AppRadio v-model="radioDisabled" label="Toggle" class="mr-20" disabled />
            <AppRadio v-model="radioDisabled" label="Selected" input-value="22" disabled />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import AppRadio from '@/components/stateless/AppRadio.vue'

export default defineComponent({
  name: 'PgRadio',

  components: { AppRadio },

  setup () {
    const radioDefault = ref('19')
    const radioSelected = ref('20')
    const radioToggle = ref('21')
    const radioDisabled = ref('22')

    return { radioDefault, radioSelected, radioToggle, radioDisabled }
  }
})
</script>

<style scoped>
.playground-radio-container {
  max-width: 1000px;
}
</style>
