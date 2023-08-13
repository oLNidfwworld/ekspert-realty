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

console.log(catalog.value)
console.log(favStore.favoriteList)
</script>
<template>
  <ClientOnly>
    <noindex>
        <div v-if="pending || !catalog?.items">
          У вас нет предложений в избранном
        </div>
        <div class="grid grid-cols-1 gap-5" v-if="!pending">
        <ProductCard v-for="(item,index) in catalog.items" :product="item" :key="index"/>
      </div>
    </noindex>
  </ClientOnly>
</template>

<style scoped>

</style>
