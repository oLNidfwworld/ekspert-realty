<script setup>
const isActive = ref(false)
let mainMenu = ref(null)
const { data: menuLinks} = await useFetch('/api/menuLinks')
</script>
<template>
    <div>
        <button class="block 2lg:hidden" @click="isActive = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 0 30 20" fill="none">
            <path d="M28.3333 16.6665H1.66669C0.746201 16.6665 0 17.4127 0 18.3332C0 19.2537 0.7462 19.9999 1.66669 19.9999H28.3333C29.2538 19.9999 30 19.2537 30 18.3332C30 17.4127 29.2538 16.6665 28.3333 16.6665Z" fill="#24252C"/>
            <path d="M28.3333 8.33325H12.4435C11.5231 8.33325 10.7769 9.07945 10.7769 9.99993C10.7769 10.9204 11.5231 11.6666 12.4435 11.6666H28.3333C29.2538 11.6666 30 10.9204 30 9.99993C30 9.07945 29.2538 8.33325 28.3333 8.33325Z" fill="#24252C"/>
            <path d="M28.3333 0H1.66669C0.746201 0 0 0.7462 0 1.66669C0 2.58717 0.7462 3.33337 1.66669 3.33337H28.3333C29.2538 3.33337 30 2.58717 30 1.66669C30 0.7462 29.2538 0 28.3333 0Z" fill="#24252C"/>
          </svg>
        </button>
      <teleport to="body">
      <transition>
        <div class="menu" ref="mainMenu" v-if="isActive === true">
          <ul class="menu__list">
            <li class="menu__item"><button class="menu__btn" @click="isActive = false">Продолжить</button></li>
            <li class="menu__item" v-for="(link,index) in menuLinks.links" :key="index">
              <NuxtLink :to="link.url" class="menu__btn">{{link.name}}</NuxtLink>
            </li>
          </ul>
        </div>
      </transition>
          <transition name="fade">
            <div class="flex w-full h-full fixed top-0 left-0 z-90 bg-black opacity-50" @click="isActive = false" v-if="isActive === true"></div>
          </transition>
        </teleport>
    </div>
</template>
<style lang="postcss" scoped>
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }


    .v-enter-from,
    .v-leave-to {
        transform: translate(100%,0);
    }
    .btn {
        @apply px-3 py-1 inline-flex items-center rounded-md;
    }
    .menu{
        @apply flex justify-center items-center fixed bg-opacity-40 top-0 right-0 w-full max-w-xs h-full backdrop-blur-sm;

        background: var(--white);
        transform-style: preserve-3d;
        perspective: 100px;
        z-index:99;
        &__list{
            @apply grid grid-cols-1 gap-3 opacity-100 text-black;
        }
        &__item{
            @apply text-3xl my-1 text-black font-bold relative px-3 py-1 w-fit;
            transform-style: preserve-3d;
            transition: all 0.1s ease-in-out;
            &:hover {
               transform: scale(1.5);
            }
        }
        &__item &__btn{
            @apply z-10 rounded-tr-md rounded-bl-md font-bold;
            color: var(--red);
        }

    }
    .router-link-active.router-link-exact-active.menu__btn{
        &::before{
        }
        &::after{
        }

    }
</style>
