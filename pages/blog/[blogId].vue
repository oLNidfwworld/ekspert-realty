<script setup>
import {useApiFetch} from "~/composables/api";
// """ получаем инфу с бека """
const route = useRoute()
const { data:blogElement, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Blog/${route.params.blogId}/`)
);
</script>
<template>
  <div class="blog-element-image" :style="`background-image: url('http://test.ekspert-realty.ru${blogElement[0].DETAIL_PICTURE}')`"></div>
  <div v-html="blogElement[0].DETAIL_TEXT " class="blog-element-text">
  </div>
</template>
<style scoped>
  .blog-element{
    &-image{
      width:100%;
     min-height:400px;
      background-color: var(--grey-light);
      background-repeat: no-repeat;
      background-size:cover;
     }
  }
</style>
