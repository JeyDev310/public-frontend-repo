<template>
  <AppCard
    class="flex flex-grow items-stretch table overflow-y-auto custom-scrollbar"
    :class="isTableWrapStyled && 'py-20'"
    :is-styled="isTableWrapStyled"
    :is-default-background="isDefaultTableBg"
    :style="{ '--row-height': rowHeight }"
  >
    <!-- Title -->
    <slot name="tableTitle">
      <p v-if="title" class="text-blair px-20 4xl:px-30 py-14">{{ title }}</p>
    </slot>

    <div
      class="flex flex-col flex-grow overflow-auto custom-scrollbar"
      :style="`padding-right: ${tableScrollPadding}`"
    >
      <!-- TODO: to split into two component for mobile and desktop views -->
      <!-- Mobile view -->
      <template v-if="isMobileViewList">
        <mq-layout mq="sm-md">
          <template v-for="(row, i) in dataset" :key="`${i}-mobile`">
            <div :class="['px-14 py-30', rowClass]" data-test="table-row" @click="$emit('rowClick', row)">
              <div v-for="header in visibleColumns" :key="`${header.property}`" :class="[header.cellClasses]">
                <div class="flex justify-between items-center overflow-hidden">
                  <div class="table__headers">
                    <div class="cell truncate" data-test="table-mobile-header">
                      <slot :name="`header_${header.property}`">{{ header.label }}</slot>
                    </div>
                  </div>

                  <div class="table__datasets truncate">
                    <div class="cell truncate" :class="rowClassChecker(row)">
                      <slot :name="header.property" :row="row" :rowIndex="i">
                        <AppTruncatedTooltip :content="generateValue(row, header.property)" />
                      </slot>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="i !== dataset.length - 1" class="h-5 bg-catskill-white dark:bg-downy dark:bg-opacity-20" />
          </template>
        </mq-layout>
      </template>

      <!-- Desktop view -->
      <mq-layout :mq="isMobileViewList ? 'lg+' : 'sm+'">
        <table class="min-w-full">
          <thead class="table__headers">
            <tr>
              <th
                v-for="header in visibleColumns"
                :key="header.property"
                :style="`min-width: ${header.minWidth}px; width: ${header.width}px;`"
                data-test="table-header-wrapper"
              >
                <div
                  class="cell"
                  :style="`width: ${header.width}px;`"
                  :class="{ 'cursor-pointer': header.sortable }"
                  data-test="table-header"
                  @click="header.sortable && setSorting(header.property)"
                >
                  <slot :name="`header_${header.property}`">{{ header.label }}</slot>

                  <template v-if="header.sortable">
                    <div class="flex flex-col items-center text-chicory-flower dark:text-blair relative ml-6 w-8 h-12">
                      <AppIcon
                        name="chevron-thin"
                        class="absolute block top-0 transform rotate-180"
                        :class="{ 'opacity-40': !(sortBy === header.property && sortDirection === -1) }"
                        size="7"
                        data-test="table-chevron-up"
                      />
                      <AppIcon
                        name="chevron-thin"
                        class="absolute block bottom-0"
                        :class="{ 'opacity-40': !(sortBy === header.property && sortDirection === 1) }"
                        size="7"
                        data-test="table-chevron-down"
                      />
                    </div>
                  </template>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="table__datasets">
            <template v-for="(row, i) in dataset" :key="i">
              <tr :class="[rowClassChecker(row), rowClass]" data-test="table-row" @click="$emit('rowClick', row)">
                <td
                  v-for="(h) in visibleColumns"
                  :key="h.property"
                  :class="[{'truncate max-w-1': !!h.minWidth}, h.cellClasses]"
                >
                  <div class="cell cell--height truncate">
                    <slot :name="h.property" :row="row" :rowIndex="i">
                      <AppTruncatedTooltip :content="generateValue(row, h.property)" />
                    </slot>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </mq-layout>

      <slot name="tableNoItems">
        <div
          v-if="!dataset.length"
          class="flex items-center justify-center py-60 text-chicory-flower dark:text-let-it-snow m-auto"
        >
          No data
        </div>
      </slot>
    </div>
  </AppCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch, toRef, ref } from 'vue'
import { ITableSort, ITableHeaders, TIndexedObject } from '@/types'
import { getNestedProp, sortArrayByKey } from '@/core/helpers/index'

export default defineComponent({
  name: 'AppTable',

  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },

    headers: {
      type: Array as PropType<ITableHeaders[]>,
      required: true
    },

    dataset: {
      type: Array as PropType<TIndexedObject[]>,
      required: true
    },

    rowHeight: {
      type: String as PropType<string>,
      default: '32px'
    },

    tableScrollPadding: {
      type: String as PropType<string>,
      default: '0px'
    },

    sortFrontSide: {
      type: Boolean as PropType<boolean>,
      default: false
    },

    rowClass: {
      type: String as PropType<string>,
      default: 'cursor-pointer'
    },

    sort: {
      type: Object as PropType<ITableSort>,
      default: () => ({ order: '', orderBy: '' })
    },

    rowClassChecker: {
      type: Function as PropType<any>,
      default: () => ''
    },

    isMobileViewList: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    isTableWrapStyled: {
      type: Boolean as PropType<boolean>,
      default: true
    },

    isDefaultTableBg: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },

  emits: ['rowClick', 'sortBy', 'update:dataset'],

  setup (props, { emit }) {
    const sortBy = ref('')
    const sortDirection = ref(0)
    let datasetInit: TIndexedObject = props.dataset.slice()

    watch(() => props.dataset, (newVal) => {
      if (newVal) datasetInit = newVal.slice()
    })

    const visibleColumns = computed(() => props.headers.filter((h) => h.show || h.show === undefined))

    watch(() => props.sort, (newValue: ITableSort) => {
      if (newValue) {
        sortBy.value = newValue.orderBy
        sortDirection.value = newValue.order === 'desc' ? -1 : newValue.order === 'asc' ? 1 : 0
      }
    })

    const generateValue = (obj: TIndexedObject, key: string) => {
      const value = getNestedProp(obj, key)

      return Array.isArray(value) ? value.join(', ') : value
    }

    const setSorting = (sortByProp: string) => {
      if (sortBy.value === sortByProp) {
        sortDirection.value++
        switch (sortDirection.value) {
          case 0 : sortBy.value = ''; break
          case 2 : sortDirection.value = -1; break
        }
      } else {
        sortBy.value = sortByProp
        sortDirection.value = 1
      }

      let order = ''
      if (sortDirection.value === 1 || (sortDirection.value === 0 && sortBy.value)) order = 'asc'
      else if (sortDirection.value === -1) order = 'desc'

      if (props.sortFrontSide) {
        const sortedData = order
          ? toRef(props, 'dataset').value.sort(sortArrayByKey(sortBy.value, order))
          : datasetInit.slice()
        emit('update:dataset', sortedData)
      } else emit('sortBy', { orderBy: sortBy.value, order })
    }

    return {
      sortBy,
      sortDirection,
      visibleColumns,

      generateValue,
      setSorting
    }
  }
})
</script>

<style lang="scss" scoped>
.table {
  @apply flex flex-col relative flex-1 w-full;

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  &__headers {
    @apply mr-14 text-sm text-chicory-flower dark:text-blair;
    th {
      @apply bg-emptiness dark:bg-calico-dress sticky top-0;
      z-index: 9;

      &:first-of-type {
        .cell {
          @apply pl-10 md:pl-20 4xl:pl-30;
        }
      }

      &:last-of-type {
        .cell {
          @apply pr-10 md:pr-20 4xl:pr-30;
        }
      }
    }
    .cell {
      @apply text-base md:text-sm flex items-center pl-0 md:px-14 py-5;
    }
  }

  &__datasets {
    @apply 4xl:text-md2 text-chicory-flower dark:text-white;

    .cell {
      @apply md:px-14 py-3;
    }

    td {
      &:first-of-type {
        .cell {
          @apply pl-10 md:pl-20 4xl:pl-30;
        }
      }

      &:last-of-type {
        .cell {
          @apply pr-10 md:pr-20 4xl:pr-30;
        }
      }
    }

    .cell--height {
      height: var(--row-height);
      line-height: var(--row-height);
    }
  }
}
</style>
