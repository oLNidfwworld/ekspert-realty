<script setup>
import {useIMask} from "vue-imask";

const emit = defineEmits()
const props = defineProps({
  value: {
    type: [String, Number],
    default: () => null,
  },
  mask: {
    type: String,
    required: false,
    default: () => '',
  },
  fluid: {
    type: Boolean,
    default: () => false,
  },
  errorMessages: {
    type: [String, Array],
    default: () => '',
  },
})
const { el, masked } = useIMask({
  mask: props.mask,
  radix: '.',
})
const internalValue = ref(null)
watch(internalValue, el => {
  emit('update:value', el)
})
</script>
<template>
  <div class="inline-flex flex-col">
    <label
        class="custom-textarea"
    >
      <div class="flex flex-grow">
        <textarea
            ref="el"
            v-model="internalValue"
            class="w-full outline-none bg-transparent"
            v-bind="{ type: 'text', ...$attrs }"
        />
        <span class="cursor-pointer" @click="internalValue = ''">x</span>
      </div>
    </label>
  </div>
</template>

<style>
.custom {
&-textarea {
   @apply bg-white rounded-md font-semibold py-2 px-4;
   border: 1px solid var(--grey);
input {
  @apply w-full;
  margin: 0 !important;
}
}
}
</style>
