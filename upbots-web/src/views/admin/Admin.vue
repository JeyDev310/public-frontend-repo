<template>
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- PAGE TITLE -->
    <Portal to="h-title">
      <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Admin</h2>
    </Portal>

    <div class="flex flex-col flex-shrink-0 w-full lg:px-20 space-y-20">
      <!-- SECTION TITLE -->
      <h2 class="text-nile-blue dark:text-blair text-md 4xl:text-2xl font-medium">
        Active Users
      </h2>

      <!-- ACTIVE USER LIST -->
      <ActiveUserList />

      <!-- ACTIVE USER CHART -->
      <ActiveUserChart />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { vuex } from '@/store'

import ActiveUserList from '@/views/admin/components/ActiveUserList.vue'
import ActiveUserChart from '@/views/admin/components/ActiveUserChart.vue'

export default defineComponent({
  name: 'Admin',

  components: { ActiveUserList, ActiveUserChart },

  setup () {
    async function initData () {
      await vuex.admin.fetchActiveUsersByActiveDay()
      await vuex.admin.fetchActiveUserChart()
    }

    onMounted(() => { initData() })
  }
})
</script>
