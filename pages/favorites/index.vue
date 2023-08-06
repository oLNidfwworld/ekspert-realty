<script setup>
// import Pagination from "../../components/Base/Pagination";
import ProductCard from "../../components/Catalog/ProductCard";
import EBtn from "../../components/Base/E-btn";
import {useApiFetchWithRefresh} from "../../composables/api";
import {onMounted, watch} from "vue";
import {useFavoriteStore} from "../../store/favorite";

const route = useRoute();
const router = useRouter();
const favStore = useFavoriteStore()
const {data:catalog, refresh, pending} = await useApiFetchWithRefresh('/Filter/', {
  method: 'POST',
  params: {
    ids: JSON.stringify(favStore.favoriteList),
    size: `9999`
  },
  watch: favStore.favoriteList
})


</script>
<template>
  <noindex>
    <ClientOnly>
<!--    <div class="flex w-full justify-end mb-8">-->
<!--      <e-btn :class="[pageSizeApi === '20' ? 'btn-red': 'btn-grey', 'mr-2']" @click="router.push({path: route.path, query: { ...route.query, size: 20} })">20</e-btn>-->
<!--      <e-btn :class="[pageSizeApi === '40' ? 'btn-red': 'btn-grey']" @click="router.push({path: route.path, query: { ...route.query, size: 40}})">40</e-btn>-->
<!--    </div>-->
      <div v-if="pending || !catalog?.items">
        У вас нет предложений в избранном
      </div>
      <div class="grid grid-cols-1 gap-5" v-if="!pending">
      <ProductCard v-for="(item,index) in catalog.items" :product="item" :key="index"/>
      <!--      <Pagination :current-page="catalog.nav" :total-pages="catalog.nav_size"/>-->
    </div>
    </ClientOnly>
  </noindex>
</template>

<style scoped>

</style>
