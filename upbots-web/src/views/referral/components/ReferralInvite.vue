<template>
  <AppCard class="referral__invite relative flex flex-col px-30 py-20">
    <!-- TITLE -->
    <h2 class="w-full text-md 4xl:text-lg font-medium text-nile-blue dark:text-blair mb-20">Invite your friends</h2>

    <!-- LOADER -->
    <AppLoader v-if="loading" class="rounded-xlg" />

    <!-- CONTENT -->
    <div
      v-else
      class="flex flex-col md:flex-row flex-grow md:items-center divide-y md:divide-y-0 md:divide-x divide-eastern-blue"
    >
      <!-- QR CODE IMG -->
      <div class="flex flex-col flex-shrink-0 md:pr-30 2xl:pr-80 2xl:pl-50 pb-20 md:pb-0">
        <div class="referral__invite-qr-code-img-wrap w-full mx-auto md:mx-0">
          <QRCodeVue3
            :width="130"
            :height="130"
            :value="referralLink"
            :qrOptions="{typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H'}"
            :imageOptions="{hideBackgroundDots: true, imageSize: 0.4, margin: 0}"
            :dotsOptions="{
              type: 'square'
            }"
            :cornersSquareOptions="{type: 'square'}"
          />
        </div>
      </div>

      <div class="flex flex-col flex-grow justify-center md:pl-30 xl:pl-40 pt-20 md:pt-0">
        <!-- COPY QR CODE VALUE -->
        <div class="flex items-center mb-14 xl:mb-20 2xl:mb-30 mx-auto xl:mx-0">
          <div class="referral__invite-input w-full relative">
            <AppInput
              v-model="referralCode"
              :size="is2XL ? 'lg' : 'xlg'"
              class="w-full mr-24"
              allow-copy
              readonly
              @on-copy="copyToClipboard({ value: referralLink })"
            />
          </div>
        </div>

        <!-- SHARE LINK (SOCIAL MEDIA) -->
        <div class="flex flex-col xl:flex-row items-center">
          <p class="text-nile-blue dark:text-white xl:mr-20 2xl:mr-40 mb-10 xl:mb-0 xl:text-md">Share link on:</p>
          <div class="flex items-center space-x-10">
            <AppShareSocialMedia :sharing="sharing" :networks="networks" />
          </div>
        </div>
      </div>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import QRCodeVue3 from 'qrcode-vue3'

import { copyToClipboard } from '@/core/helpers'

import { vuex } from '@/store'
import { referralService } from '../referral.services'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'ReferralInvite',
  components: {
    QRCodeVue3
  },

  setup () {
    const { is2XL } = useCustomBreakpoints()

    const loading = ref<boolean>(false)

    const networks: { network: string; name: string; icon: string; color: string; }[] = [
      {
        network: 'email',
        name: 'Email',
        icon: 'email-share-link',
        color: '#333333'
      },
      {
        network: 'facebook',
        name: 'Facebook',
        icon: 'facebook-share-link',
        color: '#1877f2'
      },
      {
        network: 'messenger',
        name: 'Messenger',
        icon: 'messenger-share-link',
        color: '#0084ff'
      },
      {
        network: 'telegram',
        name: 'Telegram',
        icon: 'telegram-share-link',
        color: '#0088cc'
      },
      {
        network: 'twitter',
        name: 'Twitter',
        icon: 'twitter',
        color: '#1da1f2'
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: 'whatsapp-share-link',
        color: '#25d366'
      }
    ]

    const getUserFirstName = computed(() => vuex.auth.user.firstname)

    const referralCode = computed(() => vuex.referral.invitor?.referralCode)

    const referralLink = computed(() => referralService.getReferralLinkUrl(referralCode.value, getUserFirstName.value))

    const sharing = computed((): { url: string; title: string; } => {
      return { url: referralLink.value, title: 'Referral link' }
    })

    async function fetchInitData (): Promise<void> {
      loading.value = true
      try {
        await vuex.referral.fetchUserReferral()
      } finally {
        loading.value = false
      }
    }
    fetchInitData()

    return {
      is2XL,
      loading,
      copyToClipboard,
      sharing,
      networks,
      referralCode,
      referralLink
    }
  }
})
</script>

<style lang="scss" scoped>
.referral {
  &__invite-qr-code-img-wrap {
    max-width: 130px;
  }

  @media(min-width: 1440px) {
    &__invite {
      min-height: 220px;
    }

    &__invite-qr-code-img-wrap {
      max-width: 130px;
    }

    &__invite-input {
      max-width: 390px;
    }
  }

  @media(max-width: 1439px) {
    &__invite-qr-code-img-wrap {
      max-width: 110px;
    }
  }

  @media(min-width: 768px) and (max-width: 1439px) {
    &__invite {
      min-height: 197px;
    }

    &__invite-input {
      max-width: 370px;
    }
  }

   @media(max-width: 767px) {
    &__invite {
      min-height: 345px;
    }
  }
}
</style>
