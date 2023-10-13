<script setup lang="ts">
import { YandexMap } from "vue-yandex-maps";
import EBtn from "~/components/Base/E-btn.vue";
import EInput from "~/components/Base/E-input.vue"; 
import ETextarea from "../../components/Base/E-textarea.vue";
import {watch} from "vue";
import {useSeoMeta} from "unhead";

definePageMeta({
    layout: "bargaining",
}) 
useSeoMeta(
    {
      title : 'Продажа земельных участокв МКР Трубицыно'
    }
)

const mapCenter = ref([55.77157346148135, 38.5848870091816, ])
const zoom = 17;
const { data: placements, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Bargaining/`)
); 

const getRandomArbitrary = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
}
 
const similarData  = computed(() => {
    // let max = toRaw(placements.value.items).reduce((acc, curr) => acc.id > curr.id  ? acc : curr).id;
    // let min = toRaw(placements.value.items).reduce((acc, curr) => acc.id < curr.id  ? acc : curr).id; 
    
    let data = [];
    for( let i= 0; i < 4; i++ ){  
        data.push(
            placements.value.items[Math.floor(Math.random()*placements.value.items.length)]
        );
    }
    return data;
}) 
const { data: foregroundLayout } = await useFetch('/api/foreground');


const mapInit = (mapHandler) => {

    var objectManager = new ymaps.ObjectManager({});
    mapHandler.geoObjects.add(objectManager);
    objectManager.add(toRaw(foregroundLayout.value));
    toRaw(placements.value).items.map(item => {
        let fillCol = ';'
        if(item.STATUS.CODE === 'SELLABLE'){
            fillCol = '#79cd79';
        }else if(item.STATUS.CODE === 'RESERVED'){
            fillCol = '#5762FF';
        }else if(item.STATUS.CODE === 'SELLED'){
            fillCol = '#e02d1f';
        }else{

        }
        objectManager.add({
            type: 'Feature',
            id: item.NAME,
            geometry: {
                type: 'Polygon',
                coordinates: [item.PLACE]
            },
            options: {
                fillColor: fillCol,
                strokeColor: '#6f7985',
                strokeWidth: 1,
            },
            properties: {
                hintContent: `Участок №${item.NAME}`, // Подсказка при наведении на полигон
                balloonContent: balloonContentTemplate(item.NAME, item.SQUARE, item.STATUS, item.PRICE)// Содержимое балуна
            }
        });

        let center = [
            (item.PLACE.reduce((a,b) => a + b[0], 0) / (item.PLACE.length )),
            (item.PLACE.reduce((a,b) => a + b[1], 0) / (item.PLACE.length ))
        ];
        var textPlacemark = new ymaps.Placemark(center, {
            iconContent: `<span class="polygon-text">${item.NAME}</span>` // Текст маркера
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/nil.png',
            iconOffset: [-10, -5],
            iconImageSize: [1, 1] // Размеры иконки (ширина, высота)
        });
        mapHandler.geoObjects.add(textPlacemark);
    })

    objectManager.objects.events.add('click', function (e) {
            var objectId = e.get('objectId');
            objectManager.objects.balloon.open(objectId);
        });
    objectManager.objects.events.add('balloonopen', () => {
      let btnOrder = document.querySelector('.ballon .makeOrder')
      let btnLookout = document.querySelector('.ballon .lookout')
      if(btnOrder){
        btnOrder.addEventListener('click',()=>{
            makeOrder(btnOrder.dataset.id);
        })
      }
      if(btnLookout){
        btnLookout.addEventListener('click',()=>{
            lookOut(btnLookout.dataset.id);
        })
      }
    })
    objectManager.add(toRaw(foregroundLayout.value));

    mapHandler.events.add('boundschange', function (event) {
        var newZoom = event.get('newZoom');
        var allGeoObjects = mapHandler.geoObjects;
        if(newZoom < 18){
            allGeoObjects.each(  function(geoObject) {
                if (geoObject instanceof ymaps.Placemark) {
                    geoObject.options.set('visible', false);
                }
            });
        }else{
            allGeoObjects.each(  function(geoObject) {
                if (geoObject instanceof ymaps.Placemark) {
                    geoObject.options.set('visible', true);
                }
            });
        }
    });
}
const balloonContentTemplate = (name, square,stat , price) => {
    if(stat.CODE === 'SELLED' || stat.CODE === 'RESERVED'){
      return `

      <div class="ballon" >

          <div class="ballon__wrapper">

              <div class="ballon__title">Участок номер ${name}</div>
              <ul class="ballon__list">
                  <li><span>Стоимость :</span><span>${price} ₽</span></li>
                  <li><span>Площадь :</span><span>${square}м<sup>2</sup></span></li>
                  <li><span>Статус :</span><span class="stat_${stat.CODE}">${stat.NAME}</span></li>
              </ul>
              <button  data-id="${name}" class="btn-blue   p-3 mt-3  btn lookout">Подробнее</button>
          </div>

      </div>

      `
    }else{
      return `

      <div class="ballon" >

          <div class="ballon__wrapper">

              <div class="ballon__title">Участок номер ${name}</div>
              <ul class="ballon__list">
                  <li><span>Стоимость :</span><span>${price} ₽</span></li>
                  <li><span>Площадь :</span><span>${square}м<sup>2</sup></span></li>
                  <li><span>Статус :</span><span class="stat_${stat.CODE}">${stat.NAME}</span></li>
              </ul>
              <div class="flex flex-row">
                
                
                <button   data-id="${name}" class="btn border-red text-red p-3 mt-3 btn-red makeOrder">Заказать</button>
                <button   data-id="${name}" class="btn-blue   p-3 mt-3 ml-3  btn lookout">Подробнее</button>
            
              </div>
          </div>

      </div>

      `
    }

}

const whatsObject = ref(undefined);

const userName = ref(''), userPhone = ref(''), userComment = ref(''), userEmail = ref('')

const fallback = ref(false), responseMsg = ref('');
const isPopupVisible = ref(false);
const validation = ref(false);
const validationMessage = ref('');

const makeOrder =  (id : String) => {
  const {NAME : placementName} = placements.value.items.find(x => x.NAME == id);
  whatsObject.value = placementName;
  isPopupVisible.value = true;
}

const lookOutObject = ref(null), scrollAnchor = ref(null);
const lookOut =  (id : String) => {
    
    scrollAnchor.value.scrollIntoView({ 
        behavior : 'smooth'
      })
   
  lookOutObject.value = placements.value.items.find(x => x.NAME == id); 
  
}
const sendData = async (e) => {

  if(userPhone.value.length < 17){
    validationMessage.value = 'Неверный формат номера телефона'
    validation.value = false;
  }else{
    validation.value = true;
    validationMessage.value = ''
  }

  if (validation.value) {
    await useApiFetchWithRefresh('/Mail/', {
      method: 'POST',
      params: {
        action: 'NEW_BARG',
        placement: whatsObject.value,
        phone: userPhone.value,
        name: userName.value,
        comment : userComment.value,
        email : userEmail.value
      }
    }).then((e)=>{
      if(e.data.value.status){
        responseMsg.value = e.data.value.msg
        fallback.value = true;
      }
    })
  }

}
watch(()=>userPhone,()=>{
  console.log(userPhone.value)
})
</script>
<template>
    <ClientOnly>
        <div class="bargaining-wrapper">
            <YandexMap @created="mapInit" :controls="[]" :coordinates="mapCenter" :zoom="zoom">
            </YandexMap>
            <div class="history">
                <h2 class="text-[20px] font-bold mb-[15px]">Условные обозначения</h2>
                <ul class="history__wrapper">
                    <li><span class="history__col" style="background:var(--reserved);"></span> Зарезервированно</li>
                    <li><span class="history__col"  style="background:var(--selled);"></span> Продано</li>
                    <li><span class="history__col"  style="background:var(--sellable);"></span> В продаже</li>
                </ul>
            </div>
            <h1 class="title auto-place">Продажа земельных участокв МКР Трубицыно</h1>
        </div>
    </ClientOnly>


    <div ref="scrollAnchor" class="container m-auto " :class="{ 'py-[150px]' : lookOutObject }"> 
        <BargainingPreview v-if='lookOutObject' :similar="similarData" :placement-object="lookOutObject"></BargainingPreview>
    </div>

        <e-popup-form :fallback-income="fallback"  :is-visible="isPopupVisible" @fallback-return="fallback=false" @close="isPopupVisible = !isPopupVisible" >
            <template v-slot:header>
                <h3 class="">Заказать участок {{ whatsObject }}</h3>
            </template>
            <template v-slot:content>
                <form @submit.prevent="sendData($event)">
                    <div class="grid gap-4 mb-4">
                        <e-input v-model="userName" required placeholder="Имя*"></e-input>
                        <e-input mask="+{7} {9}00 000-00-00" type="phone" v-model="userPhone" required placeholder="Телефон*"></e-input>
                        <e-input type="email" v-model="userEmail" placeholder="Email"></e-input>
                        <ETextarea style="resize: none;" rows="5" v-model="userComment" placeholder="Комментарий"/>
                    </div>
                    <div class="text-red text-[14px] mb-3">
                        {{ validationMessage }}
                    </div>
                    <e-btn type="submit" class="m-auto ">Отправить</e-btn>
                </form>
            </template>
            <template v-slot:response>
                <h4 class="text-[24px] font-semibold">
                {{  responseMsg  }}
                </h4>
            </template>
        </e-popup-form>
</template>
<style >
.bargaining-wrapper{
    @apply relative;
    & .yandex-container{
        height: 80vh !important;
    }
}
*{
    --reserved : rgb(87, 98, 255);
    --selled : #e02d1f;
    --sellable : #79cd79 ;
}
#map {
    height: 80vh !important;
}
.auto-place{
  @apply absolute text-[16px] sm:text-[24px] md:text-[30px] z-[3] top-5 left-0 right-0 m-auto w-fit bg-white py-2 px-4 text-center  sm:text-left;
  text-wrap : balance;
}
.history{
    @apply absolute z-[3] sm:left-[40px] bottom-[40px] bg-white p-5 left-0 right-0 sm:right-[unset] ;
            border: 1px solid #6f7985;
    &__wrapper{
        & li{
            @apply flex gap-4 mb-2;
        }

    }
        &__col{
            @apply block w-[70px] h-[20px];
            border: 1px solid #6f7985;
        }
}
.polygon-text{
    @apply text-[13px] text-white   ;
}
.yandex-container{
    height: 80vh;
}
.ballon {
    @apply w-[300px];

    &__wrapper{
        @apply py-5;
    }
    &__title {
        @apply text-[30px] font-bold mb-5;
    }

    &__desc {
        @apply text-[13px] font-bold mb-5;
    }

    &__list {
        @apply grid w-3/4;

        & li {
            @apply flex justify-between;

            & span:first-child {
                @apply font-bold;
            }
        }
        & .stat_SELLABLE{
            font-weight : 700;
            padding: 5px 10px;
            background-color: var(--sellable);
            color: var(--white);
        }
        & .stat_RESERVED{
            font-weight : 700;
            padding: 5px 10px;
            background-color: var(--reserved);
            color: var(--white);
        }
        & .stat_SELLED{
            font-weight : 700;
            padding: 5px 10px;
            background-color: var(--selled) ;
            color: var(--white);
        }
    }
}
</style>
