<template>
  <div>
    <!-- BACK TO SIGN IN -->
    <BackToSignIn />

    <!-- FORM -->
    <Form
      #default="{ values }"
      :validation-schema="resetSchema"
      class="flex flex-col"
      @submit="onSubmit"
    >
      <!-- PASSWORD -->
      <AuthPassword :value="values.password" placeholder="Enter new password" label="New Password" />

      <!-- CONFORM PASSWORD -->
      <AuthPassword
        name="confirmPassword"
        label="Repeat New Password"
        placeholder="Confirm new password"
        :value="values.confirmPassword"
      />

      <!-- SUBMIT -->
      <AppButton
        :type="!isMD ? 'primary' : 'light-blue-gradient-filled'"
        class="auth__button self-center md:w-full"
        :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
      >
        Reset Password
      </AppButton>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, routeNames, router } from '@/router'

import { authService } from '@/services'
import { IVeeValidateReset, IResetPasswordPayload } from '@/views/auth/auth.types'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { Form } from 'vee-validate'
import { resetSchema } from '@/schemas'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import BackToSignIn from '@/views/auth/components/BackToSignIn.vue'
import AuthPassword from '@/views/auth/components/inputs/Password.vue'

export default defineComponent({
  name: 'PasswordReset',

  components: { BackToSignIn, Form, AuthPassword },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL, is6XL } = useCustomBreakpoints()

    async function onSubmit (values: IVeeValidateReset): Promise<void> {
      const resetPasswordPayload = {
        newPassword: values.password,
        repeatNewPassword: values.confirmPassword,
        code: route.query.code as string
      } as IResetPasswordPayload

      try {
        await authService.resetPassword(resetPasswordPayload)
        router.push({ name: routeNames.login })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT }, true)
      }
    }

    return {
      isMD,
      is4XL,
      is6XL,
      resetSchema,
      onSubmit
    }
  }
})
</script>
