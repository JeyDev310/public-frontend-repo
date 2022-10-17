<template>
  <div
    class="select__wrap focus:outline-none"
    :class="[{'is-disabled': disabled}, sizes]"
    tabindex="0"
  >
    <div data-test="preview" class="select__preview" @click="toggle">
      <div class="flex-grow text-kettleman dark:text-white font-semibold mr-20 truncate">
        <slot name="selection" :value="rawValue" :hasInitialValue="hasInitialValue">
          <AppTruncatedTooltip :content="selectedValue || placeholder" />
        </slot>
      </div>

      <AppIcon
        data-test="arrow"
        name="chevron-bold"
        size="12"
        class="text-kettleman dark:text-white transform transition duration-300"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
      />
    </div>

    <transition name="dropdown" mode="out-in">
      <ul
        v-if="isOpen"
        data-test="options-list"
        class="select__options custom-scrollbar"
        :class="isDarkMode ? 'shadow-500' : 'shadow-600'"
      >
        <template v-for="item in options" :key="item.value">
          <Compute
            #default="{ isSelected, isDisabled }"
            :isSelected="isSelectedItem(item)"
            :isDisabled="isDisabledItem(item)"
          >
            <li
              data-test="option"
              class="select__options-item font-semibold mx-20 py-5
                border-b border-solid border-desired-dawn dark:border-waterhen-back
                transition duration-300 cursor-pointer"
              :class="{
                'is-selected': isSelected,
                'is-disabled': isDisabled
              }"
              @click="isDisabled ? null : setSelection(item)"
            >
              <slot
                name="options"
                :item="item"
                :is-selected="isSelected"
                :is-disabled="isDisabled"
              >
                {{ item[itemLabel] }}
              </slot>
            </li>
          </Compute>
        </template>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs, PropType } from 'vue'
import { TIndexedObject } from '@/types'
import { onClickOutside } from '@/hooks'
import { useGlobal } from '@/global-setup/global.composition.setup'

type TSelectOption = TIndexedObject<string | number>
type TSelectSizes = 'sm' | 'md' | 'lg'

export default defineComponent({
  name: 'AppSelect',

  props: {
    modelValue: {
      type: [String, Object, Array] as PropType<TSelectOption | Array<string | number> | string>,
      required: true
    },

    placeholder: {
      type: String as PropType<string>,
      default: 'Select options'
    },

    options: {
      type: Array as PropType<Array<TSelectOption>>,
      required: true
    },

    size: {
      type: String as PropType<TSelectSizes>,
      default: 'lg'
    },

    itemKey: {
      type: String as PropType<string>,
      default: 'value'
    },

    itemLabel: {
      type: String as PropType<string>,
      default: 'label'
    },

    disabledOptions: {
      type: Array as PropType<Array<string | number>>,
      default: null
    },

    multiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    returnSingleValue: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue', 'change'],

  setup (props, { emit }) {
    const isDarkMode = useGlobal()

    const {
      modelValue,
      size,
      options,
      multiple,
      itemKey,
      itemLabel,
      disabledOptions,
      disabled,
      returnSingleValue
    } = toRefs(props)

    const isOpen = ref<boolean>(false)

    const hasInitialValue = computed((): boolean => {
      if (Array.isArray(modelValue.value)) return modelValue.value.length > 0
      return Object.entries(modelValue.value).length > 0
    })

    const selectedValue = computed<string>((): string => {
      if (!hasInitialValue.value) {
        return ''
      }
      if (multiple.value) {
        return options.value
          .filter(i => (modelValue.value as Array<string | number>).includes(i[itemKey.value]))
          .map(i => i[itemLabel.value]).join(',')
      } else if (returnSingleValue.value) {
        const selectedOption = options.value.find(i => i[itemKey.value] === modelValue.value)
        return (selectedOption as TSelectOption)[itemLabel.value] as string
      } else {
        return (modelValue.value as TSelectOption)[itemLabel.value] as string
      }
    })

    const sizes = computed<string>((): string => `size-${size.value}`)

    // Controls
    function open (): void {
      if (disabled.value) return
      isOpen.value = true
    }

    function close (): void {
      if (disabled.value) return
      isOpen.value = false
    }

    function toggle (): void {
      if (disabled.value) return
      isOpen.value = !isOpen.value
    }

    function handleMultipleSelection (option: TSelectOption): (string | number | TSelectOption)[] {
      const value = option[itemKey.value]
      const set: Set<string | number | TSelectOption> = new Set(modelValue.value as Array<string | TSelectOption>)
      set.has(value) ? set.delete(value) : set.add(value)
      return Array.from(set)
    }

    function setSelection (option: TSelectOption): void {
      const toEmit = multiple.value
        ? handleMultipleSelection(option) : returnSingleValue.value ? option[itemKey.value] : option
      emit('update:modelValue', toEmit)
      emit('change', option)
      close()
      // if (!multiple.value) {} // todo
    }

    // States
    function isSelectedItem (option: TSelectOption): boolean {
      if (!hasInitialValue.value) {
        return false
      }
      if (multiple.value) {
        return (modelValue.value as Array<string | number>).some(i => i === option[itemKey.value])
      } else if (returnSingleValue.value) {
        return (modelValue.value as string) === option[itemKey.value]
      } else {
        return (modelValue.value as TSelectOption)[itemKey.value] === option[itemKey.value]
      }
    }

    function isDisabledItem (option: TSelectOption): boolean {
      return disabledOptions.value ? disabledOptions.value.includes(option[itemKey.value]) : false
    }

    onClickOutside(close)

    return {
      isDarkMode,
      hasInitialValue,
      isOpen,
      open,
      close,
      toggle,
      selectedValue,
      rawValue: modelValue,
      setSelection,
      isSelectedItem,
      isDisabledItem,
      sizes
    }
  }
})
</script>

<style lang="scss" scoped>
.select {
  &__wrap {
    @apply
      relative
      flex flex-col
      cursor-pointer
      bg-emptiness dark:bg-black dark:bg-opacity-20
      border border-solid border-empire-state-grey dark:border-transparent
      bg-opacity-30
      rounded-sm;

    &:not(.is-disabled) {
      &:hover {
        @apply bg-placebo-blue dark:bg-black dark:bg-opacity-30;
      }
    }

    &.size-sm {
      @apply text-sm;
      height: 26px;

      .select {
        &__options {
          @apply rounded-sm;
        }
        &__options-item {
          @apply mx-18 py-2;
        }
      }
    }

    &.size-md {
      @apply text-sm;
      height: 34px;

      .select {
        &__options {
          @apply rounded-sm;
        }
        &__options-item {
          @apply mx-18 py-5;
        }
      }
    }

    &.size-lg {
      @apply font-medium;
      height: 42px;

      .select {
        &__options {
          @apply rounded-sm;
        }
        &__options-item {
          @apply mx-20 py-5;
        }
      }
    }

    &:not(.is-disabled) {
      @apply focus:bg-placebo-blue dark:focus:bg-opacity-10;
    }

    &.is-disabled {
      @apply cursor-not-allowed opacity-50;
    }
  }

  &__preview {
    @apply flex flex-grow items-center w-full px-20;
  }

  &__options {
    @apply
      absolute left-0
      flex flex-col
      w-full h-auto
      bg-white dark:bg-crow-black
      py-9
      text-kettleman dark:text-white
      z-100
      overflow-y-auto;

    top: calc(100% + 5px);
    max-height: 300px;
  }

  &__options-item {
     &:last-child {
      @apply border-none;
     }
    &.is-selected {
      @apply text-chicory-flower dark:text-tradewind;
    }
    &.is-disabled {
      @apply text-silver dark:text-copen-blue opacity-50 cursor-not-allowed;
    }
    &:not(.is-disabled) {
      @apply hover:text-chicory-flower dark:hover:text-tradewind;
    }
  }
}
</style>
