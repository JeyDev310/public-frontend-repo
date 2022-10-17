<template>
  <div>
    <!-- BACK TO SIGN IN -->
    <BackToSignIn />

    <!-- FORM -->
    <Form :validation-schema="recoverSchema" class="flex flex-col" @submit="onSubmit">
      <!-- EMAIL -->
      <AuthEmail />

      <!-- SUBMIT -->
      <AppButton
        :type="!isMD ? 'primary': 'light-blue-gradient-filled'"
        :class="!isMD && 'w-full'"
        :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
        class="auth__button self-center"
      >
        Reset Password
      </AppButton>
    </Form>

    <!-- GO TO SIGN UP -->
    <GoToSignUp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { router, routeNames } from '@/router'

import { authService } from '@/services'
import { IVeeValidateLogin } from '@/views/auth/auth.types'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { Form } from 'vee-validate'
import { recoverSchema } from '@/schemas'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import BackToSignIn from '@/views/auth/components/BackToSignIn.vue'
import AuthEmail from '@/views/auth/components/inputs/Email.vue'
import GoToSignUp from '@/views/auth/components/GoToSignUp.vue'

export default defineComponent({
  name: 'PasswordRecover',

  components: { BackToSignIn, Form, AuthEmail, GoToSignUp },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL, is6XL } = useCustomBreakpoints()

    async function onSubmit (values: IVeeValidateLogin): Promise<void> {
      try {
        const isEmailSent = await authService.recoverPassword(values)

        isEmailSent && router.push({ name: routeNames.recoverDone })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT }, true)
      }
    }

    return {
      routeNames,
      isMD,
      is4XL,
      is6XL,
      recoverSchema,
      onSubmit
    }
  }
})
</script>
