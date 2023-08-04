<script setup>
const mapCenter = ref([55.780826, 38.670362])

const controls = ['fullscreenControl'];
const detailedControls = { zoomControl: { position: { right: 10, top: 50 } } };
</script>
<template>
  <div  >

    <div class="grid gap-4 md:grid-cols-[3fr,2fr]">
      <div>
        <img src="/ekspert-photo.webp"/>
      </div>
      <div class="flex flex-col justify-around">
        <div class="pl-10 grid gap-4">
          <a href='tel:+7 (901) 517-86-51' class="flex ">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" x="0" y="0" viewBox="0 0 513.64 513.64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="m499.66 376.96-71.68-71.68c-25.6-25.6-69.12-15.359-79.36 17.92-7.68 23.041-33.28 35.841-56.32 30.72-51.2-12.8-120.32-79.36-133.12-133.12-7.68-23.041 7.68-48.641 30.72-56.32 33.28-10.24 43.52-53.76 17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12 0L18.38 62.08c-48.64 51.2 5.12 186.88 125.44 307.2s256 176.641 307.2 125.44l48.64-48.64c17.921-20.48 17.921-51.2 0-69.12z" fill="#ff3a3a" data-original="#000000" class=""></path></g></svg>
            <span class="ml-2">+7 (901) 517-86-51</span>
          </a>
          <a href='tel:+7 (901) 517-86-51' class="flex ">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" x="0" y="0" viewBox="0 0 97.713 97.713" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M48.855 0C29.021 0 12.883 16.138 12.883 35.974c0 5.174 1.059 10.114 3.146 14.684 8.994 19.681 26.238 40.46 31.31 46.359a2.003 2.003 0 0 0 3.034 0c5.07-5.898 22.314-26.676 31.311-46.359 2.088-4.57 3.146-9.51 3.146-14.684C84.828 16.138 68.69 0 48.855 0zm0 54.659c-10.303 0-18.686-8.383-18.686-18.686 0-10.304 8.383-18.687 18.686-18.687s18.686 8.383 18.686 18.687c.001 10.303-8.382 18.686-18.686 18.686z" fill="#ff3a3a" data-original="#000000" class=""></path></g></svg>
            <span class="ml-2">МО, г. Павловский Посад, ул. Кирова 91</span>
          </a>
          <a href='tel:+7 (901) 517-86-51' class="flex ">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill-rule="evenodd" d="M256 512C114.841 512 0 397.159 0 256S114.841 0 256 0s256 114.841 256 256-114.841 256-256 256zm132.758-166.069a5.732 5.732 0 0 0 5.725-5.725V179.489l-130.25 103.432c-2.41 1.915-5.323 2.872-8.234 2.872s-5.823-.958-8.234-2.872L117.516 179.489v160.717a5.732 5.732 0 0 0 5.725 5.725zm-19.96-179.862L256 255.644l-112.799-89.575zm52.168 5.725v168.414c0 17.759-14.449 32.208-32.208 32.208H123.241c-17.76 0-32.207-14.449-32.207-32.208V171.794c0-17.759 14.448-32.207 32.207-32.207h265.517c17.759-.001 32.208 14.448 32.208 32.207z" clip-rule="evenodd" fill="#ff3a3a" data-original="#000000" class=""></path></g></svg>
            <span class="ml-2">ekspert07@bk.ru</span>
          </a>
        </div>
        <div class="graph ">
          <div class="absolute bg-white z-[3] -top-[10px] left-0 right-0 m-auto w-fit h-fit">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="24" height="24" x="0" y="0" viewBox="0 0 443.294 443.294" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M221.647 0C99.433 0 0 99.433 0 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647S343.861 0 221.647 0zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z" fill="#ff3a3a"  data-original="#000000" class=""></path><path d="M235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z" fill="#ff3a3a"  data-original="#000000" class=""></path></g></svg>
          </div>
            Пн. – Чт.: с 9:00 до 18:00<br>
          Пт.: с 9:00 до 17:00<br>
          Сб.: с 10:00 до 16:00<br>
          Вс.: Выходной<br>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <ClientOnly>
        <YandexMap style="height: 300px" :controls="controls" :detailed-controls="detailedControls" :coordinates="mapCenter">
          <YandexMarker  :coordinates="[55.780826, 38.670362]" :options="{
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/ekspertMarker.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-25,-55]
          }" :marker-id="`home`">
            <template #component>
              <div class="yandex-balloon">
                <p class="mb-3">Мы</p>

              </div>
            </template>
          </YandexMarker>
        </YandexMap>
      </ClientOnly>
    </div>
  </div>
  <div class="absaz" style="margin-top:80px;">
    <div class="inside" style="position:relative;">
      <h2 class="spec spec_f"><span class="name">Как добраться:</span>  </h2>
       </div>
    <p>
      <b>На электричке:</b>
      С Курского вокзала доехать до ж/д станции Павловский Посад(приблизительное время в пути 1час 10минут), выйти в город на Привокзальную площадь. Далее 700 метров пешком до ДК «Октябрь».
    </p>
    <p>
      <b>На автомобиле: </b>
      По Горьковскому шоссе проехать 55км от МКАД до дер.Кузнецы, затем после указателя Павловский Посад повернуть направо, далее двигаться 7км по главной дороге до Площади Революции, на площади свернуть налево на ул.Кирова и проехать до дома № 91/20.
      А если вы используете навигатор, то можно воспользоваться GPS координатами (55.780826, 38.670353).
    </p>
    <p>
      <b>На автобусе:</b>
      От станции метро Партизанская на автобусе № 386 доехать до города Павловский Посад, остановка ул.Герцена, затем повернуть направо, пройти 150 метров пешком и вы на месте.
    </p>
    <p>
      Если у вас возникли вопросы, предложения, или вы хотите отправить заявку, вы можете использовать форму ниже или связаться по любому из указанных выше контактов.
    </p>
  </div>
</template>

<style scoped>
.graph{
  margin-top:25px;
  position: relative;
  border:1px solid var(--grey-light);
  padding: 25px 40px;
}
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