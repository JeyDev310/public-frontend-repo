<template>
  <div class="intro-blog flex flex-col flex-grow w-full">
    <!-- TITLE -->
    <h2
      class="
        font-semibold
        text-md
        md:text-2xl
        lg:text-4xl
        text-chicory-flower
        dark:text-blair
        mb-20
        lg:mb-30
      "
    >
      Check out our blog
    </h2>

    <!-- ITEMS GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-30 lg:gap-x-20 xl:gap-x-40">
      <!-- LOADING -->
      <template v-if="loading">
        <AppCard
          v-for="(item, index) in 3"
          :key="index"
          class="relative intro-blog__item overflow-hidden"
        >
          <AppLoader />
        </AppCard>
      </template>

      <template v-else>
        <!-- ITEM -->
        <template v-if="getPosts.length">
          <IntroBlogCard
            v-for="(item, index) in getPosts"
            :key="index"
            :post="item"
            :loading="loading"
          />
        </template>

        <!-- NO DATA -->
        <template v-else>
          <AppCard
            v-for="(item, index) in 3"
            :key="index"
            class="relative intro-blog__item flex items-center justify-center overflow-hidden"
          >
            <AppNoData />
          </AppCard>
        </template>
      </template>
    </div>

    <!-- LINK -->
    <div class="ml-auto mt-20 md:pr-3">
      <a
        href="https://upbots.com/blog/"
        target="_blank"
        class="group flex items-center text-tradewind"
      >
        <span class="font-medium md:text-md mr-10">Read more</span>
        <AppIcon
          name="arrow-long"
          :size="isLG ? '18' : '22'"
          class="block transform md:group-hover:translate-x-3 md:duration-300 rotate-180"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'

import { client } from '@/core/contentful'

import { appNotify } from '@/components/stateless/notifications'

import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

import IntroBlogCard from './IntroBlogCard.vue'

export default defineComponent({
  name: 'IntroBlog',

  components: { IntroBlogCard },

  setup () {
    const { isLG } = useCustomBreakpoints()

    const state = reactive({
      posts: [],
      loading: true as boolean
    })

    const getPosts = computed(() => {
      if (state.posts.length) {
        const posts: any = state.posts
        const sorttedPosts = posts.sort((a: any, b: any) => {
          return (new Date(a.fields.createdAt) as any) - (new Date(b.fields.createdAt) as any)
        })
        const filteredPosts = sorttedPosts.filter((el: any) => el.fields.slug)
        return filteredPosts.slice(0, 3)
      } else {
        return []
      }
    })

    async function initData (): Promise<void> {
      state.loading = true

      try {
        const posts: any = await client.getEntries()
        state.posts = posts.items
      } catch (error) {
        appNotify({ type: 'error', message: "Couldn't fetch blog data" })
      } finally {
        state.loading = false
      }
    }

    onMounted(() => { initData() })

    return { ...toRefs(state), isLG, getPosts }
  }
})
</script>

<style lang="scss" scoped>
.intro-blog {
  @media(min-width: 1024px) {
    margin-top: 100px;
  }

  @media(max-width: 1023px) {
    @apply mt-60;
  }
}
</style>
