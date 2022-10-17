<template>
  <div class="flex">
    <AppFlyout
      placement="bottom-start"
      :offset="16"
      class="flex"
      popper-classes="bg-white dark:bg-primary-dark-radial shadow dark:shadow-100 rounded-xl"
    >
      <!-- USER PREVIEW -->
      <template #activator>
        <slot>
          <div class="user__avatar relative rounded-full cursor-pointer">
            <!-- USER IMAGE -->
            <img
              v-if="userAvatar.type === 'img'"
              :src="userAvatar.value"
              class="w-full rounded-full"
            >

            <!-- USER IMG NAME -->
            <div
              v-else
              class="
                flex
                items-center
                justify-center
                w-full
                h-full
                dark:text-white
                font-medium
                text-xl
                border-2
                rounded-full
              "
              :class="getUserAvatarNameClasses"
            >
              {{ userAvatar.value }}
            </div>

            <!-- VERIFY EMAIL CIRCLE -->
            <div
              class="
                absolute
                -top-2
                -right-2
                3xl:-top-1
                3xl:-right-1
                4xl:-top-2
                4xl:-right-2
                flex
                items-center
                justify-center
                w-16
                h-16
                4xl:w-22
                4xl:h-22
                rounded-full
              "
              :class="!emailVerified ? 'bg-true-lavender' : 'bg-spring-bouquet'"
            >
              <AppIcon
                :name="!emailVerified ? 'warning' : 'notify-success'"
                :size="is4XL ? '6' : '10'"
                class="text-white"
              />
            </div>
          </div>
        </slot>
      </template>

      <!-- USER CONTENT -->
      <template #popper>
        <slot name="content">
          <div class="user__content flex items-center px-20 py-18">
            <div class="flex flex-col w-full">
              <div class="flex flex-col border-b border-namara-grey dark:border-himalaya-sky pb-14 mb-14">
                <!-- USER FIRSTNAME | LASTANME -->
                <AppTruncatedTooltip
                  :content="`${firstname} ${lastname || ''}`"
                  class="text-base text-scarabaeus-sacer dark:text-white font-semibold mb-4"
                />

                <!-- USER EMAIL -->
                <AppTruncatedTooltip
                  :content="email"
                  class="text-hard-coal dark:text-light-steel-blue text-sm"
                />
              </div>

              <!-- OPTIONS LIST -->
              <ul class="flex flex-col">
                <router-link
                  v-for="{ label, additionalLabel, route, click } of dropdownOptions"
                  :key="route"
                  #default="{ navigate }"
                  :to="{ name: route ? route : '' }"
                  custom
                >
                  <!-- VERIFY EMAIL ITEM -->
                  <template v-if="!emailVerified">
                    <div
                      v-if="!route && !click"
                      class="
                        font-semibold
                        text-base
                        mb-14
                        last:mb-0
                        transition
                        duration-300
                        capitalize
                        cursor-pointer
                      "
                      :class="!emailVerified && 'text-alexandria'"
                      @click="!emailVerified ? isVerifyEmailModalOpened = true : null"
                    >
                      {{ label }}
                    </div>
                  </template>

                  <!-- ROUTER-LINK ITEM -->
                  <div
                    v-if="route && !click"
                    class="
                      flex
                      items-center
                      justify-between
                      font-semibold
                      text-base
                      text-scarabaeus-sacer
                      dark:text-white
                      hover:text-hidden-sea-glass
                      dark:hover:text-hidden-sea-glass
                      mb-14
                      last:mb-0
                      transition
                      duration-300
                      cursor-pointer
                    "
                    @click="navigate()"
                  >
                    <span>{{ label }}</span>

                    <!-- ONLY FOR REFERRAL ITEM -->
                    <template v-if="route === routeNames.referral">
                      <span
                        v-if="isMD && currRoute.name === routeNames.home && additionalLabel"
                        class="text-tradewind text-sm font-semibold"
                      >
                        {{ additionalLabel }}
                      </span>
                    </template>
                  </div>

                  <!-- CLICKBLE ITEM -->
                  <div
                    v-if="click"
                    class="
                      font-semibold
                      text-base
                      text-scarabaeus-sacer
                      dark:text-white
                      hover:text-hidden-sea-glass
                      dark:hover:text-hidden-sea-glass
                      mb-14
                      last:mb-0
                      transition
                      duration-300
                      cursor-pointer
                    "
                    @click="onLogout()"
                  >
                    {{ label }}
                  </div>
                </router-link>
              </ul>
            </div>
          </div>
        </slot>
      </template>
    </AppFlyout>
  </div>

  <!-- VERIFY EMAIL MODAL -->
  <AppModal v-model="isVerifyEmailModalOpened">
    <h2
      class="
        text-xl
        md:text-2xl
        text-seal-blue
        dark:text-white-lilac
        text-center
        font-semibold
        mb-32
        md:mb-60
      "
    >
      Verify your email
    </h2>

    <!-- MODAL ACTION BUTTONS -->
    <div class="flex justify-center w-full space-x-40">
      <AppButton
        type="grey-outlined"
        class="w-full"
        @click="isVerifyEmailModalOpened = false"
      >
        Close
      </AppButton>

      <AppButton
        type="primary-border-filled"
        class="w-full"
        @click="verifyEmail"
      >
        Verify
      </AppButton>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { routeNames } from '@/router'

import { vuex } from '@/store'
import { authService } from '@/services'
import { EErrorsMessage } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

interface IDropdownOption {
  label: string;
  additionalLabel: string;
  route: string;
  click: boolean;
}

export default defineComponent({
  name: 'HeaderUser',

  setup () {
    /* USE ROUTER */
    const router = useRouter()
    const currRoute = useRoute()

    /* USE GLOBAL SETUP */
    const { isHeroPage, isHeroMobilePage } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { isMD, is4XL } = useCustomBreakpoints()

    const dropdownOptions: IDropdownOption[] = [
      { label: 'Profile', additionalLabel: '', route: routeNames.profile, click: false },
      { label: 'Verify email', additionalLabel: '', route: '', click: false },
      { label: 'API Key', additionalLabel: '', route: routeNames.keys, click: false },
      { label: 'Referral', additionalLabel: 'Get 200 UBXT', route: routeNames.referral, click: false },
      { label: 'UBXT Info', additionalLabel: '', route: routeNames.ubxtInfo, click: false },
      { label: 'Log out', additionalLabel: '', route: '', click: true }
    ]

    const isVerifyEmailModalOpened = ref<boolean>(false)

    const {
      firstname,
      lastname,
      email,
      emailVerified
    } = toRefs(vuex.auth.user)

    const userAvatar = computed(() => vuex.auth.userAvatar)

    const getUserAvatarNameClasses = computed((): string => {
      if (!isHeroMobilePage.value) {
        if (isHeroPage.value) {
          return 'text-industrial-gray md:text-white border-chicory-flower dark:border-blair'
        } else {
          return 'text-industrial-gray border-chicory-flower dark:border-blair'
        }
      }

      return 'border-white text-white'
    })

    async function verifyEmail (): Promise<void> {
      try {
        await authService.verifyEmail({ email: email.value })
        appNotify({ type: 'success', message: 'A new verify email has just been sent to you!' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        isVerifyEmailModalOpened.value = false
      }
    }

    function onLogout (): void {
      vuex.auth.setToken(null)
      vuex.auth.setUser(null)
      router.replace({ name: routeNames.login })
    }

    return {
      currRoute,
      routeNames,
      isMD,
      is4XL,
      dropdownOptions,
      isHeroPage,
      isHeroMobilePage,
      firstname,
      lastname,
      emailVerified,
      email,
      userAvatar,
      isVerifyEmailModalOpened,
      getUserAvatarNameClasses,
      verifyEmail,
      onLogout
    }
  }
})
</script>

<style lang="scss" scoped>
.user {
  &__avatar {
    @media(min-width: 2500px) {
      width: 65px;
      height: 65px;
    }

    @media(min-width: 1920px) and (max-width: 2499px) {
      width: 45px;
      height: 45px;
    }

    @media(max-width: 1919px) {
      @apply h-40 w-40;
    }
  }

  &__content {
    width: 250px;
  }
}
</style>
