<script setup lang="ts">
definePageMeta({
    layout: "print",
})  

const route = useRoute(); 
const { data: product } = await useAsyncData(
  () => useApiFetch(`/Catalog/${route.query.objectData}/`)
) 
console.log(product.value);
</script>
<template>
    <PrintContent :product="product.item"></PrintContent>
</template>
<style >
@media print { 
  .pagebreak {
      clear: both;
      page-break-after: auto; 
  }
  /* 
  
  .pagebreak {
      clear: both;
      page-break-after: always;
      page-break-before: always;
  }
  .pagebreak-top {
      clear: both;
      page-break-after: auto;
      page-break-before: always;
  }
  .pagebreak-bott {
      clear: both;
      page-break-after: always;
      page-break-before: auto;
  }
  */
}
</style>