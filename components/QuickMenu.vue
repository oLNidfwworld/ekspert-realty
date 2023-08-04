<script setup>
import {onMounted} from "../.nuxt/imports";

const props = defineProps({
    menu: {
    type: Object,
    required: true,
    default: {}
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
})
const isLargeScreen = await useMediaQuery('(min-width: 780px)')
const isExtended = ref(!isLargeScreen.value);
const showMenu = computed(() => isLargeScreen.value || isExtended.value)
onMounted(() => {
  isExtended.value = !useMediaQuery('(min-width: 780px)')
})
/*todo: отображение меню на мобилке и пк */
</script>
<template>
  <div class="quick-menu" :class="{'quick-menu--extended': isExtended}">
    <h3 class="quick-menu__title" @click="isExtended = !isExtended">
      <span>{{title}}</span>
      <nuxt-icon v-show="!isLargeScreen" class="text-red h-fit" name="arrow-down"/>
    </h3>
    <transition name="left-right-slide" mode="in-out" v-show="showMenu">
      <ul class="quick-menu__items-wrapper" v-show="showMenu">
        <li class="quick-menu__item" v-for="(link, index) in menu" :key="index">
          <NuxtLink :to="{path: link.url}">{{link.name}}</NuxtLink>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.quick-menu {
  @apply bg-concrete text-sm w-fit rounded-md w-full overflow-hidden h-fit md:h-full;
  transition: all .3s ease-in;
  padding: 20px 24px;
  &__title {
    @apply font-bold md:mb-2 flex justify-between;
    font-size: 15px;
  }
  &:hover {
    box-shadow: 0px 31px 27px -22px rgba(174, 29, 29, 0.25);
  }
  &__items{
    &-wrapper {
      @apply grid grid-cols-1;
    }
  }
  &--extended .nuxt-icon{
    transform: rotateZ(180deg);
  }
}
.left-right-slide-enter-active, .left-right-slide-leave-active, .left-right-slide-enter-active li, .left-right-slide-leave-active li {
  opacity: 1;
  transition: all .3s ease-in-out;
}
.left-right-slide-enter-from li:nth-child(even), .left-right-slide-leave-to li:nth-child(even) {
  transform: translateX(-50%);
  opacity: 0;
}.left-right-slide-enter-from li:nth-child(odd), .left-right-slide-leave-to li:nth-child(odd) {
  transform: translateX(50%);
  opacity: 0;
}
</style>
