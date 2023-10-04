<script setup>
import { loadYmap, YandexClusterer, YandexPolyne, YandexMap, YandexMarker } from "vue-yandex-maps";

definePageMeta({
    layout: "bargaining",
})
const mapCenter = ref([55.786672, 38.551209])

const coordsPolygon = ref(
    [ 
        [
            55.78712965284174,
            38.55189675139603,
        ],
        [
            55.78702385912873,
            38.551880658141926,
        ],
        [
            55.787014791082754,
            38.552063048354945,
        ],
        [
            55.787123607494486,
            38.55207914160903,
        ],
        [
            55.78712965284174,
            38.55189675139603,
        ]
    ]
)
const mapInit = (mapHandler) => {


    
    // Создаем многоугольник
    const myPolygon = new ymaps.Polygon([coordsPolygon.value], {} , { 
        // Опции стиля полигона
        fillColor: '#00FF00',
        strokeColor: '#0000FF',
        strokeWidth: 2 
    });
 
    myPolygon.events.add('click', function (e) {  
        myPolygon.properties.set('balloonContent', balloonContentTemplate());
    });

    mapHandler.geoObjects.add(myPolygon)

 
}

const balloonContentTemplate = () => {
    return `
    
    <div class="ballon" >
    
        <div class="ballon__wrapper"> 

            <div class="ballon__title">Участок номер 1</div>
            <div class="ballon__desc">Мини описание</div>
            <ul class="ballon__list">
                <li><span>Площадь :</span><span>1320м<sup>2</sup></span></li>
                <li><span>Статус :</span><span>Продано</span></li>
            </ul> 

        </div>

    </div>
    
    `
}

</script>
<template>
    <ClientOnly>
        <YandexMap @created="mapInit" :coordinates="mapCenter" :zoom="17"> 
        </YandexMap>
    </ClientOnly>
</template>
<style >
.yandex-container {
    height: 800px !important;
}
.ballon{
    @apply w-[300px];
    &__title{
        @apply text-[30px] font-bold mb-5;
    }
    &__desc{
        @apply text-[13px] font-bold mb-5;
    }
    &__list{
        @apply grid w-1/2;
        & li{
            @apply flex justify-between;
            & span:first-child{
                @apply font-bold;
            }
        }
    }
}
</style>