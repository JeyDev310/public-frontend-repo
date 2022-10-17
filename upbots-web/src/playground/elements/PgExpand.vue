
<template>
  <div class="text-nile-blue dark:text-white">
    <div class="flex flex-col mb-70">
      <h2 class="mb-20 text-xl font-semibold">AppExpand:</h2>

      <div class="grid grid-cols-2 gap-x-40 gap-y-40">
        <div class="flex flex-col space-y-10">
          <p>default:</p>
          <AppExpand v-model="expandValue">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom bg:</p>
          <AppExpand v-model="expandValue" background="bg-alexandria">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom preview classes:</p>
          <AppExpand v-model="expandValue" preview-classes="flex items-center flex-row-reverse">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom content classes:</p>
          <AppExpand v-model="expandValue" content-classes="flex items-center flex-row-reverse">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom wrapper padding:</p>
          <AppExpand v-model="expandValue" wrapper-padding="px-40 py-20">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom radius:</p>
          <AppExpand v-model="expandValue" rounded="rounded-sm">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom icon expand:</p>
          <AppExpand v-model="expandValue" expand-icon-name="plus">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>custom icon expand size:</p>
          <AppExpand v-model="expandValue" expand-icon-size="20">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>trasition type:</p>
          <AppExpand v-model="expandValue" transition-type="secondary">
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>

        <div class="flex flex-col space-y-10">
          <p>disabled:</p>
          <AppExpand v-model="expandValue" disabled>
            <!-- PREVIEW -->
            <template #preview>
              <div class="w-full text-right">Preview</div>
            </template>

            <!-- CONTENT -->
            <template #content>
              <div class="w-full">Content</div>
            </template>
          </AppExpand>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgExpand',

  setup () {
    const expandValue = ref(false)

    return { expandValue }
  }
})
</script>
