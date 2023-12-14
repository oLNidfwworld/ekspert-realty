<script setup>
import EBtn from "~/components/Base/E-btn.vue";
import EInput from "~/components/Base/E-input.vue"; 
import ETextarea from "../../components/Base/E-textarea.vue";
const showModal = ref(false);

const sendData = async (e) => {

    if(userInfo.value.phone.length < 17){
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
        action: 'CALLBACK',
        ...userInfo.value
        }
    }).then((e)=>{
        if(e.data.value.status){
        responseMsg.value = e.data.value.msg
        fallback.value = true;
        }
    })
    }

}
const fallback = ref(false), responseMsg = ref(''); 
const userInfo = ref({
    name : null,
    phone : null,
    email : null,
    comment : null
}) 
const validation = ref(false),validationMessage = ref('');


</script>
<template>

    <div class="callrow ">
        <button @click="showModal = true" class="callrow__item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3367 0.0430967C14.794 0.140482 14.2591 0.359081 13.7622 0.68664C13.5169 0.848365 1.94436 12.6143 1.84741 12.8006C1.79854 12.8946 0.125698 18.9677 0.020224 19.4341C-0.0843116 19.8966 0.228161 20.3519 0.68614 20.4043C0.844976 20.4224 1.32747 20.2928 4.10685 19.4849C5.88653 18.9676 7.39065 18.5188 7.44933 18.4875C7.59209 18.4114 7.75656 18.2296 7.80762 18.0916C7.86954 17.9244 7.85793 17.5987 7.78494 17.4536C7.7496 17.3834 6.80667 16.3848 5.68958 15.2345L3.65848 13.1431L8.29488 8.40956L12.9313 3.67602L14.6612 5.44361L16.3911 7.2112L12.7841 10.8716C10.1718 13.5226 9.16107 14.573 9.11908 14.6804C9.00782 14.9653 9.06975 15.3241 9.26822 15.5445C9.47964 15.7793 9.88429 15.8535 10.1727 15.7104C10.3895 15.6028 19.1147 6.68284 19.319 6.35987C19.8077 5.58745 20.0355 4.75764 19.9955 3.89546C19.9478 2.86776 19.5646 1.96858 18.8585 1.22769C18.3229 0.665726 17.6251 0.262614 16.8798 0.0846453C16.4908 -0.00827022 15.7362 -0.0285456 15.3367 0.0430967ZM16.5084 1.64038C17.6733 1.88923 18.5051 3.00334 18.4303 4.21476C18.3924 4.82968 18.1684 5.34698 17.7326 5.82629L17.5104 6.07067L15.7791 4.30564L14.0477 2.54056L14.1834 2.39592C14.3713 2.19572 14.7555 1.91989 15.0163 1.79799C15.4613 1.58997 16.004 1.53266 16.5084 1.64038ZM5.55162 17.3904C5.52038 17.4198 1.93259 18.4624 1.91684 18.4466C1.91148 18.4412 2.13576 17.5991 2.41528 16.5751C2.69476 15.5511 2.92345 14.6996 2.92345 14.6828C2.92345 14.666 3.52119 15.2623 4.25176 16.0079C4.98234 16.7535 5.56726 17.3756 5.55162 17.3904Z" fill="white"/>
            </svg>
            <p >
                Написать
            </p>
        </button>
        <a href="tel:+7(901)517-86-51" class="callrow__item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.21935 0.0427783C3.7473 0.225961 3.02241 0.859854 2.16758 1.83698C1.31237 2.81453 0.461046 4.00446 0.151737 4.65462L0 4.9735L0.0482592 5.3959C0.430874 8.74636 3.19057 13.1227 6.89227 16.2491C9.5026 18.4537 12.3209 19.8794 14.6422 20.1693C15.0247 20.2171 15.0472 20.2152 15.2885 20.1154C16.2736 19.708 18.5982 17.8194 19.4778 16.7118C20.0177 16.032 20.1113 15.6813 19.885 15.1849C19.7128 14.8072 19.4885 14.6045 18.5246 13.9551C16.4871 12.5825 15.0255 11.8219 14.4253 11.8219C13.9341 11.8219 13.6694 12.0113 12.9113 12.9051C12.6205 13.2478 12.3586 13.5339 12.3291 13.541C12.2403 13.5622 11.5266 13.266 11.0233 12.999C9.33686 12.1043 8.0244 10.7788 7.14644 9.0834C6.88073 8.57034 6.58638 7.84646 6.60755 7.75828C6.61451 7.72929 6.89456 7.46707 7.22984 7.17553C8.11663 6.40446 8.30533 6.13845 8.30712 5.65686C8.3095 5.02355 7.61028 3.63591 6.24236 1.55901C5.88029 1.00929 5.51801 0.50815 5.40965 0.407206C5.05267 0.0745025 4.54111 -0.082096 4.21935 0.0427783ZM10.6835 1.33142V2.0055L10.8814 2.00584C11.7494 2.00736 12.9022 2.29047 13.7973 2.72197C15.3262 3.45896 16.4813 4.60137 17.2262 6.11321C17.693 7.0606 17.8914 7.77387 17.9852 8.84115L18.0361 9.42045H18.6939H19.3518V9.23533C19.3518 8.9116 19.2706 8.1931 19.1799 7.71417C18.9332 6.41154 18.2464 4.92526 17.4293 3.92606C15.9362 2.10009 13.9354 0.990079 11.65 0.719813C11.3594 0.685435 11.023 0.657334 10.9025 0.657334H10.6835V1.33142ZM4.84142 1.84752C5.5083 2.79857 6.25152 4.06201 6.73111 5.05996C6.86472 5.33802 6.97416 5.57786 6.97424 5.59295C6.97437 5.60803 6.74474 5.81657 6.46394 6.05634C5.75535 6.66146 5.32489 7.08642 5.24229 7.2624C5.1441 7.4715 5.18011 7.73772 5.39465 8.38998C5.84507 9.75926 6.85368 11.3414 7.95885 12.4121C9.15241 13.5685 10.6406 14.4679 12.0322 14.8739C12.4293 14.9898 12.6152 15.006 12.7877 14.9396C12.9564 14.8748 13.3107 14.5156 13.8993 13.8125C14.1952 13.4592 14.4506 13.1701 14.467 13.1703C14.4833 13.1703 14.7218 13.281 14.9968 13.416C15.9874 13.9026 17.2311 14.6496 18.1621 15.3173L18.6452 15.6637L18.3078 16.0373C17.5714 16.8527 16.0936 18.1023 15.1771 18.6845L14.8989 18.8612L14.6145 18.8132C10.9358 18.1925 6.373 14.7707 3.57814 10.5369C2.39371 8.74265 1.65094 7.01303 1.39247 5.44734L1.34513 5.16065L1.49012 4.91937C1.99734 4.07524 3.29363 2.50176 4.1187 1.72867C4.32557 1.53487 4.49802 1.37566 4.50194 1.3749C4.50586 1.37418 4.65864 1.58686 4.84142 1.84752ZM10.6835 4.68976V5.3638L11.0126 5.39156C11.9848 5.47355 12.8289 5.88251 13.5382 6.6152C14.2125 7.31174 14.588 8.13501 14.6688 9.09394L14.6963 9.42045H15.3571H16.0178V9.24679C16.0178 8.6656 15.7621 7.63589 15.4732 7.05394C14.9649 6.02967 14.0625 5.10727 13.0798 4.60718C12.4602 4.29192 11.766 4.09829 11.0629 4.04461L10.6835 4.01567V4.68976Z" fill="white"/>
              </svg>
            <p >
                Позвонить
            </p>
        </a>
    </div>
    <e-popup-form :fallback-income="fallback"  :is-visible="showModal" @fallback-return="fallback=false" @close="showModal = false" >
        <template v-slot:header>
          <h3 class="">Оставить заявку</h3>
        </template>
        <template v-slot:content>
          <form @submit.prevent="sendData($event)">
            <div class="grid gap-4 mb-4">
              <e-input v-model="userInfo.name" required placeholder="Имя*"></e-input>
              <e-input mask="+{7} {9}00 000-00-00" type="phone" v-model="userInfo.phone" required placeholder="Телефон*"></e-input>
              <e-input type="email" v-model="userInfo.email" placeholder="Email"></e-input>
              <ETextarea style="resize: none;" rows="5" v-model="userInfo.comment" placeholder="Комментарий"/>
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
<style lang="postcss">
    .callrow{
        @apply fixed bottom-0 left-0 right-0 m-auto grid grid-cols-2 gap-[5px] w-full z-[50]  
                md:right-0  md:left-[unset] md:grid-cols-1 md:w-fit md:gap-4 md:top-[140px] md:bottom-[unset] md:rounded-[4px_0px_0px_4px] md:overflow-hidden md:p-[11px_5px_11px_8px] md:bg-grey-light;
        &__item{
            @apply bg-red flex p-[9px_23px] justify-between text-white text-[14px] font-bold rounded-[4px_4px_0_0]
                    md:w-fit md:rounded-[unset] md:bg-[unset] md:p-[0];
            & p{
                @apply md:hidden;
            }
        }   
    }
    @media (max-width: 720px) { 
        .callrow {
            @apply container;
        }
    }
    @media (min-width: 720px) {
        
        .callrow__item svg path{
            fill : var(--red);
        } 
    }
</style>