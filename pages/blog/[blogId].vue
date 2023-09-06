<script setup>
import {useApiFetch} from "~/composables/api";
// """ получаем инфу с бека """
const route = useRoute()
const router = useRouter()
const { data:blogElement, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Blog/${route.params.blogId}/`)
);
const goBack = () => {
  navigateTo('/blog/')
}
useSeoMeta({
  title : blogElement.value[0].SEO.ELEMENT_META_TITLE,
  description : blogElement.value[0].SEO.ELEMENT_META_DESCRIPTION
})

console.log(blogElement.value)

</script>
<template>
  <div>
    <h1>{{ blogElement[0].NAME }}</h1>
    <div class="relative">
      <img class="blog-element-image"  :src="`http://test.ekspert-realty.ru${blogElement[0].DETAIL_PICTURE}`"/>
      <div class="bg-grey absolute top-0 -left-[100%] w-[300%] h-full z-[0]"></div>
    </div>
    <div v-html="blogElement[0].DETAIL_TEXT " class="blog-element-text">
    </div>
    <button @click="goBack" class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="32" height="32" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M22 11H4.414l5.293-5.293a1 1 0 1 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L4.414 13H22a1 1 0 0 0 0-2z" fill="#000000" data-original="#000000"></path></g></svg>
      <span class="ml-2 font-bold text-[18px]">
        Вернуться назад
      </span>
    </button>
   </div>
</template>
<style scoped>
  .blog-element{
    &-text{
    @apply mt-4;
    }
    &-image{
      @apply m-auto z-[1] relative;
     }
  }
</style>
