<template>
  <div class="playground-container flex flex-col text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppButton sizes:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>size xs:</p>
          <AppButton size="xs">Button</AppButton>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size sm:</p>
          <AppButton size="sm">Button</AppButton>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size md (default):</p>
          <AppButton>Button</AppButton>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size lg:</p>
          <AppButton size="lg">Button</AppButton>
        </div>

        <div class="flex flex-col space-y-10">
          <p>size xlg:</p>
          <AppButton size="xlg">Button</AppButton>
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppButton radius:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>radius sm (default):</p>
          <AppButton>Button</AppButton>
        </div>

        <div class="flex flex-col space-y-10">
          <p>radius md:</p>
          <AppButton rounded="md">Button</AppButton>
        </div>

        <div class="flex flex-col space-y-10">
          <p>radius xlg:</p>
          <AppButton rounded="xlg">Button</AppButton>
        </div>

        <div class="flex flex-col space-y-10">
          <p>radius full:</p>
          <AppButton rounded="full">Button</AppButton>
        </div>
      </div>
    </div>

    <div class="flex flex-col mb-40">
      <h2 class="text-xl font-semibold mb-20">AppButton states:</h2>

      <div class="flex flex-col items-start mb-70">
        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Primary state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton>Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">White outlined state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="white-outlined">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="white-outlined" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Purple outlined state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="purple-outlined">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="purple-outlined" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Grey outlined state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="grey-outlined">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="grey-outlined" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Grey filled gradient state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="grey-filled-gradient">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="grey-filled-gradient" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Grey filled state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="grey-filled">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="grey-filled" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Primary border filled state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="primary-border-filled">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="primary-border-filled" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Primary border state:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="primary-border">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="primary-border" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full mb-20">
          <h3 class="text-md font-medium mb-20">Primary border filled state dark:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="primary-border-filled">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="primary-border-filled" disabled>Button</AppButton>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <h3 class="text-md font-medium mb-20">Primary border filled state light:</h3>

          <div class="grid grid-cols-2 gap-40 w-full">
            <div class="flex flex-col space-y-10">
              <p>default:</p>
              <AppButton type="primary-border-filled">Button</AppButton>
            </div>

            <div class="flex flex-col space-y-10">
              <p>disabled:</p>
              <AppButton type="primary-border-filled" disabled>Button</AppButton>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-20">AppButton text & icons:</h2>

      <div class="flex flex-col w-full mb-20">
        <h3 class="text-md font-medium mb-20">Icon state:</h3>

        <div class="grid grid-cols-2 gap-40 w-full">
          <div class="flex flex-col space-y-10">
            <p>default:</p>
            <AppButton class="flex items-center justify-center">
              <i class="icon-keys" />
            </AppButton>
          </div>

          <div class="flex flex-col space-y-10">
            <p>disabled:</p>
            <AppButton class="flex items-center justify-center" disabled>
              <i class="icon-keys" />
            </AppButton>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full mb-70">
        <h3 class="text-md font-medium mb-20">Icon + Text state:</h3>

        <div class="grid grid-cols-2 gap-40 w-full">
          <div class="flex flex-col space-y-10">
            <p>default:</p>
            <AppButton class="flex items-center justify-center">
              <i class="icon-keys mr-10" />
              <span>Button</span>
            </AppButton>
          </div>

          <div class="flex flex-col space-y-10">
            <p>disabled:</p>
            <AppButton class="flex items-center justify-center" disabled>
              <i class="icon-keys mr-10" />
              <span>Button</span>
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PgButtons'
})
</script>

<style scoped>
.playground-container {
  max-width: 1200px;
}
</style>
