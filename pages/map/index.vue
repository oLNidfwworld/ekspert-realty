<script setup>
import Pagination from "#imports";
import ProductCard from "../../components/Catalog/ProductCard";
import EBtn from "../../components/Base/E-btn";
import {useApiFetch} from "../../composables/api";
import {useFilterStore} from "../../store/smartFilter";
import {useAsyncData} from "nuxt/app";
import {YandexClusterer, YandexMap, YandexMarker} from "vue-yandex-maps";
import ProductTile from "~/components/Catalog/ProductTile.vue";

const route = useRoute();
const router = useRouter();
// const {data} = await useApiFetch(`/Catalog?page=${route.params.page}`, {method:'GET'})
const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSize = ref(20)
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})
console.log(route.params.section)

const filter = useFilterStore()


watch(() => route.query, (cur) => {
  refresh()
})
const mapCenter = ref([55.78490049781022,38.65941388435301])

watch(()=>filter.mapData, ()=>{
  if(filter.mapData.items){
    mapCenter.value = [
      (filter.mapData.items.reduce((a,b) => parseFloat(a) + parseFloat(b.coordinates.lat), 0) / (filter.mapData.items.length )),
      (filter.mapData.items.reduce((a,b) => parseFloat(a) + parseFloat(b.coordinates.lon), 0) / (filter.mapData.items.length ))
    ]
  }else{
    mapCenter.value = [55.78490049781022,38.65941388435301];
  }

  console.log(filter.mapData.items);
})
const controls = ['fullscreenControl'];
const detailedControls = {
  zoomControl: { position: { right: 10, top: 50 } },
};
const selectedItem = ref(null);
const showObject = (data) => {
  selectedItem.value =  data;
}
definePageMeta({
  layout: "filter-layout",
})
const scrollZoom = (event) => {
  console.log(event)
}
</script>
<template>
  <div >
<!--    <div v-for="(item,index) in filter.mapData.items" :key="index">-->
<!--      {{ item.name }}-->
<!--    </div>-->
    <ClientOnly>
      <div class="relative">
        <YandexMap style="height: 10000px"
                   :behaviors='["drag"]'
                   :controls="controls" :detailed-controls="detailedControls" :coordinates="mapCenter">
              <YandexMarker @click="showObject(item)"  v-for="(item, index) in filter.mapData?.items" :key="index"
                            :coordinates="[item.coordinates.lat, item.coordinates.lon]" :options="{
              iconLayout: 'default#imageWithContent',
              iconImageHref: '/ekspertMarker.svg',
              iconImageSize: [50, 50],
              iconImageOffset: [-25,-55]
            }"
                            :marker-id="item.id">
              </YandexMarker>
        </YandexMap>

        <div class="absolute w-[310px] left-[10px] top-0 bottom-0 m-auto h-fit z-[100]">
          <transition name="appear">
            <div v-if="selectedItem" class="relative">
              <i @click="selectedItem = null" class="absolute top-0 bottom-0 m-auto -right-[30px] block h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="60" viewBox="0 0 25 60" fill="none">
                  <g clip-path="url(#clip0_520_3)">
                    <path d="M5 60C4.30967 60 3.75 58.6568 3.75 57L3.75 3C3.75 1.3432 4.30967 0 5 0C5.69033 0 6.25 1.3432 6.25 3L6.25 57C6.25 58.6568 5.69028 60 5 60ZM11.25 3L11.25 57C11.25 58.6568 11.8097 60 12.5 60C13.1903 60 13.75 58.6568 13.75 57L13.75 3C13.75 1.3432 13.1903 0 12.5 0C11.8097 0 11.25 1.3432 11.25 3ZM18.75 3L18.75 57C18.75 58.6568 19.3097 60 20 60C20.6903 60 21.25 58.6568 21.25 57L21.25 3C21.25 1.3432 20.6903 0 20 0C19.3097 0 18.75 1.3432 18.75 3Z" fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_520_3">
                      <rect width="60" height="25" fill="white" transform="matrix(0 -1 1 0 0 60)"/>
                    </clipPath>
                  </defs>
                </svg>
              </i>
              <ProductTile  :product="selectedItem"></ProductTile>
            </div>
          </transition>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style >

.appear-leave-active,.appear-enter-active{
  transition: 0.4s;
}
.appear-leave-to,.appear-enter-from{
  opacity : 0;
  transform : translateX(-30px);
}
.appear-leave-from,.appear-enter-to{
  transform : translateX(0);
  opacity : 1;
}
.yandex-container {
  height: 700px !important;
}
.yandex-balloon {
  @apply flex flex-col justify-between;
  height: 200px;
  width: 200px;
}
</style>
