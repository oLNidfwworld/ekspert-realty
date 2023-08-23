<script setup>
import {computed} from "../../.nuxt/imports";
import EBtn from "../Base/E-btn";
import Favorite from "../Base/Favorite";
import PictureSlider from "./PictureSlider";
import PhoneBtn from "../Base/PhoneBtn";
const props = defineProps({
  product: Object
})
const route = useRoute()
const pathToDetail = computed(() => {
  return route.path.split('/')[1]
})
const price =computed(() => props.product.price.toLocaleString('ru-RU'))
</script>
<template>
  <div class="product-card">
    <ClientOnly>
      <PictureSlider sliderClasses="product-slider-image" :pictures="product.photos"/>
    </ClientOnly>
    <div class="flex flex-col p-7">
      <div class="mb-3 flex justify-between">
        <span class="font-bold text-lg md:text-2xl mb-2">{{product.name}}</span>
        <div class="flex flex-col gap-3 items-end">
          <span>id{{product.productId}}</span>
          <ClientOnly>
            <Favorite :productId="product.id"/>
          </ClientOnly>
        </div>
      </div>
        <span class="font-bold text-red text-2xl mb-4">{{price}} ₽</span>
      <p class="mb-1 font-semibold">{{product.location}}</p>
      <ul class="props grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2 py-3 mb-7 md:mr-4" style="background: #D9D9D9;">

        <li v-if="product.squareSec" class="flex flex-col">
            <span>
              Пл. участка
            </span>
          <span class="font-bold">
              {{product.squareSec}}
            </span>
        </li>
        <li v-if="product.roomsCount" class="flex flex-col">
            <span>
              Комнат
            </span>
           <span v-if="product.objectType.code == 'komnata'" class="font-bold">
              1 комната из {{product.roomsCount}}
            </span>
            <span class="font-bold" v-else>
              {{product.roomsCount}}
            </span>
        </li>
        <li v-if="product.square" class="flex flex-col">
            <span v-if="product.section === 'zagorodnaya'">
              Площадь дома
            </span>
          <span v-else>
              Общая пл.
            </span>
          <span class="font-bold">
              {{product.square}} м<sup>2</sup>
            </span>
        </li>
        <li v-if="product.livingSquare" class="flex flex-col">
            <span>
              Жилая пл.
            </span>
          <span class="font-bold">
              {{product.livingSquare}} м<sup>2</sup>
            </span>
        </li>
        <li v-if="product.kitchenSquare" class="flex flex-col">
            <span>
              Кухня
            </span>
          <span class="font-bold">
              {{product.kitchenSquare}} м<sup>2</sup>
            </span>
        </li>
        <li v-if="product.houseFloor" class="flex flex-col">
            <span>
              Этаж
            </span>
          <span class="font-bold">
              {{product.houseFloor}}
            </span>
        </li>
        <li v-if="product.floorCount && (product.section === 'zagorodnaya' || product.section === 'commerce')" class="flex flex-col">
            <span>
              Этажность
            </span>
          <span class="font-bold">
              {{product.floorCount}}
            </span>
        </li>
      </ul>
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <e-btn class="w-full sm:w-fit btn-white mb-4 sm:mb-0" :to="{path: `/realty/immovable-${product.id}/`}">Подробнее</e-btn>
        <PhoneBtn :agentData="product.agent" variant="btn-red"></PhoneBtn>
      </div>
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
