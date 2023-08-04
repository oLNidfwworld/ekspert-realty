<script setup>
import Pagination from "../../components/Base/pagination";
import ProductCard from "../../components/Catalog/ProductCard";
import EBtn from "../../components/Base/E-btn";
import {useApiFetch} from "../../composables/api";
import {useFilterStore} from "../../store/smartFilter";

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
const { data:catalog, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog`, {
      query: {
        sectionCode: route.params.section,
        page: `page-${page.value}`,
        size: `${pageSizeApi.value}`
      }
    })
)
watch(() => route.query, (cur) => {
  refresh()
})
const mapCenter = ref([
  (catalog.value.items.reduce((a,b) => a + b.coordinates.lat, 0) / (catalog.value.items.length || 1)),
  (catalog.value.items.reduce((a,b) => a + b.coordinates.lon, 0) / (catalog.value.items.length || 1))
])

const controls = ['fullscreenControl'];
const detailedControls = { zoomControl: { position: { right: 10, top: 50 } } };
const filter = useFilterStore()
</script>
<template>
  <div>
    <ClientOnly>
      <YandexMap style="height: 800px" :controls="controls" :detailed-controls="detailedControls" :coordinates="mapCenter">
        <YandexClusterer :options="{ preset: 'islands#invertedVioletClusterIcons',
         clusterIcons: [
                  {
                      href: '/ya-cluster.svg',
                      size: [40, 40],
                      offset: [-20, -20],
                  }
                ],
                }">
          <YandexMarker v-for="(item, index) in filter.filterResult.items" :key="index" :coordinates="[item.coordinates.lat, item.coordinates.lon]" :options="{
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/ekspertMarker.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-25,-55]
          }" :marker-id="`1-marker-${item.id}`">
            <template #component>
              <div class="yandex-balloon">
                <p class="mb-3">{{item.location}}</p>
                <e-btn class="btn-red" :to="{path:`/rent/${item.id}`}">
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
