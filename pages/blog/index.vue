 <script setup>
import {useApiFetch} from "~/composables/api";
import BlogCard from "~/components/Blog/BlogCard.vue";
import {useAsyncData} from "#app";
import Pagination from "~/components/Base/Pagination.vue";
import EBtn from "~/components/Base/E-btn.vue";
import {computed, watch} from "vue";
import NoProducts from "~/components/Catalog/NoProducts.vue";
import Skeleton from "primevue/skeleton";

const route = useRoute();
const router = useRouter();


const page = computed(() => {
  return route.query.page ? route.query.page.toString() : '1'
})
const pageSizeApi = computed(() => {
  return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})

const { data: blogg, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Blog/`,
        {
          query: {
            page: `page-${page.value}`,
            size: `${pageSizeApi.value}`
          }
        }
    )
) 

watch(() => route.query, (cur) => {
  refresh()
})

</script>
<template>
  <div v-if="pending">
    <div class="flex justify-end mb-5 gap-2">
      <Skeleton width="50px" height="50px"></Skeleton>
      <Skeleton width="50px" height="50px"></Skeleton>
    </div>

    <div class="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 2lg:grid-cols-4 gap-2">
      <Skeleton width="100%" height="500px"  ></Skeleton>
      <Skeleton width="100%" height="500px"  ></Skeleton>
      <Skeleton width="100%" height="500px"  ></Skeleton>
      <Skeleton width="100%" height="500px"  ></Skeleton>

      <Skeleton width="100%" height="500px"  ></Skeleton>
      <Skeleton width="100%" height="500px"  ></Skeleton>
      <Skeleton width="100%" height="500px"  ></Skeleton>
      <Skeleton width="100%" height="500px"  ></Skeleton>
    </div>
  </div>
  <div v-else>
    <div v-if="blogg.items">
      <div class="flex w-full justify-end mb-8">
        <e-btn :class="[pageSizeApi === '20' ? 'btn-red': 'btn-grey', 'mr-2']" @click="router.push({path: route.path, query: { ...route.query, size: 20} })">20</e-btn>
        <e-btn :class="[pageSizeApi === '40' ? 'btn-red': 'btn-grey']" @click="router.push({path: route.path, query: { ...route.query, size: 40}})">40</e-btn>
      </div>
      <div class="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 2lg:grid-cols-4 gap-2 mb-4">
        <blog-card v-for="(item,index) in blogg.items" :key="index" :blogPic="item.DETAIL_PICTURE" :blogElement="item"></blog-card>
      </div>
      <Pagination :current-page="blogg.nav" :total-pages="blogg.nav_size"/>
    </div>
    <no-products v-else/>
  </div>
</template>
<style scoped>

</style>
