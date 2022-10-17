<template>
  <div class="flex flex-col overflow-y-hidden custom-scrollbar">
    <!-- TITLE -->
    <Portal to="h-title">
      <div class="flex items-center relative">
        <h2 class="text-nile-blue dark:text-let-it-snow md:text-md 3xl:text-lg 4xl:text-xl">Create My Bot</h2>
        <span
          class="
            create-my-bot__title-tag
            absolute
            -bottom-20
            right-0
            whitespace-nowrap
            md:static
            bg-tradewind
            text-white
            text-xs
            md:text-sm
            px-5
            md:px-10
            py-2
            md:py-4
            rounded-sm
            md:ml-10
          "
        >
          try for free
        </span>
      </div>
    </Portal>

    <!-- CONTENT -->
    <div class="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
      <!-- BOT INFO -->
      <BotInfo class="mb-30" />

      <!-- STEPS -->
      <div class="flex flex-col flex-grow flex-shrink-0 2xl:flex-shrink space-y-30 overflow-y-auto custom-scrollbar">
        <BotSteps />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

/* LOCAL COMPONENTS */
import BotInfo from './components/info/BotInfo.vue'
import BotSteps from './components/steps/BotSteps.vue'

export default defineComponent({
  name: 'CreateMyBot',

  components: { BotInfo, BotSteps }
})
</script>
