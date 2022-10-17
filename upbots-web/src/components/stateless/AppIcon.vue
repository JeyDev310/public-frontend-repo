<template>
  <span :class="classes" :style="styles"><slot /></span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'AppIcon',

  props: {
    name: {
      type: String,
      required: true
    },

    size: {
      type: [String, Number],
      default: 15
    }
  },

  setup (props) {
    const classes = computed((): string => `icon-${props.name}`)

    const styles = computed((): { fontSize: string; } => {
      return { fontSize: `${props.size}px` }
    })

    return { classes, styles }
  }
})
</script>
