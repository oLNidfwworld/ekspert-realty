<script setup>
import EBtn from "../../components/Base/E-btn.vue";
import PictureDetailSlider from "../../components/Catalog/PictureDetailSlider.vue";
import EInput from "../../components/Base/E-input.vue";
import Favorite from "../../components/Base/Favorite.vue";
import ProductCard from "../../components/Catalog/ProductCard.vue";
import {useApiFetch, useApiFetchWithRefresh} from "../../composables/api";
import PhoneDetailBtn from "../../components/Base/PhoneDetailBtn.vue"
import {computed} from "vue";
const route = useRoute()
const { data: product, pending, error, refresh } = await useAsyncData(
    () => useApiFetch(`/Catalog/${route.params.immovableCode}/`)
)
const price = computed(() => product.value.item.price.toLocaleString('ru-RU'))
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

const isShareButtonActive = ref(false);



const isMapAppear = ref(false)
const mapElement = ref(null)
const showMap = () => {
  isMapAppear.value = !isMapAppear.value;
  setTimeout(()=>{
    if(isMapAppear.value){
      mapElement.value.scrollIntoView({
        block : 'center',
        behavior : 'smooth'
      })
    }
  },10)
}
const currUrl = () => {
  return location.href;
}

</script>
<template>
  <div class="grid gap-10 catalog-item__detail-wrapper">
    <div class="grid gap-10 catalog-item__detail">
      <div class="grid  ">
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
          <li v-if="product.item.roomsCount" class="flex flex-col">
            <span>
              Комнат
            </span>
            <span v-if="product.item.objectType.code == 'komnata'" class="font-bold">
              1 комната из {{product.item.roomsCount}}
            </span>
            <span v-else class="font-bold">
              {{product.item.roomsCount}}
            </span>
          </li>
          <li v-if="product.item.square" class="flex flex-col">
            <span v-if="product.item.section == 'zagorodnaya'">
              Пл. дома
            </span>
            <span v-else>
              Общая пл.
            </span>
            <span class="font-bold" >
              {{product.item.square}} м<sup>2</sup>
            </span>
          </li>
          <li v-if="product.item.squareSec" class="flex flex-col">
            <span>
              Пл. участка
            </span>
            <span class="font-bold">
              {{product.item.squareSec}}
            </span>
          </li>
          <li v-if="product.item.livingSquare" class="flex flex-col">
            <span>
              Жилая пл.
            </span>
            <span class="font-bold">
              {{product.item.livingSquare}} м<sup>2</sup>
            </span>
          </li>
          <li v-if="product.item.kitchenSquare" class="flex flex-col">
            <span>
              Пл. кухни
            </span>
            <span class="font-bold">
              {{product.item.kitchenSquare}} м<sup>2</sup>
            </span>
          </li>
          <li v-if="product.item.floorCount && product.item.section !== 'zagorodnaya'" class="flex flex-col">
            <span>
              Этаж
            </span>
            <span class="font-bold">
              {{product.item.houseFloor}} из {{product.item.floorCount}}
            </span>
          </li>
        </ul>
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2 py-3 mb-2">
          <li v-if="product.item.balcony" class="flex flex-col">
            <span>
              Балкон/лоджия
            </span>
            <span class="font-bold">
              {{product.item.balcony}}
            </span>
          </li>
          <li v-if="houseType" class="flex flex-col">
            <span>
              Тип дома
            </span>
            <span class="font-bold">
              {{houseType}}
            </span>
          </li>
          <li v-if="product.item.bathroom" class="flex flex-col">
            <span>
              Сан. узел
            </span>
            <span class="font-bold">
              {{product.item.bathroom}}
            </span>
          </li>
          <li v-if="product.item.elevator" class="flex flex-col">
            <span>
              Лифт
            </span>
            <span class="font-bold">
              {{product.item.elevator}}
            </span>
          </li>
          <li v-if="product.item.ipoteka" class="flex flex-col">
            <span>
              Ипотека
            </span>
            <span class="font-bold">
              {{product.item.ipoteka}}
            </span>
          </li>
          <li v-if="product.item.communications" v-for="(comm,commi) in product.item.communications" class="flex flex-col">
            <span>
              {{ comm.name }}
            </span>
            <span class="font-bold">
              Да
            </span>
          </li>
        </ul>
        <div class="grid grid-cols-1 lg:grid-cols-[5fr_6fr] xl:grid-cols-[3fr_6fr] justify-between gap-3 lg:gap-[91px]">
          <div class="flex flex-col sm:flex-row md:flex-col flex-shirk flex-wrap grid-cols-1 gap-4 w-full mb-8">
            <ClientOnly>
              <Favorite class="btn-grey btn border-red text-red py-[8px] btn-grey sm:w-fit md:w-full btn-grey" :enableText="true" :product-id="product.item.id"/>
              <e-btn @click="showMap" :class="{'mapActive':isMapAppear }" class="btn-grey sm:w-fit md:w-full "><nuxt-icon class="text-red mr-2" width="30px" height="30px" name="MapMarker"/>На карте</e-btn>
              <e-btn class="btn-grey sm:w-fit md:w-full" @click="print"><nuxt-icon class="text-red mr-2" width="30px" height="30px" name="Print"/>Версия для печати</e-btn>
              <div class="relative">
                <e-btn @click="isShareButtonActive = !isShareButtonActive" :class="{'mapActive':isShareButtonActive}" class="z-[1] btn-grey   w-full" ><nuxt-icon class="text-red mr-2" width="30px" height="30px" name="Share"/>Поделиться </e-btn>
                <transition name="share-appear">
                  <div  v-if="isShareButtonActive" class="flex z-[2] bshadow top-[60px] absolute left-0 right-0 p-3 hover:b bg-grey-light rounded-[6px] w-fit m-auto">
                    <Share :link="`https://t.me/share/url?url=${currUrl()}&text=${product.item.name}`" titol='Поделиться в Telegram'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.34675 0.0446667C1.70993 0.319867 0.304447 1.75879 0.0492345 3.42067C0.00693378 3.69611 -0.00749891 7.45208 0.00358962 15.2686L0.0198997 26.7133L0.185054 27.1828C0.646079 28.4932 1.52612 29.3736 2.83603 29.8348L3.30539 30H15.01H26.7145L27.1839 29.8343C28.5382 29.3561 29.472 28.3813 29.8923 27.0068C29.9952 26.6702 30 26.1385 30 14.9752V3.29572L29.8348 2.8262C29.3738 1.51581 28.4938 0.635447 27.1839 0.174256L26.7145 0.00904138L15.186 0.000707301C8.67852 -0.00398796 3.52212 0.0151452 3.34675 0.0446667ZM24.0242 7.85012C24.2145 7.96715 24.3971 8.27369 24.3971 8.47629C24.3971 8.63024 21.4767 21.5616 21.3949 21.7698C21.2515 22.1349 20.7108 22.3977 20.3234 22.2907C20.2135 22.2604 19.108 21.5462 17.8666 20.7036C16.6251 19.8609 15.5917 19.1716 15.5701 19.1716C15.5484 19.1716 15.0506 19.6282 14.4636 20.1863C13.1112 21.4724 13.1271 21.4605 12.7717 21.4605C12.5291 21.4605 12.4548 21.4314 12.2846 21.2698C12.1035 21.0977 12.0051 20.8462 11.2803 18.702C10.8383 17.3947 10.4472 16.2946 10.4112 16.2574C10.3752 16.2202 9.35568 15.921 8.14562 15.5926C6.1643 15.0548 5.9295 14.9783 5.78418 14.823C5.68315 14.7149 5.62283 14.5854 5.62283 14.4763C5.62283 14.0567 5.38751 14.1546 12.8978 11.4506C16.7216 10.0738 20.4706 8.72256 21.2289 8.44777C21.9872 8.17298 22.7925 7.88545 23.0183 7.80886C23.4741 7.65433 23.7222 7.66454 24.0242 7.85012ZM16.0403 13.0397C13.4286 14.5397 11.2707 15.8001 11.245 15.8406C11.2193 15.8811 11.1978 15.9824 11.1973 16.0656C11.1961 16.269 12.4552 19.9532 12.535 19.9799C12.611 20.0051 12.6288 19.902 12.7819 18.5553C12.848 17.9743 12.9147 17.4397 12.9303 17.3674C12.9489 17.2802 14.3161 16.1262 16.991 13.9398C19.2089 12.1269 21.0433 10.6146 21.0675 10.5792C21.1475 10.4617 21.0834 10.3388 20.935 10.3256C20.8347 10.3166 19.3025 11.1662 16.0403 13.0397Z" fill="#2D6D6D"/>
                      </svg>
                    </Share>
                    <Share :link="`http://vk.com/share.php?url=${currUrl()}&title=${product.item.name}`" titol='Поделиться в VK'>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_602_4967)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V30H30V0H0ZM22.49 16.5974C23.1787 17.2693 23.9069 17.9018 24.525 18.6446C24.7981 18.9728 25.0565 19.3114 25.2533 19.6917C25.5328 20.2366 25.2795 20.8335 24.7928 20.8664L21.7681 20.8651C20.9873 20.9293 20.3652 20.6145 19.8405 20.0804C19.4233 19.6551 19.0333 19.1999 18.6305 18.7602C18.4666 18.5791 18.2932 18.4098 18.0872 18.2747C17.674 18.007 17.3156 18.0883 17.0794 18.5186C16.8392 18.957 16.7828 19.4438 16.7606 19.9319C16.7277 20.6445 16.5127 20.8309 15.7975 20.8652C14.2673 20.936 12.8161 20.7036 11.4684 19.9333C10.2781 19.2537 9.35703 18.2929 8.55514 17.2065C6.99237 15.0884 5.79547 12.7631 4.72081 10.3709C4.47791 9.83176 4.65534 9.54284 5.24822 9.53242C6.23657 9.5129 7.22453 9.51528 8.2115 9.5311C8.61297 9.53782 8.87934 9.76728 9.0329 10.1465C9.56703 11.459 10.2204 12.7081 11.0405 13.867C11.2598 14.1754 11.4829 14.4824 11.799 14.7001C12.1493 14.9416 12.4171 14.8627 12.5823 14.4704C12.6875 14.2211 12.7335 13.9561 12.7557 13.6896C12.8343 12.7776 12.8437 11.8645 12.7083 10.9551C12.6243 10.3867 12.3029 10.0192 11.7361 9.91174C11.4472 9.85662 11.4905 9.75046 11.6296 9.58484C11.8739 9.30033 12.1036 9.1229 12.5589 9.1229H15.9773C16.5165 9.22807 16.6374 9.4709 16.7107 10.0128L16.7134 13.8119C16.707 14.0218 16.8185 14.6436 17.1951 14.7814C17.4967 14.8811 17.6976 14.6382 17.8787 14.4467C18.6974 13.578 19.2816 12.5507 19.8036 11.4878C20.0347 11.0205 20.2342 10.5351 20.4284 10.0493C20.5715 9.68987 20.7945 9.51284 21.2 9.51923L24.4912 9.52325C24.5883 9.52325 24.6881 9.52325 24.7838 9.53901C25.3374 9.63475 25.4897 9.87363 25.3176 10.4155C25.0489 11.2644 24.5225 11.9732 24.0095 12.683C23.4595 13.4429 22.8744 14.1762 22.3285 14.9401C21.8299 15.6396 21.8692 15.9913 22.49 16.5974Z" fill="#2D6D6D"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_602_4967">
                            <rect width="30" height="30" rx="4" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </Share>
                    <Share :link="`https://api.whatsapp.com/send?text=${product.item.name} ${currUrl()}`" titol='Поделиться в WhatsApp'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15V26C0 28.2091 1.79086 30 4 30H15H26C28.2091 30 30 28.2091 30 26V15V4C30 1.79086 28.2091 0 26 0H15H4C1.79086 0 0 1.79086 0 4V15ZM17.8125 4.89006C20.0229 5.15766 20.6552 5.34205 21.6631 6.01266C22.6607 6.67641 23.6246 7.73836 24.1208 8.72016C24.5855 9.63961 24.8348 11.119 24.8845 13.2512C24.9275 15.0904 24.7895 16.6035 24.4612 17.8933C24.1602 19.0762 23.0642 20.5168 21.8169 21.369C20.8922 22.0008 20.4012 22.2015 19.3404 22.3813C17.8681 22.6309 17.2027 22.6874 15.3705 22.7184L15.1316 22.7224C14.1151 22.7396 13.1473 23.161 12.4421 23.8934C11.8362 24.5226 11.2608 25.0861 11.1634 25.1454C10.8073 25.3627 10.2868 25.2262 10.0354 24.8497C9.90791 24.6589 9.90234 24.6006 9.90234 23.453V22.4573C9.90234 22.3363 9.826 22.2286 9.71191 22.1885C9.31295 22.0484 8.4283 21.5603 8.00297 21.2458C6.826 20.3753 5.82064 19.0098 5.54004 17.9004C4.98023 15.687 4.95176 12.3104 5.47236 9.86742C5.70264 8.78713 6.29479 7.81518 7.31279 6.8465C8.23687 5.96725 9.25219 5.38699 10.208 5.19187C10.791 5.07287 11.7357 4.93875 12.5098 4.86504C12.8643 4.83123 13.2598 4.79344 13.3887 4.78096C13.9803 4.72359 17.0667 4.79977 17.8125 4.89006ZM13.4473 6.56783C12.1894 6.65191 10.7713 6.85928 10.2034 7.04227C9.40611 7.29914 8.1675 8.34064 7.65475 9.18533C7.35768 9.67477 7.24084 10.029 7.09834 10.8724C6.7565 12.8958 6.78281 14.9956 7.17615 17.0801C7.43156 18.4338 8.68793 19.8424 10.1781 20.4458C10.4194 20.5435 10.579 20.7761 10.5833 21.0364L10.6075 22.5057C10.6247 23.5499 10.6445 24.4109 10.6515 24.4189C10.6584 24.427 10.7255 24.4336 10.8006 24.4336C10.8947 24.4336 11.0718 24.2923 11.3697 23.9795C11.6076 23.7298 12.3615 22.956 13.0451 22.2602L13.3915 21.9076C13.9668 21.3221 14.7463 20.9818 15.5669 20.9581C17.6074 20.8993 19.3976 20.6545 20.062 20.3436C21.1231 19.847 22.1351 18.8473 22.5962 17.8401C22.8824 17.215 23.1431 15.2634 23.144 13.7402C23.1447 12.4036 22.923 10.5677 22.6753 9.85916C22.3007 8.78766 20.8706 7.38826 19.7966 7.04227C18.5664 6.64594 15.598 6.4241 13.4473 6.56783ZM15.7617 8.73387C17.7509 9.05291 19.3686 10.5896 19.7676 12.5391C19.9045 13.2079 19.9546 14.0404 19.8644 14.149C19.7726 14.2597 19.5483 14.2651 19.4601 14.1588C19.4238 14.1151 19.3661 13.7921 19.3317 13.4411C19.2531 12.6382 19.1467 12.2118 18.8914 11.6776C18.4879 10.8332 17.7577 10.1059 16.9043 9.6982C16.3029 9.41086 16.0612 9.34482 15.2924 9.25775C14.9908 9.22359 14.7093 9.16682 14.667 9.13166C14.5706 9.05174 14.5669 8.83547 14.6602 8.74219C14.7465 8.65588 15.2517 8.65207 15.7617 8.73387ZM11.9261 9.34594C12.0979 9.45258 13.0266 10.6901 13.2384 11.0948C13.4289 11.4586 13.4702 11.8032 13.3505 12.0302C13.3133 12.1006 13.1118 12.3203 12.9025 12.5183C12.5265 12.8743 12.5226 12.8812 12.5613 13.1232C12.5828 13.2579 12.678 13.5393 12.7729 13.7485C13.2308 14.7582 13.9964 15.5752 14.8975 16.0155C15.8036 16.4583 15.957 16.445 16.4534 15.881C16.8154 15.4697 17.0569 15.3645 17.3877 15.4735C17.654 15.5613 19.0353 16.5158 19.3467 16.8271C19.5319 17.0123 19.5703 17.0914 19.5703 17.2871C19.5703 17.9738 18.5187 19.0547 17.8505 19.0547C17.5992 19.0547 17.0405 18.8333 16.038 18.3362C14.1589 17.4046 12.7429 16.2349 11.6791 14.7358C10.8579 13.5786 9.84375 11.5013 9.84375 10.9765C9.84375 10.4013 10.6731 9.47953 11.3965 9.25084C11.5395 9.20566 11.7656 9.24627 11.9261 9.34594ZM16.3928 10.1534C16.934 10.3417 17.5862 10.7793 17.8808 11.152C18.3601 11.7585 18.6328 12.5237 18.6328 13.2625C18.6328 13.6152 18.6193 13.6611 18.5031 13.7041C18.3189 13.7723 18.167 13.7175 18.1372 13.5721C18.1232 13.5035 18.0951 13.2891 18.0749 13.0957C17.9758 12.1484 17.5276 11.4012 16.7821 10.94C16.502 10.7668 15.9206 10.5785 15.4819 10.5189C15.052 10.4604 14.9268 10.3245 15.0649 10.0663C15.1241 9.95572 15.1675 9.94781 15.5538 9.97705C15.787 9.99469 16.1645 10.074 16.3928 10.1534ZM16.4062 11.4335C16.9275 11.6613 17.2574 12.1333 17.3705 12.813C17.4239 13.1341 17.3351 13.3008 17.1108 13.3008C16.9032 13.3008 16.8881 13.2779 16.811 12.8501C16.7772 12.6629 16.6838 12.4088 16.6034 12.2854C16.4459 12.0439 16.0801 11.8394 15.8018 11.8372C15.7111 11.8365 15.5858 11.8086 15.5235 11.7753C15.3779 11.6974 15.3708 11.3968 15.5127 11.3108C15.6469 11.2294 16.0731 11.2879 16.4062 11.4335Z" fill="#2D6D6D"/>
                      </svg>
                    </Share>
                    <Share :link="`https://connect.ok.ru/offer?url=${currUrl()}&title=${product.item.name}`" titol='Поделиться в Одноклассниках'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.34675 0.0446667C1.70993 0.319867 0.304447 1.75879 0.0492345 3.42067C0.00693378 3.69611 -0.00749891 7.45208 0.00358962 15.2686L0.0198997 26.7133L0.185054 27.1828C0.646079 28.4932 1.52612 29.3736 2.83603 29.8348L3.30539 30H15.01H26.7145L27.1839 29.8343C28.5382 29.3561 29.472 28.3813 29.8923 27.0068C29.9952 26.6702 30 26.1385 30 14.9752V3.29572L29.8348 2.8262C29.3738 1.51581 28.4938 0.635447 27.1839 0.174256L26.7145 0.00904138L15.186 0.000707301C8.67852 -0.00398796 3.52212 0.0151452 3.34675 0.0446667ZM15.9818 5.72534C18.278 6.19945 19.8817 8.29253 19.7413 10.6321C19.6971 11.3679 19.5885 11.7822 19.2643 12.4515C18.8002 13.4095 18.051 14.1582 17.0927 14.6214C16.4685 14.9232 15.9491 15.0594 15.25 15.1047C13.2691 15.2331 11.331 13.98 10.6019 12.0993C9.23523 8.57437 12.2843 4.96195 15.9818 5.72534ZM14.6129 8.08559C13.9463 8.19657 13.2432 8.72268 12.9352 9.34087C12.3704 10.4748 12.845 11.897 13.9725 12.4488C15.3817 13.1385 17.0427 12.2782 17.292 10.7295C17.5404 9.18669 16.163 7.82741 14.6129 8.08559ZM10.8633 15.1262C10.9867 15.1604 11.2938 15.3194 11.5458 15.4794C13.083 16.4557 14.9245 16.7388 16.6867 16.2696C17.2559 16.1181 18.0336 15.7783 18.4309 15.5077C19.187 14.9927 19.7071 14.9443 20.1827 15.3446C20.4026 15.5297 20.6409 16.0168 20.6416 16.2829C20.642 16.3889 20.6063 16.5605 20.5624 16.6644C20.3831 17.0887 19.3367 17.8806 18.4889 18.2337C17.9654 18.4517 16.9118 18.7286 16.374 18.7894C16.1724 18.8123 16.0073 18.8472 16.0073 18.8672C16.0073 18.8871 16.8364 19.7362 17.8497 20.7542C19.3894 22.301 19.7025 22.6435 19.7561 22.8397C19.8403 23.148 19.8378 23.2092 19.7285 23.5301C19.5311 24.1098 18.8569 24.4865 18.2878 24.3352C18.0649 24.2759 17.8388 24.0755 16.5558 22.7999C15.2419 21.4936 15.0673 21.3397 14.9629 21.3956C14.8984 21.4302 14.2449 22.0659 13.5107 22.8085C12.0535 24.2822 11.8527 24.4314 11.3953 24.3798C10.9842 24.3335 10.6096 24.0705 10.4191 23.6946C10.2361 23.3337 10.217 23.0803 10.3488 22.7645C10.4089 22.6203 11.0611 21.9206 12.2702 20.7029L14.1006 18.8596L13.4703 18.7571C12.1569 18.5436 11.1615 18.1543 10.3216 17.5255C9.77839 17.1188 9.5876 16.9195 9.46879 16.6351C9.29965 16.23 9.38513 15.8502 9.73492 15.4527C10.0524 15.0919 10.3891 14.9944 10.8633 15.1262Z" fill="#2D6D6D"/>
                      </svg>
                    </Share>
                    <Share :link="`viber://forward?text=${product.item.name} ${currUrl()}&utm_source=share2`" titol='Поделиться в Viber'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15V26C0 28.2091 1.79086 30 4 30H15H26C28.2091 30 30 28.2091 30 26V15V4C30 1.79086 28.2091 0 26 0H15H4C1.79086 0 0 1.79086 0 4V15ZM17.8125 4.89006C20.0229 5.15766 20.6552 5.34205 21.6631 6.01266C22.6607 6.67641 23.6246 7.73836 24.1208 8.72016C24.5855 9.63961 24.8348 11.119 24.8845 13.2512C24.9275 15.0904 24.7895 16.6035 24.4612 17.8933C24.1602 19.0762 23.0642 20.5168 21.8169 21.369C20.8922 22.0008 20.4012 22.2015 19.3404 22.3813C17.8681 22.6309 17.2027 22.6874 15.3705 22.7184L15.1316 22.7224C14.1151 22.7396 13.1473 23.161 12.4421 23.8934C11.8362 24.5226 11.2608 25.0861 11.1634 25.1454C10.8073 25.3627 10.2868 25.2262 10.0354 24.8497C9.90791 24.6589 9.90234 24.6006 9.90234 23.453V22.4573C9.90234 22.3363 9.826 22.2286 9.71191 22.1885C9.31295 22.0484 8.4283 21.5603 8.00297 21.2458C6.826 20.3753 5.82064 19.0098 5.54004 17.9004C4.98023 15.687 4.95176 12.3104 5.47236 9.86742C5.70264 8.78713 6.29479 7.81518 7.31279 6.8465C8.23687 5.96725 9.25219 5.38699 10.208 5.19187C10.791 5.07287 11.7357 4.93875 12.5098 4.86504C12.8643 4.83123 13.2598 4.79344 13.3887 4.78096C13.9803 4.72359 17.0667 4.79977 17.8125 4.89006ZM13.4473 6.56783C12.1894 6.65191 10.7713 6.85928 10.2034 7.04227C9.40611 7.29914 8.1675 8.34064 7.65475 9.18533C7.35768 9.67477 7.24084 10.029 7.09834 10.8724C6.7565 12.8958 6.78281 14.9956 7.17615 17.0801C7.43156 18.4338 8.68793 19.8424 10.1781 20.4458C10.4194 20.5435 10.579 20.7761 10.5833 21.0364L10.6075 22.5057C10.6247 23.5499 10.6445 24.4109 10.6515 24.4189C10.6584 24.427 10.7255 24.4336 10.8006 24.4336C10.8947 24.4336 11.0718 24.2923 11.3697 23.9795C11.6076 23.7298 12.3615 22.956 13.0451 22.2602L13.3915 21.9076C13.9668 21.3221 14.7463 20.9818 15.5669 20.9581C17.6074 20.8993 19.3976 20.6545 20.062 20.3436C21.1231 19.847 22.1351 18.8473 22.5962 17.8401C22.8824 17.215 23.1431 15.2634 23.144 13.7402C23.1447 12.4036 22.923 10.5677 22.6753 9.85916C22.3007 8.78766 20.8706 7.38826 19.7966 7.04227C18.5664 6.64594 15.598 6.4241 13.4473 6.56783ZM15.7617 8.73387C17.7509 9.05291 19.3686 10.5896 19.7676 12.5391C19.9045 13.2079 19.9546 14.0404 19.8644 14.149C19.7726 14.2597 19.5483 14.2651 19.4601 14.1588C19.4238 14.1151 19.3661 13.7921 19.3317 13.4411C19.2531 12.6382 19.1467 12.2118 18.8914 11.6776C18.4879 10.8332 17.7577 10.1059 16.9043 9.6982C16.3029 9.41086 16.0612 9.34482 15.2924 9.25775C14.9908 9.22359 14.7093 9.16682 14.667 9.13166C14.5706 9.05174 14.5669 8.83547 14.6602 8.74219C14.7465 8.65588 15.2517 8.65207 15.7617 8.73387ZM11.9261 9.34594C12.0979 9.45258 13.0266 10.6901 13.2384 11.0948C13.4289 11.4586 13.4702 11.8032 13.3505 12.0302C13.3133 12.1006 13.1118 12.3203 12.9025 12.5183C12.5265 12.8743 12.5226 12.8812 12.5613 13.1232C12.5828 13.2579 12.678 13.5393 12.7729 13.7485C13.2308 14.7582 13.9964 15.5752 14.8975 16.0155C15.8036 16.4583 15.957 16.445 16.4534 15.881C16.8154 15.4697 17.0569 15.3645 17.3877 15.4735C17.654 15.5613 19.0353 16.5158 19.3467 16.8271C19.5319 17.0123 19.5703 17.0914 19.5703 17.2871C19.5703 17.9738 18.5187 19.0547 17.8505 19.0547C17.5992 19.0547 17.0405 18.8333 16.038 18.3362C14.1589 17.4046 12.7429 16.2349 11.6791 14.7358C10.8579 13.5786 9.84375 11.5013 9.84375 10.9765C9.84375 10.4013 10.6731 9.47953 11.3965 9.25084C11.5395 9.20566 11.7656 9.24627 11.9261 9.34594ZM16.3928 10.1534C16.934 10.3417 17.5862 10.7793 17.8808 11.152C18.3601 11.7585 18.6328 12.5237 18.6328 13.2625C18.6328 13.6152 18.6193 13.6611 18.5031 13.7041C18.3189 13.7723 18.167 13.7175 18.1372 13.5721C18.1232 13.5035 18.0951 13.2891 18.0749 13.0957C17.9758 12.1484 17.5276 11.4012 16.7821 10.94C16.502 10.7668 15.9206 10.5785 15.4819 10.5189C15.052 10.4604 14.9268 10.3245 15.0649 10.0663C15.1241 9.95572 15.1675 9.94781 15.5538 9.97705C15.787 9.99469 16.1645 10.074 16.3928 10.1534ZM16.4062 11.4335C16.9275 11.6613 17.2574 12.1333 17.3705 12.813C17.4239 13.1341 17.3351 13.3008 17.1108 13.3008C16.9032 13.3008 16.8881 13.2779 16.811 12.8501C16.7772 12.6629 16.6838 12.4088 16.6034 12.2854C16.4459 12.0439 16.0801 11.8394 15.8018 11.8372C15.7111 11.8365 15.5858 11.8086 15.5235 11.7753C15.3779 11.6974 15.3708 11.3968 15.5127 11.3108C15.6469 11.2294 16.0731 11.2879 16.4062 11.4335Z" fill="#2D6D6D"/>
                      </svg>
                    </Share>
                  </div>
                </transition>
              </div>
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
    <div ref="mapElement" v-if=" product.item.coordinates.lat && product.item.coordinates.lon && isMapAppear" >
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
.share-appear-enter-active, .share-appear-leave-active{
  transition : 0.4s;
}
.share-appear-enter-to, .share-appear-leave-from{
  transform : translateY(0px);
  opacity: 1;
}
.share-appear-enter-from, .share-appear-leave-to{
  transform : translateY(-30px);
  opacity: 0;
}
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
   @apply lg:grid-cols-[2fr_3fr] grid-cols-2
 }
}
}
}
.mapActive{
  background : var(--red);
  color: var(--white);
  span.nuxt-icon.nuxt-icon--fill svg path{
    fill : var(--white) !important;
  }
}
.bshadow{
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
