<script setup>
 const { data: menuLinks} = await useFetch('/api/menuLinks')
</script>
<template>
    <nav class="2lg:flex hidden gap-2 text-lg font-bold text-black">
        <NuxtLink class="mx-1" v-for="(link,index) in menuLinks.links" :key="index" :to="link.url">
            {{link.name}}
        </NuxtLink>
    </nav>
</template>
