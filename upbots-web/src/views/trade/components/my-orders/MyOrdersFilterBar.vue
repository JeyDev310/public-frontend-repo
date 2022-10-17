<template>
  <!-- FILTERS BAR -->
  <mq-layout mq="lg+" class="flex items-center w-full space-x-12 4x:space-x-20">
    <div class="flex items-center w-full space-x-12 4xl:space-x-20">
      <!-- ACCOUNT FILTER -->
      <div class="flex items-center">
        <p class="text-beguiling-blue dark:text-blair mr-10">Account:</p>
        <AppSelect
          v-model="accountFilterValues"
          :options="getAccountFilterData"
          multiple
          size="md"
          class="my-orders__filter-item my-orders__filter-item--account"
        >
          <template #options="{ item }">
            <div class="flex items-center space-x-10">
              <img :src="getExchangeImage(item.img)" :alt="item.value" class="w-16 h-16 mr-5">
              <p>{{ item.label }}</p>
            </div>
          </template>
        </AppSelect>
      </div>

      <!-- PAIR FILTER -->
      <div class="flex items-center">
        <p class="text-beguiling-blue dark:text-blair mr-10">Pair:</p>
        <AppSelect
          v-model="pairFilterValues"
          :options="getPairFilterData"
          multiple
          size="md"
          class="my-orders__filter-item my-orders__filter-item--pair"
        >
          <template #options="{item}">
            {{ item.label }}
          </template>
        </AppSelect>
      </div>

      <!-- ORDER TYPE FILTER -->
      <mq-layout mq="2xl+" class="flex items-center">
        <p class="text-beguiling-blue dark:text-blair mr-10">Order Type:</p>
        <AppSelect
          v-model="orderTypeFilterValues"
          :options="getOrderTypeFilterData"
          multiple
          size="md"
          class="my-orders__filter-item my-orders__filter-item--order-type"
        >
          <template #options="{ item }">
            {{ item.label }}
          </template>
        </AppSelect>
      </mq-layout>

      <!-- MORE FILTERS -->
      <AppFlyout
        ref="appFlyoutFilters"
        placement="bottom-start"
        :offset="16"
        :open-delay="0"
        :close-delay="0"
        class="flex"
        popper-classes="bg-white dark:bg-primary-dark-radial shadow dark:shadow-100 rounded-xl"
      >
        <!-- PREVIEW -->
        <template #activator="{ isVisible }">
          <slot>
            <div class="flex items-center space-x-10 cursor-pointer">
              <span class="text-beguiling-blue dark:text-cotton-ball-second font-semibold">
                More filters:
              </span>

              <AppIcon
                name="chevron-thin"
                size="14"
                class="transform text-beguiling-blue dark:text-cotton-ball-second transition duration-300"
                :class="isVisible && 'rotate-180'"
              />
            </div>
          </slot>
        </template>

        <!-- CONTENT -->
        <template #popper>
          <slot name="content">
            <div
              class="my-orders__more-filters-dropdown flex flex-col space-y-20 p-20 overflow-y-auto custom-scrollbar"
            >
              <!-- PERIOD FILTER -->
              <div class="flex items-center">
                <p class="flex flex-shrink-0 text-beguiling-blue dark:text-blair mr-10">Period:</p>
                <DatePicker v-model="period" is-range class="relative" :is-dark="isDarkMode">
                  <template #default="{ inputValue, inputEvents }">
                    <div class="flex justify-center items-center space-x-10">
                      <input
                        :value="inputValue.start"
                        placeholder="Select start date"
                        readonly
                        class="calendar__input"
                        v-on="inputEvents.start"
                      >

                      <AppTooltip placement="bottom-end" content="Clear selected date" class="flex">
                        <p @click="setPeriod({start: null, end: null})">
                          <AppIcon
                            name="cross-medium"
                            size="12"
                            class="text-beguiling-blue dark:text-blair cursor-pointer"
                          />
                        </p>
                      </AppTooltip>

                      <input
                        :value="inputValue.end"
                        readonly
                        placeholder="Select end date"
                        class="calendar__input"
                        v-on="inputEvents.end"
                      >
                    </div>
                  </template>
                </DatePicker>
              </div>

              <!-- STATUS FILTER -->
              <div class="grid grid-cols-2 items-center gap-x-10">
                <p class="flex flex-shrink-0 text-beguiling-blue dark:text-blair mr-10">Status:</p>
                <AppSelect
                  v-model="statusFilterValues"
                  :options="getStatusFilterData"
                  multiple
                  size="md"
                  class="my-orders__filter-item my-orders__filter-item--status w-full"
                >
                  <template #options="{ item }">
                    <span class="capitalize">{{ item.label }}</span>
                  </template>
                </AppSelect>
              </div>

              <!-- SIDE FILTER -->
              <div class="grid grid-cols-2 items-center gap-x-10">
                <p class="flex flex-shrink-0 text-beguiling-blue dark:text-blair mr-10">Side:</p>
                <AppSelect
                  v-model="sideFilterValues"
                  :options="getSideFilterData"
                  multiple
                  size="md"
                  class="my-orders__filter-item my-orders__filter-item--side w-full"
                >
                  <template #options="{ item }">
                    {{ item.label }}
                  </template>
                </AppSelect>
              </div>

              <!-- ORDER TYPE FILTER -->
              <mq-layout mq="sm-xl" class="grid grid-cols-2 items-center gap-x-10">
                <p class="flex flex-shrink-0 text-beguiling-blue dark:text-blair mr-10">Order Type:</p>
                <AppSelect
                  v-model="orderTypeFilterValues"
                  :options="getOrderTypeFilterData"
                  multiple
                  size="md"
                  class="my-orders__filter-item my-orders__filter-item--order-type w-full"
                >
                  <template #options="{ item }">
                    {{ item.label }}
                  </template>
                </AppSelect>
              </mq-layout>
            </div>
          </slot>
        </template>
      </AppFlyout>
    </div>

    <!-- CLEAR ALL FILTERS -->
    <!-- RESET FILTERS -->
    <div
      class="flex items-center flex-shrink-0 ml-auto"
      :class="loading ? 'pointer-events-none opacity-50' : 'cursor-pointer'"
      @click="clearAllFilters()"
    >
      <span class="text-text-nile-blue dark:text-hidden-sea-glass leading-1 ml-4">Reset All Filters</span>
    </div>
  </mq-layout>

  <mq-layout mq="sm-md" class="mb-20">
    <AppExpand v-model="expandValue" class="relative" content-classes="flex flex-col">
      <template #preview>
        <div class="flex items-center w-full text-nile-blue dark:text-tradewind">
          <AppIcon name="filter" size="24" />
          <span class="text-base font-medium ml-5">Filters</span>
        </div>
      </template>

      <template #content>
        <div class="grid grid-cols-2 gap-12 w-full">
          <!-- ACCOUNT FILTER -->
          <div class="col-span-2 flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Account:</p>
            <AppSelect
              v-model="accountFilterValues"
              :options="getAccountFilterData"
              multiple
              placeholder="All"
            >
              <template #options="{ item }">
                <div class="flex items-center space-x-10">
                  <img :src="getExchangeImage(item.img)" :alt="item.value" class="w-16 h-16 mr-5">
                  <p>{{ item.label }}</p>
                </div>
              </template>
            </AppSelect>
          </div>

          <!-- PAIR FILTER -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Pair:</p>
            <AppSelect
              v-model="pairFilterValues"
              :options="getPairFilterData"
              placeholder="All"
              multiple
            >
              <template #options="{item}">
                {{ item.label }}
              </template>
            </AppSelect>
          </div>

          <!-- SIDE FILTER -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Side:</p>
            <AppSelect
              v-model="sideFilterValues"
              :options="getSideFilterData"
              placeholder="All"
              multiple
            >
              <template #options="{ item }">
                {{ item.label }}
              </template>
            </AppSelect>
          </div>

          <!-- ORDER TYPE FILTER -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Type:</p>
            <AppSelect
              v-model="orderTypeFilterValues"
              :options="getOrderTypeFilterData"
              placeholder="All"
              multiple
            >
              <template #options="{ item }">
                {{ item.label }}
              </template>
            </AppSelect>
          </div>

          <!-- STATUS FILTER -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Status:</p>
            <AppSelect
              v-model="statusFilterValues"
              :options="getStatusFilterData"
              placeholder="All"
              multiple
            >
              <template #options="{ item }">
                <span class="capitalize">{{ item.label }}</span>
              </template>
            </AppSelect>
          </div>

          <!-- START DATE -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Start Date:</p>
            <DatePicker v-model="period" is-range class="relative" :is-dark="isDarkMode">
              <template #default="{ inputValue, inputEvents }">
                <input
                  :value="inputValue.start"
                  placeholder="Start date"
                  readonly
                  class="my-order-mobile__calendar-input"
                  v-on="inputEvents.start"
                >
              </template>
            </DatePicker>
          </div>

          <!-- END DATE -->
          <div class="flex flex-col space-y-5">
            <p class="text-chicory-flower dark:text-blair">Start Date:</p>
            <DatePicker v-model="period" is-range class="relative" :is-dark="isDarkMode">
              <template #default="{ inputValue, inputEvents }">
                <input
                  :value="inputValue.end"
                  readonly
                  placeholder="End date"
                  class="my-order-mobile__calendar-input"
                  v-on="inputEvents.end"
                >
              </template>
            </DatePicker>
          </div>
        </div>

        <!-- RESET FILTERS -->
        <div
          class="col-span-2 flex items-center justify-center flex-shrink-0 mt-20"
          @click="clearAllFilters()"
        >
          <AppIcon
            name="cross-medium"
            size="10"
            class="text-nile-blue dark:text-hidden-sea-glass"
          />
          <span class="text-nile-blue dark:text-hidden-sea-glass leading-1 ml-4">Reset All Filters</span>
        </div>
      </template>
    </AppExpand>
  </mq-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { DatePicker } from 'v-calendar'

import { useMyOrder } from './my-orders.setup'
import { useGlobal } from '@/global-setup/global.composition.setup'

export default defineComponent({
  name: 'MyOrdersFilterBar',

  components: { DatePicker },

  setup () {
    const { isDarkMode } = useGlobal()
    const {
      loading,
      period,
      accountFilterValues,
      pairFilterValues,
      sideFilterValues,
      orderTypeFilterValues,
      statusFilterValues,
      getAccountFilterData,
      getPairFilterData,
      getSideFilterData,
      getOrderTypeFilterData,
      getStatusFilterData,
      getExchangeImage,
      setPeriod,
      clearAllFilters
    } = useMyOrder()

    const expandValue = ref<boolean>(false)

    return {
      expandValue,
      isDarkMode,
      loading,
      period,
      accountFilterValues,
      pairFilterValues,
      sideFilterValues,
      orderTypeFilterValues,
      statusFilterValues,
      getAccountFilterData,
      getPairFilterData,
      getSideFilterData,
      getOrderTypeFilterData,
      getStatusFilterData,
      getExchangeImage,
      setPeriod,
      clearAllFilters
    }
  }
})
</script>

<style lang="scss" scoped>
.calendar {
  &__input {
    @apply
      relative inline-flex
    bg-whiteout dark:bg-black dark:bg-opacity-10
      border border-solid border-transparent rounded-sm
      text-sm text-bluster-blue dark:text-white
    placeholder-bluster-blue dark:placeholder-white
      px-10
      focus:outline-none;

    min-width: 150px;
    max-width: 150px;
    height: 38px;
  }

}

.my-orders {
  &__filter-item {
    @apply w-full;
    &--account {
      min-width: 175px;
      max-width: 175px;
    }

    &--pair {
      min-width: 165px;
      max-width: 165px;
    }

    @media(min-width: 1280px) {
      &--order-type {
        min-width: 165px;
        max-width: 165px;
      }
    }
  }

  &__more-filters-dropdown {
    width: 435px;
    height: 370px;
  }
}
</style>
