<template>
  <div class="intro-help flex flex-col flex-grow w-full">
    <!-- TITLE -->
    <h2
      class="
        font-semibold
        text-md
        md:text-2xl
        lg:text-4xl
        text-chicory-flower
        dark:text-blair
        mb-10
      "
    >
      Need some help ?
    </h2>

    <!-- DESCRIPTION -->
    <p class="intro-help__desc md:text-md text-bluster-blue dark:text-white mb-20">
      If you need any help at all, come join us on Telegram or Discord where our team will
      gladly answer any questions you might have or send us an e-mail to:
      <a href="mailto:contact@upbots.com" class="text-bianchi-green md:hover:underline">contact@upbots.com</a>.
      Don't forget to follow us on Social Media channels for frequent updates:
    </p>

    <!-- SOCIAL MEDIA -->
    <div class="flex items-center space-x-10">
      <a
        v-for="({ href, icon, iconSize }, index) in socialMedia"
        :key="index"
        :href="href"
        target="_blank"
        class="
          flex
          items-center
          justify-center
          w-40
          h-40
          border
          border-solid
          border-bianchi-green
          rounded-full
          md:transition
          md:duration-300
          md:transform
          md:hover:scale-90
        "
      >
        <AppIcon
          :name="icon"
          :size="iconSize"
          class="text-bianchi-green"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface ISocialMedia {
  id: number;
  name: string;
  icon: string;
  iconSize: string;
  href: string;
}

export default defineComponent({
  name: 'IntroHelp',

  setup () {
    const socialMedia: ISocialMedia[] = [
      {
        id: 1,
        name: 'facebook',
        icon: 'facebook',
        iconSize: '18',
        href: 'https://www.facebook.com/UpBotscom'
      },
      {
        id: 2,
        name: 'twitter',
        icon: 'twitter',
        iconSize: '19',
        href: 'https://twitter.com/upbotscom'
      },
      {
        id: 3,
        name: 'youtube',
        icon: 'youtube',
        iconSize: '19',
        href: 'https://www.youtube.com/channel/UCFjbtkzDJDlJVSS9AaBfLKA'
      },
      {
        id: 4,
        name: 'instagram',
        icon: 'instagram',
        iconSize: '28',
        href: 'https://www.instagram.com/upbotscom/'
      },
      {
        id: 5,
        name: 'linkedin',
        icon: 'linkedin',
        iconSize: '18',
        href: 'https://www.linkedin.com/company/upbots/'
      }
    ]

    return { socialMedia }
  }
})
</script>

<style lang="scss" scoped>
.intro-help {
  @media(min-width: 1024px) {
    margin-top: 100px;

    &__desc {
      max-width: 812px;
    }
  }

  @media(max-width: 1023px) {
    @apply mt-60;
  }
}
</style>
