<script setup >
import {useApiFetch} from "../../../../../../composables/api";
import {useAsyncData, useRoute, useRouter} from "nuxt/app";
import ProductCard from "../../../../../../components/Catalog/ProductCard.vue";
import {computed, watch} from "vue";
import Pagination from "../../../../../../components/Base/Pagination";
import EBtn from "../../../../../../components/Base/E-btn";

const route = useRoute();
const router = useRouter();
const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})
const { data: catalogItems, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/CatalogReborn/${route.params.city}/${route.params.serviceType}/${route.params.immovableType}/${route.params.immovableProperty}/`,
        {
          query: {
            page: `page-${page.value}`,
            size: `${pageSizeApi.value}`,
            pricerange: `${(route.query.pricerange)?route.query.pricerange:''}`,
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
console.log(catalogItems.value)
</script>
<template>
  <div>
    <div class="flex w-full justify-end mb-8">
      <e-btn :class="[pageSizeApi === '20' ? 'btn-red': 'btn-grey', 'mr-2']" @click="router.push({path: route.path, query: { ...route.query, size: 20} })">20</e-btn>
      <e-btn :class="[pageSizeApi === '40' ? 'btn-red': 'btn-grey']" @click="router.push({path: route.path, query: { ...route.query, size: 40}})">40</e-btn>
    </div>
    <div class="grid grid-cols-1 gap-5">
      <ProductCard v-if="catalogItems.items" v-for="(item,index) in catalogItems.items" :product="item" :key="index"/>
      <Pagination :current-page="catalogItems.nav" :total-pages="catalogItems.nav_size"/>
    </div>
  </div>
</template>
<style scoped>

</style>
