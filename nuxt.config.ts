// https://nuxt.com/docs/api/configuration/nuxt-config
import keywords from "ajv-keywords";

export default defineNuxtConfig({
    nitro: {
        preset: 'node-server'
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            UPLOAD_URL: process.env.UPLOAD_URL
        },
    },
    app: {
        pageTransition: {
            name: 'page-fading',
            mode: 'out-in' // default
        },
    },
    head: [
        { rel: 'icon', type: 'image/x-icon', href: '/public/favicon.ico' },

    ],
    modules: [
        'nuxt-simple-sitemap',
        '@nuxtjs/tailwindcss',
        ['@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            }
        ],
        '@nuxt/image-edge',
        '@vueuse/nuxt',
        'nuxt-icons',
        'nuxt-swiper',

    ],
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/resets.css',
        '~/assets/css/vars.css',
        '~/assets/fonts/OpenSans.css'
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
    ssr : true
})
