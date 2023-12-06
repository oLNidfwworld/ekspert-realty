<script setup>
import EMultiselector from "../Base/E-multiselector";
import EMultiinput from "../Base/E-multiinput";
import {watch} from "vue";
import EBtn from "../Base/E-btn";
import {useFilterStore} from "../../store/smartFilter";
const filter = useFilterStore()
const { data: filterParams } = await useFetch('/api/flatsFilter')
const isAdditionalPropsActive = ref(false)


const route = useRoute();
const isMapHref = computed(()=>{
  return route.path.split('/')[1] !== 'map'
}) 
const resultCount =  ref(null);
const isWaitingForCount = ref(false);
const debouncedFn =   useDebounceFn(async (newVal) => { 
    resultCount.value = await filter.getFilterShitCount(newVal);
    isWaitingForCount.value = false;
  }, 1500)
watch(filterParams.value.filter,  (newVal) => {
  isWaitingForCount.value = true
  debouncedFn(newVal) 
})

const selectedVars = computed(() => {
  let values = {};
  
  filterParams.value.filter.map(category => { 
    if(category.type === "multiInput"){
      if(category.value?.min || category.value?.max){
          values[category.name] ={
          id : category.name,
          name : category.label,
          type: category.type,
          values : {min: category.value?.min,max: category.value?.max}
        }
      } 
    }else if(category.type === "multiSelect"){
      if(Array.isArray(category.value))
        category.value.map(categoryVal => {
          if(values[category.name]){
            values[category.name].values.push(category.data.find(x=> x.value === categoryVal));
          }else{
            values[category.name] ={
              id : category.name,
              type : category.type,
              name : category.label,
              values : [category.data.find(x=> x.value === categoryVal)]
            }
          }
        }) 
    }else {

      if(Array.isArray(category.value))
        category.value.map(categoryVal => {
          if(values[category.name]){
            values[category.name].values.push(categoryVal);
          }else{
            values[category.name] ={
              id : category.name,
              type : category.type,
              name : category.label,
              values : [categoryVal]
            }
          }
        })
    }
  })  
  return values;
}) 
const removeSelected = ( itemId, itemType, itemToDel ) => { 

  const obj = filterParams.value.filter.find( x => x.name === itemId );
  const indexObj = filterParams.value.filter.indexOf(obj);

  if(itemType === 'multiSelector' ||  itemType === 'multiSelect') { 
    
    const valueObj = filterParams.value.filter[indexObj].value.find( x => x.name === itemToDel);    
    const indexValueObj = filterParams.value.filter[indexObj].value.indexOf(valueObj); 

    filterParams.value.filter[indexObj].value.splice(indexValueObj, 1)
  } else if ( itemType === 'multiInput' ) {

     
    if(itemToDel === 'min'){
      filterParams.value.filter[indexObj].value.min = ''
    } else if (itemToDel === 'max'){
      filterParams.value.filter[indexObj].value.max = ''
    }  
  }  
}
</script>
<template>
  <div>  
  <ClientOnly>
    <div class="filter__main-block">
      <transition-group class="filter__main__props" name="list" tag="div" ref="propsContainer" >
        <div v-for="(component, index) in filterParams.filter" :is="component.type" :key="index" v-show="index < 5 || isAdditionalPropsActive">
          <e-multiselector v-if="component.type === 'multiSelector'" :selectedValues="component.value"  v-model:multiselectorValue="component.value" :label="component.label" :availableValues="component.data"/> 
          <e-multiinput v-if="component.type === 'multiInput'" :selectedValues="component.value" v-model:multiinputValue="component.value" :label="component.label" :min-val="component.data.min" :max-val="component.data.max"/>
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
                  <span v-for="(val, i) in values"> {{ val.name }}<span v-if="values.length-1 != values.indexOf(val)">,</span> </span> 
                </div>
              </template>
            </Multiselect>
          </div>
        </div>
      </transition-group>
      <div class="filter__main__bottom">
        <div class="filter__main__selected"> 
          <template class="filter__main__selected-item" v-for="(item,index) in selectedVars"  >  
            <template v-if="item.type === 'multiSelector'" v-for="(itemValue) in item.values"> 
              <div class="filter__main__selected-item">
                {{ item.name }}:  {{ itemValue.name }}

              <button @click="removeSelected(item.id, item.type, itemValue.name)">
                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_304_132)">
                <path d="M3.29249 4.50013L0.146589 1.35423C-0.0488625 1.15894 -0.0488625 0.842083 0.146589 0.646798C0.342041 0.451347 0.658565 0.451347 0.854016 0.646798L3.99992 3.7927L7.14598 0.646798C7.34144 0.451347 7.65796 0.451347 7.85341 0.646798C8.04886 0.842083 8.04886 1.15894 7.85341 1.35423L4.70734 4.50013L7.85341 7.64603C8.04886 7.84131 8.04886 8.15817 7.85341 8.35346C7.75569 8.45101 7.62761 8.49988 7.4997 8.49988C7.37179 8.49988 7.24371 8.45101 7.14598 8.35329L3.99992 5.20739L0.854016 8.35329C0.75629 8.45101 0.628213 8.49988 0.500302 8.49988C0.372392 8.49988 0.244315 8.45101 0.146589 8.35329C-0.0488625 8.158 -0.0488625 7.84115 0.146589 7.64586L3.29249 4.50013Z" fill="#2D6D6D"/>
                </g>
                <defs>
                <clipPath id="clip0_304_132">
                <rect width="8" height="8" fill="white" transform="matrix(-1 0 0 1 8 0.5)"/>
                </clipPath>
                </defs>
                </svg>

              </button>
              </div>
            </template> 
            <template v-else-if="item.type === 'multiInput'" > 
              <div v-if="item.values.min" class="filter__main__selected-item">
                {{ item.name }}: от {{ (item.values.min).toLocaleString('ru-RU') }} 
              <button @click="removeSelected(item.id, item.type, 'min')">
                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_304_132)">
                <path d="M3.29249 4.50013L0.146589 1.35423C-0.0488625 1.15894 -0.0488625 0.842083 0.146589 0.646798C0.342041 0.451347 0.658565 0.451347 0.854016 0.646798L3.99992 3.7927L7.14598 0.646798C7.34144 0.451347 7.65796 0.451347 7.85341 0.646798C8.04886 0.842083 8.04886 1.15894 7.85341 1.35423L4.70734 4.50013L7.85341 7.64603C8.04886 7.84131 8.04886 8.15817 7.85341 8.35346C7.75569 8.45101 7.62761 8.49988 7.4997 8.49988C7.37179 8.49988 7.24371 8.45101 7.14598 8.35329L3.99992 5.20739L0.854016 8.35329C0.75629 8.45101 0.628213 8.49988 0.500302 8.49988C0.372392 8.49988 0.244315 8.45101 0.146589 8.35329C-0.0488625 8.158 -0.0488625 7.84115 0.146589 7.64586L3.29249 4.50013Z" fill="#2D6D6D"/>
                </g>
                <defs>
                <clipPath id="clip0_304_132">
                <rect width="8" height="8" fill="white" transform="matrix(-1 0 0 1 8 0.5)"/>
                </clipPath>
                </defs>
                </svg> 
              </button>
              </div>
              <div v-if="item.values.max" class="filter__main__selected-item">
                {{ item.name }}: до {{ (item.values.max).toLocaleString('ru-RU') }} 
              <button @click="removeSelected(item.id, item.type, 'max')">
                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_304_132)">
                <path d="M3.29249 4.50013L0.146589 1.35423C-0.0488625 1.15894 -0.0488625 0.842083 0.146589 0.646798C0.342041 0.451347 0.658565 0.451347 0.854016 0.646798L3.99992 3.7927L7.14598 0.646798C7.34144 0.451347 7.65796 0.451347 7.85341 0.646798C8.04886 0.842083 8.04886 1.15894 7.85341 1.35423L4.70734 4.50013L7.85341 7.64603C8.04886 7.84131 8.04886 8.15817 7.85341 8.35346C7.75569 8.45101 7.62761 8.49988 7.4997 8.49988C7.37179 8.49988 7.24371 8.45101 7.14598 8.35329L3.99992 5.20739L0.854016 8.35329C0.75629 8.45101 0.628213 8.49988 0.500302 8.49988C0.372392 8.49988 0.244315 8.45101 0.146589 8.35329C-0.0488625 8.158 -0.0488625 7.84115 0.146589 7.64586L3.29249 4.50013Z" fill="#2D6D6D"/>
                </g>
                <defs>
                <clipPath id="clip0_304_132">
                <rect width="8" height="8" fill="white" transform="matrix(-1 0 0 1 8 0.5)"/>
                </clipPath>
                </defs>
                </svg>

              </button>
              </div>
            </template>
            <template v-else-if="item.type === 'multiSelect'" v-for="(itemValue) in item.values">   
              <div class="filter__main__selected-item">
                {{ itemValue.name }} 
              <button @click="removeSelected(item.id, item.type, itemValue)">
                <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_304_132)">
                <path d="M3.29249 4.50013L0.146589 1.35423C-0.0488625 1.15894 -0.0488625 0.842083 0.146589 0.646798C0.342041 0.451347 0.658565 0.451347 0.854016 0.646798L3.99992 3.7927L7.14598 0.646798C7.34144 0.451347 7.65796 0.451347 7.85341 0.646798C8.04886 0.842083 8.04886 1.15894 7.85341 1.35423L4.70734 4.50013L7.85341 7.64603C8.04886 7.84131 8.04886 8.15817 7.85341 8.35346C7.75569 8.45101 7.62761 8.49988 7.4997 8.49988C7.37179 8.49988 7.24371 8.45101 7.14598 8.35329L3.99992 5.20739L0.854016 8.35329C0.75629 8.45101 0.628213 8.49988 0.500302 8.49988C0.372392 8.49988 0.244315 8.45101 0.146589 8.35329C-0.0488625 8.158 -0.0488625 7.84115 0.146589 7.64586L3.29249 4.50013Z" fill="#2D6D6D"/>
                </g>
                <defs>
                <clipPath id="clip0_304_132">
                <rect width="8" height="8" fill="white" transform="matrix(-1 0 0 1 8 0.5)"/>
                </clipPath>
                </defs>
                </svg>

              </button>
              </div> 
            </template>
          </template>
        </div>
        <div class="filter__main__bottom-right">
          <e-btn class="btn-map" @click="()=>{
            filter.filterThisShitForMap(filterParams.filter);
            navigateTo('/map');
            }"><nuxt-icon class="text-red mr-2" width="30px" height="30px" name="MapMarker"/> На карте</e-btn>
          <e-btn v-bind:inert="isWaitingForCount" class="btn-red" style="padding: 8px;" @click="(isMapHref)?filter.filterThisShit(filterParams.filter):filter.filterThisShitForMap(filterParams.filter)"> 
            <span>Показать</span> &nbsp;
            <span v-if="!isWaitingForCount"> {{ resultCount }}</span> 
            <span class="waitingDots" v-else>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </e-btn>
          <e-btn class="btn-green filter__main-btn-extended" style="padding: 8px;" @click="isAdditionalPropsActive = !isAdditionalPropsActive">Расширенный фильтр</e-btn>
        </div>
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
.waitingDots span{
  position: relative;
}
.waitingDots span:nth-child(1){
  animation: fDot 1500ms linear 100ms infinite;
}
.waitingDots span:nth-child(2){
  animation: fDot 1500ms linear 300ms infinite;
}
.waitingDots span:nth-child(3){
  animation: fDot 1500ms linear 600ms infinite;
}
@keyframes fDot{
  0%{
    bottom: 0;
  }
  35%{
    bottom: 5px;
  }
  60%{
    bottom: 0;
  }
  100%{
    bottom: 0;
  }
}
.multiselect-multiple-label{
  max-width: 72%;
  overflow: hidden;
  text-wrap : nowrap;

}
.filter {
  &__main {
    &__selected{
      @apply flex flex-row gap-3 flex-wrap;
      &-item{
        @apply flex gap-2 items-center bg-grey p-[2px_8px] h-fit;
        border-radius: 5px;
      }
    }
    &-block {
      @apply bg-concrete text-base flex flex-col rounded-md relative;
      z-index: 10;
    }
    &__props {
      @apply flex flex-wrap  mb-5 w-full;
      gap:20px;
    }
    &__bottom {
      @apply grid grid-cols-[1fr_auto] justify-between w-full gap-[50px];
      & .btn:not(:last-child) {
        @apply md:mr-5 mb-5 md:mb-0;
      }
      &-right{
        @apply flex flex-row h-fit;
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
