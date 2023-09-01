<script setup lang="ts">
  import {useSeoMeta} from "@unhead/vue";
  const route = useRoute();
  const { data : seoData } = await useAsyncData(
      () => useApiFetch(`/Seo/`,{
        query : {
          'link' : route.path,
        }
      }), 
  ); 

  if(seoData.value){
    useSeoMeta( 
      seoData.value
    )
  }  
  // useSeoMeta({
  //   title: 'Услуги',
  //   ogTitle: 'Услуги',
  //   description: 'Эксперт. Агенство недвижимости.',
  //   ogDescription: 'Эксперт. Агенство недвижимости.',
  // })
</script>
<template>
  <div>
    <ServicesBlocks :only4="false"></ServicesBlocks>
  </div>
</template>
<style scoped lang="postcss">

  .services{

    &-item{

    }

    &-title{
      @apply text-center;
      border:1px solid var(--grey-light);
    }

  }

  .img-n{
    @apply min-h-[150px];
    background: var(--grey-light);
  }
</style>
