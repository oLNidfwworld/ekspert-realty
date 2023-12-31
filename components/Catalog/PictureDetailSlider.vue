<script setup>
import {useRuntimeConfig} from "nuxt/app";

const props = defineProps({
  pictures: Array,
  sliderClasses: String
})
let thumbsSwiper = null
const prev = ref(null)
const next = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper = swiper;
}
const config = useRuntimeConfig() 
</script>
<template>
  <div :class="[sliderClasses, 'swiper-detail__slide swiper-detail__wrapper h-full relative rounded-md overflow-hidden']">
    <Swiper
        @swiper="setThumbsSwiper"
        :modules="[SwiperNavigation, SwiperEffectCreative]"
        class="item-image mb-8"
        :slides-per-view="1"
        :navigation="{
              prevEl: prev,
              nextEl: next,
            }"
        :effect="'creative'"
        :creative-effect="{
              prev: {
                shadow: false,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }"
    >
      <template v-if="pictures.length >= 1" >
        <SwiperSlide v-for="(slide, index) in pictures" :key="index">
          <img v-if="slide.resizedPath" :class="[sliderClasses, 'swiper-detail__slide h-full w-full bg-center bg-cover']" loading="lazy" :src="`${(config.UPLOAD_URL).replace('upload/','')}${slide.resizedPath}`" > 
          <picture v-else>
              <source :srcset='`${config.RESOURCE_URL}${slide.websrc}`'>
              <source :srcset='`${config.RESOURCE_URL}${slide.src}`'>
            <img loading="lazy" :class="[sliderClasses, 'swiper-detail__slide h-full w-full bg-center bg-cover']">
          </picture>
          
        </SwiperSlide>
      </template>
      <template v-else>
        <SwiperSlide>
          <svg :class="sliderClasses" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" x="0" y="0" viewBox="0 0 53 53" class=""><g><path fill="#ededed" d="M43.698 5.744v39.185a3.244 3.244 0 0 1-3.244 3.244H5.744A3.244 3.244 0 0 1 2.5 44.93V5.744A3.244 3.244 0 0 1 5.744 2.5h34.71a3.244 3.244 0 0 1 3.244 3.244z" data-original="#ededed" class=""></path><path fill="#00aeff" d="M7.051 7.097h32.096v29.677H7.051z" data-original="#00aeff" class=""></path><path fill="#1e2933" d="m26.646 36.76-12.635.014H7.05V29.45l2.405-3.676 3.068-4.703c.92-1.392 2.946-1.392 3.852 0l3.08 4.703.866 1.338z" data-original="#1e2933"></path><path fill="#f6cbba" d="m9.451 25.778 3.077-4.708a2.302 2.302 0 0 1 3.854 0l3.08 4.708-3.792 2.076a2.526 2.526 0 0 1-2.427 0z" data-original="#f6cbba" class=""></path><path fill="#2c3642" d="M39.147 29.45v7.31l-25.136.014 6.31-9.662 2.514-3.838 3.77-5.77c1.122-1.704 3.622-1.704 4.73 0l3.771 5.77h.013z" data-original="#2c3642" class=""></path><path fill="#f6cbba" d="m22.833 23.28 3.776-5.778c1.115-1.706 3.614-1.706 4.73 0l3.778 5.778-4.653 2.548a3.1 3.1 0 0 1-2.978 0z" data-original="#f6cbba" class=""></path><path fill="#ffc536" d="M22.826 13.506a3.373 3.373 0 0 1-3.365 3.375 3.366 3.366 0 0 1-3.364-3.375 3.364 3.364 0 1 1 6.73 0z" data-original="#ffc536"></path><path fill="#f34624" d="M47.877 47.886A8.928 8.928 0 0 1 35.253 35.26c3.495-3.495 9.148-3.495 12.634-.01 3.486 3.486 3.486 9.14-.01 12.635z" data-original="#f34624" class=""></path><path fill="#ffffff" d="M44.886 44.878a1.301 1.301 0 0 1-1.84 0l-1.47-1.469-1.475 1.476a1.301 1.301 0 0 1-1.84-1.84l1.475-1.476-1.476-1.476a1.301 1.301 0 1 1 1.84-1.84l1.477 1.475 1.469-1.469a1.301 1.301 0 1 1 1.84 1.84l-1.469 1.47 1.469 1.469a1.301 1.301 0 0 1 0 1.84z" data-original="#ffffff" class=""></path></g></svg>
        </SwiperSlide>
      </template>
    </Swiper>
    <div class="flex h-fit bottom-0 w-full z-10 justify-between items-center pb-5">
      <button v-if="pictures.length > 1" ref="prev" class="swiper-detail-prev"></button>
      <Swiper
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="[SwiperNavigation, SwiperEffectCreative, SwiperThumbs]"
          class="item-image swiper-detail__slide swiper-detail__thumbs-wrapper"
          :freeMode="true"
          :watchSlidesProgress="true"
          :slides-per-view="2"
          :space-between="13"
          :navigation="{
                prevEl: prev,
                nextEl: next,
              }"
          :breakpoints="{
        '480': {
          slidesPerView: 4
        },
        '780': {
          slidesPerView: 6
        },
        '1024': {
          slidesPerView: 3,
        },
        '1280': {
          slidesPerView: 4,
        },
        '1440': {
          slidesPerView: 5,
        },
      }"
      >
        <template v-if="pictures.length > 0">
          <SwiperSlide v-for="(slide, index) in pictures" :key="index">
            <img v-if="slide.resizedPath" :class="[sliderClasses, 'swiper-detail__thumbs bg-center bg-cover']" loading="lazy" :src="`${(config.UPLOAD_URL).replace('upload/','')}${slide.resizedPath}`" > 
            <picture v-else>
              <source :srcset='`${config.RESOURCE_URL}${slide.websrc}`'>
              <source :srcset='`${config.RESOURCE_URL}${slide.src}`'>
              <img  loading="lazy" :class="[sliderClasses, 'swiper-detail__thumbs bg-center bg-cover']" >
            </picture> 
          </SwiperSlide>
        </template>
        <template v-else>
          <SwiperSlide>
            <svg :class="sliderClasses" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" x="0" y="0" viewBox="0 0 53 53" class=""><g><path fill="#ededed" d="M43.698 5.744v39.185a3.244 3.244 0 0 1-3.244 3.244H5.744A3.244 3.244 0 0 1 2.5 44.93V5.744A3.244 3.244 0 0 1 5.744 2.5h34.71a3.244 3.244 0 0 1 3.244 3.244z" data-original="#ededed" class=""></path><path fill="#00aeff" d="M7.051 7.097h32.096v29.677H7.051z" data-original="#00aeff" class=""></path><path fill="#1e2933" d="m26.646 36.76-12.635.014H7.05V29.45l2.405-3.676 3.068-4.703c.92-1.392 2.946-1.392 3.852 0l3.08 4.703.866 1.338z" data-original="#1e2933"></path><path fill="#f6cbba" d="m9.451 25.778 3.077-4.708a2.302 2.302 0 0 1 3.854 0l3.08 4.708-3.792 2.076a2.526 2.526 0 0 1-2.427 0z" data-original="#f6cbba" class=""></path><path fill="#2c3642" d="M39.147 29.45v7.31l-25.136.014 6.31-9.662 2.514-3.838 3.77-5.77c1.122-1.704 3.622-1.704 4.73 0l3.771 5.77h.013z" data-original="#2c3642" class=""></path><path fill="#f6cbba" d="m22.833 23.28 3.776-5.778c1.115-1.706 3.614-1.706 4.73 0l3.778 5.778-4.653 2.548a3.1 3.1 0 0 1-2.978 0z" data-original="#f6cbba" class=""></path><path fill="#ffc536" d="M22.826 13.506a3.373 3.373 0 0 1-3.365 3.375 3.366 3.366 0 0 1-3.364-3.375 3.364 3.364 0 1 1 6.73 0z" data-original="#ffc536"></path><path fill="#f34624" d="M47.877 47.886A8.928 8.928 0 0 1 35.253 35.26c3.495-3.495 9.148-3.495 12.634-.01 3.486 3.486 3.486 9.14-.01 12.635z" data-original="#f34624" class=""></path><path fill="#ffffff" d="M44.886 44.878a1.301 1.301 0 0 1-1.84 0l-1.47-1.469-1.475 1.476a1.301 1.301 0 0 1-1.84-1.84l1.475-1.476-1.476-1.476a1.301 1.301 0 1 1 1.84-1.84l1.477 1.475 1.469-1.469a1.301 1.301 0 1 1 1.84 1.84l-1.469 1.47 1.469 1.469a1.301 1.301 0 0 1 0 1.84z" data-original="#ffffff" class=""></path></g></svg>
          </SwiperSlide>
        </template>
      </Swiper>
      <button v-if="pictures.length > 1" ref="next" class="swiper-detail-next"></button>
    </div>
  </div>
</template>

<style lang="postcss">
.swiper-detail {
    &__slide {
      @apply h-[200px] sm:h-[400px] lg:h-[380px] xl:h-[450px] rounded-md;
    }
    &__thumbs {
      @apply w-[90px] h-[60px] rounded-md;
      &-wrapper {
        @apply h-[60px] w-full;
      }
    }
    &-prev,&-next {
      @apply flex ;
      height: 30px;
      width: 30px;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      margin: 0px 4px;
    }
    &-prev {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='30' viewBox='0 0 20 30' fill='none'%3E%3Cpath d='M11.0665 14.6551L10.7381 15L11.0665 15.3448L19.3095 24L14.2857 29.275L0.690477 15L14.2857 0.725L19.3095 6.00001L11.0665 14.6551Z' stroke='%23E02D1F'/%3E%3C/svg%3E");
    }
    &-next {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='30' viewBox='0 0 20 30' fill='none'%3E%3Cpath d='M8.9335 14.6551L9.2619 15L8.9335 15.3448L0.690477 24L5.71429 29.275L19.3095 15L5.71433 0.725L0.690523 6.00001L8.9335 14.6551Z' stroke='%23E02D1F'/%3E%3C/svg%3E");
    }
    &__wrapper {
      height: 100% !important;
    }
}
</style>
