<template>
  <!-- DESKTOP VIEW -->
  <div class="flex flex-col flex-grow w-full overflow-y-auto custom-scrollbar">
    <!-- LOADING -->
    <AppLoader v-if="loading" />

    <!-- CONTENT -->
    <div
      v-else
      class="flex flex-col flex-grow relative py-20 md:pt-0 px-0 md:px-30 overflow-y-scroll custom-scrollbar"
    >
      <template v-if="data.length">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="mb-20 border-b border-blue-heeler dark:border-himalaya-sky"
        >
          <div class="flex justify-between items-end">
            <div class="
              flex items-center gap-10 text-nile-blue dark:text-white
              text-base xl:text-md2"
            >
              <div class="w-36">
                <img v-if="getAvatar(item).type === 'img'" :src="getAvatar(item).value">
                <div
                  v-else
                  class="
                    flex items-center justify-center
                    w-full h-36
                    text-hidden-sea-glass font-medium text-lg
                    rounded-full
                    border-2
                  "
                >
                  {{ getAvatar(item).value }}
                </div>
              </div>
              <div class="font-medium text-sm xl:text-base">
                <span>{{ item.user }}</span>
                <div>
                  <span v-for="idx in item.vote" :key="idx">
                    <AppIcon
                      name="star"
                      size="14"
                      class="mr-4 text-deep-aquamarine dark:text-blair"
                    />
                  </span>
                  <span class="pl-10">{{ item.vote.toFixed(1) }}</span>
                </div>
              </div>
            </div>
            <span class="text-deep-aquamarine dark:text-blair text-base xl:text-md2">
              {{ item.reviewedAt ? new Date(item.reviewedAt).toLocaleString() : "(Uknown date)" }}
            </span>
          </div>
          <div
            class="
              py-10 text-nile-blue dark:text-white
              border-b border-blue-heeler dark:border-himalaya-sky last:border-none
            "
          >
            {{ item.comment }}
          </div>
        </div>
        <div v-if="hasMore" class="flex justify-center">
          <AppButton
            type="grey-outlined"
            @click="loadMore"
          >
            Load More
          </AppButton>
        </div>
      </template>
      <template v-else>
        <AppNoData
          title="No data available"
          class="text-base md:text-md2 lg:text-xl font-semibold text-chicory-flower dark:text-blair"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import { algoBotsService } from '@/services'
import { EErrorsMessage, IReviewRecord } from '@/types'
import { appNotify } from '@/components/stateless/notifications'

export default defineComponent({
  name: 'AlgoBotsDetailedReview',

  setup () {
    const route = useRoute()

    const loading = ref<boolean>(false)
    const data = ref<IReviewRecord[]>([])
    const hasMore = ref<boolean>(false)
    const currentPage = ref<number>(0)

    function getAvatar (userInfo: IReviewRecord): { type: string; value: string; } {
      if (userInfo.picture) {
        return userInfo.picture.data
          ? { type: 'img', value: `data:${userInfo.picture.mimetype};base64,${userInfo.picture.data}` }
          : { type: 'text', value: userInfo.user[0].toUpperCase() }
      } else {
        return { type: 'text', value: '?' }
      }
    }

    async function fetchReviewData () {
      loading.value = true

      try {
        const res = await algoBotsService.getAlgobotReview({
          botId: route.params.id as string,
          page: currentPage.value
        })
        data.value = [...data.value, ...res.data]
        data.value.sort((a: IReviewRecord, b: IReviewRecord) => {
          if (a.reviewedAt < b.reviewedAt) {
            return 1
          }
          if (a.reviewedAt > b.reviewedAt) {
            return -1
          }
          return 0
        })
        if (res.data) {
          hasMore.value = true
        } else {
          hasMore.value = false
        }
      } catch (error) {
        appNotify({ type: 'error', message: error.response.data.message || EErrorsMessage.DEFAULT })
      } finally {
        loading.value = false
      }
    }

    async function loadMore () {
      if (hasMore.value) {
        currentPage.value += 1
        await fetchReviewData()
      }
    }

    onMounted(() => { fetchReviewData() })

    return {
      loading,
      hasMore,
      data,
      getAvatar,
      loadMore
    }
  }
})
</script>
