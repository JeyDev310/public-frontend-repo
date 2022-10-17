<template>
  <div
    class="coming-soon__bg flex flex-col flex-grow relative w-full"
    :class="getModeName"
    :style="`background: url(${background})  no-repeat center center / cover;`"
  >
    <div class="flex flex-col flex-grow items-center justify-center w-full p-20 z-1">
      <h2 class="coming-soon__title text-center text-6xl text-nile-blue dark:text-downy font-bold">{{ title }}</h2>

      <p
        class="
        coming-soon__desc
        w-full
        text-center
        text-nile-blue
        dark:text-let-it-snow
        text-xl
        lg:text-2xl
        mx-auto
        mb-30
        "
      >
        {{ desc }}
      </p>

      <div class="flex">
        <router-link #default="{navigate}" :to="{ name: routeNames.home }" custom>
          <AppButton size="lg" class="w-full md:w-auto" @click="navigate()">{{ buttonTitle }}</AppButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { routeNames } from '@/router'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'AppComingSoon',

  props: {
    background: {
      type: String as PropType<string>,
      default: '/img/coming-soon/img-1.png'
    },

    title: {
      type: String as PropType<string>,
      default: 'Coming Soon'
    },

    desc: {
      type: String as PropType<string>,
      default: 'This part is under construction. We are working hard on this page, stay tuned, It will bring a lo of new features.'
    },

    buttonTitle: {
      type: String as PropType<string>,
      default: 'Back to Home page'
    }
  },

  setup () {
    const { getModeName } = useGlobal()

    return { routeNames, getModeName }
  }
})
</script>

<style lang="scss" scoped>
.coming-soon {
  &__bg {
    &:after {
      @apply absolute inset-0;
      content: '';
    }
    &.is-dark {
      &:after {
        background: rgba(6, 6, 6, 0.7);
      }
    }

    &.is-light {
      &:after {
        background: rgba(238, 230, 230, 0.7);
      }
    }
  }

  &__title {
    @media(min-width: 1025px) {
      font-size: 100px;
    }
  }

  &__desc {
    max-width: 800px;
  }
}
</style>
