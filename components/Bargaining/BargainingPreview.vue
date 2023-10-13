<script setup>  
import PictureDetailSlider from "../../components/Catalog/PictureDetailSlider.vue"; 
import ProductCard from "../../components/Catalog/ProductCard.vue";  
const isShareButtonActive = ref(false);

const props = defineProps({
    placementObject: Object,
    similar : Object
}) 
const price =computed(() => props.placementObject.PRICE.toLocaleString('ru-RU'))
</script>
<template>
    <div v-if="placementObject" class="grid gap-10 catalog-item__detail-wrapper">
      <div class="grid gap-10 catalog-item__detail">
        <div class="grid  ">
          <ClientOnly>
            <PictureDetailSlider sliderClasses="" :pictures="placementObject.PHOTOS"/>
          </ClientOnly>
        </div>
        <div> 
          <h1 class="font-bold">Участок {{placementObject.NAME}}</h1>
          <ClientOnly>
            <span class="text-2xl text-red font-bold">{{price}} ₽</span>
          </ClientOnly> 
          <ul class="bg-grey-light grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2 py-3"> 
            <li  class="flex flex-col">
              <span>
                Площадь м<sup>2</sup>
              </span>
              <span v-if="placementObject.SQUARE" class="font-bold">
                {{placementObject.SQUARE}}
              </span> 
            </li>
            <li  class="flex flex-col">
              <span>
                Статус
              </span>
              <span v-if="placementObject.STATUS" class="font-bold">
                 {{placementObject.STATUS.NAME}}
              </span> 
            </li>
          </ul>  
        </div> 
      </div> 
      <section>
        <h2 class="mb-3 font-bold text-3xl">Похожие объявления</h2>
        <div class="grid grid-cols-1 gap-5">
          <ClientOnly>
            <BargainingSimilars v-for="(similarItem, index) in similar" :product="similarItem" :key="index"/>
          </ClientOnly>
        </div>
      </section>   
    </div>
  </template>
<style>
<style scoped>
.share-appear-enter-active, .share-appear-leave-active{
  transition : 0.4s;
}
.share-appear-enter-to, .share-appear-leave-from{
  transform : translateY(0px);
  opacity: 1;
}
.share-appear-enter-from, .share-appear-leave-to{
  transform : translateY(-30px);
  opacity: 0;
}
.yandex-container {
  height: 400px !important;
  width: 100% !important;
  overflow: hidden;
}
.catalog {
&-item {
&__detail {
   @apply grid-cols-1;
&-top {
   @apply flex w-full justify-between;
 }
}
}
}
.yandex-balloon {
  height: 80px;
  width: 200px;
}
@media screen and (min-width: 1024px) {
  .catalog {
&-item {
&__detail {
   @apply lg:grid-cols-[2fr_3fr] grid-cols-2
 }
}
}
}
.mapActive{
  background : var(--red);
  color: var(--white);
  span.nuxt-icon.nuxt-icon--fill svg path{
    fill : var(--white) !important;
  }
}
.bshadow{
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>