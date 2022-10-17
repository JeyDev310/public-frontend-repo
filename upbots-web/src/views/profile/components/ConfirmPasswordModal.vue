<template>
  <div class="text-seal-blue dark:text-white">
    <h2 class="text-center text-2xl font-semibold mb-20">Password</h2>

    <p class="text-center mb-36">
      Please enter your password in order to update your profile information.
    </p>

    <!-- PASSWORD -->
    <AppInput
      v-model="currentPassword"
      type="password"
      name="currentPassword"
      label="Enter your password"
      placeholder="Current Password"
      class="w-full mb-30"
    />

    <!-- SUBMIT BUTTON -->
    <AppButton class="w-full mt-6" @click="submitPassword">Update</AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ConfirmPasswordModal',

  emits: ['update:currentPassword'],

  setup (_, { emit }) {
    const currentPassword = ref<string>('')

    function submitPassword () {
      emit('update:currentPassword', currentPassword.value)
      currentPassword.value = ''
    }

    function initData () {
      currentPassword.value = ''
    }
    initData()

    return { currentPassword, submitPassword }
  }
})
</script>
