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

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'AvatarUploader',

  props: {
    uploadHandler: {
      type: Function
    },

    uploadUrl: {
      type: String
    },

    requestMethod: {
      type: String,
      default: 'POST'
    },

    uploadHeaders: {
      type: Object
    },

    uploadFormName: {
      type: String,
      default: 'file'
    },

    uploadFormData: {
      type: Object,
      default () {
        return {}
      }
    },

    cropperOptions: {
      type: Object,
      default () {
        return {
          aspectRatio: 1,
          autoCropArea: 1,
          viewMode: 1,
          movable: false,
          zoomable: false
        }
      }
    },

    outputOptions: {
      type: Object
    },

    outputMime: {
      type: String,
      default: null
    },

    outputQuality: {
      type: Number,
      default: 0.9
    },

    mimes: {
      type: String,
      default: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
    },

    withCredentials: {
      type: Boolean,
      default: false
    },

    inline: {
      type: Boolean,
      default: true
    }
  },

  emits: ['error', 'changed', 'submit', 'cancel', 'uploading', 'completed', 'uploaded'],

  data () {
    return {
      cropper: undefined,
      dataUrl: undefined,
      filename: undefined
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.$refs.input.click()
    })

    // listen for input file changes
    const fileInput = this.$refs.input
    fileInput.addEventListener('change', () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        const correctType = this.mimes.split(', ').find(m => m === fileInput.files[0].type)
        if (!correctType) {
          this.$emit('error', 'File type not correct.', 'user')
          return
        }
        const reader = new FileReader()

        reader.onload = e => {
          this.dataUrl = e.target.result
        }
        reader.readAsDataURL(fileInput.files[0])
        this.filename = fileInput.files[0].name || 'unknown'
        this.mimeType = this.mimeType || fileInput.files[0].type
        this.$emit('changed', fileInput.files[0], reader)
      }
    })

    document.body.onfocus = () => {
      setTimeout(() => {
        !fileInput.files.length && this.$emit('cancel')
      }, 400)
    }
  },

  methods: {
    destroy () {
      if (this.cropper) {
        this.cropper.destroy()
      }
      this.$refs.input.value = ''
      this.dataUrl = undefined
    },

    submit () {
      this.$emit('submit')
      if (this.uploadUrl) {
        this.uploadImage()
      } else if (this.uploadHandler) {
        this.uploadHandler(this.cropper)
      } else {
        this.$emit('error', 'No upload handler found.', 'user')
      }
      this.destroy()
    },

    cancel () {
      this.$emit('cancel')
      this.destroy()
    },

    pickImage (e) {
      this.$refs.input.click()
      e.preventDefault()
      e.stopPropagation()
    },

    createCropper () {
      this.cropper = new Cropper(this.$refs.img, this.cropperOptions)
    },

    uploadImage () {
      this.cropper.getCroppedCanvas(this.outputOptions).toBlob(
        blob => {
          const form = new FormData()
          const xhr = new XMLHttpRequest()
          const data = Object.assign({}, this.uploadFormData)
          xhr.withCredentials = this.withCredentials
          for (const key in data) {
            form.append(key, data[key])
          }
          form.append(this.uploadFormName, blob, this.filename)
          this.$emit('uploading', form, xhr)
          xhr.open(this.requestMethod, this.uploadUrl, true)
          for (const header in this.uploadHeaders) {
            xhr.setRequestHeader(header, this.uploadHeaders[header])
          }
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              let response = ''
              try {
                response = JSON.parse(xhr.responseText)
              } catch (error) {
                response = xhr.responseText
              }
              this.$emit('completed', response, form, xhr)
              if ([200, 201, 204].indexOf(xhr.status) > -1) {
                this.$emit('uploaded', response, form, xhr)
              } else {
                this.$emit('error', xhr)
              }
            }
          }
          xhr.send(form)
        },
        this.outputMime,
        this.outputQuality
      )
    }
  }
}
</script>

<style lang="scss">
.avatar-cropper {
  .avatar-cropper-image-container {
    min-height: 300px;
    min-width: 300px;
  }
}
</style>
