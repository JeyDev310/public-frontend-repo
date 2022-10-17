<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <!-- TITLE -->
      <Portal to="h-title">
        <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">UBXT Balance</h2>
      </Portal>

      <template v-if="getIsDeveloperUser">
        <!-- UBXT WALLET TABS (DESKTOP) -->
        <mq-layout mq="lg+" class="mr-16">
          <Portal to="h-one">
            <AppButtonsGroup
              v-model="configTab"
              :options="configTabs"
              type="outlined"
              :size="is3XL ? 'sm' : !is4XL ? 'xlg' : 'md'"
              :width="isLG ? '120px' : !is3XL ? '160px' : '140px'"
              class="md:ml-10 lg:ml-20 4xl:ml-24"
              @change="changeTab"
            />
          </Portal>
        </mq-layout>

        <!-- UBXT WALLET TABS (MOBILE) -->
        <mq-layout mq="sm-md" class="flex-shrink-0 mb-20">
          <AppButtonsGroup
            v-model="configTab"
            :options="configTabs"
            type="underline"
            size="lg"
            width="100%"
            @change="changeTab"
          />
        </mq-layout>
      </template>

      <!-- CONTENT -->
      <div class="flex flex-col flex-grow relative w-full overflow-y-auto custom-scrollbar">
        <!-- UBXT BALANCE TAB -->
        <template v-if="route.name === configTabs[0].value">
          <UBXTBalance />
        </template>

        <!-- DEV MODE TAB -->
        <template v-if="route.name === configTabs[1].value">
          <BotsStats />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

import { useRoute, router, routeNames } from '@/router'

import { vuex } from '@/store'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import UBXTBalance from '@/views/ubxt-wallet/components/ubxt-balance/UBXTBalance.vue'
import BotsStats from '@/views/ubxt-wallet/components/bots-stats/BotsStats.vue'

export default defineComponent({
  name: 'UBXTWallet',

  components: { UBXTBalance, BotsStats },

  beforeRouteEnter (to: any, from: any, next: any) {
    if (to.name === routeNames.ubxtWallet) {
      next('/ubxt-wallet/balance')
    } else {
      next()
    }
  },

  setup () {
    const route = useRoute()

    const { isLG, is3XL, is4XL } = useCustomBreakpoints()

    const loading = ref<boolean>(false)
    const isBotDeveloper = ref<boolean>(true)

    const configTab = ref<string>(routeNames.ubxtBalance)
    const configTabs: { label: string; value: string; }[] = [
      { label: 'UBXT Balance', value: routeNames.ubxtBalance },
      { label: 'My Bot Stats', value: routeNames.devMode }
    ]

    const getIsDeveloperUser = computed(() => vuex.auth.isDeveloperUser)

    function changeTab (item: string): void {
      if (route.name !== `${item}`) {
        router.push({ name: item })
      }
    }

    function setCurrentTab (): void {
      const curr = configTabs.find((el) => el.value === route.name)

      if (curr?.value) {
        configTab.value = curr.value
      }
    }

    async function fetchUBXTWalletData (): Promise<void> {
      loading.value = true

      try {
        await vuex.ubxtWallet.fetchUserWallet()
      } finally {
        loading.value = false
      }
    }

    function initData (): void {
      setCurrentTab()
      fetchUBXTWalletData()
    }

    onMounted(() => { initData() })

    return {
      isLG,
      is3XL,
      is4XL,
      route,
      loading,
      isBotDeveloper,
      configTab,
      configTabs,
      getIsDeveloperUser,
      changeTab
    }
  }
})
</script>

<style lang="scss" scoped>
.ubxt-wallet {
  &__summary-card {
    @apply p-20;
    height: 140px;
  }
}
</style>
