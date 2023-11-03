<script setup>
import {computed} from "../../.nuxt/imports"; 
import PictureSlider from "/components/Catalog/PictureSlider"; 
const props = defineProps({
  product: Object
})
const price =computed(() => props.product.PRICE.toLocaleString('ru-RU'))
</script>
<template>
    <div class="product-card">
      <ClientOnly>
        <PictureSlider sliderClasses="product-slider-image" :pictures="product.PHOTOS"/>
      </ClientOnly>
      <div class="flex flex-col p-7">
        <div class="mb-3 flex justify-between">
          <span class="font-bold text-lg md:text-2xl mb-2">Участок {{product.NAME}}</span> 
        </div>
          <span class="font-bold text-red text-2xl mb-4">{{price}} ₽</span>
        <p class="mb-1 font-semibold">{{product.location}}</p>
        <ul class="props grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2 py-3 mb-7 md:mr-4" style="background: #D9D9D9;">
            <li  class="flex flex-col">
              <span>
                Площадь м<sup>2</sup>
              </span>
              <span v-if="product.SQUARE" class="font-bold">
                {{product.SQUARE}}
              </span> 
            </li>
            <li  class="flex flex-col">
              <span>
                Статус
              </span>
              <span v-if="product.STATUS" class="font-bold">
                 {{product.STATUS.NAME}}
              </span> 
            </li>
        </ul> 
      </div>
    </div>
  </template>
  <style lang="postcss">
  .product {
    &-card {
      @apply grid grid-cols-1 bg-concrete rounded-md;
     }
    &-image {
      @apply w-full rounded-md overflow-hidden;
     }
    &-slider {
      &-image {
        @apply w-[320px] sm:w-[480px] md:w-[300px] lg:w-[400px] h-[300px] sm:h-[350px];
      }
    }
  }
  @media screen and (min-width: 780px){
    .product {
      &-card {
        grid-template-columns: fit-content(40%) 1fr;
       }
      &-image {
        @apply max-w-[328px];
      }
    }
  }
  </style>