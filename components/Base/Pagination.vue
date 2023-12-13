<script setup>
import EBtn from "./E-btn";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  totalPages: [String,Number],
  currentPage: [String,Number],
  PageSize: [String,Number],
  totalItems: [String,Number],
  scrollToTop : {
    type : Boolean,
    default : false,
  }
});
console.log(props);
const linksSize = computed(() => {
  let links = [];
  if(props.currentPage-1 > 0) {
    links.push(props.currentPage-1)
  }
  for(let i = 0; i <= props.totalPages-props.currentPage && i < 4;i++) {
    links.push(props.currentPage+i)
  }
  return links
})
const scrollToTop = () => {
  if(props.scrollToTop) { 
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
</script>
<template>
    <div class="pagination justify-center md:justify-start">
      <p class="text-black font-bold mr-1 hidden md:block">Страница:</p>
      <e-btn @click="scrollToTop()" class="btn-grey w-[38px]" :to="{path: route.path, query: { ...route.query, page: `${currentPage-1}`}, params: {...route.params}}" v-if="currentPage > 1">&lt;</e-btn>
      <e-btn @click="scrollToTop()" :class="[index === props.currentPage  ? 'btn-red' : 'btn-grey']" class="w-[38px]" v-for="(index) in linksSize" :to="{path: route.path, query: { ...route.query, page: `${index}`}}">{{ index }}</e-btn>
      <e-btn @click="scrollToTop()" class="btn-grey w-[38px]" :to="{path: route.path, query: { ...route.query, page: `${currentPage+1}`}}" v-if="currentPage < totalPages">&gt;</e-btn>
    </div>
</template>
<style>
.pagination {
  @apply flex items-center;
}
.pagination a:not(:last-child) {
  @apply mr-1;
}
</style>
