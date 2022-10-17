<template>
  <div class="text-nile-blue dark:text-white">
    <div class="flex flex-col h-full">
      <!-- Tooltip -->
      <div>
        <h2 class="mb-20 text-xl font-semibold">AppTooltip:</h2>

        <div>
          <div class="mb-10">Placements:</div>
          <div class="flex flex-wrap -m-10">
            <!-- Right-Start -->
            <div class="m-10">
              <AppTooltip placement="right-start" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>right-start</AppButton>
              </AppTooltip>
            </div>

            <!-- Right -->
            <div class="m-10">
              <AppTooltip placement="right" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>right</AppButton>
              </AppTooltip>
            </div>

            <!-- Right-End -->
            <div class="m-10">
              <AppTooltip placement="right-end" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>right-end</AppButton>
              </AppTooltip>
            </div>

            <!-- Top-Start -->
            <div class="m-10">
              <AppTooltip placement="top-start" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>top-start</AppButton>
              </AppTooltip>
            </div>

            <!-- Top -->
            <div class="m-10">
              <AppTooltip placement="top" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>top</AppButton>
              </AppTooltip>
            </div>

            <!-- Top-End -->
            <div class="m-10">
              <AppTooltip placement="top-end" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>top-end</AppButton>
              </AppTooltip>
            </div>

            <!-- Left-Start -->
            <div class="m-10">
              <AppTooltip placement="left-start" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>left-start</AppButton>
              </AppTooltip>
            </div>

            <!-- Left -->
            <div class="m-10">
              <AppTooltip placement="left" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>left</AppButton>
              </AppTooltip>
            </div>

            <!-- Left-End -->
            <div class="m-10">
              <AppTooltip placement="left-end" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>left-end</AppButton>
              </AppTooltip>
            </div>

            <!-- Bottom-Start -->
            <div class="m-10">
              <AppTooltip placement="bottom-start" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>bottom-start</AppButton>
              </AppTooltip>
            </div>

            <!-- Bottom -->
            <div class="m-10">
              <AppTooltip placement="bottom" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>bottom</AppButton>
              </AppTooltip>
            </div>

            <!-- Bottom-End -->
            <div class="m-10">
              <AppTooltip placement="bottom-end" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <AppButton>bottom-end</AppButton>
              </AppTooltip>
            </div>
          </div>
        </div>

        <div class="mt-20">
          <div class="mb-10">Custom tooltip:</div>
          <AppTooltip placement="right" hideArrow>
            <AppButton>Some custom activator</AppButton>
            <template #content>
              <div class="app-tooltip__custom-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, hic.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, hic.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, hic.
              </div>
            </template>
          </AppTooltip>
        </div>

        <div class="mt-20">
          <div class="mb-10">Trigger:</div>
          <AppTooltip
            btnTitle="Click" trigger="click" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
          />
          <AppTooltip
            btnTitle="Hover" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit" class="ml-20"
          />
        </div>
      </div>

      <!-- TruncatedTooltip -->
      <div class="mt-40">
        <div class="text-xl">TruncatedTooltip:</div>
        <div class="text-sm mb-20">
          (Automatic truncation when text is long and displaying a tooltip with full text, on mouse hover)
        </div>

        <div class="bg-bering-wave text-white rounded-md p-10" style="width: 200px">
          <AppTruncatedTooltip content="Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long" />

          <div class="h-1 w-full bg-bunker my-10" />

          <AppTruncatedTooltip content="Short text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgTooltip'
})
</script>

<style lang="scss" scoped>
.app-tooltip__custom-content {
  @apply p-10 bg-bright-turquoise dark:bg-blue-syzygy text-gable-green dark:text-white rounded;
  max-width: 500px;
}
</style>
