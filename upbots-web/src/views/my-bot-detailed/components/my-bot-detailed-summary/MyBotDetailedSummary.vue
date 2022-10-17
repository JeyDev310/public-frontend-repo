<template>
  <AppCard class="flex flex-col relative pb-20 px-20 md:px-14 md:py-14 lg:p-20 4xl:p-30 mt-20 md:mt-0">
    <!-- CONTENT -->
    <div class="flex flex-col w-full space-y-24 lg:space-y-30 4xl:space-y-40">
      <!-- HEADER -->
      <MyBotDetailedSummaryHeader />

      <!-- CONTENT -->
      <MyBotDetailedSummaryContent />

      <!-- ACTION BUTTONS -->
      <MyBotDetailedSummaryActions />
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MyBotDetailedSummaryHeader from './MyBotDetailedSummaryHeader.vue'
import MyBotDetailedSummaryContent from './MyBotDetailedSummaryContent.vue'
import MyBotDetailedSummaryActions from './MyBotDetailedSummaryActions.vue'

export default defineComponent({
  name: 'MyBotDetailedSummary',

  components: {
    MyBotDetailedSummaryHeader,
    MyBotDetailedSummaryContent,
    MyBotDetailedSummaryActions
  }
})
</script>
