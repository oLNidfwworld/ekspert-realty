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
        <NuxtLink v-for="(link,index) in menuLinks.links" :key="index" :to="link.url">
            {{link.name}}
        </NuxtLink>
    </ul>
  </div>
</template>
