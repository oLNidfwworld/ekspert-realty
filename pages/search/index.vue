<script setup>

import {computed, onMounted, ref, useApiFetchWithRefresh, watch} from "#imports";
  import {useApiFetch} from "#imports";
  import {useAsyncData} from "#imports";
  import ProductCard from "~/components/Catalog/ProductCard.vue";
import {useSearchStore} from "~/store/search";
const route = useRoute()
const router = useRouter() 

  const { data : seoData } = await useAsyncData(
      () => useApiFetch(`/Seo/`,{
        query : {
          'link' : route.path,
        }
      }), 
  ); 

  if(seoData.value){
    useSeoMeta( 
      seoData.value
    )
  }  
const searchStore = useSearchStore();
const {data:catalog, pending, error, refresh} = await useAsyncData(
    () => useApiFetch('/CatalogByIds/', {
      method: 'POST',
      params: {
        ids: JSON.stringify(searchStore.lastSearchIds),
        size: `9999`
      },
    })
    )
const count = computed(()=>{
  if(catalog.value.items){
    return catalog.value.items.length;
  }
})
watch(()=>searchStore.lastSearchIds, (old,ne)=>{
  refresh()
})
</script>
<template>
  <ClientOnly>
    <div v-if="catalog.items && searchStore.searchQuery">
      <p>По запросу <b>"{{searchStore.searchQuery}}"</b> было найдено {{ count }} предложений</p>
      <br>
      <div class="grid grid-cols-1 gap-5">
        <ProductCard v-if="!pending" v-for="(item,index) in catalog.items" :product="item" :key="index"/>
      </div>
    </div>
    <div v-else-if="searchStore.searchQuery">
      <p>По запросу <b>"{{searchStore.searchQuery}}"</b> не было найдено предложений</p>
    </div>
    <div v-else>

    </div>
  </ClientOnly>
</template>

<style scoped>

</style>