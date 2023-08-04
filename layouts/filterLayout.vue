<script setup>
// vue transition bug handle
import {useFilterStore} from "../store/smartFilter";
import ProductCard from "../components/Catalog/ProductCard";

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
const filter = useFilterStore()
</script>
<template>
    <div class="page-wrapper">
        <TheHeader/>
            <div class="content-wrapper">
                <ClientOnly>
                <Filter/>
                  <section v-if="filter.filterResult.items.length > 0">
                    <ProductCard v-for="(item, index) in filter.filterResult.items" :product="item" :key="index"/>
                  </section>
                </ClientOnly>
                <main class="container">
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
.content-wrapper {
  @apply relative mb-20;
  padding-top:90px;
}
.page-left-enter-active,
.page-right-enter-active,
.page-left-leave-active,
.page-right-leave-active{
  @apply absolute top-0 left-0 right-0 bottom-0;
  transition: all .3s linear;
}
.page-left-enter-to,
.page-right-enter-to {
  transform: translateX(0);
}
.page-left-leave-to, .page-right-enter-from {
  transform: translateX(-100%);
}
.page-left-enter-from,
.page-right-leave-to{
  transform: translateX(100%);;
}
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
    @apply w-[30px] h-[30px] bg-red flex justify-center items-center rounded-md mx-5;
}
.swiper-next:after {
  @apply text-white;
  content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDcgMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yLjcwNzExIDAuNzA3MTA5QzIuMzE2NTggMC4zMTY1ODQgMS42ODM0MiAwLjMxNjU4NCAxLjI5Mjg5IDAuNzA3MTA4TDAuNzA3MTA1IDEuMjkyOUMwLjMxNjU4MSAxLjY4MzQyIDAuMzE2NTgxIDIuMzE2NTkgMC43MDcxMDQgMi43MDcxMUwyLjI5Mjg5IDQuMjkyOUMyLjY4MzQyIDQuNjgzNDMgMi42ODM0MiA1LjMxNjU5IDIuMjkyODkgNS43MDcxMUwwLjcwNzEyMSA3LjI5Mjg5QzAuMzE2NTk4IDcuNjgzNDEgMC4zMTY1OTggOC4zMTY1OCAwLjcwNzEyMSA4LjcwNzFMMS4yOTI5MSA5LjI5Mjg5QzEuNjgzNDMgOS42ODM0MiAyLjMxNjYgOS42ODM0MiAyLjcwNzEyIDkuMjkyODlMNi4yOTI4OSA1LjcwNzExQzYuNjgzNDIgNS4zMTY1OSA2LjY4MzQyIDQuNjgzNDMgNi4yOTI4OSA0LjI5MjlMMi43MDcxMSAwLjcwNzEwOVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=');
}
.swiper-prev:after {
  @apply text-white;
  content: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDcgMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00LjI5Mjg5IDkuMjkyODlDNC42ODM0MiA5LjY4MzQyIDUuMzE2NTggOS42ODM0MiA1LjcwNzExIDkuMjkyODlMNi4yOTI5IDguNzA3MUM2LjY4MzQyIDguMzE2NTggNi42ODM0MiA3LjY4MzQxIDYuMjkyOSA3LjI5Mjg5TDQuNzA3MTEgNS43MDcxQzQuMzE2NTggNS4zMTY1NyA0LjMxNjU4IDQuNjgzNDEgNC43MDcxMSA0LjI5Mjg5TDYuMjkyODggMi43MDcxMUM2LjY4MzQgMi4zMTY1OSA2LjY4MzQgMS42ODM0MiA2LjI5Mjg4IDEuMjkyOUw1LjcwNzA5IDAuNzA3MTA4QzUuMzE2NTcgMC4zMTY1ODMgNC42ODM0IDAuMzE2NTg0IDQuMjkyODcgMC43MDcxMDlMMC43MDcxMDQgNC4yOTI4OUMwLjMxNjU4MSA0LjY4MzQxIDAuMzE2NTgxIDUuMzE2NTcgMC43MDcxMDQgNS43MDcxTDQuMjkyODkgOS4yOTI4OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=');
}
</style>
