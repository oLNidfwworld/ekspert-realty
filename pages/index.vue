<script setup lang="ts">
import QuickMenu from "../components/QuickMenu";
import ProductTile from "../components/Catalog/ProductTile";
import {useApiFetch} from "~/composables/api";
import {useSeoMeta} from "@unhead/vue";

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
const { data:recommended, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog`)
)
useSeoMeta({
  title: 'Агентство недвижимости в Павловском Посаде - Эксперт',
  ogTitle: 'Агентство недвижимости в Павловском Посаде - Эксперт',
  description: 'Купить квартиру, комнату, дом, коттедж, дачу, земельный участок или коммерческую недвижимость по доступным ценам. Удобный поиск загородной и городской недвижимости. Юридические услуги по недвижимости.',
  ogDescription: 'Купить квартиру, комнату, дом, коттедж, дачу, земельный участок или коммерческую недвижимость по доступным ценам. Удобный поиск загородной и городской недвижимости. Юридические услуги по недвижимости.',
})

console.log(recommended.value)
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
