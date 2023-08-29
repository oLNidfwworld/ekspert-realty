<script setup>

  import {useApiFetch} from "~/composables/api";
  import {navigateTo, useFetch} from "#app";
  import directive from "vue-imask/esm/directive";
  import PictureSlider from "~/components/Catalog/PictureSlider.vue";
  import EBtn from "~/components/Base/E-btn.vue";
  import {ref, watch} from "vue";
  import {useRoute, useRouter} from "nuxt/app";
  import {useSearchStore} from "~/store/search";

  const router = useRouter();
  const route = useRoute();

  const filterStore = useSearchStore();
  const searchShow = ref(false);
  const isResult = ref(true);
  const searchValue = ref('');
  let allData = ref([])

  const searchOnInput = useThrottleFn(async (e) => {
    allData.value = await useApiFetch(`/CatalogSearch/${searchValue.value}`, {
      method: 'POST'
    })
  }, 1200)

  const goToDetail = async ()=>{
    searchShow.value = !searchShow.value
    filterStore.clearResult();
    await filterStore.pullToArray(toRaw(allData.value.items),searchValue.value);
    navigateTo('/search');
  }
  watch(searchValue,()=>{
    if(searchValue.value === ""){
      isResult.value = false;
    }else{
      isResult.value = true;
    }
  })

  console.log(allData)
</script>
<template>
  <div>
    <div class="cursor-pointer" @click = ' searchShow = !searchShow '>
      <transition-group class="relative w-[20px] h-[20px]"  name="fade" tag="div" mode="out-in">
        <div class="absolute" v-if="!searchShow">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8.2437 16.4718C3.70241 16.4718 0.0078125 12.7772 0.0078125 8.23588C0.0078125 3.69459 3.70241 0 8.2437 0C12.785 0 16.4796 3.69459 16.4796 8.23588C16.4796 12.7772 12.785 16.4718 8.2437 16.4718ZM8.2437 1.5613C4.56331 1.5613 1.56912 4.5555 1.56912 8.23588C1.56912 11.9163 4.56331 14.9105 8.2437 14.9105C11.9241 14.9105 14.9183 11.9163 14.9183 8.23588C14.9183 4.5555 11.9241 1.5613 8.2437 1.5613ZM19.7639 19.7713C20.0688 19.4665 20.0688 18.9722 19.7639 18.6673L16.2705 15.1739C15.9656 14.869 15.4713 14.869 15.1665 15.1739C14.8616 15.4788 14.8616 15.9731 15.1665 16.2779L18.6599 19.7713C18.8123 19.9238 19.0121 20 19.2119 20C19.4117 20 19.6114 19.9238 19.7639 19.7713Z" fill="#E02D1F"/>
          </svg>
        </div>
        <div class="absolute" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="20" height="20" x="0" y="0" viewBox="0 0 320.591 320.591" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" fill="#E02D1F" data-original="#000000" class=""></path><path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" fill="#E02D1F" data-original="#000000" class=""></path></g></svg>
        </div>
      </transition-group>
    </div>
    <teleport to="body">
      <transition name="dropdown">
        <div class="w-full bg-white  z-[89] top-[90px] fixed  h-fit" v-show="searchShow" >
          <div class="w-[90%] m-auto pt-2 pb-2" >
            <ClientOnly>
              <input  placeholder="> Поиск" class="search-field" type="text" @keyup.enter="goToDetail" @input="searchOnInput" v-model="searchValue"/>
            </ClientOnly>
            <transition name="expand">
              <div v-show="searchShow && isResult" class="search-results">
                <div class="search-results-item" v-if="allData" v-for="item in allData.items"  >
                  <div class="grid gap-4 xl:grid-cols-[auto,1fr,1fr]">
                    <nuxt-link @click="searchShow= !searchShow" :to='`/realty/immovable-${item.id}`'>
                      {{ item.name }}
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="w-full h-full bg-[#00000082]  fixed z-[88]" v-show="searchShow"></div>
      </transition>
    </teleport>
  </div>
</template>
<style scoped>
  .search-field{
    @apply w-full h-[60px] px-[20px] m-auto;
    border: 1px solid var(--black);
    z-index: 10;
    top: 90px;

  }

  .expand-enter-from,
  .expand-leave-to{
    max-height: 0 !important;
  }
  .expand-enter-to,
  .expand-leave-from{
    max-height: 800px !important;
  }
  .expand-enter-active,
  .expand-leave-active{
    transition: 0.3s;
    overflow: hidden !important;
  }


  .dropdown-enter-from,
  .dropdown-leave-to{
    transform:translateY(-90px);
  }

  .dropdown-enter-to,
  .dropdown-leave-from{
    transform:translateY(0);
  }


  .dropdown-enter-active,
  .dropdown-leave-active,
  .fade-leave-active{
    transition: 0.3s;
  }



  .search-results{
    @apply bg-white w-full md:px-[20px] overflow-y-scroll max-h-[800px];

    &-item{
      @apply my-[10px];
     }
  }


</style>