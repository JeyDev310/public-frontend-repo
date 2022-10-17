<template>
  <AppCard class="intro-blog__item flex flex-col relative pb-20 overflow-hidden">
    <!-- IMG -->
    <div class="intro-blog__img-wrap relative w-full">
      <img
        :src="post.fields.heroImage.fields.file.url"
        :alt="post.fields.heroImage.fields.file.fileName"
        class="w-full h-full object-cover object-top"
      >

      <!-- CATEGORIES -->
      <ul class="flex items-center absolute bottom-20 left-20 space-x-10 z-2">
        <li
          v-for="(category, index) in post.fields.tags"
          :key="index"
          class="
            intro-blog__category-item
            text-sm
            text-white
            font-semibold
            rounded-sm
            px-10
            py-4
          "
        >
          {{ category }}
        </li>
      </ul>
    </div>

    <!-- ITEM CONTENT -->
    <div class="flex flex-col flex-grow px-20 pt-20">
      <!-- TITLE -->
      <h3 class="text-nile-blue dark:text-white text-md2 font-semibold mb-8" v-html="post.title" />

      <!-- AUTHOR | DATE -->
      <div class="flex items-center mb-10">
        <div class="flex items-center flex-shrink-0 mr-20">
          <AppIcon name="user" class="text-chicory-flower dark:text-blair" size="24" />

          <AppTruncatedTooltip
            :content="post.fields.author.fields.name"
            class="text-chicory-flower dark:text-blair font-medium ml-4"
          />
        </div>

        <div class="flex items-center">
          <AppIcon name="clock" class="text-chicory-flower dark:text-blair" size="20" />

          <AppTruncatedTooltip
            :content="$filters.date(post.fields.createdAt, 'YYYY-MM-DD HH:mm:ss')"
            class="text-chicory-flower dark:text-blair font-medium ml-4"
          />
        </div>
      </div>

      <!-- DESCRIPTION -->
      <p class="line-clamp-3 text-nile-blue dark:text-blair mb-10">
        {{ post.fields.previewText }}
      </p>

      <!-- LINK -->
      <a
        :href="`https://upbots.com/blog/${post.fields.slug}`"
        target="_blank"
        class="group flex items-center text-tradewind mt-auto"
      >
        <span class="font-medium mr-5">Continue Reading</span>
        <AppIcon
          name="arrow-long"
          size="20"
          class="block transform md:group-hover:translate-x-3 md:duration-300 rotate-180"
        />
      </a>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IntroBlogCard',

  props: {
    post: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss">
.intro-blog {
  &__img-wrap {
    max-height: 250px;

    &::after {
      @apply absolute inset-0 bg-black bg-opacity-30 z-1;
      content: '';
    }
  }

  &__category-item {
    background: #FF2D55;
  }

  @media(min-width: 1024px) {
    &__item {
      min-height: 430px;
    }
  }

  @media(max-width: 1023px) {
    &__item {
      min-height: 380px;
    }
  }
}
</style>
