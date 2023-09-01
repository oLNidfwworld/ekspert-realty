<script setup >
import {useApiFetch} from "../../../../../composables/api";
import {useAsyncData, useRoute, useRouter} from "nuxt/app";
import ProductCard from "../../../../../components/Catalog/ProductCard.vue";
import {computed, watch} from "vue";
import Pagination from "../../../../../components/Base/Pagination";
import EBtn from "../../../../../components/Base/E-btn";
import NoProducts from "~/components/Catalog/NoProducts.vue";

import Skeleton from "primevue/skeleton";


const route = useRoute();
const router = useRouter();

const { data : seoData } = await useAsyncData(
      () => useApiFetch(`/Seo/`,{
        query : {
          'link' : route.path,
        }
      }), 
  ); 

  if(seoData.value){
    useServerSeoMeta( 
      seoData.value
    )
  }  

const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})
const { data: catalogItems, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/CatalogReborn/${route.params.city}/${route.params.serviceType}/${route.params.immovableType}/all-immovable-properties/`,
        {
          query: {
            page: `page-${page.value}`,
            size: `${pageSizeApi.value}`,
          }
        }
    )
)
watch(() => route.query, (cur) => {
  refresh()
})
if(catalogItems.value.status === '404'){
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>
<template>
  <div v-if="pending">
    <div class="flex justify-end mb-5 gap-2">
      <Skeleton width="50px" height="50px"></Skeleton>
      <Skeleton width="50px" height="50px"></Skeleton>
    </div>
    <Skeleton width="100%" height="350px" class="mb-[1.25rem]"></Skeleton>
    <Skeleton width="100%" height="350px" class="mb-[1.25rem]"></Skeleton>
  </div>
  <div v-else>
    <div v-if="catalogItems.items">
      <div class="flex w-full justify-end mb-8">
        <e-btn :class="[pageSizeApi === '20' ? 'btn-red': 'btn-grey', 'mr-2']" @click="router.push({path: route.path, query: { ...route.query, size: 20} })">20</e-btn>
        <e-btn :class="[pageSizeApi === '40' ? 'btn-red': 'btn-grey']" @click="router.push({path: route.path, query: { ...route.query, size: 40}})">40</e-btn>
      </div>
      <div class="grid grid-cols-1 gap-5">
        <ProductCard v-if="catalogItems.items" v-for="(item,index) in catalogItems.items" :product="item" :key="index"/>
        <Pagination :current-page="catalogItems.nav" :total-pages="catalogItems.nav_size"/>
      </div>
    </div>
    <no-products v-else/>
  </div>
</template>
<style scoped>

</style>
