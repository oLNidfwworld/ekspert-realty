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
<style scoped>

</style>