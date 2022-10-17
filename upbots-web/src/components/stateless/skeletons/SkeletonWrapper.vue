<template>
  <div>
    <svg
      :width="width"
      :height="height"
      :viewBox="computedViewBox"
      :preserveAspectRatio="preserveAspectRatio"
      version="1.1"
    >
      <rect
        :style="{ fill: `url(${baseUrl}#${idGradient})` }"
        :clip-path="`url(${baseUrl}#${idClip})`"
        x="0" y="0" width="100%" height="100%"
      />

      <defs>
        <clipPath :id="idClip">
          <slot />
        </clipPath>

        <linearGradient :id="idGradient">
          <stop
            offset="0%"
            :stop-color="primaryColor"
            :stop-opacity="primaryOpacity"
          >
            <animate
              v-if="animate" attributeName="offset" values="-2; 1" :dur="`${speed}s`" repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="50%"
            :stop-color="secondaryColor"
            :stop-opacity="secondaryOpacity"
          >
            <animate
              attributeName="offset"
              values="-1.5; 1.5"
              :dur="`${speed}s`"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="100%"
            :stop-color="primaryColor"
            :stop-opacity="primaryOpacity"
          >
            <animate
              attributeName="offset"
              values="-1; 2"
              :dur="`${speed}s`"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const uid = () => Math.random().toString(36).substring(2)

export default defineComponent({
  name: 'SkeletonWrapper',

  props: {
    width: {
      type: [Number, String],
      default: '100%'
    },

    height: {
      type: [Number, String],
      default: '100%'
    },

    viewBox: {
      type: String,
      default: '0 0 400 200'
    },

    preserveAspectRatio: {
      type: String,
      default: 'xMidYMid meet'
    },

    speed: {
      type: Number,
      default: 1
    },

    baseUrl: {
      type: String,
      default: ''
    },

    primaryColor: {
      type: String,
      default: '#E4EEF3'
    },

    secondaryColor: {
      type: String,
      default: '#a7c7d8'
    },

    primaryOpacity: {
      type: Number,
      default: 1
    },

    secondaryOpacity: {
      type: Number,
      default: 1
    },

    animate: {
      type: Boolean,
      default: true
    }
  },

  setup (props) {
    const idClip = uid()
    const idGradient = uid()
    const width = props.width ?? 400
    const height = props.height ?? 200
    const computedViewBox = props.viewBox ?? `0 0 ${width} ${height}`

    return {
      idClip,
      idGradient,
      computedViewBox
    }
  }
})
</script>
