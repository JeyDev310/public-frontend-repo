<template>
  <span>
    <span ref="button" class="popper-activator">
      <slot name="activator" :isVisible="isVisible">
        <AppButton size="sm">{{ btnTitle }}</AppButton>
      </slot>
    </span>

    <span ref="popper" class="popper" :class="[popperClasses, hiddenClass]">
      <span v-if="showArrow" :class="['popper__arrow', arrowClasses]" data-popper-arrow />
      <slot name="popper" />
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, nextTick, ref, Ref, PropType, watch } from 'vue'
import { createPopper, Placement } from '@popperjs/core'
import { onClickOutside } from '@/hooks'

export default defineComponent({
  name: 'AppFlyout',

  props: {
    popperClasses: {
      type: String as PropType<string>,
      default: 'py-5 bg-catskill-white dark:bg-blue-syzygy text-nile-blue dark:text-stone-silver'
    },

    arrowClasses: {
      type: String as PropType<string>,
      default: ''
    },

    btnTitle: {
      type: String as PropType<string>,
      default: 'Button'
    },

    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    appendToBody: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    showArrow: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    trigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'click'
    },

    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },

    offset: {
      type: Number as PropType<number>,
      default: 5
    },

    openDelay: {
      type: Number as PropType<number>,
      default: 300
    },

    closeDelay: {
      type: Number as PropType<number>,
      default: 300
    }
  },

  setup (props) {
    const instancePopover = ref()
    const button = ref() as Ref<HTMLElement>
    const popper = ref() as Ref<HTMLElement>
    const isVisible = ref(false)
    const popoverOptions = {
      placement: props.placement,
      modifiers: [
        {
          name: 'offset',
          options: { offset: [0, props.offset]}
        },
        {
          name: 'arrow',
          options: { padding: 10 }
        }
      ]
    }
    const hiddenClass = 'hidden'
    let timeoutShowPopper: ReturnType<typeof setTimeout>
    let timeoutHidePopper: ReturnType<typeof setTimeout>

    const hidePopover = () => {
      popper.value.classList.add(hiddenClass)
      isVisible.value = false
    }

    const handleHidePopper = (event: null | Event, shouldDelay = true) => {
      clearTimeout(timeoutShowPopper)
      timeoutHidePopper = setTimeout(() => {
        if (popper.value) hidePopover()
      }, shouldDelay && props.trigger === 'hover' ? props.closeDelay : 0)
    }

    const showPopover = () => {
      popper.value.classList.remove(hiddenClass)
      isVisible.value = true
    }

    const handleShowPopper = () => {
      clearTimeout(timeoutHidePopper)
      timeoutShowPopper = setTimeout(() => {
        nextTick(() => {
          if (popper.value && button.value) {
            if (!popper.value.hasAttribute('data-popper-placement')) {
              // Create popover via popper.js
              instancePopover.value = createPopper(button.value, popper.value, popoverOptions)

              // Apply popover to the end of the body
              if (props.appendToBody) document.body.appendChild(popper.value)

              if (props.trigger === 'hover') {
                popper.value.addEventListener('mouseenter', () => {
                  clearTimeout(timeoutHidePopper)
                })
                popper.value.addEventListener('mouseleave', handleHidePopper)
              }
            } else instancePopover.value.update()

            props.trigger === 'click' && isVisible.value ? hidePopover() : showPopover()
          }
        })
      }, props.trigger === 'hover' ? props.openDelay : 0)
    }

    const createEventListener = () => {
      if (props.trigger === 'click') button.value.addEventListener('click', handleShowPopper)
      if (props.trigger === 'hover') {
        button.value.addEventListener('mouseenter', handleShowPopper)
        button.value.addEventListener('mouseleave', handleHidePopper)
      }
    }

    const removeEventListener = () => {
      if (props.trigger === 'click') button.value.removeEventListener('click', handleShowPopper)
      if (props.trigger === 'hover') {
        button.value.removeEventListener('mouseenter', handleShowPopper)
        button.value.removeEventListener('mouseleave', handleHidePopper)
      }
    }

    watch(() => props.disabled, (newValue: boolean) => {
      if (newValue) {
        removeEventListener()
        hidePopover()
      } else {
        createEventListener()
      }
    })

    onMounted(() => { if (!props.disabled) createEventListener() })

    onBeforeUnmount(() => {
      removeEventListener()
      hidePopover()
    })

    onClickOutside(() => { handleHidePopper(null, false) })

    return {
      button,
      popper,
      hiddenClass,
      isVisible,

      handleHidePopper
    }
  }
})
</script>

<style lang="scss" scoped>
.popper {
  @apply break-all absolute z-999 -top-full;

  &-activator {
    @apply inline-grid;
  }

  &[data-popper-reference-hidden] {
    @apply invisible pointer-events-none;
    .popper__arrow {
      @apply bg-transparent border-transparent;
    }
  }

  &__arrow {
    @apply invisible;

    &::before {
      @apply visible;
      content: '';
      transform: rotate(45deg);
      border-radius: 1px;
      border-width: inherit;
      border-style: inherit;
      border-color: inherit;
    }
  }

  &__arrow, &__arrow::before {
    @apply absolute w-8 h-8;
    background: inherit;
  }

  &[data-popper-placement^='top'] > .popper__arrow {
    bottom: -3px;
    border-top-color: transparent;
    border-left-color: transparent;
  }

  &[data-popper-placement^='bottom'] > .popper__arrow {
    top: -5px;
    border-bottom-color: transparent;
    border-right-color: transparent;
  }

  &[data-popper-placement^='left'] > .popper__arrow {
    right: -3px;
    border-left-color: transparent;
    border-bottom-color: transparent;
  }

  &[data-popper-placement^='right'] > .popper__arrow {
    left: -5px;
    border-top-color: transparent;
    border-right-color: transparent;
  }
}
</style>
