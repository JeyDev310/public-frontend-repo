<template>
  <AppCard class="referral__total-earned flex flex-col pt-40 pb-40 px-20">
    <!-- TITLE -->
    <h2 class="w-full text-md 4xl:text-lg font-medium text-nile-blue dark:text-blair text-center mb-20">
      Total Earned
    </h2>

    <!-- CONTENT -->
    <div class="flex flex-col flex-grow items-center justify-center">
      <p class="inline-flex text-ball-blue dark:text-bright-turquoise text-xl md:text-2xl 2xl:text-4xl">
        <AppTruncatedTooltip :content="formatNumber(totalEarned ? totalEarned : 0)" class="font-semibold" />
        &nbsp;
        <span>UBXT</span>
      </p>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { formatNumber } from '@/core/helpers'

import { vuex } from '@/store'

export default defineComponent({
  name: 'ReferralTotalEarned',

  setup () {
    const totalEarned = computed(() => {
      return vuex.referral?.invitor?.totalEarned
    })

    return { formatNumber, totalEarned }
  }
})
</script>

<style lang="scss" scoped>
.referral {
  @media(min-width: 1440px) {
    &__total-earned {
      min-height: 220px;
    }
  }

  @media(min-width: 768px) and (max-width: 1439px) {
    &__total-earned {
      min-height: 180px;
    }
  }

  @media(max-width: 767px) {
    &__total-earned {
      min-height: 120px;
    }
  }
}
</style>
