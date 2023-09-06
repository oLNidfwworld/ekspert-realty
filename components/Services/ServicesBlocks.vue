<script setup>
const props = defineProps({
  displayTitle : {
    type: Boolean,
    default : false
  },
  only4 : {
    type: Boolean,
    default : true
  }
})

</script>
<template>
  <div >
    <h2 v-if="displayTitle" class="title">Услуги</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <nuxt-link :to="{path:`/services/customers/`}" class="rounded-[6px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-grey-light ">
        <div class="hidden lg:block bg-cover-n" style="background: url(/services/family-moving.png)"> </div>
        <div CLASS="py-[16px] px-[24px]" >
          <div class="font-bold mb-[14px] text-[15px]">Покупка недвижимости</div>
          <div class="leading-[22px] text-[14px]">Одно из основных направлений работы агентства недвижимости «Эксперт» – оказание квалифицированной помощи клиентам, которые планируют приобрести жилую или коммерческую недвижимость</div>
        </div>
      </nuxt-link>

      <nuxt-link :to="{path:`/services/sellers/`}"  class="rounded-[6px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-grey-light ">
        <div class="hidden lg:block bg-cover-n" style="background: url(/services/family-sell.png)"> </div>
        <div CLASS="py-[16px] px-[24px]" >
          <div class="font-bold mb-[14px] text-[15px]">Продажа недвижимости</div>
          <div class="leading-[22px] text-[14px]">Специалисты агентства «Эксперт» готовы оказать профессиональное содействие в реализации всех видов недвижимого имущества</div>
        </div>
      </nuxt-link>

      <nuxt-link :to="{path:`/services/mortpage/`}"  class="rounded-[6px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-grey-light ">
        <div CLASS="py-[16px] px-[24px]" >
          <div class="font-bold mb-[14px] text-[15px]">Одобрение ипотеки</div>
          <div class="leading-[22px] text-[14px]">Обратившись к специалистам нашей компании, вы получите всю необходимую помощь в оформлении и получении ипотечного кредита</div>
        </div>
        <div class="hidden lg:block bg-cover-n" style="background: url(/services/family-discuss.png)"> </div>
      </nuxt-link>

      <nuxt-link :to="{path:`/act-help/`}" class="rounded-[6px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-grey-light ">
        <div CLASS="py-[16px] px-[24px]" >
          <div class="font-bold mb-[14px] text-[15px]">Юридические услуги</div>
          <div class="leading-[22px] text-[14px]">Мы составляем договоры, предметом которых являются: квартиры, комнаты, дома, дачи, земельные участки и недвижимость коммерческого назначения различных видов использования</div>
        </div>
        <div class="hidden lg:block bg-cover-n" style="background: url(/services/some-man-writing.png)"> </div>
      </nuxt-link>

      <nuxt-link v-if="!only4" :to="{path:`/services/tenants/`}" class="rounded-[6px] overflow-hidden grid grid-cols-2 bg-grey-light ">
        <div CLASS="py-[16px] px-[24px]" >
          <div class="font-bold mb-[14px] text-[15px]">Арендаторам</div>
          <div class="leading-[22px] text-[14px]">Мы составляем договоры, предметом которых являются: квартиры, комнаты, дома, дачи, земельные участки и недвижимость коммерческого назначения различных видов использования</div>
        </div>
        <div class="hidden lg:block bg-cover-n" style="background: url(/services/some-man-writing.png)"> </div>
      </nuxt-link>

      <nuxt-link v-if="!only4" :to="{path:`/act-help/`}" class="rounded-[6px] overflow-hidden grid grid-cols-2 bg-grey-light ">
        <div CLASS="py-[16px] px-[24px]" >
          <div class="font-bold mb-[14px] text-[15px]">Срочный выкуп</div>
          <div class="leading-[22px] text-[14px]">Мы составляем договоры, предметом которых являются: квартиры, комнаты, дома, дачи, земельные участки и недвижимость коммерческого назначения различных видов использования</div>
        </div>
        <div class="hidden lg:block bg-cover-n" style="background: url(/services/some-man-writing.png)"> </div>
      </nuxt-link>
    </div>
  </div>
</template>
<style scoped>
  .bg-cover-n{
    background-repeat: no-repeat !important;
    background-size: cover !important; ;
    background-position: center !important;
  }
</style>
