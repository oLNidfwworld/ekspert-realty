import plugin from 'vue-yandex-maps'
import { defineNuxtPlugin } from 'nuxt/app'

const settings = {
    apiKey: '9a74ccbe-ff50-45b7-89c8-363048b8c216', // Индивидуальный ключ API
    lang: 'ru_RU', // Используемый язык
    coordorder: 'latlong', // Порядок задания географических координат
    debug: true, // Режим отладки
    version: '2.1' // Версия Я.Карт
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(plugin, settings)
})
