<template>
  <div>
    <div class="text-center text-white md:text-nile-blue md:dark:text-white">
      <!-- TITLE -->
      <h2 class="text-2xl 4xl:text-4xl 5xl:text-5xl font-medium mb-10">Done!</h2>

      <!-- DESKRIPTION -->
      <p class="text-sm text-let-it-snow md:text-nile-blue md:dark:text-white 4xl:text-base 5xl:text-md">
        Check your email for a link to reset your password.
        If it doesn't appear within a few minutes, check your spam folder.
      </p>

      <!-- GO TO SIGN IN -->
      <router-link :to="{ name: routeNames.login }">
        <AppButton
          :type="!isMD ? 'primary' : 'light-blue-gradient-filled'"
          class="auth__button mt-24 md:mt-30 4xl:mt-36 md:w-full"
          :size="is4XL ? 'md' : is6XL ? 'xlg' : 'lg'"
        >
          Back to Sign In
        </AppButton>
      </router-link>
    </div>

    <!-- GO TO SIGN UP -->
    <GoToSignUp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routeNames } from '@/router'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import GoToSignUp from '@/views/auth/components/GoToSignUp.vue'

export default defineComponent({
  name: 'PasswordRecoverDone',

  components: { GoToSignUp },

  setup () {
    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL, is6XL } = useCustomBreakpoints()

    return { routeNames, isMD, is4XL, is6XL }
  }
})
</script>
