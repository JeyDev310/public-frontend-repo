<template>
  <div class="algobots-rental-tuto">
    <AppCard
      class="
        grid
        grid-cols-2
        2xl:grid-cols-4
        gap-y-30
        2xl:gap-y-0
        gap-x-30
        2xl:gap-x-20
        w-full
        py-24
        4xl:py-30
        px-40
      "
      rounded="rounded-xl"
    >
      <div
        v-for="(item, index) in tutoData"
        :key="index"
        class="flex items-center w-full"
        :class="`algobots-rental-tuto__item-${index + 1}`"
      >
        <div class="algobots-rental-tuto__img-wrap relative">
          <span
            class="
              absolute
              -left-20
              -top-10
              flex
              flex-col
              items-center
              justify-center
              w-28
              h-28
              4xl:w-36
              4xl:h-36
              bg-azureish-white
              bg-opacity-60
              dark:bg-blue-party-parrot
              dark:bg-opacity-30
              rounded-full
              4xl:text-lg
              font-bold
              text-nile-blue
              dark:text-white
            "
          >
            {{ index + 1 }}
          </span>

          <img
            :src="item.src"
            :alt="item.alt"
            class="algobots-rental-tuto__img w-full h-full object-cover"
          >
        </div>

        <span class="algobots-rental-tuto__title w-full md:ml-20 xl:ml-32 4xl:text-lg">
          <span class="font-bold text-industrial-revolution dark:text-white">{{ item.title }}</span>&nbsp;
          <span class="font-medium text-industrial-revolution dark:text-let-it-snow">
            {{ `${item.description}` }}
          </span>
        </span>
      </div>
    </AppCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AlgoBotTuto',

  setup () {
    const tutoData: { title: string; description: string; src: string; alt: string; }[] = [
      {
        title: 'Take a tour',
        description: 'in our algobots marketplace',
        src: '/img/algo-bots/widget/make_tour.svg',
        alt: 'make-tour'
      },
      {
        title: 'Select',
        description: 'the bot that fits your trading strategy',
        src: '/img/algo-bots/widget/select.svg',
        alt: 'select'
      },
      {
        title: 'Configure & Activate',
        description: 'your bot',
        src: '/img/algo-bots/widget/config.svg',
        alt: 'config'
      },
      {
        title: 'Enjoy',
        description: 'your time and let the bot trade for you',
        src: '/img/algo-bots/widget/enjoy.svg',
        alt: 'enfoj'
      }
    ]

    return { tutoData }
  }
})
</script>

<style lang="scss" scoped>
.algobots-rental-tuto {
  margin-top: -60px;

  @media (max-width: 2499px) {
    min-height: 122px;

    &__img-wrap {
      min-width: 80px;
      max-width: 80px;
    }
  }

  @media (min-width: 2500px) {
    min-height: 180px;

    &__img-wrap {
      min-width: 112px;
      max-width: 112px;
    }

    &__item-1,
    &__item-2,
    &__item-3 {
      .algobot-tuto {
        &__title {
          max-width: 126px;
        }
      }
    }

    &__item-4 {
      .algobot-tuto {
        &__title {
          max-width: 175px;
        }
      }
    }
  }
}
</style>
