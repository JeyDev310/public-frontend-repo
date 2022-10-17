<template>
  <div class="relative flex flex-col w-full">
    <Swiper
      :loop="loop"
      :autoplay="getAutoplay"
      :navigation="{
        nextEl: `#swiper-button-next-${uid}`,
        prevEl: `#swiper-button-prev-${uid}`,
      }"
      :breakpoints="generateConfigData"
      class="h-full w-full"
    >
      <SwiperSlide v-for="(item, index) in data" :key="index">
        <slot name="content" :item="item" :index="index" />
      </SwiperSlide>
    </Swiper>

    <!-- CAROUSEL BUTTONS -->
    <span
      :id="`swiper-button-prev-${uid}`"
      :class="!isDarkMode && 'shadow-400'"
      class="swiper-button-prev swiper__carousel--button swiper__carousel--button-prev"
    />
    <span
      :id="`swiper-button-next-${uid}`"
      :class="!isDarkMode && 'shadow-400'"
      class="swiper-button-next swiper__carousel--button swiper__carousel--button-next"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, getCurrentInstance } from 'vue'
import { routeNames } from '@/router'
import { useGlobal } from '@/global-setup/global.composition.setup'
import { IAppSwiperConfig, ISwiperConfig } from './swiper.types'
import { TIndexedObject } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Navigation, Autoplay } from 'swiper'

SwiperCore.use([Navigation, Autoplay])

const defaultConfig = [{ breakpoint: 320, slidesPerView: 1, spaceBetween: 20 }]

export default defineComponent({
  name: 'AppSwiper',

  components: { Swiper, SwiperSlide },

  props: {
    delay: {
      type: [Number, Boolean] as PropType<number | boolean>,
      default: 5000
    },

    config: {
      type: Array as PropType<IAppSwiperConfig[]>,
      default: defaultConfig
    },

    data: {
      type: Array as PropType<TIndexedObject[]>,
      require: true
    },

    loop: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup (props) {
    /* UID ID FOR SLIDE CAROSUEL */
    const currentInstance = getCurrentInstance()
    const uid = currentInstance?.uid

    // MODE //
    const { isDarkMode } = useGlobal()

    const generateConfigData = computed(() => {
      const configData: ISwiperConfig = {}

      props.config.map((x: IAppSwiperConfig) => { configData[x.breakpoint] = { ...x } })
      return configData
    })

    const getAutoplay = computed(() => {
      if (!props.delay) return false
      return { delay: props.delay }
    })

    return {
      routeNames,
      uid,
      isDarkMode,
      generateConfigData,
      getAutoplay
    }
  }
})
</script>

<style lang="scss" scoped>
.swiper {
  &__carousel {
    &--button {
      @apply bg-white dark:bg-black rounded-full transition duration-300 z-10;
      width: 46px;
      height: 46px;

      &.swiper-button-disabled {
        @apply opacity-50 cursor-default pointer-events-auto;
      }

      &:not(.swiper-button-disabled) {
        @apply hover:opacity-70;
      }

      &:after {
        @apply text-cypress-grey-blue dark:text-oh-boy text-base;
      }
    }

    &--button-prev {
      left: -17px;
    }

    &--button-next {
      right: -17px;
    }
  }
}
</style>
