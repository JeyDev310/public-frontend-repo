<template>
  <div>
    <!-- DESKTOP -->
    <mq-layout mq="lg+">
      <!-- FORM -->
      <Form
        #default="{ values }"
        :validation-schema="registerSchema"
        @submit="onSubmit"
      >
        <!-- EMAIL -->
        <AuthEmail />

        <!-- FIRST NAME -->
        <AppInput
          name="firstName"
          label="First name"
          placeholder="Type your first name"
          :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
          class="w-full mb-22 4xl:mb-24"
          label-classes="inline-block text-nile-blue dark:text-blair leading-1 mb-6 cursor-pointer"
        />

        <!-- PASSWORD -->
        <AuthPassword :value="values.password" />

        <!-- MARKETING UPDATES -->
        <AppCheckbox
          v-model="isMarketingUpdates"
          type="secondary"
          :checkbox-size="!is4XL ? '24' : '20'"
          :label-size="!is4XL ? 'base' : 'xs'"
          class="mb-22 4xl:mb-24"
        >
          I would love to receive early giveaways, contests, free NFTs, airdrop info,
          and other exclusive email updates from UpBots.
          (We will never share your info with third parties)
        </AppCheckbox>

        <!-- CAPTCHA -->
        <VueRecaptcha
          ref="recaptcha"
          size="mini"
          :theme="isDarkMode ? 'dark' : 'light'"
          :sitekey="captchaSiteKey"
          :loadRecaptchaScript="true"
          class="mb-22 4xl:mb-24"
          @verify="onVerify"
          @expired="onExpired"
        />

        <!-- PRIVACY | TERMS -->
        <div
          class="
            flex
            justify-center
            text-nile-blue
            dark:text-blair
            text-xs
            4xl:text-sm
            5xl:text-base
            mb-20
            4xl:mb-24
            text-justify
          "
        >
          <p>
            By continuing, you agree to Upbots's
            <router-link
              :to="{name: routeNames.termsConditions}"
              class="text-chicory-flower dark:text-white hover:underline"
            >
              Term of Service
            </router-link>
            <span> and </span>
            <router-link
              :to="{name: routeNames.privacyPolicy}"
              class="text-chicory-flower dark:text-white hover:underline"
            >
              Privacy Policy
            </router-link>
          </p>
        </div>

        <!-- SUBMIT -->
        <AppButton class="w-full" :size="is6XL ? 'xlg' : 'md'">Create an account</AppButton>
      </Form>

      <!-- GO BACK TO SIGN IN -->
      <p class="text-nile-blue dark:text-white text-center text-base 4xl:text-md2 5xl:text-xl mt-16 4xl:mt-24">
        Already have an account?
        <router-link :to="{ name: routeNames.login }" class="text-bianchi-green">Sign In</router-link>
      </p>

      <!-- OAUTH -->
      <Oauth />

      <!-- SOCAIL OAUTH BUTTONS -->
      <SocialOauthButtons />
    </mq-layout>

    <!-- MOBILE -->
    <mq-layout mq="sm-md">
      <!-- TITLE -->
      <h3 class="text-white text-4xl font-semibold mb-20">Register</h3>

      <!-- FORM -->
      <Form
        #default="{ values }"
        :validation-schema="registerSchema"
        class="flex flex-col"
        @submit="onSubmit"
      >
        <!-- EMAIL -->
        <AuthEmail />

        <!-- FIRST NAME -->
        <AuthInputMobile
          name="firstName"
          placeholder="First name"
          prepend-icon="user"
          prepend-icon-size="24"
          class="mb-24"
        />

        <!-- PASSWORD -->
        <AuthPassword :value="values.password" />

        <!-- MARKETING UPDATES -->
        <AppCheckbox v-model="isMarketingUpdates" type="tertiary">
          I would love to receive early giveaways, contests, free NFTs, airdrop info,
          and other exclusive email updates from UpBots.
          (We will never share your info with third parties)
        </AppCheckbox>

        <!-- CAPTCHA -->
        <VueRecaptcha
          ref="recaptcha"
          size="mini"
          theme="light"
          class="mt-30 self-center"
          :sitekey="captchaSiteKey"
          :loadRecaptchaScript="true"
          @verify="onVerify"
          @expired="onExpired"
        />

        <!-- PRIVACY | TERMS -->
        <div class="flex justify-center text-let-it-snow text-xs text-justify mt-14">
          <p>
            By continuing, you agree to Upbots's
            <router-link :to="{ name: routeNames.termsConditions }" class="text-white hover:underline">
              Term of Service
            </router-link>
            <span> and </span>
            <router-link :to="{ name: routeNames.privacyPolicy }" class="text-white hover:underline">
              Privacy Policy
            </router-link>
          </p>
        </div>

        <!-- SUBMIT -->
        <AppButton type="light-blue-gradient-filled" class="auth__button self-center mt-12">
          Create an account
        </AppButton>
      </Form>

      <!-- BACK TO SIGN IN -->
      <p
        class="text-let-it-snow md:text-bluster-blue md:dark:text-blair
        text-center text-base mt-24"
      >
        Already have an account?
        <router-link
          :to="{ name: routeNames.login }"
          class="text-white font-bold md:text-bianchi-green md:font-normal"
        >
          Sign In
        </router-link>
      </p>

      <!-- SPLITER -->
      <AuthSpliterMobile class="my-32" />

      <!-- OAUTH -->
      <Oauth />

      <!-- SOCIAL BUTTONS -->
      <SocialOauthButtons />
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { routeNames, router, useRoute } from '@/router'

import { appNotify } from '@/components/stateless/notifications'

import { vuex } from '@/store'
import { authService, localStorageService } from '@/services'
import { IVeeValidateRegister, IRegisterRequestPayload, EErrorsMessage } from '@/types'

import { Form } from 'vee-validate'
import { registerSchema } from '@/schemas'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import VueRecaptcha from '@/components/reCaptcha/Recaptcha.vue'
import AuthEmail from '@/views/auth/components/inputs/Email.vue'
import AuthPassword from '@/views/auth/components/inputs/Password.vue'
import SocialOauthButtons from '@/views/auth/components/SocialOauthButtons.vue'
import AuthInputMobile from '@/views/auth/components/mobile/AuthInputMobile.vue'
import AuthSpliterMobile from '@/views/auth/components/mobile/AuthSpliterMobile.vue'
import Oauth from '@/views/auth/Oauth.vue'

export default defineComponent({
  name: 'Register',

  components: {
    Form,
    Oauth,
    AuthEmail,
    AuthPassword,
    VueRecaptcha,
    SocialOauthButtons,
    AuthInputMobile,
    AuthSpliterMobile
  },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE GLOBAL SETUP */
    const { isDarkMode } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is6XL } = useCustomBreakpoints()

    const captchaSiteKey = process.env.VUE_APP_RECAPTCHA_SITE_KEY as string
    const captchaToken = ref<null | string>('')

    const isMarketingUpdates = ref<boolean>(true)

    function onVerify (token: string): void {
      captchaToken.value = token
    }

    function onExpired (): void {
      captchaToken.value = null
    }

    async function updateMarketing (): Promise<void> {
      try {
        await authService.updateMarketing()
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      }
    }

    /* CHECK IF USER SHOULD SEE INTRO PAGE BY DEFAULT (LOCALSTORAGE NAME [UpBots_intro]) */
    function getIntroduction (): boolean {
      let upbotsIntro = false

      if (!localStorageService.hasKey('upbots_intro')) {
        localStorageService.setItem('upbots_intro', false)
        upbotsIntro = localStorageService.getItem('upbots_intro') || false
      } else {
        localStorageService.setItem('upbots_intro', true)
        upbotsIntro = localStorageService.getItem('upbots_intro') || false
      }

      return upbotsIntro
    }

    async function onSubmit (values: IVeeValidateRegister): Promise<void> {
      const registerPayload = {
        captcha: captchaToken.value,
        email: values.email,
        firstname: values.firstName,
        password: values.password,
        refCode: route.query.ref as string
      } as IRegisterRequestPayload

      try {
        await vuex.auth.register(registerPayload)
        await authService.updateUserList()
        isMarketingUpdates.value && await updateMarketing()

        if (getIntroduction()) {
          router.replace({ name: routeNames.home })
        } else {
          router.replace({ name: routeNames.introduction })
        }
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT }, true)
      }
    }

    return {
      routeNames,
      is4XL,
      is6XL,
      isDarkMode,
      registerSchema,
      captchaSiteKey,
      isMarketingUpdates,
      onVerify,
      onExpired,
      onSubmit
    }
  }
})
</script>
