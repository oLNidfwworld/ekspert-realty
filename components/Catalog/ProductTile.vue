<script setup>
import EBtn from "../Base/E-btn";
import Favorite from "../Base/Favorite";
import PictureSlider from "./PictureSlider";
import PhoneBtn from "../Base/PhoneBtn";

const props = defineProps({
  product: Object
})
const price = computed(() => props.product.price.toLocaleString('ru-RU'))
const route = useRoute()
const config = useRuntimeConfig()
</script>
<template>
  <div class="product-tile">
    <div class="product-tile-image" v-if="product.photos.length > 0" :style="`background-image: url('${config.UPLOAD_URL}${product.photos[0].url}/${product.photos[0].filename}')`">
    </div>
      <div v-else class="product-tile-image">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" x="0" y="0" viewBox="0 0 53 53" class=""><g><path fill="#ededed" d="M43.698 5.744v39.185a3.244 3.244 0 0 1-3.244 3.244H5.744A3.244 3.244 0 0 1 2.5 44.93V5.744A3.244 3.244 0 0 1 5.744 2.5h34.71a3.244 3.244 0 0 1 3.244 3.244z" data-original="#ededed" class=""></path><path fill="#00aeff" d="M7.051 7.097h32.096v29.677H7.051z" data-original="#00aeff" class=""></path><path fill="#1e2933" d="m26.646 36.76-12.635.014H7.05V29.45l2.405-3.676 3.068-4.703c.92-1.392 2.946-1.392 3.852 0l3.08 4.703.866 1.338z" data-original="#1e2933"></path><path fill="#f6cbba" d="m9.451 25.778 3.077-4.708a2.302 2.302 0 0 1 3.854 0l3.08 4.708-3.792 2.076a2.526 2.526 0 0 1-2.427 0z" data-original="#f6cbba" class=""></path><path fill="#2c3642" d="M39.147 29.45v7.31l-25.136.014 6.31-9.662 2.514-3.838 3.77-5.77c1.122-1.704 3.622-1.704 4.73 0l3.771 5.77h.013z" data-original="#2c3642" class=""></path><path fill="#f6cbba" d="m22.833 23.28 3.776-5.778c1.115-1.706 3.614-1.706 4.73 0l3.778 5.778-4.653 2.548a3.1 3.1 0 0 1-2.978 0z" data-original="#f6cbba" class=""></path><path fill="#ffc536" d="M22.826 13.506a3.373 3.373 0 0 1-3.365 3.375 3.366 3.366 0 0 1-3.364-3.375 3.364 3.364 0 1 1 6.73 0z" data-original="#ffc536"></path><path fill="#f34624" d="M47.877 47.886A8.928 8.928 0 0 1 35.253 35.26c3.495-3.495 9.148-3.495 12.634-.01 3.486 3.486 3.486 9.14-.01 12.635z" data-original="#f34624" class=""></path><path fill="#ffffff" d="M44.886 44.878a1.301 1.301 0 0 1-1.84 0l-1.47-1.469-1.475 1.476a1.301 1.301 0 0 1-1.84-1.84l1.475-1.476-1.476-1.476a1.301 1.301 0 1 1 1.84-1.84l1.477 1.475 1.469-1.469a1.301 1.301 0 1 1 1.84 1.84l-1.469 1.47 1.469 1.469a1.301 1.301 0 0 1 0 1.84z" data-original="#ffffff" class=""></path></g></svg>
      </div>
    <div class="product-tile__info">
    <span class="font-bold text-red text-2xl mb-4">
      {{price}} ₽
    </span>
      <NuxtLink class="text-base font-bold mb-6 h-[50px]" :to="{path: `/realty/immovable-${product.id}`}">{{product.name}}</NuxtLink>
      <p class="text-sm mb-4 h-[60px]">{{product.location}}</p>
      <div class="flex justify-center">
        <ClientOnly>
          <PhoneBtn class="text-sm" :agent-data="product.agent" variant="btn-white"/>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
<style lang="postcss">
.product-tile {
    @apply bg-concrete flex flex-col justify-between rounded-md;
  &-image {
    @apply w-full rounded-md overflow-hidden;
    height: 246px;
    background-position: center;
    background-size: cover;
  }
  &__info {
    @apply flex flex-col;
    padding: 24px;
  }
  &-slider {
    &-image {
      @apply w-[320px] sm:w-[480px] md:w-[300px] lg:w-[400px] h-[300px] sm:h-[350px];
    }
  }
}
</style>
