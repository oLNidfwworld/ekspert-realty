<script setup lang="ts">
// vue transition bug handle
import {useFilterStore} from "../store/smartFilter";
import ProductCard from "../components/Catalog/ProductCard";
import {useSeoMeta} from "@unhead/vue";
const messages = [
  `Uncaught NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`, // chromium based
  `NotFoundError: The object can not be found here.`, // safari
]
if (typeof window !== 'undefined') {
  window.addEventListener('error', (ev) => {
    if (messages.includes(ev.message)) {
      ev.preventDefault()
      window.location.reload()
    }
  })
}
const transition = (to, from) => {
  if (!from) {
    return 'slide-left'
  }
  return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
}
const route = useRoute()
const filter = useFilterStore()
useSeoMeta({
  keywords : 'недвижимость,жильё,квартиры,дачи,дома,коттеджи,комнаты,аренда',
})
</script>
<template>
  <div class="page-wrapper map-layout">
    <TheHeader/>
    <NuxtLoadingIndicator color="#E02D1F" style="height:5px;top:90px;"/>
    <div class="content-wrapper no-m">
      <Filter v-if="route.path === '/'|| route.path === '/map'|| (route.path.split('/')[1] === 'realty' && !route.path.split('/')[2].includes('immovable-')) "/>
      <div class="top-banner" v-else-if="route.path === '/blog/' || route.path === '/act-help/' ">
        <div class="m-auto container">
          <div class="top-banner__text" v-show="route.path === `/blog/`">Блог</div>
          <div class="top-banner__text" v-show="route.path === `/act-help/`">Составление договоров</div>
        </div>
      </div>
      <div class="f-top-banner" v-else-if="route.path.split('/')[1] === 'services'">
        <div class="m-auto container">
          <div class="top-banner__text" v-show="route.path === '/services/'">Услуги</div>
          <div class="top-banner__text" v-show="route.path.split('/')[2] === 'customers'">Покупателям</div>
          <div class="top-banner__text" v-show="route.path.split('/')[2] === 'sellers'">Продавцам</div>
          <div class="top-banner__text" v-show="route.path.split('/')[2] === 'tenants'">Арендаторам</div>
          <div class="top-banner__text" v-show="route.path.split('/')[2] === 'lessors'">Арентодателям</div>
          <div class="top-banner__text" v-show="route.path.split('/')[2] === 'srochnyy-vykup-kvartir'">Срочный выкуп</div>
          <div class="top-banner__text" v-show="route.path.split('/')[2] === 'mortpage'">Ипотека</div>
        </div>
      </div>
      <div class="l-top-banner" v-else-if="route.path === '/about/' || route.path === '/contacts/'">
        <div   class="m-auto container">
          <div class="top-banner__text" v-show="route.path === '/about/'">О компании</div>
          <div class="top-banner__text" v-show="route.path === '/contacts/'">Контакты</div>
        </div>
      </div>
      <div v-else class="min-h-[50px]">
      </div>
      <main class="max-w-[100%] w-full">
        <slot />
      </main>
    </div>
    <TheFooter/>
  </div>
</template>
<style lang="postcss">
body {
  font-family: 'Open Sans', sans-serif;
}

.page-fading-enter-active,
.page-fading-leave-active{
  transition: 0.6s ease;
}

.page-fading-leave-from,
.page-fading-enter-to{
  opacity: 1;
}

.page-fading-leave-to,
.page-fading-enter-from{
  opacity: 0;
}
.map-layout .filter__wrapper{
  margin-bottom:0px !important;
}
.content-wrapper.no-m{
  margin-bottom : 0px !important;
}
.content-wrapper {
  @apply relative;
  padding-top:90px;
}
.top-banner{
  @apply mb-6;
  width: 100%;
  background:url('/blog-bg.png');
  background-size:cover;
  &__text{
    @apply text-[20px] md:text-[40px] font-bold pt-[50px] pb-[50px] md:pt-[100px] md:pb-[100px];

  }
}
.l-top-banner{
  @apply mb-6;
  width:100%;
  background:url('/filter-bg.png');
  background-position: bottom;
  background-size:cover;
  &__text{
    @apply text-[20px] md:text-[40px] font-bold pt-[50px] pb-[50px] md:pt-[100px] md:pb-[100px];

  }
}
.f-top-banner{
  @apply mb-6;
  width:100%;
  background:url('/filter-bg.png');
  background-size:cover;
  &__text{
    @apply text-[20px] md:text-[40px] font-bold pt-[50px] pb-[50px] md:pt-[100px] md:pb-[100px];

  }
}
/*.page-left-enter-active,*/
/*.page-right-enter-active,*/
/*.page-left-leave-active,*/
/*.page-right-leave-active{*/
/*  @apply absolute top-0 left-0 right-0 bottom-0;*/
/*  transition: all .3s linear;*/
/*}*/
/*.page-left-enter-to,*/
/*.page-right-enter-to {*/
/*  transform: translateX(0);*/
/*}*/
/*.page-left-leave-to, .page-right-enter-from {*/
/*  transform: translateX(-100%);*/
/*}*/
/*.page-left-enter-from,*/
/*.page-right-leave-to{*/
/*  transform: translateX(100%);;*/
/*}*/
.page{
  &-wrapper{
    @apply flex flex-col;
    min-height:100vh;
  }
}
.content{
  &-wrapper{
    @apply flex flex-col items-center overflow-hidden;
    min-height:100vh;
  }
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.swiper-prev, .swiper-next{
  @apply w-[30px] h-[30px] bg-red flex justify-center items-center rounded-md;
}
.swiper-next:after {
  @apply text-white;
  content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDcgMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yLjcwNzExIDAuNzA3MTA5QzIuMzE2NTggMC4zMTY1ODQgMS42ODM0MiAwLjMxNjU4NCAxLjI5Mjg5IDAuNzA3MTA4TDAuNzA3MTA1IDEuMjkyOUMwLjMxNjU4MSAxLjY4MzQyIDAuMzE2NTgxIDIuMzE2NTkgMC43MDcxMDQgMi43MDcxMUwyLjI5Mjg5IDQuMjkyOUMyLjY4MzQyIDQuNjgzNDMgMi42ODM0MiA1LjMxNjU5IDIuMjkyODkgNS43MDcxMUwwLjcwNzEyMSA3LjI5Mjg5QzAuMzE2NTk4IDcuNjgzNDEgMC4zMTY1OTggOC4zMTY1OCAwLjcwNzEyMSA4LjcwNzFMMS4yOTI5MSA5LjI5Mjg5QzEuNjgzNDMgOS42ODM0MiAyLjMxNjYgOS42ODM0MiAyLjcwNzEyIDkuMjkyODlMNi4yOTI4OSA1LjcwNzExQzYuNjgzNDIgNS4zMTY1OSA2LjY4MzQyIDQuNjgzNDMgNi4yOTI4OSA0LjI5MjlMMi43MDcxMSAwLjcwNzEwOVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=');
}
.swiper-prev:after {
  @apply text-white;
  content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDcgMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00LjI5Mjg5IDkuMjkyODlDNC42ODM0MiA5LjY4MzQyIDUuMzE2NTggOS42ODM0MiA1LjcwNzExIDkuMjkyODlMNi4yOTI5IDguNzA3MUM2LjY4MzQyIDguMzE2NTggNi42ODM0MiA3LjY4MzQxIDYuMjkyOSA3LjI5Mjg5TDQuNzA3MTEgNS43MDcxQzQuMzE2NTggNS4zMTY1NyA0LjMxNjU4IDQuNjgzNDEgNC43MDcxMSA0LjI5Mjg5TDYuMjkyODggMi43MDcxMUM2LjY4MzQgMi4zMTY1OSA2LjY4MzQgMS42ODM0MiA2LjI5Mjg4IDEuMjkyOUw1LjcwNzA5IDAuNzA3MTA4QzUuMzE2NTcgMC4zMTY1ODMgNC42ODM0IDAuMzE2NTg0IDQuMjkyODcgMC43MDcxMDlMMC43MDcxMDQgNC4yOTI4OUMwLjMxNjU4MSA0LjY4MzQxIDAuMzE2NTgxIDUuMzE2NTcgMC43MDcxMDQgNS43MDcxTDQuMjkyODkgOS4yOTI4OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=');
}
.title {
  @apply text-3xl font-bold mb-7;
}
.nuxt-icon {
  transition: all .3s ease-in-out;
}
.left-right-slide-enter-active, .left-right-slide-leave-active, .left-right-slide-enter-active div, .left-right-slide-leave-active div {
  opacity: 1;
  transition: all .3s ease-in-out;
}
.left-right-slide-enter-from div:nth-child(even), .left-right-slide-leave-to div:nth-child(even) {
  transform: translateX(-50%);
  opacity: 0;
}.left-right-slide-enter-from div:nth-child(odd), .left-right-slide-leave-to div:nth-child(odd) {
   transform: translateX(50%);
   opacity: 0;
 }
</style>
