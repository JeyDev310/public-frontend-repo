<template>
  <div class="playground-input-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppInputNumber:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>size xs:</p>
          <AppInputNumber v-model="inputDefault" placeholder="Input size xs" size="xs" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size sm:</p>
          <AppInputNumber v-model="inputDefault" placeholder="Input size sm" size="sm" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md:</p>
          <AppInputNumber v-model="inputDefault" placeholder="Input size md" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg:</p>
          <AppInputNumber v-model="inputDefault" placeholder="Input size lg" size="lg" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size xlg:</p>
          <AppInputNumber v-model="inputDefault" placeholder="Input size xlg" size="xlg" />
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>label:</p>
          <AppInputNumber v-model="inputDefault" name="label" label="label" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>label classes:</p>
          <AppInputNumber v-model="inputDefault" name="label2" label="label2" label-classes="text-alexandria" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>label size:</p>
          <AppInputNumber v-model="inputDefault" name="label3" label="label3" label-size="text-sm" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>min:</p>
          <AppInputNumber v-model="inputDefault" :min="0" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>max:</p>
          <AppInputNumber v-model="inputDefault" :max="30" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>step:</p>
          <AppInputNumber v-model="inputDefault" :step="{ size: 2, value: 2 }" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>rounded:</p>
          <AppInputNumber v-model="inputDefault" input-rounded="rounded-full" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>placeholder:</p>
          <AppInputNumber v-model="inputDefault" placeholder="Input readonly" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>readonly:</p>
          <AppInputNumber v-model="inputDefault" readonly :is-arrow="false" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>off arrow:</p>
          <AppInputNumber v-model="inputDefault" :is-arrow="false" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled:</p>
          <AppInputNumber v-model="inputDefault" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgInputNumber',

  setup () {
    const inputDefault = ref(23)

    return { inputDefault }
  }
})
</script>

<style scoped>
.playground-input-container {
  max-width: 1000px;
}
</style>
