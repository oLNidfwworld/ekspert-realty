<script setup>

const props = defineProps({
  titol : String,
  link : String,
})
console.log(props.link)
</script>
<template>
    <a class="mr-2" target="_blank" :title="titol" :href='link' >
      <i>
        <slot></slot>
      </i>
    </a>
</template>
<style scoped>

</style>