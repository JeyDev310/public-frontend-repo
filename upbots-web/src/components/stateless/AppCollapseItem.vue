<template>
  <div>
    <div class="relative">
      <!-- PREVIEW -->
      <slot name="header" :collapsed="collapsed" />

      <!-- TOGGLE COLLAPSE BUTTON DEAFULT -->
      <AppIcon
        v-if="!$slots.triggerIcon"
        name="chevron-thin"
        size="14"
        class="text-blair transform absolute right-0 top-10 p-12 transition duration-300 cursor-pointer"
        :class="collapsed ? 'rotate-0' : 'rotate-180'"
        @click="toggleCollapse"
      />

      <!-- TOGGLE COLLAPSE BUTTON SLOT -->
      <div v-else class="absolute right-0 top-10 p-12 cursor-pointer" @click="toggleCollapse">
        <slot name="triggerIcon" :collapsed="collapsed" />
      </div>
    </div>

    <!-- CONTENT -->
    <transition
      enter-active-class="transform duration-300 transition in-expo delay-100"
      enter-from-class="opacity-0 scale-50"
      enter-to-class="scale-1 opacity-100"
      leave-active-class="transform duration-300 transition out-expo"
      leave-from-class="opacity-100 scale-1"
      leave-to-class="opacity-0 scale-50"
    >
      <template v-if="!collapsed">
        <slot name="content" :collapsed="collapsed" />
      </template>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, Ref, PropType } from 'vue'

export default defineComponent({
  name: 'AppCollapseItem',

  props: {
    name: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const activeNames = inject('activeNames') as Ref<string[]>

    const handleChangeCollapseItem = inject('change') as (value: string[]) => void

    const collapsed = computed((): boolean => !activeNames.value.includes(props.name))

    function toggleCollapse (): void {
      if (activeNames.value.includes(props.name)) {
        const filteredActiveNames = activeNames.value.filter((el: string) => el !== props.name)
        handleChangeCollapseItem(filteredActiveNames)
      } else {
        handleChangeCollapseItem([...activeNames.value, props.name])
      }
    }

    return { collapsed, toggleCollapse }
  }
})
</script>
