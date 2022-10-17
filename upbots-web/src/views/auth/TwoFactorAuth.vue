<template>
  <div>
    <!-- BACK TO SIGN IN -->
    <BackToSignIn />

    <!-- FORM -->
    <Form
      :validation-schema="twoFactorAuthSchema"
      class="flex flex-col"
      @submit="onSubmit"
    >
      <!-- CODE -->
      <mq-layout mq="lg+">
        <AppInput
          name="code"
          label="Code given by Authenticator App"
          type="number"
          placeholder="Enter your code"
          :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
          label-classes="inline-block text-nile-blue dark:text-blair leading-1 mb-6 4xl:mb-10 cursor-pointer"
          class="w-full mb-22 4xl:mb-24"
        />
      </mq-layout>

      <!-- CODE MOBILE -->
      <mq-layout mq="sm-md">
        <AuthInputMobile
          name="code"
          type="number"
          placeholder="Enter your code"
          class="mb-24"
        />
      </mq-layout>

      <!-- FORGOT 2FA -->
      <div class="flex justify-end items-center">
        <router-link
          :to="{ name: routeNames.twoFactorAuthRecovery }"
          class="
            text-let-it-snow
            md:text-chicory-flower
            md:dark:text-downy-second
            hover:text-passionate-blueberry
            dark:hover:text-frostbite
            text-sm
            5xl:text-base
            transition
            duration-300
          "
        >
          Forgot 2fa?
        </router-link>
      </div>

      <!-- SUBMIT -->
      <AppButton
        class="auth__button self-center md:w-full mt-30"
        :type="!isMD ? 'primary' : 'light-blue-gradient-filled'"
        :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
      >
        Sign In
      </AppButton>
    </Form>

    <GoToSignUp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { router, routeNames } from '@/router'

import { appNotify } from '@/components/stateless/notifications'

import { vuex } from '@/store'
import { authService } from '@/services'
import { EErrorsMessage, IVeeValidateTwoFactorAuth } from '@/types'

import { Form } from 'vee-validate'
import { twoFactorAuthSchema } from '@/schemas'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import BackToSignIn from '@/views/auth/components/BackToSignIn.vue'
import GoToSignUp from '@/views/auth/components/GoToSignUp.vue'
import AuthInputMobile from '@/views/auth/components/mobile/AuthInputMobile.vue'

export default defineComponent({
  name: 'TwoFactorAuth',

  components: { BackToSignIn, GoToSignUp, Form, AuthInputMobile },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL, is6XL } = useCustomBreakpoints()

    async function onSubmit (values: IVeeValidateTwoFactorAuth): Promise<void> {
      try {
        const res = await authService.verify2FA({ userToken: values.code })
        vuex.auth.setToken(res?.data.access_token)
        vuex.auth.setUser(res?.data.user)

        router.replace({ name: routeNames.home })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    return {
      isMD,
      is4XL,
      is6XL,
      twoFactorAuthSchema,
      routeNames,
      onSubmit
    }
  }
})
</script>
