<template>
  <div class="inside page_head">
    <div class="absaz" style="">
      <div class="inside" style="position:relative;">
        <h2 class="spec spec_f"><span class="name">Особенности и этапы</span> <span class="line line_b"></span></h2>

      </div>
      <p class="upper_bl">Срочный выкуп квартир – это оптимальное решение, если вам требуется оперативно получить деньги. Процедура проходит в несколько этапов:</p>
      <ul class="ul_punkt">
        <li>оценка недвижимости</li>
        <li>подготовка необходимого пакета документов;</li>
        <li>подписание договора купли-продажи;</li>
        <li>получение денежные средств.</li>
      </ul>
      При срочном выкупе цена составляет до 90% от рыночной стоимости недвижимости.<br>
      <br>
      <p class="upper_bl">При срочном выкупе квартиры продавцу необходимо предоставить следующий пакет документов:</p>
      <ul class="ul_punkt">
        <li>паспорт владельца недвижимости;</li>
        <li>документы, подтверждающие право собственности;</li>
        <li>выписка из домовой книги;</li>
        <li>справка об отсутствии задолженности за пользование услугами ЖКХ;</li>
        <li>медицинская справка, подтверждающая, что собственник квартиры не состоит на учете в психоневрологических и наркологических диспансерах.</li>
      </ul>
      Также следует учесть, что при срочном выкупе квартиры в ней не должны быть прописаны несовершеннолетние дети и недееспособные лица.<br>
      <br>	</div>
    <div class="absaz">
      <div class="inside" style="position:relative;">
        <h2 class="spec spec_f"><span class="name">Преимущества сотрудничества с нашей компанией</span> <span class="line line_b"></span></h2>

      </div>
      <p class="upper_bl"> Срочный выкуп квартиры от агентства недвижимости «Эксперт» – это:</p>
      <ul class="ul_punkt">
        <li>быстрое принятие решения;</li>
        <li>индивидуальные условия рассмотрения заявки;</li>
        <li>выкуп недвижимости без посредников за счет использования собственных активов компании;</li>
        <li>помощь в формировании необходимого пакета документов;</li>
        <li>гарантия срочного и безопасного получения денежных средств.</li>
      </ul>
      Свяжитесь с нашими специалистами по телефонам +7(901)517-86-51, +7(49643)2-35-56 и получите подробную консультацию по срочному выкупу вашей квартиры.
      <br>	</div>
    <br><br>

  </div>
</template>

<script lang="ts" setup>
import {useSeoMeta} from "@unhead/vue";
const route = useRoute();
  const { data : seoData } = await useAsyncData(
      () => useApiFetch(`/Seo/`,{
        query : {
          'link' : route.path,
        }
      }), 
  ); 

  if(seoData.value){
    useSeoMeta( 
      seoData.value
    )
  }  
// useSeoMeta({
//   title: 'Срочный выкуп квартир в Павловском-посаде | Эксперт',
//   ogTitle: 'Срочный выкуп квартир в Павловском-посаде | Эксперт',
//   description: 'Срочный выкуп квартир и другой недвижимости в Павловском-посаде',
//   ogDescription : 'Срочный выкуп квартир и другой недвижимости в Павловском-посаде'
// })
</script>

<style scoped>
h2,p{
  margin:20px 0;
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
