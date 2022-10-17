<template>
  <AppFlyout
    :ref="appNotificationsFlyout"
    placement="bottom-start"
    :offset="16"
    popper-classes="bg-white dark:bg-primary-dark-radial shadow dark:shadow-100 rounded-xl"
  >
    <!-- NOTIFICATIONS PREVIEW -->
    <template #activator>
      <slot>
        <div class="header__nav-menu-item-wrap group relative cursor-pointer">
          <div
            class="
              header__nav-menu-item
              flex
              items-center
              justify-center
              w-full
              h-full
              bg-blair
              md:group-hover:bg-opacity-30
              rounded-full
              transition
              duration-300
            "
            :class="!isHeroMobilePage ? 'bg-opacity-10' : 'bg-opacity-30'"
          >
            <!-- ICON BELL -->
            <AppIcon
              name="bell"
              class="header__nav-menu-item--icon transition duration-300"
              :class="!isHeroMobilePage ? 'text-blair' : 'text-white'"
              :size="is3XL ? '20' : !is4XL ? '30' : '22'"
            />

            <!-- UNREAD COUNT MSGS -->
            <div
              v-if="unreadNotifCount > 0"
              class="
                notification-count
                absolute
                -top-2
                -right-2
                3xl:-top-1
                3xl:-right-1
                4xl:-top-2
                4xl:-right-2
                flex
                flex-col
                items-center
                justify-center
                w-16
                h-16
                4xl:w-22
                4xl:h-22
                rounded-full
                bg-red-400
              "
            >
              <span class="text-white leading-1">{{ unreadNotifCount }}</span>
            </div>
          </div>
        </div>
      </slot>
    </template>

    <!-- NOTIFICATIONS CONTENT -->
    <template #popper>
      <slot name="content">
        <div class="flex flex-col px-20 py-18">
          <!-- IF NOTI LENGTH -->
          <template v-if="notifications.length">
            <div
              style="width: 250px"
              class="flex flex-col items-center pb-18"
              @click="goToNotifications"
            >
              <div
                v-for="item in notifications.slice(0, maxDisplayedNotifications)"
                :key="item.id"
                class="flex flex-col w-full mb-14 last:mb-0 cursor-pointer"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-namara-grey dark:text-white font-medium">
                    {{ item.title ? item.title : `${item.exch.toUpperCase()} : ${item.status}` }}
                  </span>

                  <span class="text-xs text-namara-grey dark:text-white font-medium">
                    {{ $filters.date(item.createdAt, 'h:mm:ss A') }}
                  </span>
                </div>

                <div class="flex">
                  <span class="block truncate text-xs text-hard-coal dark:text-light-steel-blue">
                    {{ getNotificationDesc(item) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- READ MORE -->
            <template v-if="notifications.length > maxDisplayedNotifications">
              <div
                class="
                  text-center
                  text-industrial-gray
                  dark:text-white
                  hover:text-hidden-sea-glass
                  dark:hover:text-hidden-sea-glass
                  border-t
                  border-scarabaeus-sacer
                  dark:border-himalaya-sky
                  font-semibold
                  px-10
                  pt-10
                  transition
                  duration-300
                  cursor-pointer
                "
                @click="goToNotifications"
              >
                Read more...
              </div>
            </template>
          </template>

          <!-- NO DATA -->
          <template v-else>
            <div class="flex flex-col items-center">
              <p class="text-nile-blue dark:text-white font-semibold mb-10">
                No notifications yet!
              </p>

              <p class="text-nile-blue dark:text-hidden-sea-glass">
                "we'll notify you when something arrives!"
              </p>
            </div>
          </template>
        </div>
      </slot>
    </template>
  </AppFlyout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { routeNames } from '@/router'
import { useRouter } from 'vue-router'

import { vuex } from '@/store'
import { INotification } from '@/types'

import { useGlobal } from '@/global-setup/global.composition.setup'
import { useCustomBreakpoints } from '@/global-setup/breakpoints.composition.setup'

export default defineComponent({
  name: 'HeaderNotifications',

  setup () {
    /* USE ROUTER */
    const router = useRouter()

    /* USE GLOBAL SETUP */
    const { isHeroMobilePage } = useGlobal()

    /* USE CUSTOM BREAKPOINTS SETUP */
    const { is3XL, is4XL } = useCustomBreakpoints()

    const maxDisplayedNotifications = 5
    const notifications = computed(() => vuex.notifications.notifications)
    const unreadNotifCount = computed(() => vuex.notifications.getUnreadNotifCount)

    const itemFlyout: any[] = []
    const appNotificationsFlyout = (el: HTMLDivElement) => {
      if (el) { itemFlyout.push(el) }
    }
    function goToNotifications (): void {
      itemFlyout[0].handleHidePopper(null, false)
      router.push({ name: routeNames.notifications })
    }

    function getNotificationDesc (item: INotification): string {
      if (item.description) return item.description

      return `${item?.sbl && item.sbl}: ${item?.qOrig ? item.qOrig : 'N/A'} - ${item?.qExec ? item.qExec : 'N/A'}`
    }

    function initData (): void {
      vuex.notifications.fetchNotifications()
    }

    initData()

    return {
      is3XL,
      is4XL,
      isHeroMobilePage,
      maxDisplayedNotifications,
      notifications,
      unreadNotifCount,
      getNotificationDesc,
      appNotificationsFlyout,
      goToNotifications
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  &__nav-menu-item-wrap {
    &:active {
      .header {
        &__nav-menu-item {
          @apply bg-opacity-100;

          &--icon {
            @apply text-white;
          }
        }
      }
    }

    .notification-count {
      font-size: 7px;
    }

    @media(min-width: 2500px) {
      @apply w-60 h-60;

      .notification-count {
        font-size: 10px;
      }
    }

    @media(min-width: 1920px) and (max-width: 2499px) {
      height: 42px;
      width: 42px;
    }

    @media(max-width: 1919px) {
      @apply h-40 w-40;
    }
  }
}
</style>
