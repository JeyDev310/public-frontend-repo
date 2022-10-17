<template>
  <div class="flex flex-col space-y-2">
    <!-- THEME ITEM -->
    <div
      v-for="(item, index) in themeData"
      :key="index"
      @click="onChangeThemeHandler(item.value)"
    >
      <AppTooltip :content="item.label" :disabled="isSidebarOpen" placement="right" class="flex">
        <div
          class="sidebar__theme-item flex items-center justify-start py-12 px-24 cursor-pointer"
          :class="[{'is-active' : isDarkMode}, item.class]"
        >
          <!-- IF SIDEBAR CLOSED -->
          <template v-if="!isSidebarOpen">
            <AppIcon
              :name="item.icon"
              size="20"
              class="
              sidebar__theme-item-icon
              flex
              items-center
              justify-center
              text-nile-blue dark:text-white
              transition
              duration-300
              "
            />
          </template>

          <!-- IF SIDEBAR OPEN -->
          <template v-else>
            <AppIcon
              :name="item.icon"
              size="20"
              class="
              sidebar__theme-item-icon
              flex
              items-center
              justify-center
              text-nile-blue dark:text-white
              transition
              duration-300
              "
            />
          </template>

          <!-- THEME TITLE WHEN SIDEBAR OPEN -->
          <transition
            enter-active-class="transition transform"
            enter-from-class="w-0 -translate-x-10 opacity-0"
            enter-to-class="translate-x-0 opacity-100 w-auto"
            leave-active-class="transform duration-100 transition"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-10"
          >
            <span
              v-if="isSidebarOpen"
              class="
              sidebar__theme-item-title
              flex
              ml-20
              text-nile-blue
              dark:text-white
              font-semibold
              text-sm
              md:text-base
              lg:text-sm
              transition
              duration-300
              whitespace-nowrap
              "
            >
              {{ item.label }}
            </span>
          </transition>
        </div>
      </AppTooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useGlobal } from '@/global-setup/global.composition.setup'

enum EThemeValues {
  LIGHT = 'light',
  DARK = 'dark',
}

export default defineComponent({
  name: 'SidebarThemeSwitch',

  props: {
    isSidebarOpen: {
      type: Boolean as PropType<boolean>,
      require: true
    }
  },

  emits: ['open'],

  setup () {
    // MODE //
    const { isDarkMode, onThemeChanged } = useGlobal()

    const themeData = [
      { value: EThemeValues.LIGHT, label: 'Light Mode', icon: 'sun', class: 'is-light' },
      { value: EThemeValues.DARK, label: 'Dark Mode', icon: 'moon', class: 'is-dark' }
    ]

    function onChangeThemeHandler (value: string) {
      if (value === EThemeValues.LIGHT) {
        onThemeChanged(false)
      } else {
        onThemeChanged(true)
      }
    }

    return { isDarkMode, themeData, onChangeThemeHandler }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  &__theme-item {
    &.is-active {
      &:hover {
        &.is-light {
          .sidebar {
            &__theme-item-icon,
            &__theme-item-title {
              @apply opacity-40;
            }
          }
        }
      }
    }

    &:not(.is-active) {
      &:hover {
        &.is-dark {
          .sidebar {
            &__theme-item-icon,
            &__theme-item-title {
              @apply opacity-40;
            }
          }
        }
      }
    }

    &.is-active {
      &.is-light {
        .sidebar {
          &__theme-item-icon,
          &__theme-item-title {
            @apply opacity-20;
          }
        }
      }
    }

    &:not(.is-active) {
      &.is-dark {
        .sidebar {
          &__theme-item-icon,
          &__theme-item-title {
            @apply opacity-20;
          }
        }
      }
    }
  }
}
</style>
