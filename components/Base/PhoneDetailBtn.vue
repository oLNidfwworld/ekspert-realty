<script setup lang="ts">
import EBtn from "./E-btn";
const props = defineProps({
  agentData: Object,
  variant: String,
})
const showPhone = ref(false)
console.log(props.agentData)
</script>
<template>
  <div v-if="agentData.name != '' || agentData.phone != ''">
    <div class="flex flex-col">
      <span class="mb-3">{{ agentData.name }}</span>
    <p class="mb-3 mr-1 flex" v-if="!showPhone">{{ agentData.phone.slice(0 , agentData.phone.length-4) }}X-XX <button class="ml-1 text-red text-sm flex items-center" v-if="!showPhone" @click="showPhone = !showPhone">
      Показать
      <svg class="ml-1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M11.6725 8.80679L9.99788 7.13216C9.39979 6.53407 8.38305 6.77333 8.14382 7.55081C7.96439 8.08911 7.36631 8.38816 6.82803 8.26852C5.63186 7.96947 4.01703 6.41445 3.71799 5.15848C3.53857 4.62018 3.89742 4.02209 4.43569 3.84269C5.2132 3.60346 5.45244 2.58671 4.85435 1.98863L3.17972 0.313994C2.70125 -0.104665 1.98355 -0.104665 1.56489 0.313994L0.428528 1.45035C-0.707832 2.64652 0.548145 5.81637 3.35914 8.62737C6.17014 11.4384 9.33998 12.7542 10.5362 11.558L11.6725 10.4216C12.0912 9.94315 12.0912 9.22545 11.6725 8.80679Z" fill="#E02D1F"/>
    </svg></button></p>
      <a class="mb-3" v-else :href="`tel:${agentData.phone.replace(/\D/g, '')}`">{{ agentData.phone }}</a>
    </div>
  </div>
  <div class="text-red" v-else>
    Не указан
  </div>
</template>

<style>
.favorite {
  @apply flex transition-all duration-500;
  transform: rotateY(0);
  &__added {
    @apply fill-red transition-all duration-500;
    transform: rotateY(180deg);
  }
}
</style>
