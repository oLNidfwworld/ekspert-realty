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
const detailedControls = { zoomControl: { position: { right: 10, top: 50 } } };
const selectedItem = ref(null);
const showObject = (data) => {
  selectedItem.value =  data;
}
definePageMeta({
  layout: "filter-layout",
});
</script>
<template>
  <div >
<!--    <div v-for="(item,index) in filter.mapData.items" :key="index">-->
<!--      {{ item.name }}-->
<!--    </div>-->
    <ClientOnly>
      <div class="relative">
        <YandexMap style="height: 10000px" :controls="controls" :detailed-controls="detailedControls" :coordinates="mapCenter">
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

        <div class="absolute w-[310px] right-[10px] top-0 bottom-0 m-auto h-fit z-[100]">
          <transition name="appear">
            <ProductTile v-if="selectedItem" :product="selectedItem"></ProductTile>
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
  transform : translateX(30px);
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
