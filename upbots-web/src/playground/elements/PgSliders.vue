<template>
  <div class="flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppSlider:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>single</p>
          <div class="mb-20">{{ singleValue }}</div>
          <AppSlider v-model="singleValue" @changed="handleChanged" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>multiple</p>
          <div class="mb-20">{{ rangeValue }}</div>
          <AppSlider v-model="rangeValue" multiple @changed="handleChanged" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom step and range(min/max)</p>
          <div class="mb-20">{{ rangeValue }}</div>
          <AppSlider v-model="customValue" multiple step="10" min="-200" max="200" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>off slider value</p>
          <div class="mb-20">{{ rangeValue }}</div>
          <AppSlider v-model="rangeValue" :is-slider-value="false" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>label classes</p>
          <div class="mb-20">{{ rangeValue }}</div>
          <AppSlider v-model="rangeValue" label-classes="text-xl" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled</p>
          <AppSlider v-model="customValue" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgSliders',

  setup () {
    const singleValue = ref([20])
    const rangeValue = ref([20, 50])
    const customValue = ref([20, 50])

    function handleChanged (v: any) {
      console.log('v: ', v)
    }

    return {
      singleValue,
      rangeValue,
      customValue,

      handleChanged
    }
  }
})
</script>
