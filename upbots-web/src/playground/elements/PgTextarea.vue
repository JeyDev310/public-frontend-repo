
<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppTextarea:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>default</p>
          <AppTextarea v-model="textareaDefault" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>placeholder</p>
          <AppTextarea v-model="textareaPlaceholder" placeholder="Textarea default" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>resize</p>
          <AppTextarea v-model="textareaResize" placeholder="Textarea resize" resize />
        </div>

        <div class="flex flex-col space-y-10">
          <p>readonly</p>
          <AppTextarea v-model="textareaReadonly" placeholder="Textarea readonly" readonly />
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled</p>
          <AppTextarea v-model="textareaDisabled" placeholder="Textarea default" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgTextarea',

  setup () {
    const textareaDefault = ref('Textarea default')
    const textareaPlaceholder = ref('Textarea placeholder')
    const textareaResize = ref('Textarea resize')
    const textareaDisabled = ref('Textarea disabled')
    const textareaReadonly = ref('Textarea readonly')

    return {
      textareaDefault,
      textareaPlaceholder,
      textareaResize,
      textareaDisabled,
      textareaReadonly
    }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
