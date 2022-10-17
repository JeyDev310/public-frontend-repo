<template>
  <div class="container flex flex-col text-nile-blue dark:text-white">
    <div class="my-40">
      <p>Pagination with (pages count)</p>
      <AppPagination v-model="currentPage" :pages="pages" class="mb-20" />
    </div>

    <div class="my-40">
      <p>Pagination with (total items and limit per page)</p>
      <AppPagination v-model="currentPage2" :total="total" :limit="limit" class="mb-20" />
    </div>

    <div class="my-40">
      <p>Pagination custom total visible items</p>
      <AppPagination v-model="currentPage2" :total="total" :limit="limit" :totalVisible="10" class="mb-20" />
    </div>

    <div class="my-40">
      <p>Pagination custom total visible items</p>
      <AppPagination v-model="currentPage2" :total="total" :limit="limit" :totalVisible="10" disabled class="mb-20" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PgPagination',

  setup () {
    const pages = ref(20)
    const currentPage = ref(1)

    // total and limit
    const total = ref(200)
    const limit = ref(10)
    const currentPage2 = ref(1)

    return {
      pages,
      currentPage,

      total,
      limit,
      currentPage2
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  // max-width: 300px;
}
</style>
