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

      <!-- RECOVER CODE -->
      <RecoverCode />

      <!-- SUBMIT -->
      <AppButton
        class="auth__button self-center md:w-full"
        :type="!isMD ? 'primary' : 'light-blue-gradient-filled'"
        :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
      >
        Reset my 2fa code
      </AppButton>
    </Form>

    <!-- GO TO SIGN UP -->
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
import RecoverCode from '@/views/auth/components/inputs/RecoverCode.vue'
import GoToSignUp from '@/views/auth/components/GoToSignUp.vue'

export default defineComponent({
  name: 'TwoFactorAuthReset',

  components: { BackToSignIn, Form, AuthEmail, RecoverCode, GoToSignUp },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL, is6XL } = useCustomBreakpoints()

    async function onSubmit (values: IRecover2FaCode): Promise<void> {
      try {
        const isReset = await authService.reset2fa({
          email: values.email,
          recoverCode: values.recoverCode
        })
        isReset && appNotify({
          type: 'success',
          message: 'Your two factor authentication has been deactivated'
        }, true)

        isReset && router.push({ name: routeNames.login })
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
