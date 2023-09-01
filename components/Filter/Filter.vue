<script lang="ts" setup>
import EBtn from "../Base/E-btn";
import EInput from "../Base/E-input";
import EMultiselector from "../Base/E-multiselector";
import EMultiinput from "../Base/E-multiinput";
import FilterFlats from "./FilterFlats";
import {useFilterStore} from "~/store/smartFilter";
import {useApiFetch} from "~/composables/api";
import  {Ref} from 'vue';
const filterFlats = resolveComponent('FilterFlats')
const filterCountryEstate = resolveComponent('FilterCountryEstate')
const filterCommerceEstate = resolveComponent('FilterCommerceEstate')
const estateType = <Ref>ref('Вторичная')
const estateFilter = computed(() => {
  if(estateType.value === 'Вторичная') {
    return filterFlats
  }
  if(estateType.value === 'Загородная') {
    return filterCountryEstate
  }
  if(estateType.value === 'Коммерческая') {
    return filterCommerceEstate
  }
})
const selectedObjectsType = ref([])
const filterPrice = ref(0)
const filter = useFilterStore()

const searchProduct = useThrottleFn(async (e) => {
  
  if(e.target.value.length > 3){
      searchResult.value = await useApiFetch('/CatalogObjectIdSearch/', {
      method: 'POST',
      params: { search: e.target.value}
    }) 
  }
}, 1000)
const searchResult = <Ref>ref(null)
const searchString = ref('')


const changeEstateType = (estateTypeValue : String,immovableTypeValue : String) : void =>{
  estateType.value = estateTypeValue
  filter.setFilterImmovableType(immovableTypeValue);
}


const route = useRoute();
const isMapHref = computed(()=>{
  if(route.path.split('/')[1] !== 'map'){
    return 'href'
  }else{
    return ''
  }
})
</script>
<template>
  <section class="filter__wrapper">
    <div class="container">
    <h1 class="filter__title">Купить квартиру в Павловском Посаде</h1>
      <div class="filter__type">
        <nuxt-link :[isMapHref]="`/realty/${filter.filterCity}/buy/`" @click="filter.setFilterServiceType('buy')" :class="[ filter.filterServiceType === 'buy'? 'filter__type--active': '', 'filter__type-item']">Купить</nuxt-link>
        <nuxt-link :[isMapHref]="`/realty/${filter.filterCity}/rent/`" @click="filter.setFilterServiceType('rent')" :class="[ filter.filterServiceType === 'rent'? 'filter__type--active': '', 'filter__type-item']">Арендовать</nuxt-link>
      </div>
      <div class="filter-top-wrapper">
        <div class="filter-estate__type">
          <nuxt-link :[isMapHref]="`/realty/${filter.filterCity}/${filter.filterServiceType}/vtorichka/`"  @click="changeEstateType('Вторичная','vtorichka')" :class="[ estateType === 'Вторичная'? 'filter__type--active': '', 'btn-grey font-bold py-3 px-4 rounded-md  text-sm']">Вторичная</nuxt-link>
          <nuxt-link :[isMapHref]="`/realty/${filter.filterCity}/${filter.filterServiceType}/zagorodnaya/`"  @click="changeEstateType('Загородная','zagorodnaya')" :class="[ estateType === 'Загородная'? 'filter__type--active': '', 'btn-grey font-bold py-3 px-4 rounded-md   text-sm']">Загородная</nuxt-link>
          <nuxt-link :[isMapHref]="`/realty/${filter.filterCity}/${filter.filterServiceType}/commerce/`"   @click="changeEstateType('Коммерческая','commerce')" :class="[ estateType === 'Коммерческая'? 'filter__type--active': '', 'btn-grey font-bold py-3 px-4 rounded-md text-sm']">Коммерческая</nuxt-link>

        </div>
        <div class="hidden md:flex max-w-[310px] flex-col relative">
          <e-input class="relative" type="text" v-model="searchString" @input="searchProduct" placeholder="Поиск по ID объекта"/>
          <ul class="bg-white py-2 absolute z-2 top-[38px]" style="z-index: 11;" v-if="searchString.length > 3 && searchResult.items">
            <li class="search-item px-3 my-2 hover:bg-grey" v-for="(item, index) in searchResult.items" :key="index">
              <NuxtLink :to="{path: `/realty/immovable-${item.id}`}">{{item.name}}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <component :is="estateFilter"/>
      </transition>
    </div>
  </section>
</template>
<style lang="postcss" >
.filter {
  &__wrapper {
    @apply flex justify-center bg-cover mb-5 w-full;
    background-image: url('./public/filter-bg.png');
    padding: 80px 0;
  }
  &__main{
    &-block {
      @apply bg-concrete text-base flex flex-wrap;
      padding: 24px;
    }
  }
  &__title {
    @apply font-bold text-4xl;
  }
  &__type {
    @apply flex bg-grey rounded-md font-bold w-full sm:w-fit mb-10 text-2xl md:text-3xl justify-between;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);
    padding: 4px;
    &-item {
      @apply rounded-md;
      transition: all .3s ease-in;
      padding: 4px 8px;
    }
    &--active {
      @apply bg-red text-white;
    }
  }
  &-top-wrapper {
    @apply flex justify-between w-full mb-1 text-sm;
  }
  &-estate {
    &__type {
    @apply flex flex-wrap;

    }
  }
}
.search {
  &-item{
    @apply hover:text-red;
   }
}
.filter-estate__type .btn-grey:not(:last-child){
  @apply sm:mr-1;
}
.filter-estate__type .btn-grey:first-child{
  @apply mr-1;
}
.filter-estate__type .btn-grey{
  flex:1;
  margin-bottom: 4px;
}
.fade-leave-active {
  transition: opacity 400ms ease;
}
.fade-enter-active {
  transition: opacity 600ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
