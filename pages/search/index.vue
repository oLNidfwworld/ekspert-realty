<script setup>

import {computed, onMounted, ref, watch} from "#imports";
  import {useApiFetch} from "#imports";
  import {useAsyncData} from "#imports";
  import ProductCard from "#imports";
import EBtn from "#imports";
import Pagination from "#imports";

const route = useRoute()
const router = useRouter()
const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSize = ref(20)
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})

let staticVar_searchString = ()=>{
    let val = undefined;
    if(process.client){
      val = sessionStorage.getItem('searchString')
    }
    return val;
  }
  const  searchString  = ref(  staticVar_searchString() );
  const {data:searchData, pending, error, refresh}  =  await useAsyncData(
      () => useApiFetch(`/CatalogSearch/${searchString.value}/`, {
        query: {
          page: `page-${page.value}`,
          size: `${pageSizeApi.value}`,
        }
      })
  )
  refresh()

watch(() => staticVar_searchString(), (value, oldValue, onCleanup) => {
  refresh()
})
watch(() => searchData.value, (cur) => {
  refresh()
})
  console.log(searchData)
</script>
<template>
  <ClientOnly>
    <div>
      <span>По запросу "{{ searchString }}" было найдено:  </span>
      <br>
      <div class="flex w-full justify-end mb-8">
        <e-btn :class="[pageSizeApi === '20' ? 'btn-red': 'btn-grey', 'mr-2']" @click="router.push({path: route.path, query: { ...route.query, size: 20} })">20</e-btn>
        <e-btn :class="[pageSizeApi === '40' ? 'btn-red': 'btn-grey']" @click="router.push({path: route.path, query: { ...route.query, size: 40}})">40</e-btn>
      </div>
      <div class="grid grid-cols-1 gap-5">
        <ProductCard v-for="(item,index) in searchData.items" :product="item.item" :key="index"/>
      </div>
      <Pagination :current-page="searchData.nav" :total-pages="searchData.nav_size"/>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>