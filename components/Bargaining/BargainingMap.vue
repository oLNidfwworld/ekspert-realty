<script setup lang="ts"> 
import { YandexMap } from "vue-yandex-maps";
import EBtn from "~/components/Base/E-btn.vue";
import EInput from "~/components/Base/E-input.vue"; 
import ETextarea from "../../components/Base/E-textarea.vue";
import {useBargainingStore} from "~/store/bargaining"
const props = defineProps({
    mapCenter: Array,
    zoom: Number,
    placements: Object
})

const { data: foregroundLayout } = await useFetch('/api/foreground');




const mapInit = async (mapHandler) => {
    
    var objectManager = new ymaps.ObjectManager({});
    mapHandler.geoObjects.add(objectManager);
    objectManager.add(toRaw(foregroundLayout.value));
    toRaw(props.placements).items.map(item => {
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
    //   let btnLookout = document.querySelector('.ballon .lookout')
      if(btnOrder){
        btnOrder.addEventListener('click',()=>{
            makeOrder(btnOrder.dataset.id);
        })
      }
    //   if(btnLookout){
    //     btnLookout.addEventListener('click',()=>{
    //         lookOut(btnLookout.dataset.id);
    //     })
    //   }
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
const balloonContentTemplate = (name, square, stat, price) => {
    if (stat.CODE === 'SELLED' || stat.CODE === 'RESERVED') {
        return `

  <div class="ballon" >

      <div class="ballon__wrapper">

          <div class="ballon__title">Участок номер ${name}</div>
          <ul class="ballon__list">
              <li><span>Стоимость :</span><span>${price} ₽</span></li>
              <li><span>Площадь :</span><span>${square} соток</span></li>
              <li><span>Статус :</span><span class="stat_${stat.CODE}">${stat.NAME}</span></li>
          </ul> 
      </div>

  </div>

  `
    } else {
        return `

  <div class="ballon" >

      <div class="ballon__wrapper">

          <div class="ballon__title">Участок номер ${name}</div>
          <ul class="ballon__list">
              <li><span>Стоимость :</span><span>${price} ₽</span></li>
              <li><span>Площадь :</span><span>${square} соток</span></li>
              <li><span>Статус :</span><span class="stat_${stat.CODE}">${stat.NAME}</span></li>
          </ul>
          <div class="flex flex-row">
            
            
            <button   data-id="${name}" class="btn border-red text-red p-3 mt-3 btn-red makeOrder">Заказать</button> 
        
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
  const {NAME : placementName} = props.placements.items.find(x => x.NAME == id);
  whatsObject.value = placementName;
  isPopupVisible.value = true;
}

const router = useRouter(), route = useRoute();
const useBarg = useBargainingStore()
const lookOut =  (id : String) => {
    
    const myObj = props.placements.items.find(x => x.NAME == id);
    router.push({path: route.path, query: { ...route.query, objectId: myObj.NAME} });
    useBarg.setLookOutObject(myObj) 
  
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

</script>
<template>
    <div>
        <ClientOnly>
            <div class="bargaining-wrapper">
                <YandexMap @created="mapInit" :controls="[]" :coordinates="mapCenter" :zoom="zoom">
                </YandexMap>
                <div class="history">
                    <h2 class="text-[20px] font-bold mb-[15px]">Условные обозначения</h2>
                    <ul class="history__wrapper">
                        <li><span class="history__col" style="background:var(--reserved);"></span> Зарезервированно</li>
                        <li><span class="history__col" style="background:var(--selled);"></span> Продано</li>
                        <li><span class="history__col" style="background:var(--sellable);"></span> В продаже</li>
                    </ul>
                </div>
                <h1 class="title auto-place">Продажа земельных участокв МКР Трубицыно</h1>
            </div>
        </ClientOnly>

        <e-popup-form :fallback-income="fallback" :is-visible="isPopupVisible" @fallback-return="fallback = false"
            @close="isPopupVisible = !isPopupVisible">
            <template v-slot:header>
                <h3 class="">Заказать участок {{ whatsObject }}</h3>
            </template>
            <template v-slot:content>
                <form @submit.prevent="sendData($event)">
                    <div class="grid gap-4 mb-4">
                        <e-input v-model="userName" required placeholder="Имя*"></e-input>
                        <e-input mask="+{7} {9}00 000-00-00" type="phone" v-model="userPhone" required
                            placeholder="Телефон*"></e-input>
                        <e-input type="email" v-model="userEmail" placeholder="Email"></e-input>
                        <ETextarea style="resize: none;" rows="5" v-model="userComment" placeholder="Комментарий" />
                    </div>
                    <div class="text-red text-[14px] mb-3">
                        {{ validationMessage }}
                    </div>
                    <e-btn type="submit" class="m-auto ">Отправить</e-btn>
                </form>
            </template>
            <template v-slot:response>
                <h4 class="text-[24px] font-semibold">
                    {{ responseMsg }}
                </h4>
            </template>
        </e-popup-form>
    </div>
</template>
<style></style>
