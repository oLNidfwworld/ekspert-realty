<script setup>
import { loadYmap, YandexClusterer, YandexPolyne, YandexMap, YandexMarker } from "vue-yandex-maps";

definePageMeta({
    layout: "bargaining",
})
const mapCenter = ref([55.786672, 38.551209]) 
const zoom = 17; 

const { data: placements, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Bargaining/`)
);
const mapInit = (mapHandler) => { 

    var objectManager = new ymaps.ObjectManager({}); 
    mapHandler.geoObjects.add(objectManager);
    toRaw(placements.value).items.map(item => { 
        objectManager.objects.events.add('click', function (e) {
            var objectId = e.get('objectId');
            objectManager.objects.balloon.open(objectId);
        }); 
        objectManager.add({
            type: 'Feature',
            id: item.NAME,
            geometry: {
                type: 'Polygon',
                coordinates: [item.PLACE]
            },
            options: {
                fillColor: '#00FF00',
                strokeColor: '#0000FF',
                strokeWidth: 2,
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
            iconContent: item.NAME // Текст маркера
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/nil.png', 
            iconImageSize: [1, 1] // Размеры иконки (ширина, высота)
        });
        mapHandler.geoObjects.add(textPlacemark);
    }) 
    mapHandler.events.add('boundschange', function (event) {
        var newZoom = event.get('newZoom');
        var allGeoObjects = mapHandler.geoObjects;
        console.log(newZoom)
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

const reservedColor = '', 
    sellableColor = '', 
    selledColor = '';

const balloonContentTemplate = (name, square, stat, price) => {
    return `
    
    <div class="ballon" >
    
        <div class="ballon__wrapper"> 

            <div class="ballon__title">Участок номер ${name}</div>
            <div class="ballon__desc">Мини описание</div>
            <ul class="ballon__list">
                <li><span>Стоимость :</span><span>${price}м<sup>2</sup></span></li>
                <li><span>Площадь :</span><span>${square}м<sup>2</sup></span></li>
                <li><span>Статус :</span><span class="stat_${stat.CODE}">${stat.NAME}</span></li>
            </ul> 

        </div>

    </div>
    
    `
}
console.log(placements.value);
</script>
<template>
    <ClientOnly>
        <YandexMap @created="mapInit" :coordinates="mapCenter" :zoom="zoom">
        </YandexMap>
    </ClientOnly>
</template>
<style >
.yandex-container {
    height: 80vh !important;
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
            background-color: rgb(0, 209, 0);
            color: var(--white);
        }
        & .stat_RESERVED{
            font-weight : 700;
            padding: 5px 10px;
            background-color: rgb(87, 98, 255);
            color: var(--white);
        }
        & .stat_SELLED{
            font-weight : 700;
            padding: 5px 10px;
            background-color: rgb(178, 73, 52);
            color: var(--white);
        }
    }
}
</style>