<template>
  <div class="text-nile-blue dark:text-let-it-snow px-5 md:px-20">
    <h2 class="text-center text-md md:text-xl leading-tight mt-32 mb-20">Turn off 2-Step Verification</h2>

    <p class="text-center mb-36">
      Your account is more secure when you need a password and a verification code to sign in.
      If you remove this extra layer of security.
    </p>

    <Form :validation-schema="createTwoFactorAuthSchema" @submit="verifyAndActivate">
      <!-- Code -->
      <AppInput
        name="code"
        label="Enter the code given by Authenticator App"
        placeholder="000000"
        class="text-left w-full mb-14 md:mb-30"
      />

      <!-- Submit button -->
      <div class="text-center">
        <AppButton class="mt-6 md:w-auto mb-16" size="lg">Turn Off</AppButton>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Form } from 'vee-validate'
import { createTwoFactorAuthSchema } from '@/schemas'

import { vuex } from '@/store'
import { authService } from '@/services'
import { EErrorsMessage, IVeeValidateTwoFactorAuth } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'OffTwoFactorModal',

  components: { Form },

  emits: ['update:modelValue', 'success'],

  setup (_, { emit }) {
    async function verifyAndActivate (values: IVeeValidateTwoFactorAuth) {
      try {
        await authService.deactivate2FA({ userToken: values.code })
        await vuex.auth.fetchUserInfo()

        emit('success')
        appNotify({ type: 'success', message: 'Two Factor Authentication has been disabled' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    return { createTwoFactorAuthSchema, verifyAndActivate }
  }
})
</script>
