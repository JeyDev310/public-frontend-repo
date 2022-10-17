<template>
  <div>
    <!-- DESKTOP -->
    <mq-layout mq="lg+">
      <!-- TITLE -->
      <h3
        class="
          text-bluster-blue
          dark:text-blair
          text-lg
          4xl:text-2xl
          5xl:text-4xl
          text-center
          font-medium
          mb-30
          4xl:mb-50
        "
      >
        {{ isNewIp ? 'Confirm your location' : 'Login to your account' }}
      </h3>

      <!-- NEW API TEMPLATE -->
      <template v-if="isNewIp">
        <!-- FORM -->
        <Form @submit="onConfirmCode">
          <!-- AUTH CODE -->
          <AuthCode />

          <!-- SUBMIT -->
          <AppButton class="w-full mt-10 4xl:mt-20" :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'">
            Submit
          </AppButton>
        </Form>

        <!-- BACK TO SIGN IN -->
        <p
          class="
            text-bianchi-green
            4xl:text-md2
            5xl:text-xl
            text-center
            mt-16
            4xl:mt-24
            cursor-pointer
          "
          @click="isNewIp = false"
        >
          Back to Sign In
        </p>
      </template>

      <!-- DEFAULT TEMPLATE -->
      <template v-else>
        <!-- FORM -->
        <Form
          #default="{ values }"
          :validation-schema="loginSchema"
          @submit="onSubmit"
        >
          <!-- EMAIL -->
          <AuthEmail ref="emailInput" />

          <!-- PASSWORD -->
          <AuthPassword :value="values.password" />

          <div class="flex justify-between items-center">
            <!-- REMEMBER ME -->
            <AppCheckbox v-model="isRememberMe" class="group">
              <span
                class="
                  text-chicory-flower
                  dark:text-downy-second
                  group-hover:text-passionate-blueberry
                  dark:group-hover:text-frostbite
                  text-sm
                  5xl:text-base
                  transition
                  duration-300
                "
              >
                Remember me
              </span>
            </AppCheckbox>

            <!-- FORGOT PASSWORD -->
            <router-link
              :to="{ name: routeNames.recover }"
              class="
                text-chicory-flower
                dark:text-downy-second
                hover:text-passionate-blueberry
                dark:hover:text-frostbite
                text-sm
                5xl:text-base
                transition
                duration-300
              "
            >
              Forgot password?
            </router-link>
          </div>

          <!-- SUBMIT -->
          <AppButton class="w-full mt-30 4xl:mt-40" :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'">
            Log in
          </AppButton>
        </Form>

        <!-- GO TO SIGN UP -->
        <GoToSignUp />

        <!-- OAUTH -->
        <Oauth />

        <!-- SOCIAL OAUTH BUTTONS -->
        <SocialOauthButtons />
      </template>
    </mq-layout>

    <!-- MOBILE -->
    <mq-layout mq="sm-md">
      <!-- TITLE -->
      <h3 class="text-white text-4xl font-semibold mb-20">
        {{ isNewIp ? 'Confirm your location' : 'Sign In' }}
      </h3>

      <!-- NEW IP TEMPLATE -->
      <template v-if="isNewIp">
        <!-- FORM -->
        <Form class="flex flex-col" @submit="onConfirmCode">
          <!-- AUTH CODE -->
          <AuthCode />

          <!-- SUBMIT -->
          <AppButton type="light-blue-gradient-filled" class="auth__button self-center mt-30">
            Submit
          </AppButton>
        </Form>

        <!-- BACK TO SIGN IN -->
        <p
          class="text-white font-bold md:text-bianchi-green text-center mt-24"
          @click="isNewIp = false"
        >
          Back to Sign In
        </p>

        <!-- OAUTH -->
        <Oauth />
      </template>

      <!-- DEFAULT TEMPLATE -->
      <template v-else>
        <!-- FORM -->
        <Form
          #default="{ values }"
          :validation-schema="loginSchema"
          class="flex flex-col"
          @submit="onSubmit"
        >
          <!-- EMAIL -->
          <AuthEmail ref="emailInput" placeholder="Enter username" />

          <!-- PASSWORD -->
          <AuthPassword :value="values.password" placeholder="Enter password" />

          <div class="flex w-full justify-between items-center">
            <!-- REMEMBER ME -->
            <AppCheckbox v-model="isRememberMe" class="group" type="tertiary">
              <span class="text-let-it-snow text-sm">
                Remember me
              </span>
            </AppCheckbox>

            <!-- FORGOT PASSWORD -->
            <router-link :to="{ name: routeNames.recover }" class="text-let-it-snow text-sm">
              Forgot password?
            </router-link>
          </div>

          <!-- SUBMIT -->
          <AppButton type="light-blue-gradient-filled" class="auth__button self-center mt-30">
            Log in
          </AppButton>
        </Form>

        <!-- GO TO SIGN UP -->
        <GoToSignUp />

        <!-- PLITER -->
        <AuthSpliterMobile class="my-40" />

        <!-- OAUTH -->
        <Oauth />

        <!-- SOCIAL OAUTH BUTTONS -->
        <SocialOauthButtons />
      </template>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { routeNames } from '@/router'

import { vuex } from '@/store'
import { IVeeValidateConfirmNewIp, IVeeValidateLogin, ELoginErrorCodes } from '@/views/auth/auth.types'
import { EErrorsMessage } from '@/types'
import { localStorageService } from '@/services'
import { appNotify } from '@/components/stateless/notifications'

import { Form } from 'vee-validate'
import { loginSchema } from '@/schemas'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import AuthEmail from '@/views/auth/components/inputs/Email.vue'
import AuthPassword from '@/views/auth/components/inputs/Password.vue'
import AuthCode from '@/views/auth/components/inputs/AuthCode.vue'
import GoToSignUp from '@/views/auth/components/GoToSignUp.vue'
import SocialOauthButtons from '@/views/auth/components/SocialOauthButtons.vue'
import Oauth from '@/views/auth/Oauth.vue'
import AuthSpliterMobile from '@/views/auth/components/mobile/AuthSpliterMobile.vue'

export default defineComponent({
  name: 'Login',

  components: {
    Form,
    AuthEmail,
    AuthPassword,
    AuthCode,
    GoToSignUp,
    SocialOauthButtons,
    Oauth,
    AuthSpliterMobile
  },

  setup () {
    /* USE GLOBAL SETUP */
    const { setThemeMode } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is4XL, is6XL } = useCustomBreakpoints()

    /* STATE */
    const state = reactive({
      isRememberMe: false as boolean,
      emailInput: null as any,
      email: '' as string,
      password: '' as string,
      isNewIp: false as boolean
    })

    async function onSubmit (values: IVeeValidateLogin): Promise<void> {
      state.email = values.email
      state.password = values.password

      try {
        await vuex.auth.login(values)
        if (state.isRememberMe) {
          localStorageService.setItem('upbots_remember_me', values.email)
        } else {
          localStorageService.removeItem('upbots_remember_me')
        }
      } catch (error) {
        if (error.response.data?.code === ELoginErrorCodes.NewIpAddress) {
          state.isNewIp = true
          appNotify({ type: 'warning', message: error.response.data.message || EErrorsMessage.DEFAULT }, true)
        } else {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT }, true)
        }
      }
    }

    async function onConfirmCode (values: IVeeValidateConfirmNewIp): Promise<void> {
      try {
        await vuex.auth.confirmNewIp({
          ...values,
          email: state.email,
          password: state.password
        })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT }, true)
      }
    }

    onMounted(() => {
      setThemeMode()

      const isRemembered = localStorageService.getItem('upbots_remember_me') as string
      if (isRemembered) {
        state.isRememberMe = !!isRemembered
        state.emailInput.$parent.setFieldValue('email', isRemembered)
      }
    })

    return {
      ...toRefs(state),
      routeNames,
      is4XL,
      is6XL,
      loginSchema,
      onSubmit,
      onConfirmCode
    }
  }
})
</script>
