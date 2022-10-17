<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppFormatNumber:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppFormatNumber />
        </div>

        <div class="flex flex-col space-y-10">
          <p>is data:</p>
          <AppFormatNumber :data="data.val1" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>off formatted data:</p>
          <AppFormatNumber :data="data.val3" :is-formated="false" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>to fixed value:</p>
          <AppFormatNumber :data="data.val3" :is-formated="false" :to-fixed="4" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>is colored:</p>
          <AppFormatNumber :data="data.val3" :is-colored="false" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>text size:</p>
          <AppFormatNumber :data="data.val3" text-size="text-xl" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>is percent:</p>
          <AppFormatNumber :data="data.val3" percent />
        </div>

        <div class="flex flex-col space-y-10">
          <p>off show zero:</p>
          <AppFormatNumber :is-show-zero="false" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>currency symbol:</p>
          <AppFormatNumber :data="data.val3" currency-symbol="$" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>off math symbol:</p>
          <AppFormatNumber :data="data.val3" :is-math-symbols="false" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>positive classes:</p>
          <AppFormatNumber :data="data.val3" positive-classes="text-spring-bouquet" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>negative classes:</p>
          <AppFormatNumber :data="data.val2" negative-classes="text-alexandria" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>negative classes:</p>
          <AppFormatNumber not-available-classes="text-beguiling-blue" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>not available text:</p>
          <AppFormatNumber :is-show-zero="false" not-available-text="not available" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgFormatNumber',

  setup () {
    const data = {
      val1: 2,
      val2: -2,
      val3: 6666.1234
    }

    return { data }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
