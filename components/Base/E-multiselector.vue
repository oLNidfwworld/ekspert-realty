<script setup>
  const props = defineProps({
    availableValues: {
      type: Array,
      required: true,
      default: []
    },
    label: {
      type: String,
      required: false,
      default: ''
    }
  })
  const emit = defineEmits(['update:multiselectorValue'])
  const selectedValues = ref([])
  const toggleSelectedItem = (item) => {
    if(selectedValues.value.includes(item)) {
      selectedValues.value = selectedValues.value.filter(el => el !== item)
    } else {
      selectedValues.value.push(item)
    }
    emit('update:multiselectorValue', selectedValues.value)
  }
</script>
<template>
<div class="e-multiselector">
  <label class="e-multiselector__label" v-if="label.length > 0"> {{label}}</label>
  <ul class="e-multiselector__wrapper">
    <li class="e-multiselector__item" :class="[selectedValues.includes(item) ? 'e-multiselector__item--active': '']" v-for="(item, index) in availableValues" :key="index" @click="toggleSelectedItem(item)">
      {{item.name}}
    </li>
  </ul>
</div>
</template>

<style lang="postcss" scoped>
.e-multiselector {
  &__wrapper {
    @apply flex flex-wrap gap-2;
  }
  &__label {
    @apply font-bold mb-1;
  }
  &__item {
    @apply bg-grey rounded-md cursor-pointer;
    padding: 8px 12px;
    &--active {
      @apply bg-red text-white;
    }
  }
}
</style>
