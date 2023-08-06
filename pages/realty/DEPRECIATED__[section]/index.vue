<script setup>
import Pagination from "../../../components/Base/Pagination.vue";
import ProductCard from "../../../components/Catalog/ProductCard.vue";
import EBtn from "../../../components/Base/E-btn.vue";
import {useApiFetch} from "../../../composables/api";

const route = useRoute();
const router = useRouter();
// const {data} = await useApiFetch(`/Catalog?page=${route.params.page}`, {method:'GET'})
const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSize = ref(20)
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})
const { data:catalog, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog`, {
      query: {
        sectionCode: route.params.section,
        page: `page-${page.value}`,
        size: `${pageSizeApi.value}`
      }
    })
)
watch(() => route.query, (cur) => {
  refresh()
})

// const checkItemSum = ()=>{
//   if(catalog.value.items == undefined){
//     throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
//   }
// }


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
