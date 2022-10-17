<template>
  <div class="avatar-cropper">
    <div
      v-if="dataUrl"
      class="avatar-cropper-overlay"
    >
      <div class="avatar-cropper-container">
        <div class="avatar-cropper-image-container">
          <img
            ref="img"
            :src="dataUrl"
            alt
            @load.stop="createCropper"
          >
        </div>
        <div class="flex justify-between mt-20">
          <AppButton @click="cancel">Cancel</AppButton>
          <AppButton @click="submit">Submit</AppButton>
        </div>
      </div>
    </div>
    <input
      ref="input"
      :accept="mimes"
      class="hidden"
      type="file"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, reactive, toRefs } from 'vue'

import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default defineComponent({
  name: 'AppAvatarUploader',

  props: {
    uploadHandler: {
      type: Function,
      default: null
    },

    uploadUrl: {
      type: String as PropType<string>,
      required: true
    },

    requestMethod: {
      type: String as PropType<'POST' | 'PUT'>,
      default: 'POST'
    },

    uploadHeaders: {
      type: Object,
      required: true
    },

    uploadFormName: {
      type: String as PropType<string>,
      default: 'file'
    },

    uploadFormData: {
      type: Object,
      default: () => ({})
    },

    cropperOptions: {
      type: Object,
      default: () => ({ aspectRatio: 1, autoCropArea: 1, viewMode: 1, movable: false, zoomable: false })
    },

    outputOptions: {
      type: Object,
      default: () => ({})
    },

    outputMime: {
      type: String as PropType<string>,
      default: null
    },

    outputQuality: {
      type: Number as PropType<number>,
      default: 0.9
    },

    mimes: {
      type: String as PropType<string>,
      default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
    },

    withCredentials: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    inline: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  emits: ['error', 'changed', 'cancel', 'submit', 'uploading', 'uploaded', 'completed'],

  setup (props, { emit }) {
    const state = reactive({
      cropper: undefined as any,
      dataUrl: null as string | ArrayBuffer | null,
      filename: '' as string,
      mimeType: '' as string,
      input: null as HTMLInputElement | null,
      img: null as HTMLImageElement | null
    })

    function uploadImage (): void {
      state.cropper.getCroppedCanvas(props.outputOptions).toBlob(
        (blob: Blob) => {
          const form = new FormData()
          const xhr = new XMLHttpRequest()
          const data = Object.assign({}, props.uploadFormData)
          xhr.withCredentials = props.withCredentials
          for (const key in data) {
            form.append(key, data[key])
          }
          form.append(props.uploadFormName, blob, state.filename)
          emit('uploading', form, xhr)
          xhr.open(props.requestMethod, props.uploadUrl, true)
          for (const header in props.uploadHeaders) {
            xhr.setRequestHeader(header, props.uploadHeaders[header])
          }
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              let response = ''
              try {
                response = JSON.parse(xhr.responseText)
              } catch (error) {
                response = xhr.responseText
              }
              emit('completed', response, form, xhr)
              if ([200, 201, 204].indexOf(xhr.status) > -1) {
                emit('uploaded', response, form, xhr)
              } else {
                emit('error', xhr)
              }
            }
          }
          xhr.send(form)
        },
        props.outputMime,
        props.outputQuality
      )
    }

    function destroy (): void {
      if (state.cropper) {
        state.cropper.destroy()
      }
      if (state.input) {
        state.input.value = ''
      }
      state.dataUrl = null
    }

    function submit (): void {
      emit('submit')
      if (props.uploadUrl) {
        uploadImage()
      } else if (props.uploadHandler) {
        props.uploadHandler(state.cropper)
      } else {
        emit('error', 'No upload handler found.', 'user')
      }
      destroy()
    }

    function cancel (): void {
      emit('cancel')
      destroy()
    }

    // function pickImage (e: Event): void {
    //   if (state.input) {
    //     state.input.click()
    //   }
    //   e.preventDefault()
    //   e.stopPropagation()
    // }

    function createCropper (): void {
      state.cropper = new Cropper((state.img as HTMLImageElement), props.cropperOptions)
    }

    onMounted(() => {
      nextTick(() => {
        state.input && state.input.click()
      })

      // listen for input file changes
      const fileInput = state.input
      fileInput && fileInput.addEventListener('change', () => {
        if (fileInput.files != null && fileInput.files[0] != null) {
          const correctType = props.mimes.split(', ').find(m => m === (fileInput.files && fileInput.files[0].type))
          if (!correctType) {
            emit('error', 'File type not correct.', 'user')
            return
          }
          const reader = new FileReader()

          reader.onload = (e: Event) => {
            const target = e.target as FileReader
            state.dataUrl = target.result
          }
          reader.readAsDataURL(fileInput.files[0])
          state.filename = fileInput.files[0].name || 'unknown'
          state.mimeType = state.mimeType || fileInput.files[0].type
          emit('changed', fileInput.files[0], reader)
        }
      })

      document.body.onfocus = () => {
        setTimeout(() => {
          !(fileInput?.files && fileInput.files.length) && emit('cancel')
        }, 400)
      }
    })

    return {
      ...toRefs(state),
      createCropper,
      cancel,
      submit
    }
  }
})
</script>
