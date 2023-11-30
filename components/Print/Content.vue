<script setup>
import { useRuntimeConfig } from "nuxt/app";
const props = defineProps({
  product: Object,
});

const config = useRuntimeConfig();

const item = reactive(props.product);
item.photos = item.photos.slice(0, 4);
const price = computed(() => item.price.toLocaleString("RU-ru"));
const houseType = computed(() => {
  return Array.isArray(item.houseType) ? item.houseType[0] : item.houseType
})
const mapInited = () => {
  setTimeout(() => {
    window.print()
  },1000)
}
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
        <h1 class="text-[20px] font-bold">
          {{ item.name }}
        </h1>
        <span class="text-[25px] font-bold text-red"> {{ price }} ₽ </span>
      </div>

      <ul class="  columns-4 text-[14px] my-[15px] gap-[35px] col-rule-red-1">
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

      <p class="pagebreak text-[14px] leading-[30px] font-light tracking-[0.4px]">
        {{ item.description }}
      </p>
      <div class="">
          <p class="mt-3">
          <b>Адрес: </b> {{ item.location }}
            </p>

        <ClientOnly>
          <YandexMap @created="mapInited" class="mt-3" :zoom="13" :controls="{}" :coordinates="[item.coordinates.lat, item.coordinates.lon]">
              <!--Markers-->
              <YandexMarker :coordinates="[item.coordinates.lat, item.coordinates.lon]" :options="{
                iconLayout: 'default#imageWithContent',
                iconImageHref: '/ekspertMarker.svg',
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -55]
              }" :marker-id="item.id">
                <template #component>
                  {{ item.location }}
                </template>
              </YandexMarker>
            </YandexMap>
        </ClientOnly>
      </div>

      <div class="text-[20px] font-bold mt-[30px] m-auto w-fit">© 2005-2023</div>
    </div>
  </div>
</template>
<style lang="postcss">
.col-rule-red-1{
    column-rule: 2px solid var(--red);
}
@page {
  margin : 5in;
}
@page {
  @top-left-corner { content: " "; border: solid green; }
  @top-right-corner { content: url(foo.png); border: solid green; }
  @bottom-right-corner { content: counter(page); border: solid green; }
  @bottom-left-corner { content: normal; border: solid green; }
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
    @apply mt-3;
  }
}
.yandex-balloon {
  height: 80px;
  width: 200px;
}

.yandex-container {
  height: 400px !important;
  width: 100% !important;
  overflow: hidden;
}


</style>
