<script setup>
import Pagination from "../../components/Base/pagination";
import ProductCard from "../../components/Catalog/ProductCard";
import EBtn from "../../components/Base/E-btn";
import {useApiFetch} from "../../composables/api";

const route = useRoute();
const router = useRouter();
console.log(route.query);
// const {data} = await useApiFetch(`/Catalog?page=${route.params.page}`, {method:'GET'})
const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSize = ref(20)
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})
console.log(page)
const { data:catalog, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog?page=page-${page.value}&size=${pageSizeApi.value}`)
)
console.log(catalog)
watch(() => route.query, (cur) => {
  refresh()
})
</script>
<template>
  <div>
  <div class="flex w-full justify-end mb-8">
    <e-btn :class="[pageSizeApi === '20' ? 'btn-red': 'btn-grey', 'mr-2']" @click="router.push({path: route.path, query: { ...route.query, size: 20} })">20</e-btn>
    <e-btn :class="[pageSizeApi === '40' ? 'btn-red': 'btn-grey']" @click="router.push({path: route.path, query: { ...route.query, size: 40}})">40</e-btn>
  </div>
  <div class="grid grid-cols-1 gap-5">
    <ProductCard v-for="(item,index) in catalog.items" :product="item" :key="index"/>
    <Pagination :current-page="catalog.nav" :total-pages="catalog.nav_size"/>
  </div>
  </div>
</template>

<style scoped>

</style>
