<script setup>
import {useApiFetch} from "~/composables/api";
import ProductCard from "~/components/Catalog/ProductCard.vue";
import EBtn from "~/components/Base/E-btn.vue";
import Pagination from "~/components/Base/Pagination.vue";
const route = useRoute()
const router = useRouter()
const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSize = ref(20)
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})

const { data:catalog, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog/${route.params.section}/${route.params.subSection}/`, {
      query: {
        page: `page-${page.value}`,
        size: `${pageSizeApi.value}`,
        sectionCode: route.params.section
      }
    })
)
watch(() => route.query, (cur) => {
  refresh()
})

</script>
<template>
  <div>
    <div v-if="catalog">
        <div class="flex w-full justify-end mb-8">
          <e-btn :class="[pageSizeApi === '20' ? 'btn-red': 'btn-grey', 'mr-2']" @click="router.push({path: route.path, query: { ...route.query, size: 20} })">20</e-btn>
          <e-btn :class="[pageSizeApi === '40' ? 'btn-red': 'btn-grey']" @click="router.push({path: route.path, query: { ...route.query, size: 40}})">40</e-btn>
        </div>
        <div  class="grid grid-cols-1 gap-5">
          <ProductCard v-for="(item,index) in catalog" :product="item.item" :key="index"/>
        </div>
        <Pagination :current-page="catalog.nav" :total-pages="catalog.nav_size"/>
    </div>
    <div v-else>
      <div class="text-3xl text-center " >
        Раздел не найден или оно пуст
      </div>
      <e-btn class='w-fit m-auto mt-5 text-center' to="/">На главную</e-btn>
    </div>
  </div>
</template>
<style scoped>

</style>