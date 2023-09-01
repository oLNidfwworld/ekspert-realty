<script setup>
import EMultiselector from "../Base/E-multiselector";
import EMultiinput from "../Base/E-multiinput";
import EBtn from "../Base/E-btn";

import {useFilterStore} from "../../store/smartFilter";
const filter = useFilterStore()
const { data: filterParams } = await useFetch('/api/countryEstateFilter')
const isAdditionalPropsActive = ref(false)

const route = useRoute()
const isMapHref = computed(()=>{
  return route.path.split('/')[1] !== 'map'
})

</script>
<template>
  <div>
  <ClientOnly>
    <div class="filter__main-block">
      <transition-group class="filter__main__props" name="list" tag="div" ref="propsContainer" >
        <div v-for="(component, index) in filterParams.filter" :is="component.type" :key="index" v-show="index < 5 || isAdditionalPropsActive">
          <e-multiselector v-if="component.type === 'multiSelector'"  v-model:multiselectorValue="component.value" :label="component.label" :availableValues="component.data"/>
          <e-multiinput v-if="component.type === 'multiInput'" v-model:multiinputValue="component.value" :label="component.label" :min-val="component.data.min" :max-val="component.data.max"/>
          <div v-if="component.type === 'multiSelect'" class="w-fit">
            <label class="font-bold mb-1">{{component.label}}</label>
            <Multiselect class="e-multiselect"
                         name="name"
                         :options="component.data"
                         noOptionsText="Нет элементов для выбора"
                         v-model="component.value"
                         mode="multiple"
                         :hideSelected="false"
                         placeholder="Выбрать"
            >
              <template v-slot:option="{ option }">
                <span v-if="option.label">{{ option.label }}</span>
                <span v-else>{{ option.name }}</span>
              </template>
              <template v-slot:multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  Выбрано {{ values.length }}
                </div>
              </template>
            </Multiselect>
          </div>
        </div>
      </transition-group>
      <div class="filter__main__bottom">
        <e-btn class="btn-map" @click="()=>{
          filter.filterThisShitForMap(filterParams.filter);
          navigateTo('/map');
          }"><nuxt-icon class="text-red mr-2" width="30px" height="30px" name="MapMarker"/> На карте</e-btn>
        <e-btn class="btn-red" style="padding: 8px;" @click="(isMapHref)?filter.filterThisShit(filterParams.filter):filter.filterThisShitForMap(filterParams.filter)">Показать</e-btn>
        <e-btn v-if="filterParams.filter.length > 5" class="btn-green filter__main-btn-extended" style="padding: 8px;" @click="isAdditionalPropsActive = !isAdditionalPropsActive">Расширенный фильтр</e-btn>
      </div>
    </div>
    <div :class="[isAdditionalPropsActive ? 'filter__main__mobile-btn--active' : '', 'filter__main__mobile-btn']" @click="isAdditionalPropsActive = !isAdditionalPropsActive" v-if="filterParams.filter.length > 5">
      <span class="mr-3" >Расширенный фильтр</span>
      <nuxt-icon class="text-red" name="arrow-down"></nuxt-icon>
    </div>
  </ClientOnly>
  </div>
</template>
<style lang="postcss">
.filter {
  &__main {
  &-block {
     @apply bg-concrete text-base flex flex-col rounded-md relative;
     z-index: 10;
   }
  &__props {
     @apply flex flex-wrap items-end mb-5 w-full;
     gap:20px;
   }
  &__bottom {
     @apply flex flex-col md:flex-row justify-end w-full;
    & .btn:not(:last-child) {
        @apply md:mr-5 mb-5 md:mb-0
      }
  }
  &__mobile-btn {
     @apply w-full bg-grey justify-center flex items-center font-bold rounded-md md:hidden cursor-pointer;
     transition: all .3s ease-in-out;
     padding: 20px 14px 16px 14px;
     transform: translateY(-4px);
  &--active .nuxt-icon{
     transform: rotateZ(180deg);
   }
  }
  &-btn-extended {
     display: none !important;
   }
  }
}
@media screen and (min-width: 780px) {
  .filter__main-btn-extended {
    display: flex !important;
  }
}
.e-multiselect {
  width: 200px !important;
  height: 36px !important;
  min-height: 30px !important;
  border: 1px solid var(--grey);
}
.multiselect-option.is-selected,.multiselect-option.is-selected.is-pointed {
  background: var(--red) ;
}
.multiselect.is-active {
  box-shadow: var(--ms-border-width-active,var(--ms-border-width,1px)) solid var(--ms-border-color-active,var(--ms-border-color, rgba(219, 209, 214, 0.98)));
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
