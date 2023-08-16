<script setup>
import EBtn from "../../components/Base/E-btn.vue";
import PictureDetailSlider from "../../components/Catalog/PictureDetailSlider.vue";
import EInput from "../../components/Base/E-input.vue";
import Favorite from "../../components/Base/Favorite.vue";
import ProductCard from "../../components/Catalog/ProductCard.vue";
import {useApiFetch, useApiFetchWithRefresh} from "../../composables/api";
import PhoneDetailBtn from "../../components/Base/PhoneDetailBtn.vue";
import {useFilterStore} from "../../store/smartFilter";
import {computed} from "vue";
const route = useRoute()
const { data: product, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog/${route.params.immovableCode}/`)
)
const price = computed(() => product.value.item.price.toLocaleString('ru-RU'))
const filter = useFilterStore()
const houseType = computed(() => {
  return Array.isArray(product.value.item.houseType)? product.value.item.houseType[0] : product.value.item.houseType
})
const print = () => {
  window.print()
}

const myPhone = ref('')
const validation = ref(false),validationMessage = ref('');
const show = ref(false),title = ref(''), content = ref('');
const callbackMe = async () => {

  if(myPhone.value.length < 17){
    validationMessage.value = 'Неверный формат номера телефона'
    validation.value = false;
  }else{
    validation.value = true;
    validationMessage.value = ''
  }

  if (validation.value) {
    const {data: res} = await useApiFetchWithRefresh('/Mail/', {
      method: 'POST',
      params: {
        action: 'DETAIL_FORM_CALLBACK',
        phone: myPhone.value,
        TITLE: `Заявка на обратный звонок по объекту ${product.value.item.productId} ${product.value.item.name}`,
      }
    })
    show.value = true;
    if(res.value.status){
      title.value = 'Заявка успешно отправленна!'
      content.value = 'Мы свяжемся с вами'
    }else{
      title.value = 'Ошибка'
      content.value = 'Произошла непредвиденная ошибка'
    }
  }
}
useHead({
  title: product.value.item.name,
  meta: [
    { name: 'description', content: product.value.item.name }
  ],
})
console.log(product.value)
</script>
<template>
  <div class="grid gap-10 catalog-item__detail-wrapper">
    <div class="grid gap-10 catalog-item__detail">
      <div class="grid catalog-item__detail">
        <ClientOnly>
          <PictureDetailSlider sliderClasses="" :pictures="product.item.photos"/>
        </ClientOnly>
      </div>
      <div>
        <div class="catalog-item__detail-top">
          <div>
            <!--          Просмотров: <span class="font-bold">N</span>-->
          </div>
          <div>
            id: {{product.item.productId}}
          </div>
        </div>
        <h1 class="font-bold">{{product.item.name}}</h1>
        <ClientOnly>
          <span class="text-2xl text-red font-bold">{{price}} ₽</span>
        </ClientOnly>
        <p class="font-semibold">{{product.item.location}}</p>
        <ul class="bg-grey-light grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2 py-3">
          <li class="flex flex-col">
            <span>
              Комнат
            </span>
            <span class="font-bold">
              {{product.item.roomsCount}}
            </span>
          </li>
          <li class="flex flex-col">
            <span>
              Общая пл.
            </span>
            <span class="font-bold">
              {{product.item.square}}
            </span>
          </li>
          <li class="flex flex-col">
            <span>
              Жилая пл.
            </span>
            <span class="font-bold">
              {{product.item.livingSquare}}
            </span>
          </li>
          <li class="flex flex-col">
            <span>
              Пл. кухни
            </span>
            <span class="font-bold">
              {{product.item.kitchenSquare}} м2
            </span>
          </li>
          <li class="flex flex-col">
            <span>
              Этаж
            </span>
            <span class="font-bold">
              {{product.item.houseFloor}} из {{product.item.floorCount}}
            </span>
          </li>
        </ul>
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2 py-3 mb-2">
          <li class="flex flex-col">
            <span>
              Балкон/лоджия
            </span>
            <span class="font-bold">
              {{product.item.balcony}}
            </span>
          </li>
          <li class="flex flex-col">
            <span>
              Тип дома
            </span>
            <span class="font-bold">
              {{houseType}}
            </span>
          </li>
          <li class="flex flex-col">
            <span>
              Сан. узел
            </span>
            <span class="font-bold">
              {{product.item.bathroom}}
            </span>
          </li>
        </ul>
        <div class="flex flex-col md:flex-row justify-between gap-4">
          <div class="flex flex-col sm:flex-row md:flex-col flex-shirk flex-wrap grid-cols-1 gap-4 w-full mb-8">
            <ClientOnly>
              <Favorite class="btn-grey btn border-red text-red p-3 btn-grey sm:w-fit md:w-full btn-grey" :enableText="true" :product-id="product.item.id"/>
              <e-btn @click="filter.filterItemById(product.item.id)" :to="{ path:'/map'}" class="btn-grey sm:w-fit md:w-full"><nuxt-icon class="text-red mr-2" width="30px" height="30px" name="MapMarker"/> На карте</e-btn>
              <e-btn class="btn-grey sm:w-fit md:w-full" @click="print"><nuxt-icon class="text-red mr-2" width="30px" height="30px" name="Print"/>Версия для печати</e-btn>
            </ClientOnly>
          </div>
          <div class="bg-concrete grid grid-cols-1 font-semibold pt-2 md:w-full">
            <span class="font-bold mb-3 justify-self-center px-5">Специалист по объекту</span>
            <div class="flex flex-col justify-between px-5">
              <PhoneDetailBtn :agentData="product.item.agent"/>
              <label class="mb-3">Оставьте свой номер,мы вам перезвоним</label>
              <ClientOnly>
                <e-input class="mb-2" mask="+{7} 000 000-00-00" v-model="myPhone" placeholder="+7(___) ___-__-__"/>
              </ClientOnly>
            </div>
            <p class="text-center mb-2 text-red">
              {{ validationMessage }}
            </p>
            <e-btn class="btn-red font-bold" @click="callbackMe">Позвоните мне</e-btn>
          </div>
        </div>
      </div>
      {{product.item.detailText}}
    </div>
    <div v-if="product.item.coordinates.lat && product.item.coordinates.lon">
      <ClientOnly >
        <YandexMap  :coordinates="[product.item.coordinates.lat, product.item.coordinates.lon]">
          <!--Markers-->
          <YandexMarker :coordinates="[product.item.coordinates.lat, product.item.coordinates.lon]" :options="{
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/ekspertMarker.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-25,-55]
          }" :marker-id="product.item.id">
            <template #component>
              {{product.item.location}}
            </template>
          </YandexMarker>
        </YandexMap>
      </ClientOnly>
    </div>
    <section>
      <h2 class="mb-3 font-bold text-3xl">Похожие объявления</h2>
      <div class="grid grid-cols-1 gap-5">
        <ClientOnly>
          <ProductCard v-for="(similarItem, index) in product.similarItems" :product="similarItem" :key="index"/>
        </ClientOnly>
      </div>
    </section>
    <e-popup-form :is-visible="show"  @close="show = !show">
      <template v-slot:header>
        {{ title }}
      </template>
      <template v-slot:content>
        <p class="text-center">
          {{ content }}
        </p>
      </template>
    </e-popup-form>
  </div>
</template>

<style>
.yandex-container {
  height: 400px !important;
  width: 100% !important;
  overflow: hidden;
}
.catalog {
&-item {
&__detail {
   @apply grid-cols-1;
&-top {
   @apply flex w-full justify-between;
 }
}
}
}
.yandex-balloon {
  height: 80px;
  width: 200px;
}
@media screen and (min-width: 1024px) {
  .catalog {
&-item {
&__detail {
   grid-template-columns: fit-content(100%) 1fr;
 }
}
}
}
</style>
