
<script setup>
import EBtn from "../Base/E-btn";
import {computed} from "../../.nuxt/imports";
const props = defineProps(['blogElement','blogPic'])
const route = useRoute()

const config = useRuntimeConfig();
console.log(config)
</script>
<template>
  <div class="blog-card">
    <picture   v-if="blogPic?.url"  >  
      <source :srcset='`${config.RESOURCE_URL}${blogPic.url}`'>
      <img  class="blog-image" :alt="blogElement.NAME">
    </picture>
    <div class="blog-image opacity-10" v-else :style="`background:var(--grey-dark)`"></div>
    <div class="blog-text-wrapper">
      <div>
        <div class="blog-title"> {{ blogElement.NAME }} </div>
        <div class="blog-preview"> {{ blogElement.PREVIEW_TEXT }} </div>
      </div>
      <nuxt-link :to="{path: `/blog/${blogElement.CODE}/`}" class="blog-go-detail" >
        <span class="mr-2"> Показать </span>
        <svg width="22" height="8" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.3536 4.35355C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464466C17.9763 0.269204 17.6597 0.269204 17.4645 0.464466C17.2692 0.659728 17.2692 0.976311 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53553C17.6597 7.7308 17.9763 7.7308 18.1716 7.53553L21.3536 4.35355ZM0 4.5L21 4.5V3.5L0 3.5L0 4.5Z" fill="#E02D1F"/>
        </svg>

      </nuxt-link>
    </div>
  </div>
</template>


<style lang="postcss">
  .blog{
    &-card{
    @apply grid grid-rows-2 bg-grey-light;
    }
    &-text-wrapper{
      @apply flex flex-col justify-between;
      padding: 15px;
    }
    &-image{
      height:250px;
      object-fit: cover;
      width: 100%;
    }
     &-title{
      @apply font-bold mb-4;
      font-size:18px;
      }
    &-preview{
        @apply font-light text-grey-dark   ;
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 6; /* number of lines to show */
       line-clamp: 6;
       -webkit-box-orient: vertical;
       }
     &-go-detail{
        @apply text-red flex items-center mt-10 justify-end font-semibold cursor-pointer;
      }
  }
</style>