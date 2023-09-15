<script setup lang="ts">
import EBtn from "~/components/Base/E-btn.vue";
import EInput from "~/components/Base/E-input.vue";
import ETextarea from "~/components/Base/E-textarea.vue";
import { ref } from "vue";
import { useSeoMeta } from "@unhead/vue";

const route = useRoute();
const { data: seoData } = await useAsyncData(
  () => useApiFetch(`/Seo/`, {
    query: {
      'link': route.path,
    }
  }),
);

if (seoData.value) {
  useSeoMeta(
    seoData.value
  )
}
const sendData = async (e) => {

  if (phone.value.length < 17) {
    validationMessage.value = 'Неверный формат номера телефона'
    validation.value = false;
  } else {
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
        comment: comment.value,
        email: email.value
      }
    }).then((e) => {
      if (e.data.value.status) {
        responseMsg.value = e.data.value.msg
        fallback.value = true;
      }
    })
  }

}
const fallback = ref(false), responseMsg = ref('');
const isPopupVisible = ref(false);
const name = ref(null), phone = ref(undefined), email = ref(undefined), comment = ref(undefined);
const validation = ref(false), validationMessage = ref('');



// useSeoMeta({
//   title: 'Покупателям | Эксперт',
//   ogTitle: 'Покупателям | Эксперт',
//   description: 'Одно из основных направлений работы агентства недвижимости «Эксперт» – оказание квалифицированной помощи клиентам, которые планируют приобрести жилую или коммерческую недвижимость. Обратившись в агентство «Эксперт», можно получить качественный результат в оптимальные сроки.',
//   ogDescription: 'Одно из основных направлений работы агентства недвижимости «Эксперт» – оказание квалифицированной помощи клиентам, которые планируют приобрести жилую или коммерческую недвижимость. Обратившись в агентство «Эксперт», можно получить качественный результат в оптимальные сроки.',
// })

</script>
<template>
  <div>
    <p>Одно из основных направлений работы агентства недвижимости «Эксперт» – оказание квалифицированной помощи клиентам,
      которые планируют приобрести жилую или коммерческую недвижимость. Обратившись в агентство «Эксперт», можно получить
      качественный результат в оптимальные сроки.</p>
    <h2>Специалисты компании оказывают следующие услуги в рамках покупки недвижимости:</h2>
    <ul>
      <li>Консультации по приобретению недвижимости. Специалисты агентства недвижимости всегда готовы оказать
        консультативную поддержку по вопросам приобретения квартиры, дома, участка, коммерческого объекта или доли
        в недвижимом имуществе. Они ответят на любые вопросы, касающиеся сбора документов, регистрации сделок, вопросов
        налогообложения.</li>
      <li>Подбор объектов недвижимости. Специалисты учитывают все пожелания клиента относительно характеристик объекта,
        его расположения, назначения, объёма финансовых вложений. Воспользовавшись данной услугой, вы существенно
        сэкономите силы и время.</li>
      <li>Профессиональное содействие в получении ипотеки. Если для покупки требуется привлечение заёмных средств,
        специалисты агентства «Эксперт» готовы оказать помощь в этом вопросе.</li>
      <li>Проведение всех типов сделок по покупке. Независимо от того, какой объект недвижимости вы решили приобрести,
        наши специалисты подготовят полный пакет необходимой документации и проведут сделку, как с наличным,
        так и безналичным расчётом. Наши агенты имеют огромный опыт работы с сертификатами, в том числе на материнский
        (семейный) капитал и военной ипотекой.</li>
    </ul>
    <h2>Преимущества сотрудничества с агентством недвижимости «Эксперт»</h2>
    <ul>
      <li>аккуратное соблюдение договорных обязательств и сроков выполнения услуг;</li>
      <li>гарантия прозрачности и чистоты сделок;</li>
      <li>высокий профессионализм специалистов;</li>
      <li>персональный подход к решению поставленной задачи;</li>
      <li>соблюдение действующего законодательства.</li>
    </ul>
    <p>Проконсультироваться по всем возникшим вопросам и уточнить детали сотрудничества можно по телефону
      +7 901 517-86-51, +7(49643)2–35–56</p>
    <e-btn @click="isPopupVisible = true" class="mt-6 btn-red">Оставить заявку</e-btn>
    <e-popup-form :fallback-income="fallback" :is-visible="isPopupVisible" @fallback-return="fallback = false"
      @close="isPopupVisible = !isPopupVisible">
      <template v-slot:header>
        <h3 class="">Оставить заявку</h3>
      </template>
      <template v-slot:content>
        <form @submit.prevent="sendData($event)">
          <div class="grid gap-4 mb-4">
            <e-input v-model="name" required placeholder="Имя*"></e-input>
            <e-input mask="+{7} {9}00 000-00-00" type="phone" v-model="phone" required placeholder="Телефон*"></e-input>
            <e-input type="email" v-model="email" placeholder="Email"></e-input>
            <ETextarea style="resize: none;" rows="5" v-model="comment" placeholder="Комментарий" />
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
<style scoped>
h2,
p {
  margin: 20px 0;
}

h2 {
  font-weight: 700;
  font-size: 24px;
}

ul li {
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 20px 0;
  align-items: baseline;
  justify-content: center;
}

ul li::before {
  margin-right: 20px;
  display: inline-block;
  content: '';
  background: var(--red);
  min-width: 7px;
  height: 7px;
  border-radius: 99px;
}</style>
