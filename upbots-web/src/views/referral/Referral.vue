<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <mq-layout mq="lg+">
        <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Referral</h2>
      </mq-layout>
    </Portal>

    <!-- CONTENT DESKTOP -->
    <mq-layout
      mq="xl+"
      class="flex flex-col flex-grow space-y-20 4xl:space-y-24 overflow-y-auto custom-scrollbar"
    >
      <div class="referral__container grid gap-x-20 4xl:gap-x-24">
        <!-- REFERRAL BANNER -->
        <ReferralBanner />

        <!-- REFERRAL TOTAL EARNED -->
        <ReferralTotalEarned />
      </div>

      <div class="referral__container grid gap-x-20 4xl:gap-x-24">
        <div class="flex flex-col space-y-20 4xl:space-y-24 overflow-x-hidden custom-scrollbar">
          <!-- REFERRAL INVITE -->
          <ReferralInvite />

          <!-- REFERRAL TRANSACTIONS -->
          <ReferralTransactions />
        </div>

        <div class="flex flex-grow">
          <!-- REFERRAL MY REFEREES -->
          <ReferralMyReferees />
        </div>
      </div>
    </mq-layout>

    <!-- CONTENT TABLET -->
    <mq-layout
      mq="lg"
      class="flex flex-col flex-grow space-y-20 overflow-y-auto custom-scrollbar"
    >
      <!-- REFERRAL BANNER -->
      <ReferralBanner class="flex-shrink-0" />

      <!-- REFERRAL INVITE -->
      <ReferralInvite class="flex-shrink-0" />

      <!-- REFERRAL TOTAL EARNED -->
      <ReferralTotalEarned class="flex-shrink-0" />

      <!-- REFERRAL MY REFEREES -->
      <ReferralMyReferees class="flex-shrink-0" />

      <!-- REFERRAL TRANSACTIONS -->
      <ReferralTransactions />
    </mq-layout>

    <!-- CONTENT MOBILE -->

    <!-- MOBILE -->
    <mq-layout
      mq="sm-md"
      class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar"
    >
      <!-- TABS SELECT -->
      <AppButtonsGroup
        v-model="mobileTabsSelected"
        :options="mobileTabsOptions"
        type="underline"
        width="100%"
        class="flex-shrink-0 mb-20"
      />

      <!-- TAB 1 -->
      <div
        v-if="mobileTabsSelected === mobileTabsOptions[0].value"
        class="flex flex-col flex-grow w-full space-y-20 overflow-y-auto custom-scrollbar"
      >
        <!-- REFERRAL BANNER -->
        <ReferralBanner class="flex-shrink-0" />

        <!-- REFERRAL INVITE -->
        <ReferralInvite class="flex-shrink-0" />
      </div>

      <!-- TAB 2 -->
      <div
        v-if="mobileTabsSelected === mobileTabsOptions[1].value"
        class="flex flex-col flex-grow w-full space-y-20 overflow-y-auto custom-scrollbar"
      >
        <!-- REFERRAL TOTAL EARNED -->
        <ReferralTotalEarned class="flex-shrink-0" />

        <!-- REFERRAL MY REFEREES -->
        <ReferralMyReferees class="flex-shrink-0" />
      </div>

      <!-- TAB 3 -->
      <div
        v-if="mobileTabsSelected === mobileTabsOptions[2].value"
        class="flex flex-col flex-grow w-full space-y-20 overflow-y-auto custom-scrollbar"
      >
        <!-- REFERRAL TRANSACTIONS -->
        <ReferralTransactions />
      </div>
    </mq-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { vuex } from '@/store'

import ReferralBanner from '@/views/referral/components/ReferralBanner.vue'
import ReferralInvite from '@/views/referral/components/ReferralInvite.vue'
import ReferralTransactions from '@/views/referral/components/ReferralTransactions.vue'
import ReferralTotalEarned from '@/views/referral/components/ReferralTotalEarned.vue'
import ReferralMyReferees from '@/views/referral/components/my-referees/ReferralMyReferees.vue'

export default defineComponent({
  name: 'Referral',

  components: {
    ReferralBanner,
    ReferralInvite,
    ReferralTransactions,
    ReferralTotalEarned,
    ReferralMyReferees
  },

  setup () {
    const loading = ref<boolean>(false)
    const mobileTabsSelected = ref<string>('invite')
    const mobileTabsOptions: { label: string; value: string; }[] = [
      { label: 'Invite', value: 'invite' },
      { label: 'My Referees', value: 'myReferees' },
      { label: 'Transactions', value: 'transactions' }
    ]

    async function initData () {
      loading.value = true

      try {
        await vuex.referral.fetchUserReferees()
        await vuex.referral.fetchReferralTransactions()
      } finally {
        loading.value = false
      }
    }

    onMounted(() => { initData() })

    return { mobileTabsSelected, mobileTabsOptions }
  }
})
</script>

<style lang="scss" scoped>
.referral {
  @media(min-width: 1440px) {
    &__container {
      grid-template-columns: 2fr 1fr;
    }
  }

  @media(min-width: 1024px) and (max-width: 1439px) {
    &__container {
      grid-template-columns: 1.7fr 1fr;
    }
  }
}
</style>
