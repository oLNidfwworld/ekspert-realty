<script setup>
import {ref, watch, watchEffect} from "vue" 

  const props = defineProps({
    isVisible : {
      Boolean,
      default : false,
    },
    fallbackIncome : {
      Boolean,
      default : false
    }
  })

  const emits = defineEmits(['close','fallback-return'])

  const close = (e) =>{
    emits('close')
  }

  watch(
      () => props.isVisible,
      (value, oldValue, onCleanup) => {
        emits('fallback-return');
      }
  )


</script>
<template>
  <teleport to="body">
        <div v-if="isVisible"  @click.self="close($event)" class="popup__outer">
    <transition     name="appear"> 
          <div v-if="isVisible" class="popup">
            <div class="popup__wrapper">
              <button @click="$emit('close')" class="absolute right-[5%] top-[5%] w-fit">
                <svg data-v-43bf210c="" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" x="0" y="0" viewBox="0 0 35 35" xml:space="preserve" class=""><g data-v-43bf210c=""><path data-v-43bf210c="" d="M28.814 30.064a1.247 1.247 0 0 1-.884-.367L5.3 7.07A1.249 1.249 0 0 1 7.07 5.3L29.7 27.93a1.251 1.251 0 0 1-.884 2.134z" fill="var(--black)" opacity="1" data-original="#000000" class=""></path><path data-v-43bf210c="" d="M6.186 30.064A1.251 1.251 0 0 1 5.3 27.93L27.93 5.3a1.25 1.25 0 0 1 1.77 1.77L7.07 29.7a1.247 1.247 0 0 1-.884.364z" fill="var(--black)" opacity="1" data-original="#000000" class=""></path></g></svg>
              </button>
              <transition mode="out-in" name="sliding">
                <div v-if="!fallbackIncome">
                  <div class="popup__header">
                    <slot name="header"></slot>
                  </div>
                  <div class="popup__content">
                    <slot name="content"></slot>
                  </div>
                </div>
                <div v-else>
                  <slot name="response"></slot>
                </div>
              </transition>
            </div>
          </div> 
    </transition>
        </div>
  </teleport>
</template>
<style lang="postcss">
/*lang="postcss"*/
  .popup{
    @apply w-fit h-fit m-auto fixed inset-0;
    &__{
      &outer{
        @apply w-full h-full fixed z-[91] top-0 left-0;
        background-color : rgba(0, 0, 0, 0.5);
      }
      &wrapper{
        @apply bg-white p-11;
      }
      &header{
         @apply text-black text-[24px] font-semibold mb-7;
       }
      &content{
         @apply  mb-7;
       }
    }
  }
  .appear-enter-active  ,.appear-leave-active  {
    transition: 0.3s;
    transition-delay: 0.2s;
  }
  .appear-enter-from ,.appear-leave-to  {
    opacity: 0;
  }
  .appear-enter-to  ,.appear-leave-from {
    opacity: 1;
  }

  .sliding-enter-active  ,.sliding-leave-active  {
    transition: 0.3s;
  }
  .sliding-enter-from  {
    opacity: 0;
    transform: translateX(-50px);
  }
  .sliding-leave-to{
    opacity: 0;
    transform: translateX(50px);
  }
.sliding-enter-to  ,.sliding--leave-from {
    opacity: 1;
    transform: translateY(0px);
  }
</style>
