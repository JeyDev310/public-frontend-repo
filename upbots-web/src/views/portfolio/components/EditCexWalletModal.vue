<template>
  <div class="relative text-nile-blue dark:text-let-it-snow">
    <h2 class="text-center text-xl leading-tight mb-40">Edit API key</h2>

    <div>
      <Form :validation-schema="editKeySchema" :initial-values="{ name }" @submit="onUpdateKey">
        <AppInput
          name="name"
          label="API Key label"
          placeholder="Enter API Key label"
          :disabled="loading"
          size="lg"
          class="mb-30"
        />

        <AppInput
          :modelValue="publicKey"
          type="password"
          show-last
          name="publicKey"
          label="API Public key"
          size="lg"
          class="mb-30"
          disabled
        />

        <!-- SUBMIT BUTTON -->
        <AppButton class="w-full mt-10" :disabled="loading">Save</AppButton>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import { Form } from 'vee-validate'
import { EErrorsMessage, TEditKey } from '@/types'
import { editKeySchema } from '@/schemas'
import { keysService } from '@/services'

import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

export default defineComponent({
  name: 'EditCexWalletModal',

  components: { Form },

  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    },

    id: {
      type: String as PropType<string>,
      required: true
    },

    name: {
      type: String as PropType<string>,
      required: true
    },

    publicKey: {
      type: String as PropType<string>,
      required: true
    }
  },

  emits: ['update:modelValue', 'success'],

  setup (props, { emit }) {
    const loading = ref<boolean>(false)

    async function onUpdateKey (values: TEditKey) {
      const isAllow = await appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to edit a key name?'
      })

      if (isAllow) {
        loading.value = true

        try {
          await keysService.update({ ...values, id: props.id })
          emit('success')
          emit('update:modelValue', false)
          appNotify({ type: 'success', message: `${props.name} key has been updated to ${values.name}` })
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          loading.value = false
        }
      } else {
        return false
      }
    }

    return { loading, editKeySchema, onUpdateKey }
  }
})
</script>
