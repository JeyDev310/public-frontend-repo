<template>
  <!-- DESKTOP -->
  <mq-layout mq="lg+">
    <AppInput
      :name="name"
      :label="label"
      :type="isPasswordVisible ? 'text' : 'password'"
      :placeholder="placeholder"
      input-rounded="border-l-sm1"
      :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
      label-classes="inline-block text-nile-blue dark:text-blair leading-1 mb-6 4xl:mb-10 cursor-pointer"
      class="w-full mb-22 4xl:mb-24"
    >
      <template #append>
        <AppIcon
          name="eye"
          class="flex items-center justify-center text-bluster-blue dark:text-white px-10 cursor-pointer"
          :class="{ 'opacity-50': !isPasswordVisible }"
          @click="isPasswordVisible = !isPasswordVisible"
        />
      </template>
    </AppInput>
  </mq-layout>

  <!-- MOBILE -->
  <mq-layout mq="sm-md">
    <AuthInputMobile
      :name="name"
      :type="isPasswordVisible ? 'text' : 'password'"
      :placeholder="placeholder"
      prepend-icon="lock"
      prepend-icon-size="20"
      class="mb-30"
    >
      <template #append>
        <AppIcon
          name="eye"
          class="flex items-center justify-center text-let-it-snow px-20 cursor-pointer"
          size="18"
          :class="{ 'opacity-50': !isPasswordVisible }"
          @click="isPasswordVisible = !isPasswordVisible"
        />
      </template>
    </AuthInputMobile>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import AuthInputMobile from '@/views/auth/components/mobile/AuthInputMobile.vue'

export default defineComponent({
  name: 'Password',

  components: { AuthInputMobile },

  props: {
    name: {
      type: String as PropType<string>,
      default: 'password'
    },

    label: {
      type: String as PropType<string>,
      default: 'Password'
    },

    placeholder: {
      type: String as PropType<string>,
      default: 'Enter your password'
    },

    value: {
      type: String as PropType<string>
    }
  },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is6XL } = useCustomBreakpoints()

    const isPasswordVisible = ref<boolean>(false)

    return { is4XL, is6XL, isPasswordVisible }
  }
})
</script>
