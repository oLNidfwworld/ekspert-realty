<script setup>
  const props = defineProps({
    to: {
      type: [Object, String],
      default: null
    }
  })
  const componentTag = computed(() => {
    return !!props.to;
  })
</script>
<template>
<nuxt-link v-if="componentTag" class="btn border-red text-red"
           v-bind="{ ...$attrs, ...$props }"
           >
  <slot/>
</nuxt-link>
  <button v-else class="btn border-red text-red p-3"
          v-bind="{ ...$props }"
          >
    <slot/>
  </button>
</template>
<style>
.btn {
  @apply flex justify-center items-center border-solid border-red text-red py-3 px-4 rounded-md font-bold transition-all;
  border-width: 1px;
  &[inert]{
    @apply opacity-50;
  }
  &-red {
    @apply text-white border-red bg-red;
    &:hover{
      @apply text-red bg-white;
    }
  }
  &-blue {
    @apply text-white border-[#302bcb] bg-[#302bcb]; 
    &:hover{
      @apply text-[#302bcb] bg-white;
    }
  }
  &-white {
    @apply text-red border-red;
    &:hover{
      @apply text-white bg-red;
    }
  }
  &-grey {
    @apply text-black bg-grey border-grey;
  }
  &-green {
    @apply text-white;
    border: 1px solid #2D6D6D;
    background: #2D6D6D;
  }
  &-map {
    @apply bg-grey-dark text-white border-grey-dark;
    padding: 8px !important;
  }
}
</style>
