<script setup lang="ts">
import QuickMenu from "../components/QuickMenu";
import ProductTile from "../components/Catalog/ProductTile";
import {useApiFetch} from "~/composables/api"; 
import {useServerSeoMeta} from "unhead";
import { useFilterStore } from "~~/store/smartFilter";
const route = useRoute();
const { data: quickMenuRent } = await useAsyncData(
    () => $fetch(`/api/quickMenuRent`)
)
const { data: quickMenuBuy } = await useAsyncData(
    () => $fetch(`/api/quickMenuBuy`)
)

const { data: quickCountryEstate } = await useAsyncData(
    () => $fetch(`/api/quickMenuCountryEstate`)
)
const { data: quickMenuCommerce } = await useAsyncData(
    () => $fetch(`/api/quickMenuCommerce`)
)
let sendUrls = [];
let urls = ref([(quickMenuRent.value?.links), (quickCountryEstate.value?.links), (quickMenuBuy.value?.links),(quickMenuCommerce.value?.links)]); 
urls.value.map(urlData => {
  urlData.map((el) => {
    sendUrls.push( el.url.replace('/realty','') );
  })
}) 
const {data : countData} =  await useAsyncData(
  () => useApiFetch(`/CatalogCountMultiply/` ,{
                query: { 
                  urlData : JSON.stringify(sendUrls) 
                }
      }
  )
);   
  for(const [key,vals] of Object.entries(countData.value)){
    let dataObject1 = quickMenuRent.value?.links.find(obj => {
      return obj.url === key
    });

    if(dataObject1){
      dataObject1.count = vals; 
    }

    let dataObject2 = quickMenuBuy.value?.links.find(obj => {
      return obj.url === key
    });

    if(dataObject2){
      dataObject2.count = vals; 
    }
    let dataObject3 = quickMenuCommerce.value?.links.find(obj => {
      return obj.url === key
    })
    if(dataObject3){
      dataObject3.count = vals; 
    }
    let dataObject4 = quickCountryEstate.value?.links.find(obj => {
      return obj.url === key
    })
    if(dataObject4){
      
      dataObject4.count = vals; 
    }
  }  
const { data:recommended, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog`)
)

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

const filter = useFilterStore()

filter.pageTitle = 'Эксперт недвижимость';
 
const left = ref(null)
const right = ref(null)
</script>
<template>
  <div class="type-effect">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      <QuickMenu :menu="quickMenuBuy.links" title="Купить квартиру"/>
      <QuickMenu :menu="quickMenuRent.links" title="Снять"/>
      <QuickMenu :menu="quickCountryEstate.links" title="Загородная недвижимость"/>
      <QuickMenu :menu="quickMenuCommerce.links" title="Коммерческая недвижимость"/>
    </div>
    <div class="flex justify-between w-full">
      <h2 class="title w-full">Выгодные предложения</h2>
      <div class="hidden md:flex w-full justify-end gap-5 mb-7 items-center">
        <span class="swiper-prev" ref="left"></span>
        <span class="swiper-next" ref="right"></span>
      </div>
    </div>
    <section class="">
      <ClientOnly>
      <Swiper
          v-if="recommended.items"
          :modules="[SwiperNavigation, SwiperEffectCreative]"
          class=""
          :slides-per-view="1"
          :loop="true"
          :spaceBetween="20"
          :navigation="{
              prevEl: left,
              nextEl: right,
            }"
          :breakpoints="{
      '320': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '780': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      '1200': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }"
      >
        <SwiperSlide class="w-[320px]" v-for="(item, index) in recommended.items" :product="item" :key="index">
          <ProductTile :product="item"/>
        </SwiperSlide>
      </Swiper>
      </ClientOnly>

      <ServicesBlocks class="mt-10" :only4="true" :display-title="true"></ServicesBlocks>
    </section>

  </div>
</template>
<style lang="postcss" scoped>
  .type-effect {
    @apply text-3xl;
  }
  .swiper-next:after,.swiper-prev:after{
    height: 47px; cursor: pointer;
  }
</style>
