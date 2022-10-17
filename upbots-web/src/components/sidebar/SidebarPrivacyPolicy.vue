<template>
  <!-- TERMS AND PRIVACY LINKS -->
  <transition
    enter-active-class="transition transform"
    enter-from-class="w-0 -translate-x-10 opacity-0"
    enter-to-class="translate-x-0 opacity-100 w-auto"
    leave-active-class="transform duration-100 transition"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-10"
  >
    <div
      v-if="isSidebarOpen"
      class="flex flex-col flex-shrink-0 items-center w-full px-24 py-16"
    >
      <p class="text-soaring-eagle text-sm md:text-xs leading-xs">
        <a
          href="/terms-conditions"
          target="_blank"
          class="
          underline
          hover:text-deep-aquamarine
          dark:hover:text-let-it-snow
          transition
          duration-300
          cursor-pointer
          "
        >
          Term of Service
        </a>
        <span class="mx-2">and</span>
        <a
          href="/privacy-policy"
          target="_blank"
          class="
          underline
          hover:text-deep-aquamarine
          dark:hover:text-let-it-snow
          transition
          duration-300
          cursor-pointer
          "
        >
          Privacy Policy
        </a>
      </p>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SidebarPrivacyPolicy',

  props: {
    isSidebarOpen: {
      type: Boolean as PropType<boolean>,
      require: true
    }
  }
})
</script>
