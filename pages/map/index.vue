<script setup>
import Pagination from "#imports";
import ProductCard from "../../components/Catalog/ProductCard";
import EBtn from "../../components/Base/E-btn";
import {useApiFetch} from "../../composables/api";
import {useFilterStore} from "../../store/smartFilter";
import {useAsyncData} from "nuxt/app";
import {YandexClusterer, YandexMap, YandexMarker} from "vue-yandex-maps";

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
})

const controls = ['fullscreenControl'];
const detailedControls = { zoomControl: { position: { right: 10, top: 50 } } };
</script>
<template>
  <div >
<!--    <div v-for="(item,index) in filter.mapData.items" :key="index">-->
<!--      {{ item.name }}-->
<!--    </div>-->
    <ClientOnly>
      <YandexMap style="height: 800px" :controls="controls" :detailed-controls="detailedControls" :coordinates="mapCenter">
        <YandexClusterer v-if="filter.mapData?.items" :options="{ preset: 'islands#invertedVioletClusterIcons',
         clusterIcons: [
                  {
                      href: '/ya-cluster.svg',
                      size: [40, 40],
                      offset: [-20, -20],
                  }
                ],
                }">
            <YandexMarker   v-for="(item, index) in filter.mapData?.items" :key="index"
                          :coordinates="[item.coordinates.lat, item.coordinates.lon]" :options="{
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/ekspertMarker.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-25,-55]
          }"
                          :marker-id="item.id">
              <template #component>
                <div class="yandex-balloon">
                  <p class="mb-3">{{item.location}}</p>
                  <e-btn class="btn-red" :to="{path:`/realty/immovable-${item.id}`}">
                    Подробнее
                  </e-btn>
                </div>
              </template>
            </YandexMarker>
        </YandexClusterer>
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<style>
.yandex-container {
  height: 400px !important;
}
.yandex-balloon {
  @apply flex flex-col justify-between;
  height: 200px;
  width: 200px;
}
</style>
