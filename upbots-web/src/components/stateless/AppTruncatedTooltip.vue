<template>
  <AppTooltip
    :disabled="!showTooltip"
    :content="content"
    v-bind="$attrs"
    @mouseenter="checkVisibility"
  >
    <div ref="activator" class="truncate">{{ content }}</div>
    <template #content>
      <slot name="content">
        {{ content }}
      </slot>
    </template>
  </AppTooltip>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'AppTruncatedTooltip',

  props: {
    content: {
      type: [String, Number] as PropType<string | number>
    }
  },

  setup () {
    const activator = ref()
    const showTooltip = ref<boolean>(false)

    const checkVisibility = (): void => {
      if (activator.value) {
        showTooltip.value = activator.value.scrollWidth > activator.value.clientWidth
      }
    }

    return { activator, showTooltip, checkVisibility }
  }
})
</script>
