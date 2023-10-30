<script setup lang="ts"> 
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
const photos = computed(() => {
    let photosValue  = [ ];
    // @ts-ignore
    placements.value.items.map(el => {
        el.PHOTOS.map(photo => { 
            photosValue.push(photo); 
        })
    })
    return photosValue;
})
console.log(photos)
const minPrice = computed(() => {
    return placements.value.items.reduce((a, b) => Math.min(a, b.PRICE), Number.POSITIVE_INFINITY);
}) 
const minSquare = computed(() => {
    return placements.value.items.reduce((a, b) => Math.min(a, b.SQUARE), Number.POSITIVE_INFINITY);
})    
 

provide('fromIBargainingToPreview', {
    "zoom" : zoom,
    "mapCenter" : mapCenter,
    "placements" : placements
});

</script>
<template>  
    <div class="container m-auto py-[50px]"> 
        <BargainingPreview :photos="photos" :min-price="minPrice" :min-square="minSquare"  :similar="placements.items"  ></BargainingPreview>
    </div> 
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
