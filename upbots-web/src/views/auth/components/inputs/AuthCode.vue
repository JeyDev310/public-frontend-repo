<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+">
    <AppInput
      name="code"
      type="text"
      label="Confirmation code"
      :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
      placeholder="Enter confirmation code"
      label-classes="inline-block text-nile-blue dark:text-blair leading-1 mb-6 4xl:mb-10 cursor-pointer"
      class="w-full mb-22 4xl:mb-24"
      autoFocus
    />
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md">
    <AuthInputMobile
      name="code"
      type="text"
      placeholder="Enter confirmation code"
      class="mb-30"
    />
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import AuthInputMobile from '@/views/auth/components/mobile/AuthInputMobile.vue'

export default defineComponent({
  name: 'AuthCode',

  components: { AuthInputMobile },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is6XL } = useCustomBreakpoints()

    return { is4XL, is6XL }
  }
})
</script>
