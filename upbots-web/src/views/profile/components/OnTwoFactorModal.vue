<template>
  <div class="text-nile-blue dark:text-let-it-snow px-5 text-center">
    <h2 class="text-md md:text-xl leading-tight mt-32 mb-20">Two Factor Authentication</h2>

    <div class="leading-snug">
      <p class="mb-10">Install an authenticator app in your mobile device (eg. Authy).</p>
      <p class="mb-10">Scan the QR code or type in the code manually on your mobile device</p>
      <p class="mb-10">Write down or save the secret code in case you lose your device</p>
      <p class="mb-10">Do not share your secret code. Upbots will never ask for your secret code</p>
    </div>

    <img :src="twoFAqrcode" class="m-auto mt-24 mb-30">

    <p class="mb-36">
      Open the Authenticator app on your device and either scan the QR code provided,
      or manually enter the secret code.
    </p>

    <div class="mb-36">
      <p>AUTHENTICATOR SECRET CODE</p>
      <span class="break-all text-sm md:text-base">{{ twoFASecret }}</span>
    </div>

    <Form :validation-schema="createTwoFactorAuthSchema" @submit="verifyAndActivate">
      <!-- CODE -->
      <AppInput
        name="code"
        label="Enter the code given by Authenticator App"
        placeholder="000000"
        class="w-full mb-14 md:mb-30"
      />

      <!-- SUBMIT BUTTON -->
      <AppButton class="mt-6 w-full md:w-auto mb-16" size="lg">Verify and Activate</AppButton>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from 'vue'

import QRCode from 'qrcode'

import { Form } from 'vee-validate'
import { createTwoFactorAuthSchema } from '@/schemas'

import { authService } from '@/services'
import { EErrorsMessage, IVeeValidateTwoFactorAuth } from '@/types'
import { vuex } from '@/store'
import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'OnTwoFactorModal',

  components: { Form },

  props: {
    isModalOpened: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['update:modelValue', 'success'],

  setup (_, { emit }) {
    const twoFASecret = ref<string>('')
    const twoFATextForQR = ref<string>('')
    const twoFAqrcode = ref<string>('')

    const currentAccountModel = ref<string>('')

    async function getVerificationCode () {
      try {
        const res = await authService.get2FASecret()
        twoFASecret.value = res.base32
        twoFATextForQR.value = res.otpauth_url
        const code = await QRCode.toDataURL(res.otpauth_url)
        twoFAqrcode.value = code
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    async function verifyAndActivate (values: IVeeValidateTwoFactorAuth) {
      try {
        await authService.verify2FA({ userToken: values.code })
        await vuex.auth.fetchUserInfo()
        // Notify user via email
        authService.sendEmailNotify2FAEnabled()
        emit('success')
        appNotify({ type: 'success', message: 'Two Factor Authentication has been enabled' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    onMounted(() => { getVerificationCode() })

    return {
      currentAccountModel,
      createTwoFactorAuthSchema,
      twoFAqrcode,
      twoFASecret,
      verifyAndActivate
    }
  }
})
</script>
