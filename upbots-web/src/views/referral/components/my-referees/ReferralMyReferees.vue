<template>
  <AppCard class="referral__my-referees flex flex-col flex-grow pt-20 px-20 overflow-y-auto custom-scrollbar">
    <!-- TITLE -->
    <h2
      class="w-full text-md 4xl:text-lg font-medium text-nile-blue dark:text-blair text-center mb-5 xl:mb-20"
    >
      My referees ({{ getRefereesLength }})
    </h2>

    <!-- CONTENT -->
    <div class="flex flex-col flex-grow pt-30 xl:pt-0 pb-20 xl:pb-0 overflow-y-auto custom-scrollbar">
      <div
        class="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:flex
          lg:flex-col
          relative
          gap-40
          lg:gap-0
          lg:space-y-40
          xl:space-y-10
        "
        :class="{'flex-grow': !data.length}"
      >
        <!-- LOADER -->
        <AppLoader v-if="loading" class="rounded-xlg" />

        <template v-else>
          <!-- DATA -->
          <template v-if="data.length">
            <ReferralMyRefereesItem v-for="(item, index) in data" :key="index" :data="item" />
          </template>

          <!-- NO DATA STATE -->
          <template v-else>
            <AppNoData />
          </template>
        </template>
      </div>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import ordinal from 'ordinal'

import { vuex } from '@/store'

import ReferralMyRefereesItem from '@/views/referral/components/my-referees/ReferralMyRefereesItem.vue'

export default defineComponent({
  name: 'ReferralMyReferees',

  components: { ReferralMyRefereesItem },

  setup () {
    const loading = ref<boolean>(false)

    const data = computed(() => {
      if (vuex.referral?.invitees) {
        const referees = vuex.referral.invitees.map((invitee, index) => {
          return {
            id: index,
            img: '',
            name: invitee.userName,
            userCount: invitee.userCount,
            date: invitee.createdAt,
            tag: ordinal(invitee.level + 1),
            totalEarned: invitee.totalEarned
          }
        })
        return referees
      }
      return []
    })

    const getRefereesLength = computed(() => data.value.length ? data.value.length : 0)

    return { loading, data, getRefereesLength }
  }
})
</script>

<style lang="scss" scoped>
.referral {
  @media(min-width: 1440px) {
    &__my-referees {
      max-height: 640px;
    }
  }

  @media(min-width: 1280px) and (max-width: 1439px) {
    &__my-referees {
      max-height: 616px;
    }
  }

  @media(min-width: 1024px) and (max-width: 1279px) {
    &__my-referees {
      max-height: 624px;
    }
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    &__my-referees {
      max-height: 399px;
    }
  }

  @media(max-width: 767px) {
    &__my-referees {
      max-height: 500px;
    }
  }
}
</style>
