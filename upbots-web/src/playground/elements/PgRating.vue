<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppRating:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40 mb-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppRating v-model="rating1" />
          <AppRating v-model="rating2" />
          <AppRating v-model="rating3" />
          <AppRating v-model="rating4" />
        </div>

        <div class="flex flex-col space-y-10">
          <p>size:</p>
          <AppRating v-model="rating1" size="40" />
          <AppRating v-model="rating2" size="40" />
          <AppRating v-model="rating3" size="40" />
          <AppRating v-model="rating4" size="40" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgRating',

  setup () {
    const rating1 = ref(1)
    const rating2 = ref(1.8)
    const rating3 = ref(2.5)
    const rating4 = ref(5)

    return {
      rating1,
      rating2,
      rating3,
      rating4
    }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
