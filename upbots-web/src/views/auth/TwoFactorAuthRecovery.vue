<template>
  <div>
    <!-- BACK TO SIGN IN -->
    <BackToSignIn />

    <!-- FORM -->
    <Form
      :validation-schema="recoverSchema"
      class="flex flex-col"
      @submit="onSubmit"
    >
      <!-- EMAIL -->
      <AuthEmail />

      <!-- SUBMIT -->
      <AppButton
        class="auth__button self-center md:w-full"
        :type="!isMD ? 'primary' : 'light-blue-gradient-filled'"
        :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
      >
        Reset my 2fa code
      </AppButton>
    </Form>

    <GoToSignUp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { router, routeNames } from '@/router'

import { appNotify } from '@/components/stateless/notifications'

import { authService } from '@/services'
import { IRecover2FaCode } from '@/views/auth/auth.types'
import { EErrorsMessage } from '@/types'

import { Form } from 'vee-validate'
import { recoverSchema } from '@/schemas'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import BackToSignIn from '@/views/auth/components/BackToSignIn.vue'
import AuthEmail from '@/views/auth/components/inputs/Email.vue'
import GoToSignUp from '@/views/auth/components/GoToSignUp.vue'

export default defineComponent({
  name: 'TwoFactorAuthRecovery',

  components: { BackToSignIn, Form, AuthEmail, GoToSignUp },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL, is6XL } = useCustomBreakpoints()

    async function onSubmit (values: IRecover2FaCode): Promise<void> {
      try {
        const isEmailSent = await authService.requestReset2fa({
          email: values.email
        })
        isEmailSent && appNotify({
          type: 'success',
          message: 'A Code to reset your 2fa has been sent. Please Check your email'
        }, true)
        isEmailSent && router.push({ name: routeNames.twoFactorAuthReset })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT }, true)
      }
    }

    return {
      isMD,
      is4XL,
      is6XL,
      recoverSchema,
      routeNames,
      onSubmit
    }
  }
})
</script>
