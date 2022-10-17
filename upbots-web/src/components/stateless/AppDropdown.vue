<template>
  <AppFlyout
    ref="appFlyout"
    v-bind="$attrs"
    :offset="offset"
    popper-classes="bg-white dark:bg-crow-black shadow dark:shadow-100 rounded-sm1 px-16"
  >
    <template #activator="{ isVisible }">
      <slot name="preview" :preview="isVisible">
        <div class="activator cursor-pointer inline-flex items-center">
          <span v-if="title" :class="titleColor">{{ title }}</span>

          <span
            v-if="modelValue && modelValue.label"
            class="activator__clicked-item text-nile-blue dark:text-turquoise-chalk transition duration-300"
            :class="{'ml-10': title}"
          >
            <AppTruncatedTooltip :content="modelValue.label" />
          </span>

          <AppIcon
            name="chevron-bold"
            size="10"
            class="activator__arrow activator__arrow--clicked-item ml-7 transition duration-300 transform"
            :class="[isVisible ? 'rotate-180' : 'rotate-0']"
          />
        </div>
      </slot>
    </template>

    <template #popper>
      <slot name="content">
        <div v-if="actions && actions.length" :style="`width: ${dropdownWidth}`">
          <div
            v-for="(action, i) in actions"
            :key="`dropdown_action_${i}`"
            :class="dropdownActionClasses"
            class="dropdown__item"
            @click="onClickAction(action)"
          >
            <slot name="actions" :action="action" />
            <AppTruncatedTooltip :content="action.label" />
          </div>
        </div>
      </slot>
    </template>
  </AppFlyout>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { TDropdownOption } from '@/types'

interface IDropdownActions {
  label: string;
  value?: string;
  method?: 'change' | 'edit' | 'remove';
}

export default defineComponent({
  name: 'AppDropdown',

  props: {
    modelValue: {
      type: Object as PropType<TDropdownOption>,
      default: () => ({})
    },

    title: {
      type: String as PropType<string>,
      default: ''
    },

    titleColor: {
      type: String as PropType<string>,
      default: 'text-white'
    },

    actions: {
      type: Array as PropType<IDropdownActions[]>
    },

    dropdownWidth: {
      type: String as PropType<string>,
      default: '100px'
    },

    dropdownActionClasses: {
      type: String as PropType<string>,
      default: 'flex items-center'
    },

    offset: {
      type: Number as PropType<number>,
      default: 10
    }
  },

  emits: ['update:modelValue', 'change', 'edit', 'remove'],

  setup (_, { emit }) {
    const appFlyout = ref()

    const onClickAction = (action: IDropdownActions): void => {
      if (action.method) emit(action.method)

      emit('update:modelValue', action)
      emit('change', action)

      appFlyout.value.handleHidePopper(null, false)
    }

    return { appFlyout, onClickAction }
  }
})
</script>

<style lang="scss">
.activator {
  &__arrow {
    &--clicked-item {
      @apply text-nile-blue dark:text-turquoise-chalk;
    }
  }

  &:hover {
    .activator__clicked-item, .activator__arrow--clicked-item {
      @apply text-nile-blue dark:text-turquoise-chalk;
    }
  }
}
.dropdown {
  &__item {
    @apply
      text-chicory-flower
      dark:text-white
      hover:text-hidden-sea-glass
      dark:hover:text-hidden-sea-glass
      border-b
      border-desired-dawn
      dark:border-waterhen-back
      last:border-none
      font-medium
      py-10
      transition
      duration-300
      cursor-pointer;
  }
}
</style>
