<template>
  <div class="w-full text-nile-blue dark:text-white">
    <div class="mb-20">
      <p class="mb-5">Example usage:</p>
      <code class="p-20">{{ `<AppIcon name="eye" />` }}</code>
      <AppIcon name="eye" />
    </div>
    <div class="mb-20">
      <p class="mb-5">Color and size:</p>
      <code class="p-20">
        {{ `<AppIcon name="eye" size="30" color-dark="bianchi-green" color-light="bianchi-green" />` }}
      </code>
      <AppIcon name="eye" size="40" color-dark="bianchi-green" color-light="bianchi-green" />
    </div>
    <div class="playground-images-container mt-40">
      <div v-for="icon of icons" :key="icon.name" class="grid grid-cols-2 gap-x-10 mb-10 last:mb-0">
        <pre>icon-{{ icon?.properties.name }}</pre>
        <div>
          <AppIcon :name="icon?.properties.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { icons as cusomtIcons } from '@/assets/fonts/icomoon/selection.json'

import AppIcon from '@/components/stateless/AppIcon.vue'

export default defineComponent({
  name: 'PgIcons',

  components: {
    AppIcon
  },

  setup () {
    const icons = cusomtIcons

    return { icons }
  }
})
</script>

<style scoped>
.playground-images-container {
  max-width: 400px;
}
</style>
