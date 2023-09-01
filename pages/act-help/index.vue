<script setup lang="ts">

import EBtn from "~/components/Base/E-btn.vue";
import EInput from "~/components/Base/E-input.vue";
import {useSeoMeta} from "unhead";
import {watch} from "vue";
import ETextarea from "../../components/Base/E-textarea.vue";
  const route = useRoute();
  const { data : seoData } = await useAsyncData(
      () => useApiFetch(`/Seo/`,{
        query : {
          'link' : route.path,
        }
      }), 
  ) 
 
  if(seoData.value){
    useSeoMeta( 
      seoData.value
    )
  }  

const sendData = async (e) => {

  if(phone.value.length < 17){
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
        phone: phone.value,
        name: name.value,
        comment : comment.value,
        email : email.value
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
const isPopupVisible = ref(false);
const name = ref(null),phone = ref(undefined),email = ref(undefined),comment = ref(undefined);
const validation = ref(false),validationMessage = ref('');


 

</script>
<template>
  <div>
    <h2>Совершение любой сделки подразумевает под собой заключение договора</h2>
    <i> Одним из направлений деятельности Агентства недвижимости «Эксперт» является составление
      <br> договоров в простой письменной форме для приобретения или отчуждения недвижимости </i>
    <p>К таким договорам относятся:</p>
    <ul>
      <li>договоры купли-продажи</li>
      <li>договоры дарения</li>
      <li>договоры мены</li>
      <li>договоры аренды</li>
      <li>соглашения об уступке и переуступке прав на недвижимое имущество</li>
    </ul>
    <p>Мы составляем договоры, предметом которых являются: квартиры, комнаты, дома, дачи, земельные участки и недвижимость коммерческого назначения различных видов использования. Необходимо отметить, что каждая сделка и заключаемый по ней договор индивидуальны, имеют исключительные особенности и детали.</p>
    <h2>Договор купли-продажи</h2>
    <p>Договоры купли-продажи недвижимого имущества отличаются друг от друга различными источниками происхождения денежных средств у покупателей (собственные или кредитные, средства по материнскому капиталу и др.), формой расчётов между сторонами по договору, моментом передачи недвижимости, а также от пожеланий сторон сделки</p>
    <img src="/keys-giving.png">
    <h2>Договор дарения</h2>
    <p>
      А если затронуть тему дарения, то это один из самых простых способов передать безвозмездно недвижимость. Однако и у дарения есть свои юридические нюансы.
      <br><br>
      Договором дарения можно закрепить ряд существенных условий, таких как:
    </p>
    <ul>
      <li>
        отмену дарения, в случае, если даритель переживёт одаряемого</li>
      <li>
        установить права дарителя проживать и пользоваться имуществом пожизненно и др.</li>
    </ul>
    <p>Нужно отметить, что подаренное имущество не является совместной собственностью супругов. Дарение при жизни дарителя поможет избежать конфликтных ситуаций с родственниками и третьими лицами при наследовании недвижимости.</p>
    <h2>Договор мены</h2>
    <p>Также одной из разновидностей операций с недвижимостью является заключение договора мены недвижимого имущества. Договор мены недвижимого имущества — возмездное, двустороннее соглашение, согласно которому собственники объектов являются одновременно и покупателями и продавцами. Важно, что при неравнозначности стоимости обмениваемых объектов, по данным взаимоотношениям могут быть применены денежные средства в качестве доплаты для обеспечения равноценности.</p>
    <h2>Составление договора — сложный и ответственный процесс, который лучше доверить профессионалу</h2>
    <p>Документы на недвижимое имущество могут содержать в себе массу нюансов и тонкостей. Разобраться в них, обладая поверхностными знаниями в области юриспруденции, достаточно сложно. Только квалифицированный и опытный специалист сможет отразить в договоре не только интересы сторон сделки, но и все юридические аспекты действующего законодательства Российской Федерации.</p>
    <div class="sm:grid grid-cols-[auto,auto] gap-3">
      <img src="/shield.png">
      <div class="text-[16px] lg:text-[24px] xl:text-[27px]">Обратившись в Агентство недвижимости «Эксперт» вы получите гарантированный <br> результат — договор, составленный с учётом ваших условий и требований <br> законодательства, переход права по которому будет гарантировано зарегистрирован <br> в Росреестре</div>
    </div>
    <e-popup-form :fallback-income="fallback"  :is-visible="isPopupVisible" @fallback-return="fallback=false" @close="isPopupVisible = !isPopupVisible" >
      <template v-slot:header>
        <h3 class="">Оставить заявку</h3>
      </template>
      <template v-slot:content>
        <form @submit.prevent="sendData($event)">
          <div class="grid gap-4 mb-4">
            <e-input v-model="name" required placeholder="Имя*"></e-input>
            <e-input mask="+{7} {9}00 000-00-00" type="phone" v-model="phone" required placeholder="Телефон*"></e-input>
            <e-input type="email" v-model="email" placeholder="Email"></e-input>
            <ETextarea style="resize: none;" rows="5" v-model="comment" placeholder="Комментарий"/>
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
    <e-btn   @click="isPopupVisible = true" class="mt-6 btn-red">Оставить заявку</e-btn>
  </div>
</template>
<style scoped>
  h2,p{
    margin:20px 0;
  }
  i{
    display: block;
    margin-left: 20px;
    color: var(--blue);
  }
  h2{
    font-weight: 700;
    font-size: 24px;
  }
  ul li{
    display: flex;
    justify-content: center;
    width: fit-content;
    margin: 20px 0;
    align-items: baseline;
    justify-content: center;
  }
  ul li::before{
    margin-right: 20px;
    display: inline-block;
    content: '';
    background: var(--red);
    min-width: 7px;
    height: 7px;
    border-radius: 99px;
  }
</style>
