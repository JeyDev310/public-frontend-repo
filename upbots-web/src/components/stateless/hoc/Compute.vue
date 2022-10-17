<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Compute',

  setup (props, { slots, attrs }) {
    return () => slots.default && slots.default(attrs)
  }
})
</script>
