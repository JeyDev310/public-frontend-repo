<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Profile</h2>
    </Portal>

    <!-- DESKTOP -->
    <mq-layout
      mq="lg+"
      class="flex flex-col lg:flex-row space-y-20 lg:space-y-0 lg:space-x-20 4xl:space-x-24"
    >
      <!-- LEFT SIDE CARD -->
      <AppCard class="main-card p-20 4xl:p-30">
        <div class="flex flex-col justify-center items-center mb-20 4xl:mb-36">
          <!-- AVATART -->
          <div
            class="
              main-card__avatar
              relative
              border-3
              border-solid
              border-hidden-sea-glass
              rounded-full
              mb-10
              overflow-hidden
              cursor-pointer
            "
          >
            <img v-if="userAvatar.type === 'img'" :src="userAvatar.value">

            <div
              v-else
              class="
                flex
                items-center
                justify-center
                h-full
                text-hidden-sea-glass
                font-medium
                text-4xl
                4xl:text-6xl
              "
            >
              {{ userAvatar.value }}
            </div>

            <div
              class="
                absolute
                inset-0
                flex
                items-center
                justify-center
                w-full
                h-full
                hover:bg-black
                hover:bg-opacity-60
                group
                transition
                duration-300
                z-10
              "
              @click="isModalChangeAvatarOpen = true"
            >
              <AppIcon
                name="pencil"
                size="20"
                class="opacity-0 group-hover:opacity-100 text-white transition duration-300"
              />
            </div>
          </div>

          <!-- USER NAME -->
          <div class="text-center">
            <div class="flex items-center justify-center space-x-6 mb-5 text-md 4xl:text-lg leading-normal">
              <span class="text-nile-blue dark:text-white">Welcome</span>
              <AppTruncatedTooltip
                :content="`${userProfile.firstname }!`"
                class="text-hidden-sea-glass font-bold"
              />
            </div>

            <div class="text-nile-blue dark:text-soaring-eagle leading-tight">
              Member Since: {{ $filters.date(userProfile.created, 'DD MMM YYYY hh:mm:ss') }}
            </div>
          </div>
        </div>

        <!-- PERSONAL INFO -->
        <PersonalInfo />
      </AppCard>

      <!-- RIGHT SIDE CARD -->
      <AppCard class="additional-card w-full p-20 4xl:p-30">
        <h2 class="w-full text-md 4xl:text-lg font-medium text-nile-blue dark:text-blair mb-10">Parameters</h2>

        <!-- 2FA -->
        <div class="additional-card__item">
          <div class="text-nile-blue dark:text-let-it-snow w-3/5">
            <div class="font-medium xl:text-md 4xl:text-2xl">2Fa:</div>
            <div class="xl:text-base 4xl:text-4xl">Enable Two Factor Authentication Service</div>
          </div>

          <AppToggle
            :model-value="twoFaToggle"
            @change="$event ? isModalOnTwoFactorOpen = true : isModalOffTwoFactorOpen = true"
          />
        </div>

        <!-- EMAIL SERVICE -->
        <div class="additional-card__item">
          <div class="text-nile-blue dark:text-let-it-snow w-3/5 mr-0 mb-20 md:mb-0 md:mr-10 text-center md:text-left">
            <div class="font-medium xl:text-md 4xl:text-2xl">Email Service:</div>
            <div class="xl:text-base 4xl:text-4xl">Get Security Code In Your Mail</div>
          </div>

          <div class="flex items-center">
            <AppTruncatedTooltip :content="userProfile.email" class="text-nile-blue dark:text-white" />
          </div>
        </div>

        <!-- CHANGE PASSWORD -->
        <div class="additional-card__item">
          <div class="text-nile-blue dark:text-let-it-snow w-3/5 mr-0 mb-20 md:mb-0 md:mr-10 text-center md:text-left">
            <div class="font-medium xl:text-md 4xl:text-2xl">Change Password:</div>
            <div class="xl:text-base 4xl:text-4xl">Define A New Password</div>
          </div>
          <AppButton type="primary-border-filled" rounded="full" @click="isModalChangePasswordOpen = true">
            Change Password
          </AppButton>
        </div>

        <!-- DASHBOARD CURRENCY -->
        <div class="additional-card__item">
          <div class="text-nile-blue dark:text-let-it-snow w-3/5 mr-0 mb-20 md:mb-0 md:mr-10 text-center md:text-left">
            <div class="font-medium xl:text-md 4xl:text-2xl">Dashboard Currency:</div>
            <div class="xl:text-base 4xl:text-4xl">Select Your Favorite Currency</div>
          </div>

          <AppSelect
            v-model="favoriteCurrency"
            :options="currencyList"
            :disabled="currencyLoading"
            size="md"
            @change="handleFavoriteCurrencyUpdate"
          />
        </div>

        <!-- TELEGRAM -->
        <div class="additional-card__item">
          <div class="text-nile-blue dark:text-let-it-snow w-3/5 mr-0 mb-20 md:mb-0 md:mr-10 text-center md:text-left">
            <div class="font-medium xl:text-md 4xl:text-2xl">Telegram:</div>
            <div class="xl:text-base 4xl:text-4xl">Activate the bot to receive Telegram Notifications</div>
          </div>

          <div class="flex items-center">
            <template v-if="isTelegramActivated">
              <p class="text-spring-bouquet font-medium">Activated</p>
              <a href="https://telegram.me/UpBots_Assistant_Bot" class="ml-10" rel="noreferrer" target="_blank">
                <AppButton type="primary-border-filled" rounded="full">
                  Open
                </AppButton>
              </a>
            </template>

            <template v-else>
              <a href="https://telegram.me/UpBots_Assistant_Bot" rel="noreferrer" target="_blank">
                <AppButton type="primary-border-filled" rounded="full">
                  Activate
                </AppButton>
              </a>
            </template>
          </div>
        </div>

        <!-- COUPON -->
        <div class="additional-card__item">
          <div class="text-nile-blue dark:text-let-it-snow w-3/5 mr-0 mb-20 md:mb-0 md:mr-10 text-center md:text-left">
            <div class="font-medium xl:text-md 4xl:text-2xl">Coupon:</div>
            <div class="xl:text-base 4xl:text-4xl">Add Your Coupon</div>
          </div>

          <template v-if="!hasCoupons">
            <AppButton type="primary-border-filled" rounded="full" @click="isCouponModalOpened = true">
              Add Coupon
            </AppButton>
          </template>

          <template v-else>
            <div class="text-spring-bouquet font-medium">Coupon Added</div>
          </template>
        </div>

        <!-- MODE -->
        <div class="additional-card__item">
          <div class="text-nile-blue dark:text-let-it-snow w-3/5 mr-0 mb-20 md:mb-0 md:mr-10 text-center md:text-left">
            <div class="font-medium xl:text-md 4xl:text-2xl">Mode:</div>
            <div class="xl:text-base 4xl:text-4xl">Select Light Or Dark Mode</div>
          </div>

          <AppThemeToggle />
        </div>
      </AppCard>
    </mq-layout>

    <!-- MOBILE -->
    <mq-layout mq="sm-md" class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
      <div
        class="flex items-center mb-20 space-x-2"
        @click="isAdditionalInfo ? isAdditionalInfo = !isAdditionalInfo : null"
      >
        <AppIcon
          v-if="isAdditionalInfo"
          name="chevron-right"
          size="24"
          class="transform rotate-180 text-nile-blue dark:text-blair self-center -mt-4"
        />

        <span class="text-md font-medium text-nile-blue dark:text-blair">Account</span>
      </div>

      <!-- MAIN INFO -->
      <template v-if="!isAdditionalInfo">
        <div class="flex flex-col overflow-y-auto custom-scrollbar">
          <AppCard class="px-20 py-30">
            <div class="flex justify-between space-x-10">
              <div class="flex items-center">
                <div
                  class="
                    main-card__avatar
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    relative
                    w-80
                    h-80
                    border-3
                    border-solid
                    border-hidden-sea-glass
                    rounded-full
                    cursor-pointer
                  "
                >
                  <img
                    v-if="userAvatar.type === 'img'"
                    :src="userAvatar.value"
                    class="w-full h-full object-cover rounded-full overflow-hidden"
                  >

                  <div
                    v-else
                    class="flex items-center justify-center h-full text-hidden-sea-glass font-medium text-6xl"
                  >
                    {{ userAvatar.value }}
                  </div>

                  <div
                    class="
                      absolute
                      -bottom-3
                      -right-3
                      flex
                      items-center
                      justify-center
                      w-34
                      h-34
                      bg-hidden-sea-glass
                      border-2
                      border-solid
                      border-white
                      rounded-full
                      z-10
                    "
                    @click="isModalChangeAvatarOpen = true"
                  >
                    <AppIcon name="pencil" size="12" class="text-white" />
                  </div>
                </div>

                <div class="self-center ml-16">
                  <AppTruncatedTooltip
                    :content="`${userProfile.firstname}!`"
                    class="text-lg text-hidden-sea-glass font-bold"
                  />
                  <div class="text-nile-blue dark:text-soaring-eagle text-md">Personal Infos</div>
                </div>
              </div>

              <div
                class="
                  flex
                  items-center
                  justify-center
                  self-center
                  flex-shrink-0
                  w-40
                  h-40
                  bg-maui-mist
                  dark:bg-willow-blue
                  text-beguiling-blue
                  dark:text-white
                  dark:shadow-600
                  rounded-md
                  cursor-pointer
                "
                @click="isAdditionalInfo = !isAdditionalInfo"
              >
                <AppIcon name="chevron-right" size="25" />
              </div>
            </div>
          </AppCard>

          <!-- Settings -->
          <h2 class="w-full text-md font-medium text-nile-blue dark:text-blair mb-14 mt-30">Settings</h2>

          <AppCard class="grid grid-rows-1 gap-y-50 px-20 py-30">
            <!-- 2Fa -->
            <div class="flex justify-between items-center space-x-10">
              <p class="text-nile-blue dark:text-let-it-snow font-medium text-lg">2Fa</p>
              <AppToggle
                v-model="twoFaToggle"
                @change="$event ? isModalOnTwoFactorOpen = true : isModalOffTwoFactorOpen = true"
              />
            </div>

            <!-- Dashboard Currency -->
            <div class="flex justify-between items-center space-x-10">
              <p class="text-nile-blue dark:text-let-it-snow font-medium text-lg">Currency</p>
              <AppSelect
                v-model="favoriteCurrency"
                :options="currencyList"
                :disabled="currencyLoading"
                size="md"
                @change="handleFavoriteCurrencyUpdate"
              />
            </div>

            <!-- Change Password -->
            <div class="flex justify-between items-center space-x-10">
              <p class="text-nile-blue dark:text-let-it-snow font-medium text-lg">Password</p>
              <AppButton type="primary-border-filled" rounded="full" @click="isModalChangePasswordOpen = true">
                Change Password
              </AppButton>
            </div>

            <!-- TELEGRAM -->
            <div class="flex justify-between items-center space-x-10">
              <p
                class="text-nile-blue dark:text-let-it-snow font-medium text-lg"
                title="Activate the bot to receive Telegram Notifications"
              >
                Telegram
              </p>

              <template v-if="isTelegramActivated">
                <p class="text-spring-bouquet font-medium">Activated</p>
                <a href="https://telegram.me/UpBots_Assistant_Bot" class="ml-10" rel="noreferrer" target="_blank">
                  <AppButton type="primary-border-filled" rounded="full">
                    Open
                  </AppButton>
                </a>
              </template>

              <template v-else>
                <a href="https://telegram.me/UpBots_Assistant_Bot" class="ml-10" rel="noreferrer" target="_blank">
                  <AppButton type="primary-border-filled" rounded="full">
                    Activate
                  </AppButton>
                </a>
              </template>
            </div>

            <!-- COUPON -->
            <div class="flex justify-between items-center space-x-10">
              <p class="text-nile-blue dark:text-let-it-snow font-medium text-lg">Coupon</p>

              <template v-if="!hasCoupons">
                <AppButton type="primary-border-filled" rounded="full" @click="isCouponModalOpened = true">
                  Add Coupon
                </AppButton>
              </template>

              <template v-else>
                <p class="text-spring-bouquet font-medium">Coupon Added</p>
              </template>
            </div>

            <!-- Change Theme -->
            <div class="flex justify-between items-center space-x-10">
              <p class="text-nile-blue dark:text-let-it-snow font-medium text-lg">Mode</p>
              <AppThemeToggle />
            </div>
          </AppCard>
        </div>
      </template>

      <!-- ADDITIONAL INFO -->
      <template v-else>
        <div class="flex flex-col overflow-y-auto custom-scrollbar">
          <AppCard class="p-20">
            <PersonalInfo />
          </AppCard>
        </div>
      </template>
    </mq-layout>

    <!-- MODALS -->

    <!-- CHANGE AVATAR MODAL -->
    <AppModal v-model="isModalChangeAvatarOpen">
      <AvatarUploader
        :upload-headers="uploadHeader"
        :upload-url="uploadUrl"
        class="p-20"
        @uploaded="handleUploadedAvatar"
        @error="handlerErrorAvatar"
        @cancel="isModalChangeAvatarOpen = false"
        @submit="handleSubmittedAvatar"
      />
    </AppModal>

    <!-- ON 2FA MODAL -->
    <AppModal v-model="isModalOnTwoFactorOpen" modal-width="800">
      <OnTwoFactorModal :is-modal-opened="isModalOnTwoFactorOpen" @success="isModalOnTwoFactorOpen = false" />
    </AppModal>

    <!-- OFF 2FA MODAL -->
    <AppModal v-model="isModalOffTwoFactorOpen">
      <OffTwoFactorModal @success="isModalOffTwoFactorOpen = false" />
    </AppModal>

    <!-- CHANGE PASSWORD MODAL -->
    <AppModal
      v-model="isModalChangePasswordOpen"
      modalWidth="665"
    >
      <ChangePasswordModal @update:update-password="onPasswordUpdate" />
    </AppModal>

    <!-- EDIT TELEGRAM MODAL -->
    <AppModal v-model="isModalTelegramOpen" modal-width="550">
      <TelegramModal
        :current-telegram="userProfile.telegram"
        @update:telegram-account="onTelegramUpdate"
      />
    </AppModal>

    <!-- CONFIRMATION PASS MODAL -->
    <AppModal v-model="isModalConfirmPasswordOpen" modal-width="550">
      <ConfirmPasswordModal @update:current-password="confirmPassword" />
    </AppModal>

    <!-- ADD COUPON MODAL -->
    <AppModal v-model="isCouponModalOpened">
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
        Add your coupon
      </h2>

      <div class="flex flex-col w-full">
        <Form
          #default="{ meta: { valid } }"
          :validation-schema="couponSchema"
          @submit="validateCoupon"
        >
          <AppInput v-model="couponCode" name="couponCode" class="mb-40" />

          <AppButton :disabled="!valid" class="w-full">
            Add coupon
          </AppButton>
        </Form>
      </div>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { router, routeNames } from '@/router'

import { vuex } from '@/store'
import { accountService, userService } from '@/services'
import { EErrorsMessage, IChangePassword, IFavoriteCurrency } from '@/types'
import { Form } from 'vee-validate'
import { couponSchema } from '@/schemas'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'
import { appNotify } from '@/components/stateless/notifications/notification.state'

import { useGlobal } from '@/global-setup/global.composition.setup'

import PersonalInfo from './components/PersonalInfo.vue'
import OnTwoFactorModal from './components/OnTwoFactorModal.vue'
import OffTwoFactorModal from './components/OffTwoFactorModal.vue'
import ChangePasswordModal from './components/ChangePasswordModal.vue'
import TelegramModal from './components/TelegramModal.vue'
import AvatarUploader from './components/AvatarUploader.vue'
import ConfirmPasswordModal from './components/ConfirmPasswordModal.vue'

export default defineComponent({
  name: 'Profile',

  components: {
    OnTwoFactorModal,
    OffTwoFactorModal,
    ChangePasswordModal,
    TelegramModal,
    AvatarUploader,
    PersonalInfo,
    ConfirmPasswordModal,
    Form
  },

  setup () {
    const { userSettings, hasCoupons, fetchUserSettings, updateUserSettings } = useGlobal()

    const isModalChangeAvatarOpen = ref<boolean>(false)
    const isModalOnTwoFactorOpen = ref<boolean>(false)
    const isModalOffTwoFactorOpen = ref<boolean>(false)
    const isModalChangePasswordOpen = ref<boolean>(false)
    const isModalTelegramOpen = ref<boolean>(false)
    const isAdditionalInfo = ref<boolean>(false)
    const isModalConfirmPasswordOpen = ref<boolean>(false)

    const twoFaToggle = computed({
      get () { return vuex.auth.is2FaEnabled },

      set (value: boolean) { return value }
    })

    const currencyList = ref<IFavoriteCurrency[]>([
      { label: 'USD', value: 'usd' },
      { label: 'EUR', value: 'eur' },
      { label: 'GBP', value: 'gbp' },
      { label: 'JPY', value: 'jpy' },
      { label: 'CAD', value: 'cad' },
      { label: 'CHF', value: 'chf' },
      { label: 'DKK', value: 'dkk' }
    ])

    const favoriteCurrency = computed({
      get () { return userSettings.value.favoriteCurrency },
      set (value: IFavoriteCurrency) { return value }
    })

    const currencyLoading = ref<boolean>(false)
    async function handleFavoriteCurrencyUpdate (currency: IFavoriteCurrency) {
      try {
        currencyLoading.value = true
        await Promise.all([
          updateUserSettings({ ...userSettings.value, favoriteCurrency: currency }),
          fetchUserSettings()
        ])
      } finally {
        currencyLoading.value = false
      }
    }

    const userProfile = computed(() => vuex.auth.user)

    const isTelegramActivated = computed(() => vuex.auth.user.tgChatId)

    const userTelegramUpdatedAccount = ref<string>('')
    function onTelegramUpdate (telegramAccount: string) {
      userTelegramUpdatedAccount.value = telegramAccount
      isModalTelegramOpen.value = false
      isModalConfirmPasswordOpen.value = true
    }

    const uploadUrl = `${process.env.VUE_APP_ROOT_API}/api/account/picture`

    const uploadHeader = computed(() => {
      return { Authorization: `Bearer ${vuex.auth.token}` }
    })
    const userAvatar = computed(() => vuex.auth.userAvatar)

    async function handleUploadedAvatar ({ status }: any) {
      if (status === 'success') {
        isModalChangeAvatarOpen.value = false
        await vuex.auth.fetchUserInfo()
        appNotify({ type: 'success', message: 'Profile picture has been updated' })
      }
    }

    async function handleSubmittedAvatar () {
      isModalChangeAvatarOpen.value = false
      appNotify({ type: 'info', message: 'Profile picture being processed' })
    }

    function handleTooLargePicture () {
      return appConfirm({
        title: 'Confirm your action',
        body: 'Your image is too large. Maximum allowed image size is 1.8MB. If you want to crop it, please try again.'
      })
    }

    async function handlerErrorAvatar (xhr: any) {
      const err = JSON.parse(xhr.responseText).message
      if (xhr.status === 401) {
        router.push({ name: routeNames.login })
      }

      const reOpenPictureUploader = await handleTooLargePicture()
      if (reOpenPictureUploader) {
        isModalChangeAvatarOpen.value = true
      } else {
        appNotify({ type: 'error', message: err || 'Profile picture upload failed' })
      }
    }

    async function onPasswordUpdate (values: IChangePassword) {
      try {
        const res = await accountService.updatePassword({
          ...values,
          email: userProfile.value.email
        })

        if (res.data) {
          appNotify({ type: 'success', message: 'Password updated successfully' })
        } else {
          appNotify({ type: 'error', message: EErrorsMessage.DEFAULT })
        }

        isModalChangePasswordOpen.value = false
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {}
    }

    async function confirmPassword (password: string) {
      try {
        await vuex.auth.updateUser({
          ...userProfile.value,
          telegram: userTelegramUpdatedAccount.value,
          email: userProfile.value.email,
          password
        })
      } finally {
        isModalConfirmPasswordOpen.value = false
      }
    }

    // ADD COUPON CODE //
    const isCouponModalOpened = ref<boolean>(false)
    const couponCode = ref<string>('')
    async function validateCoupon () {
      try {
        await userService.activateUniqueCoupon(couponCode.value)
        appNotify({ type: 'success', message: 'Your coupon has been successfully applied!' })
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        isCouponModalOpened.value = false
      }
    }

    return {
      isModalChangeAvatarOpen,
      isModalOffTwoFactorOpen,
      isModalOnTwoFactorOpen,
      isModalChangePasswordOpen,
      isModalTelegramOpen,
      isModalConfirmPasswordOpen,
      currencyLoading,
      userProfile,
      isAdditionalInfo,
      userTelegramUpdatedAccount,
      twoFaToggle,
      favoriteCurrency,
      currencyList,
      uploadUrl,
      uploadHeader,
      userAvatar,
      isCouponModalOpened,
      isTelegramActivated,
      hasCoupons,
      couponCode,
      couponSchema,
      handleFavoriteCurrencyUpdate,
      handleUploadedAvatar,
      handleSubmittedAvatar,
      handlerErrorAvatar,
      onTelegramUpdate,
      onPasswordUpdate,
      confirmPassword,
      validateCoupon
    }
  }
})
</script>

<style lang="scss" scoped>
.main-card {
  @media (max-width: 2499px) {
    &__avatar {
      width: 90px;
      height: 90px;
    }
  }

  @media (min-width: 1023px) and (max-width: 1439px) {
    width: 466px;
  }

  @media (min-width: 1440px) {
    width: 35%;
  }

  @media (min-width: 2500px) {
    &__avatar {
      @media (min-width: 640px) {
        width: 115px;
        height: 115px;
      }
    }
  }
}

.additional-card {
  &__item {
    @apply
      flex
      flex-col
      md:flex-row
      items-center
      space-x-10
      py-20
      4xl:py-30
      border-b
      border-solid
      border-catskill-white
      dark:border-anchors-aweign
      last:border-none;
  }
}
</style>
