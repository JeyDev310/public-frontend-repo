<template>
  <!-- DESKTOP VIEW -->
  <mq-layout mq="lg+" class="flex flex-col w-full space-y-24 4xl:space-y-24">
    <div class="flex items-center relative w-full pr-20">
      <!-- BOT LOGO -->
      <div
        class="
          my-bot-detailed__img
          flex
          flex-col
          items-center
          justify-center
          flex-shrink-0
          relative
          border
          border-blair
          dark:border-let-it-snow
          mr-14
          lg:mr-24
          rounded-full
          cursor-pointer
          overflow-hidden
        "
      >
        <img :src="getAvatar" alt="Bot Logo">

        <div
          class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            w-full
            h-full
            hover:bg-black
            hover:bg-opacity-60
            group
            transition
            duration-300
            z-10
          "
          @click="isUploadAvatarModalOpen = true"
        >
          <AppIcon
            name="pencil"
            size="20"
            class="opacity-0 group-hover:opacity-100 text-white transition duration-300"
          />
        </div>
      </div>

      <div class="flex flex-col w-full">
        <!-- BOT NAME -->
        <AppTruncatedTooltip
          :content="bot.name"
          class="text-nile-blue dark:text-white font-bold text-md2 4xl:text-lg mb-2"
        />

        <!-- BOT CREATOR -->
        <AppTruncatedTooltip
          :content="subscriptionBot.createdAt ? $filters.date(subscriptionBot.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A'"
          class="text-nile-blue dark:text-let-it-snow text-md2 4xl:text-lg"
        />

        <!-- BOT STATUS -->
        <div
          class="flex font-bold text-sm 4xl:text-base"
          :class="subscriptionBot.enabled ? 'text-spring-bouquet' : 'text-alexandria'"
        >
          {{ subscriptionBot.enabled ? 'ACTIVE' : 'PAUSED' }}
        </div>
      </div>

      <AppIcon
        name="pencil"
        size="14"
        class="
          absolute
          -top-14
          -right-14
          text-tradewind
          p-10
          cursor-pointer
        "
        @click="isEditBotModalOpen = true"
      />
    </div>

    <!-- BOT DESCRIPTION -->
    <div
      v-if="bot.description"
      class="line-clamp-4 text-base font-medium text-nile-blue dark:text-white"
    >
      {{ bot.description }}
    </div>

    <!-- BOT TAGS -->
    <div class="grid grid-cols-3 gap-10 xl:gap-20">
      <AppTag
        v-for="(item, index) in getTags"
        :key="index"
        :data="item"
        size="md"
      />
    </div>
  </mq-layout>

  <!-- MOBILE VIEW -->
  <mq-layout mq="sm-md" class="flex flex-col items-center w-full">
    <AppIcon
      name="pencil"
      size="14"
      class="
        absolute
        top-5
        right-5
        text-tradewind
        p-10
        cursor-pointer
      "
      @click="isEditBotModalOpen = true"
    />

    <!-- BOT LOGO -->
    <div
      class="
        my-bot-detailed__img
        flex
        flex-col
        items-center
        justify-center
        relative
        border
        border-blair
        dark:border-let-it-snow
        mb-16
        -mt-20
        rounded-full
      "
    >
      <div class="relative rounded-full">
        <img :src="getAvatar" alt="Bot Logo" class="rounded-full overflow-hidden">

        <div
          class="
            absolute
            -bottom-5
            -right-5
            flex
            items-center
            justify-center
            w-20
            h-20
            bg-hidden-sea-glass
            border-2
            border-solid
            border-white
            rounded-full
            z-10
          "
          @click="isUploadAvatarModalOpen = true"
        >
          <AppIcon name="pencil" size="8" class="text-white" />
        </div>
      </div>
    </div>

    <div class="flex items-center space-x-10">
      <!-- BOT NAME -->
      <AppTruncatedTooltip
        :content="bot.name"
        class="text-nile-blue dark:text-white text-md mb-2"
      />

      <!-- BOT STATUS -->
      <div
        v-if="Object.keys(subscriptionBot).length"
        class="w-12 h-12 rounded-full overflow-hidden"
        :class="subscriptionBot.enabled ? 'bg-spring-bouquet' : 'bg-alexandria'"
      />
    </div>

    <!-- BOT CREATOR -->
    <AppTruncatedTooltip
      v-if="Object.keys(subscriptionBot).length"
      :content="subscriptionBot.createdAt ? $filters.date(subscriptionBot.createdAt, 'YYYY-MM-DD HH:mm:ss') : 'N/A'"
      class="text-nile-blue dark:text-let-it-snow mb-10"
    />

    <!-- BOT DESCRIPTION -->
    <div
      v-if="bot.description"
      class="text-base font-medium text-nile-blue dark:text-white mb-20"
      :class="!isDescShowMore ? 'line-clamp-2' : 'line-clamp-5'"
      @click="isDescShowMore = !isDescShowMore"
    >
      {{ bot.description }}
    </div>

    <!-- BOT TAGS -->
    <div class="grid grid-cols-2 w-full gap-20">
      <AppTag
        v-for="(item, index) in getTags"
        :key="index"
        :data="item"
        size="md"
      />
    </div>
  </mq-layout>

  <!-- EDIT BOT INFO (NAME | DESC) -->
  <AppModal v-model="isEditBotModalOpen">
    <h2
      class="
        text-xl
        md:text-2xl
        text-seal-blue
        dark:text-white-lilac
        text-center
        font-semibold
        mb-32
        md:mb-60
      "
    >
      Edit Bot Info
    </h2>

    <div class="flex flex-col space-y-20 mb-40">
      <!-- BOT NAME -->
      <AppInput
        v-model="botEditInfo.name"
        name="name"
        label="Name"
        placeholder="Type name"
        class="w-full"
      />

      <!-- BOT DESCRIPTION -->
      <AppInput
        v-model="botEditInfo.description"
        name="description"
        label="Description"
        placeholder="Type description"
        class="w-full"
      />
    </div>

    <!-- MODAL ACTION BUTTONS -->
    <div class="flex justify-center w-full space-x-40">
      <AppButton
        type="grey-outlined"
        class="w-full"
        @click="isEditBotModalOpen = false"
      >
        Close
      </AppButton>

      <AppButton type="primary-border-filled" class="w-full" @click="editBotInfo()">
        Confirm
      </AppButton>
    </div>
  </AppModal>

  <!-- CHANGE AVATAR MODAL -->
  <AppModal v-model="isUploadAvatarModalOpen">
    <AppAvatarUploader
      :upload-headers="uploadHeader"
      request-method="PUT"
      :upload-url="uploadUrl"
      class="p-20"
      @uploaded="handleUploadedAvatar"
      @error="handlerErrorAvatar"
      @cancel="isUploadAvatarModalOpen = false"
      @submit="handleSubmittedAvatar"
    />
  </AppModal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'

import { routeNames, router } from '@/router'

import { algoBotsService } from '@/services'
import { vuex } from '@/store'
import { appNotify } from '@/components/stateless/notifications'
import { appConfirm } from '@/components/stateless/confirms/confirm.state'

import { useAlgoBots } from '@/views/algobots/algobots.composition.setup'
import { useMyBotDetailed } from '../../my-bot-detailed.composition.setup'

import AppAvatarUploader from '@/components/stateless/AppAvatarUploader.vue'

export default defineComponent({
  name: 'MyBotDetailedSummaryHeader',

  components: { AppAvatarUploader },

  setup () {
    const { getBotLogoImg } = useAlgoBots()
    const { bot, subscriptionBot, fetchBotSnapshotById } = useMyBotDetailed()

    /* STATE */
    const state = reactive({
      botEditInfo: {
        name: bot.value.name,
        description: bot.value.description
      },
      isDescShowMore: false as boolean,
      isEditBotModalOpen: false as boolean,
      isUploadAvatarModalOpen: false as boolean
    })

    const getTags = computed((): string[] => {
      const getQuote = bot.value.quote || '-'
      const getBase = bot.value.base || '-'
      const getStratType = bot.value.stratType || ''
      const pair = (getBase + getQuote).toUpperCase()

      return [pair, getStratType]
    })

    async function editBotInfo (): Promise<void> {
      try {
        const payload = state.botEditInfo

        if (!payload.name) {
          appNotify({ type: 'info', message: 'Please fill bot name' })
          return
        }

        if (bot.value.name === payload.name && bot.value.description === payload.description) {
          appNotify({ type: 'info', message: 'Please update your fields' })
          return
        }

        const isAllow = await appConfirm({
          title: 'Edit Your Bot?',
          body: 'Are you sure you want to edit this bot?',
          actionsName: ['Cancel', 'Confirm']
        })

        if (isAllow) {
          await algoBotsService.updateBotInfo(bot.value.id, payload)
          await fetchBotSnapshotById(bot.value.id)
          state.isEditBotModalOpen = false
        }
      } catch (error) {
        appNotify({ type: 'error', message: error.message })
        state.isEditBotModalOpen = false
      }
    }

    const uploadUrl = computed((): string => {
      return `${process.env.VUE_APP_ROOT_API}/api/algobots/${bot.value.id}/picture`
    })

    const uploadHeader = computed((): { Authorization: string; } => {
      return { Authorization: `Bearer ${vuex.auth.token}` }
    })

    const getAvatar = computed((): string => {
      if (bot.value.picture?.data) {
        return `data:${bot.value.picture.mimetype};base64,` + bot.value.picture.data
      } else {
        return '/img/logos/logo-purple.svg'
      }
    })

    async function handleUploadedAvatar ({ status }: any): Promise<void> {
      if (status === 'success') {
        state.isUploadAvatarModalOpen = false
        await fetchBotSnapshotById(bot.value.id)
        appNotify({ type: 'success', message: 'Profile picture has been updated' })
      }
    }

    function handleSubmittedAvatar (): void {
      state.isUploadAvatarModalOpen = false
      appNotify({ type: 'info', message: 'Profile picture being processed' })
    }

    function handleTooLargePicture (): Promise<boolean> {
      return appConfirm({
        title: 'Confirm your action',
        body: 'Your image is too large. Maximum allowed image size is 1.8MB. If you want to crop it, please try again.'
      })
    }

    async function handlerErrorAvatar (xhr: any): Promise<void> {
      const err = JSON.parse(xhr.responseText).message
      if (xhr.status === 401) {
        router.push({ name: routeNames.login })
      }

      const reOpenPictureUploader = await handleTooLargePicture()
      if (reOpenPictureUploader) {
        state.isUploadAvatarModalOpen = true
      } else {
        appNotify({ type: 'error', message: err || 'Profile picture upload failed' })
      }
    }

    return {
      ...toRefs(state),
      bot,
      subscriptionBot,
      getTags,
      uploadUrl,
      uploadHeader,
      getAvatar,
      getBotLogoImg,
      editBotInfo,
      handleUploadedAvatar,
      handlerErrorAvatar,
      handleSubmittedAvatar
    }
  }
})
</script>

<style lang="scss" scoped>
.my-bot-detailed {
  @media(min-width: 768px) {
    &__img {
      height: 70px;
      width: 70px;
    }
  }

  @media(min-width: 2500px) {
    &__img {
      height: 100px;
      width: 100px;
    }
  }

  @media(max-width: 767px) {
    &__img {
      height: 40px;
      width: 40px;
    }
  }
}
</style>
