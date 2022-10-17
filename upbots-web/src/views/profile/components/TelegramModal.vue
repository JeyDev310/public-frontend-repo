<template>
  <div class="text-seal-blue dark:text-white">
    <h2 class="text-center text-2xl font-semibold mb-20">Telegram</h2>

    <p class="text-center mb-36">
      Enter your Telegram Id to receive notifications
    </p>

    <!-- TELEGRAM ACCOUNT -->
    <AppInput v-model="telegramAccountModel" name="telegramAccount" label="Telegram account" class="w-full mb-30" />

    <!-- SUBMIT BUTTON -->
    <AppButton class="w-full mt-6" @click="saveTelegram()">Save</AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from 'vue'

export default defineComponent({
  name: 'TelegramModal',

  props: {
    currentTelegram: {
      type: String as PropType<string>,
      default: ''
    }
  },

  emits: ['update:modelValue', 'update:telegramAccount'],

  setup (props, { emit }) {
    const telegramAccountModel = ref('')

    function saveTelegram () {
      emit('update:telegramAccount', telegramAccountModel.value)
    }

    function initData () {
      telegramAccountModel.value = props.currentTelegram
    }

    onMounted(() => { initData() })

    return { telegramAccountModel, saveTelegram }
  }
})
</script>
