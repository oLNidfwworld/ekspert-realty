<script setup>
import {ref, watch, watchEffect} from "vue"
  import EInput from '../components/Base/E-input'
import EBtn from "../components/Base/E-btn";
import {useApiFetchWithRefresh} from "../composables/api";

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
    <transition     name="appear">
      <keep-alive>
        <div v-if="isVisible"  @click.self="close($event)" class="popup__outer">
          <div class="popup">
            <div class="popup__wrapper">
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
        </div>
      </keep-alive>
    </transition>
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
