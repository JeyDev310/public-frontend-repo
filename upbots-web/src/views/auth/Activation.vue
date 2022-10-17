<template>
  <div>
    <div class="text-center text-let-it-snow md:text-nile-blue md:dark:text-white">
      <h2 class="text-4xl font-medium mb-10">
        {{ isSuccess ? "Woohoo, your email has been validated!" : "Opsss, Something went wrong..." }}
      </h2>

      <p v-if="isSuccess" class="text-sm">
        That's all good, now you can enter UpBots and find out what we have to offer you. Are you ready?
      </p>

      <p v-else class="text-sm">
        It seems that the link is expired or the token is invalid, don't worry,
        you can request a new one on the homepage of the dashboard
        by clicking on the 'Verify Email' button, but if it doesn't work contact us.
      </p>

      <!-- GO TO LOGIN -->
      <template v-if="!isSuccess">
        <router-link #default="{ navigate }" :to="{ name: routeNames.login }" custom>
          <AppButton
            :type="!isMD ? 'primary' : 'light-blue-gradient-filled'"
            :size="!isMD && 'xlg'"
            :disabled="loading"
            class="auth__button self-center mt-30 md:w-full"

            @click="navigate()"
          >
            Login
          </AppButton>
        </router-link>
      </template>

      <!-- CHECK EMAIL -->
      <template v-else>
        <AppButton
          :type="!isMD ? 'primary' : 'light-blue-gradient-filled'"
          :size="!isMD && 'xlg'"
          class="auth__button self-center mt-20 md:w-full"
        >
          Check Email Client
        </AppButton>
      </template>
    </div>
    <GoToSignUp />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, routeNames } from '@/router'

import { appNotify } from '@/components/stateless/notifications'

import { authService } from '@/services'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import GoToSignUp from '@/views/auth/components/GoToSignUp.vue'

export default defineComponent({
  name: 'Activation',

  components: { GoToSignUp },

  setup () {
    /* USE ROUTE */
    const route = useRoute()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD } = useCustomBreakpoints()

    const loading = ref<boolean>(false)
    const isSuccess = ref<boolean>(false)

    async function activate (): Promise<void> {
      loading.value = true

      if (route.query?.token) {
        try {
          await authService.activateAccount({ code: route.query.token as string })
          isSuccess.value = true
        } catch (error) {
          appNotify({ type: 'error', message: 'API error, token may be invalid' })
        } finally {
          loading.value = false
        }
      } else {
        appNotify({ type: 'error', message: 'Token does not exist' })
        loading.value = false
      }
    }

    activate()

    return { isMD, isSuccess, loading, routeNames }
  }
})
</script>
