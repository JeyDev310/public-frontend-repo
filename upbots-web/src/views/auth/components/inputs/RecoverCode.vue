<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+">
    <AppInput
      name="recoverCode"
      type="text"
      :label="label"
      :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
      :placeholder="placeholder"
      label-classes="inline-block text-nile-blue dark:text-blair leading-1 mb-6 4xl:mb-10 cursor-pointer"
      class="w-full mb-22 4xl:mb-24"
    />
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md">
    <AuthInputMobile
      name="recoverCode"
      type="text"
      :placeholder="placeholder"
      class="mb-30"
    />
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import AuthInputMobile from '@/views/auth/components/mobile/AuthInputMobile.vue'

export default defineComponent({
  name: 'RecoverCode',

  components: { AuthInputMobile },

  props: {
    label: {
      type: String as PropType<string>,
      default: 'Recover Code'
    },

    placeholder: {
      type: String as PropType<string>,
      default: 'Type your recover code'
    }
  },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is6XL } = useCustomBreakpoints()

    return { is4XL, is6XL }
  }
})
</script>
