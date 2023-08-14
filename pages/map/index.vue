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
const { data: catalog, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/CatalogReborn/${filter.filterCity}/${filter.filterServiceType}/${filter.filterImmovableType}/${filter.filterImmovableProp}/`,
        {
          query: {
            page: `page-${page.value}`,
            size: `${pageSizeApi.value}`,
            pricerange: `${(route.query.pricerange)?route.query.pricerange:''}`,
            totalarea: `${(route.query.totalarea)?route.query.totalarea:''}`,
            floors: `${(route.query.floors)?route.query.floors:''}`,
            ipoteka: `${(route.query.ipoteka)?route.query.ipoteka:''}`,
            housetype: `${(route.query.housetype)?route.query.housetype:''}`,
            housearea: `${(route.query.housearea)?route.query.housearea:''}`,
            plotarea: `${(route.query.plotarea)?route.query.plotarea:''}`,
            communication: `${(route.query.communication)?route.query.communication:''}`,
            earth_category: `${(route.query.earth_category)?route.query.earth_category:''}`,
          }
        }
    )
)
console.log(catalog.value)
watch(() => route.query, (cur) => {
  refresh()
})
const mapCenter = ref([
  (catalog.value.items.reduce((a,b) => a + b.coordinates.lat, 0) / (catalog.value.items.length || 1)),
  (catalog.value.items.reduce((a,b) => a + b.coordinates.lon, 0) / (catalog.value.items.length || 1))
])

const controls = ['fullscreenControl'];
const detailedControls = { zoomControl: { position: { right: 10, top: 50 } } };
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
          <YandexMarker v-for="(item, index) in catalog.items" :key="index"
                        :coordinates="[item.coordinates.lat, item.coordinates.lon]" :options="{
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/ekspertMarker.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-25,-55]
          }" :marker-id="item.id">
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
