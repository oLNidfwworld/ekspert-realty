<script setup>
const props = defineProps({
  date: Number
})
</script>
<template>
  <div class="flex flex-col">
    <nuxt-link class="mb-5" to="/">
  <!--    <nuxt-img src="/logo.png" />-->
      <img src="/logo-white.png" alt="logo"/>
    </nuxt-link>
    <span class="text-sm">© 2005-{{props.date}}</span>
  </div>
</template>
<style scoped>

</style>
