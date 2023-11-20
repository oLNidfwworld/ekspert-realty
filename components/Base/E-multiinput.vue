<script setup>
const props = defineProps({
  maxVal: {
    type: Number,
    required: false,
    default: 100
  },
  minVal: {
    type: Number,
    required: false,
    default: 0
  },
  label: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits(['update:multiinputValue'])
const selectedValues = ref({
  min: 0,
  max: 0,
})
watch(selectedValues, el => {
  emit('update:multiinputValue', el)
},{ deep: true })
</script>
<template>
  <div class="e-multiinput">
    <label class="e-multiinput__label" v-if="label.length > 0"> {{label}}</label>
    <div class="e-multiinput__wrapper">
      <input type="number" :min="minVal" :max="maxVal" v-model="selectedValues.min" class="e-multiinput__item" placeholder="От"/>
      <input type="number" :min="minVal" :max="maxVal" v-model="selectedValues.max" class="e-multiinput__item" placeholder="До"/>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.e-multiinput {
  &__wrapper {
    @apply flex flex-wrap gap-2 bg-white rounded-md w-fit;
    border: 1px solid var(--grey);
  }
  &__label {
    @apply font-bold mb-1;
  }
  &__item {
    @apply bg-transparent w-[100px];
    margin: 8px 12px;
    /* Chrome,  Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }
    &:first-child{
      border-right: 1px solid var(--grey);
    }
    &--active {
      @apply bg-red text-white;
    }
  }
}
</style>
