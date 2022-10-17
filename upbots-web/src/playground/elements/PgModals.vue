<template>
  <div class="playground-container flex flex-col w-full text-nile-blue dark:text-white">
    <div class="flex flex-col mb-40">
      <h2 class="mb-20 text-xl font-semibold">AppModal:</h2>
    </div>

    <div class="grid grid-cols-2 gap-x-40 gap-y-40">
      <div class="flex flex-col space-y-10">
        <p>default:</p>
        <AppButton @click="isModalOneOpen = true">Open</AppButton>
      </div>

      <div class="flex flex-col space-y-10">
        <p>custom width:</p>
        <AppButton @click="isModalWidth = true">Open</AppButton>
      </div>

      <div class="flex flex-col space-y-10">
        <p>backdrop click disallow close:</p>
        <AppButton @click="isModalTwoOpen = true">Open</AppButton>
      </div>

      <div class="flex flex-col space-y-10">
        <p>handle before close:</p>
        <AppButton @click="isModalThreeOpen = true">Open</AppButton>
      </div>
    </div>

    <!-- Modal One -->
    <AppModal v-model="isModalOneOpen" modal-width="450">
      <h2 class="text-seal-blue dark:text-white text-center text-xl mt-32 mb-20">Modal one</h2>

      <p class="text-seal-blue dark:text-white">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Impedit, unde. A, quod obcaecati, fuga culpa in sint eaque
        recusandae similique omnis quasi explicabo cum ab impedit
        necessitatibus aliquam nam fugiat.
      </p>
    </AppModal>

    <!-- Modal Width -->
    <AppModal v-model="isModalWidth" modal-width="450">
      <h2 class="text-seal-blue dark:text-white text-center text-xl mt-32 mb-20">Modal one</h2>

      <p class="text-seal-blue dark:text-white">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Impedit, unde. A, quod obcaecati, fuga culpa in sint eaque
        recusandae similique omnis quasi explicabo cum ab impedit
        necessitatibus aliquam nam fugiat.
      </p>
    </AppModal>

    <!-- Modal Two -->
    <AppModal v-model="isModalTwoOpen" :closeOnBackdrop="false">
      <h2 class="text-seal-blue dark:text-white text-center text-xl mt-32 mb-20">Modal two</h2>

      <p class="text-seal-blue dark:text-white">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Impedit, unde. A, quod obcaecati, fuga culpa in sint eaque
        recusandae similique omnis quasi explicabo cum ab impedit
        necessitatibus aliquam nam fugiat.
      </p>
    </AppModal>

    <!-- Modal Three -->
    <AppModal v-model="isModalThreeOpen" :beforeClose="handleModalOneClose">
      <h2 class="text-seal-blue dark:text-white text-center text-xl mt-32 mb-20">Modal three</h2>

      <p class="text-seal-blue dark:text-white">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Impedit, unde. A, quod obcaecati, fuga culpa in sint eaque
        recusandae similique omnis quasi explicabo cum ab impedit
        necessitatibus aliquam nam fugiat.
      </p>
    </AppModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { appConfirm } from '@/components/stateless/confirms/confirm.state'

export default defineComponent({
  name: 'PgModals',

  inheritAttrs: false,

  setup () {
    const isModalOneOpen = ref(false)
    const isModalTwoOpen = ref(false)
    const isModalThreeOpen = ref(false)
    const isModalWidth = ref(false)
    const isAnimate = ref(false)

    function handleModalOneClose () {
      console.log('[handleModalOneClose]')
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const close = await appConfirm({
          title: 'Confirm your action',
          body: 'Are you sure to close?'
        })
        resolve(close)
      })
    }

    return {
      isModalWidth,
      isModalOneOpen,
      isModalTwoOpen,
      isModalThreeOpen,
      handleModalOneClose,
      isAnimate
    }
  }
})
</script>

<style scoped>
.playground-container {
  max-width: 1000px;
}
</style>
