<script setup>
 const props = defineProps({
   menuLinks: Object,
   title: String
 })
</script>
<template>
  <div class="flex flex-col">
    <h4 class="font-bold mb-2">{{title}}</h4>
    <ul class="md:flex hidden text-lg text-white flex flex-col">
        <NuxtLink class="footer-links" v-for="(link,index) in menuLinks.links" :key="index" :to="link.url">
            {{link.name}}
        </NuxtLink>
    </ul>
  </div>
</template>
<style scoped>

  .footer-links{
    @apply relative block w-fit;
  }
  .footer-links:before{
    @apply absolute block bottom-0 left-0 h-[2px] bg-white;
    content : '';
    width: 0%;
    transition : 0.3s;
  }
  .footer-links:hover:before{
    width:100%;
  }
</style>