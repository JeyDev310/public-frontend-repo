<template>
  <div class="relative text-nile-blue dark:text-let-it-snow px-0 md:px-20">
    <!-- TITLE -->
    <h2 class="text-center text-xl leading-tight mt-32 mb-60">Edit API key</h2>

    <div class="px-10">
      <!-- FORM -->
      <Form :validation-schema="editKeySchema" :initial-values="{ name }" @submit="onUpdateKey">
        <AppInput
          name="name"
          label="API Key label"
          placeholder="Enter API Key label"
          size="lg"
          :disabled="accountsLoading"
          class="mb-30"
        />

        <!-- SUBMIT BUTTON -->
        <AppButton :disabled="accountsLoading" class="w-full mt-6">Save</AppButton>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Form } from 'vee-validate'
import { editKeySchema } from '@/schemas'
import { EErrorsMessage, TEditKey } from '@/types'
import { keysService } from '@/services'

import { useGlobal } from '@/global-setup/global.composition.setup'

import { appConfirm } from '@/components/stateless/confirms/confirm.state'
import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'EditKeyModal',

  components: { Form },

  props: {
    id: {
      type: String as PropType<string>,
      required: true
    },

    name: {
      type: String as PropType<string>,
      required: true
    }
  },

  emits: ['update:modelValue', 'success'],

  setup (props, { emit }) {
    const { accountsLoading, setAccountLoading } = useGlobal()

    async function onUpdateKey (values: TEditKey) {
      const isAllow = await appConfirm({
        title: 'Confirm your action',
        body: 'Are you sure to edit key name?',
        actionsName: ['Cancel', 'Edit']
      })

      if (isAllow) {
        try {
          setAccountLoading(true)
          await keysService.update({ ...values, id: props.id })

          emit('success')
          emit('update:modelValue', false)
          appNotify({ type: 'success', message: `${props.name} key has been updated to ${values.name}` })
        } catch (error) {
          appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
        } finally {
          setAccountLoading(false)
        }
      } else {
        return false
      }
    }

    return { accountsLoading, editKeySchema, onUpdateKey }
  }
})
</script>
