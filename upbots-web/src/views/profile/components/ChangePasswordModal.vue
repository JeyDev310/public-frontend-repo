<template>
  <div class="text-seal-blue dark:text-white">
    <h2 class="text-center text-2xl font-semibold mb-20">Change Password</h2>

    <p class="text-center mb-40 dark:text-blair px-30">
      To change your password, you need to enter the current password that is used to log in to the system
    </p>

    <div class="px-40 md:px-60">
      <Form #default="{ values }" :validation-schema="changePasswordSchema" @submit="onUpdatePassword">
        <!-- CURRENT PASSWORD -->
        <AuthPassword
          name="password"
          label="Current password"
          placeholder="Type your current password"
          class="w-full mb-36"
          :value="values.password"
        />

        <!-- NEW PASSWORD -->
        <AuthPassword
          name="newPassword"
          label="New password"
          placeholder="Type your new password"
          class="w-full mb-36"
          :value="values.newPassword"
        />

        <!-- REPEAT NEW PASSWORD -->
        <AuthPassword
          name="repeatNewPassword"
          label="Repeat new password"
          placeholder="Type your new password"
          class="w-full mb-36"
          :value="values.repeatNewPassword"
        />

        <!-- SUBMIT BUTTON -->
        <AppButton class="w-full">Update password</AppButton>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Form } from 'vee-validate'
import { changePasswordSchema } from '@/schemas'
import { IVeeValidateChangePassword } from '@/types'

import AuthPassword from '@/views/auth/components/inputs/Password.vue'

export default defineComponent({
  name: 'ChangePasswordModal',

  components: { AuthPassword, Form },

  emits: ['update:modelValue', 'update:updatePassword'],

  setup (_, { emit }) {
    function onUpdatePassword (values: IVeeValidateChangePassword) {
      emit('update:updatePassword', values)
    }

    return { changePasswordSchema, onUpdatePassword }
  }
})
</script>
