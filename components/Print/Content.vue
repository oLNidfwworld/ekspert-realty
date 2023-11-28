<script setup>
import { useRuntimeConfig } from "nuxt/app";
const props = defineProps({
  product: Object,
});

const config = useRuntimeConfig();

const item = reactive(props.product);
item.photos = item.photos.slice(0, 4);
const price = computed(() => item.price.toLocaleString("RU-ru"));
console.log(item);
</script>
<template>
  <div class="print-content">
    <div class="print-pictures">
      <picture v-for="(photo, index) in item.photos">
        <source
          :srcset="`${config.UPLOAD_URL}/${photo.url}/${photo.filename}`"
        />
        <img alt="" />
      </picture>
    </div>
    <div class="print-info">
      <div class="flex justify-between items-center">
        <h1 class="text-[30px] font-bold">
          {{ item.name }}
        </h1>
        <span class="text-[40px] font-bold text-red"> {{ price }} ₽ </span>
      </div>

      <ul class="columns-4 my-[30px] col-rule-red-1">
        <li v-if="item.roomsCount" class="flex flex-row justify-between">
          <span> Комнат </span>
          <span v-if="item.objectType.code == 'komnata'" class="font-bold">
            1 комната из {{ item.roomsCount }}
          </span>
          <span v-else class="font-bold">
            {{ item.roomsCount }}
          </span>
        </li>
        <li v-if="item.square" class="flex flex-row justify-between">
          <span v-if="item.section == 'zagorodnaya'"> Пл. дома </span>
          <span v-else> Общая пл. </span>
          <span class="font-bold"> {{ item.square }} м<sup>2</sup> </span>
        </li>
        <li v-if="item.squareSec" class="flex flex-row justify-between">
          <span> Пл. участка </span>
          <span class="font-bold">
            {{ item.squareSec }}
          </span>
        </li>
        <li v-if="item.livingSquare" class="flex flex-row justify-between">
          <span> Жилая пл. </span>
          <span class="font-bold"> {{ item.livingSquare }} м<sup>2</sup> </span>
        </li>
        <li v-if="item.kitchenSquare" class="flex flex-row justify-between">
          <span> Пл. кухни </span>
          <span class="font-bold">
            {{ item.kitchenSquare }} м<sup>2</sup>
          </span>
        </li>
        <li
          v-if="item.floorCount && item.section !== 'zagorodnaya'"
          class="flex flex-row justify-between"
        >
          <span> Этаж </span>
          <span class="font-bold">
            {{ item.houseFloor }} из {{ item.floorCount }}
          </span>
        </li>
        <li v-if="item.balcony" class="flex flex-row justify-between">
          <span> Балкон/лоджия </span>
          <span class="font-bold">
            {{ item.balcony }}
          </span>
        </li>
        <li v-if="houseType" class="flex flex-row justify-between">
          <span> Тип дома </span>
          <span class="font-bold">
            {{ houseType }}
          </span>
        </li>
        <li v-if="item.bathroom" class="flex flex-row justify-between">
          <span> Сан. узел </span>
          <span class="font-bold">
            {{ item.bathroom }}
          </span>
        </li>
        <li v-if="item.elevator" class="flex flex-row justify-between">
          <span> Лифт </span>
          <span class="font-bold">
            {{ item.elevator }}
          </span>
        </li>
        <li v-if="item.ipoteka" class="flex flex-row justify-between">
          <span> Ипотека </span>
          <span class="font-bold">
            {{ item.ipoteka }}
          </span>
        </li>
        <li
          v-if="item.communications"
          v-for="(comm, commi) in item.communications"
          class="flex flex-row justify-between"
        >
          <span>
            {{ comm.name }}
          </span>
          <span class="font-bold"> Да </span>
        </li>
      </ul>

      <p class="text-[18px] leading-[36px] font-light tracking-[0.4px]">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
<style lang="postcss">
.col-rule-red-1{
    column-rule: 2px solid var(--red);
}
.print {
    
  &-pictures {
    @apply grid grid-cols-2 gap-5;
    & img {
      @apply aspect-[1/0.8];
      object-fit: cover;
    }
  }
  &-info {
    @apply mt-5;
  }
}
</style>
