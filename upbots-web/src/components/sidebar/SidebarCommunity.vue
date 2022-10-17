<template>
  <!-- UPBOTS COMMUNITY LINKS -->
  <transition
    enter-active-class="transition transform"
    enter-from-class="w-0 -translate-x-10 opacity-0"
    enter-to-class="translate-x-0 opacity-100 w-auto"
    leave-active-class="transform duration-100 transition"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-10"
  >
    <div class="flex flex-col w-full px-24 py-12">
      <div
        v-if="isSidebarOpen"
        class="
        flex
        flex-col
        self-center
        flex-shrink-0
        w-full
        px-20
        pt-10
        pb-20
        border
        border-soaring-eagle
        rounded-md
        "
      >
        <div class="text-sm leading-md text-center text-soaring-eagle mb-14">UpBots Community</div>

        <div class="grid grid-cols-6 gap-x-5 items-center">
          <a
            v-for="(item, index) in tradersCommunity"
            :key="index"
            :href="item.link"
            target="_blank"
            class="flex items-center justify-center"
          >
            <AppTooltip placement="bottom-end" :content="item.label" class="flex">
              <AppIcon
                :name="item.icon"
                size="19"
                class="
                text-soaring-eagle
                hover:text-deep-aquamarine
                dark:hover:text-let-it-snow
                transition
                duration-300"
              />
            </AppTooltip>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SidebarCommunity',

  props: {
    isSidebarOpen: {
      type: Boolean as PropType<boolean>,
      require: true
    }
  },

  setup () {
    const tradersCommunity = [
      { link: 'https://t.me/Upbots', label: 'UpBots Chat', icon: 'telegram' },
      { link: 'https://twitter.com/UpBotscom', label: 'Twitter', icon: 'twitter' },
      { link: 'https://www.facebook.com/UpBotscom', label: 'Facebook', icon: 'facebook' },
      { link: 'https://www.linkedin.com/company/upbots', label: 'LinkedIn', icon: 'linkedin' },
      { link: 'https://discord.com/invite/wCrdMYEVjd', label: 'Discord', icon: 'discord' },
      { link: 'https://t.me/Upbots_announcement', label: 'UpBots Announcements', icon: 'telegram' }
    ]

    return { tradersCommunity }
  }
})
</script>
