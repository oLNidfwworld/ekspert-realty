<script setup>
const props = defineProps({
  date: Number
})

onMounted(() => {
  (function(d,s){d.getElementById("licnt6334").src=
    "https://counter.yadro.ru/hit?t27.7;r"+escape(d.referrer)+
    ((typeof(s)=="undefined")?"":";s"+s.width+"*"+s.height+"*"+
    (s.colorDepth?s.colorDepth:s.pixelDepth))+";u"+escape(d.URL)+
    ";h"+escape(d.title.substring(0,150))+";"+Math.random()})
    (document,screen)
  })
</script>
<template>
  <div class="flex flex-col gap-2">
    <nuxt-link class="mb-5" to="/">
  <!--    <nuxt-img src="/logo.png" />-->
      <img src="/logo-white.png" alt="logo"/>
    </nuxt-link>
    <span class="text-sm">© 2005-{{props.date}}</span>
    <!--LiveInternet counter-->
    <a class="hidden" href="https://www.liveinternet.ru/click" target="_blank">
      <img id="licnt6334" width="88" height="120" style="border:0"
    title="LiveInternet: показано количество просмотров и посетителей"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAIBTAA7"
    alt=""/></a> <!--/LiveInternet-->
  </div>
</template>
<style scoped>

</style>
