// https://nuxt.com/docs/api/configuration/nuxt-config
import keywords from "ajv-keywords";
import { type } from "mlly";
export default defineNuxtConfig({
    nitro: {
        preset: 'node-server'
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            UPLOAD_URL: process.env.UPLOAD_URL,
            dev : process.env.UPLOAD_URL
        },
    },
    app: {
        // pageTransition: {
        //     name: 'page-fading',
        //     mode: 'out-in', // default
        // },
        // layoutTransition : { 
        //         name: 'page-fading',
        //         mode: 'out-in' // default
        // }
        head : {
            meta : [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0' }
            ],
            
        }
    },
    build : {
        transpile: ["primevue"]
    },
    head: [
        { rel: 'icon', type: 'image/x-icon', href: '/public/favicon.ico' },
    ],
    loadingIndicator: {
        color: '#E02D1F',
    },
    modules: [
        '@nuxtjs/tailwindcss',
        "@nuxtjs/robots",
        ['@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            }
        ],
        [
            '@nuxtjs/yandex-metrika',
            {
              id: '5096872',
              clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true

            }
          ],
        '@nuxt/image-edge',
        '@vueuse/nuxt',
        'nuxt-icons',
        'nuxt-swiper',

    ],
    publicRuntimeConfig: {
        yandexMetrika: {
          id: 5096872,
          // ...
        }
      },
    routeRules: {
        '/contacts/index.php': {
            redirect : {
                to : "/contacts",
                statusCode : 301,
            }
        },
    },
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/resets.css',
        '~/assets/css/vars.css',
        '~/assets/fonts/OpenSans.css',
        "/node_modules/primevue/resources/themes/lara-light-blue/theme.css"
    ],
    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs" 
    },
    ssr : true,
})
