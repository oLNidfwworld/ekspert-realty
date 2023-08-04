 <script setup>
import {useApiFetch} from "~/composables/api";
import BlogCard from "~/components/Blog/BlogCard.vue";
/*todo: пагинатор надо сделать */
const route = useRoute();
const router = useRouter();

const { data:blogg, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Blog/`)
);

console.log(blogg)

</script>
<template>
  <div class="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 2lg:grid-cols-4 gap-2">
    <blog-card v-for="(item,index) in blogg" :key="index" :blogPic="item.DETAIL_PICTURE" :blogElement="item"></blog-card>
  </div>
</template>
<style scoped>

</style>