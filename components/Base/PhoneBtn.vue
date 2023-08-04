<script setup lang="ts">
import EBtn from "./E-btn";
const props = defineProps({
  agentData: Object,
  variant: String,
})
const showPhone = ref(false)
</script>
<template>
  <div>
    <div class="flex flex-col" v-if="showPhone">
      <span class="mb-3">{{ agentData.name }}</span>
      <a class="mb-3" :href="`tel:${agentData.phone.replace(/\D/g, '')}`">{{ agentData.phone }}</a>
    </div>
    <e-btn v-if="!showPhone" @click="showPhone = !showPhone" :class="variant">Показать телефон</e-btn>
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
