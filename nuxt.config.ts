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
            RESOURCE_URL: process.env.RESOURCE_URL, 
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
            link  : [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    build : {
        transpile: ["primevue"]
    }, 
    loadingIndicator: {
        color: '#E02D1F',
    },
    modules: [
        '@nuxtjs/tailwindcss',
        // "@nuxtjs/robots",
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
    routeRules: {
        '/mortgage//': {
            redirect : {
                to : "/services/mortpage/",
                statusCode : 301,
            }
        }, 
        '/test//': {
            redirect : {
                to : "https://sliva24.ru",
                statusCode : 301,
            }
        }, 
        '/contact//': {
            redirect : {
                to : "/contacts//",
                statusCode : 301,
            }
        }, 
        '/services/customers.php': {
            redirect : {
                to : "/services/customers/",
                statusCode : 301,
            }
        },
        '/services/sellers.php': {
            redirect : {
                to : "/services/sellers/",
                statusCode : 301,
            }
        },
        '/services/tenants.php': {
            redirect : {
                to : "/services/tenants/",
                statusCode : 301,
            }
        },
        '/services/srochnyy-vykup-kvartir.php': {
            redirect : {
                to : "/services/srochnyy-vykup-kvartir/",
                statusCode : 301,
            }
        },
        '/juridical/act-help.php': {
            redirect : {
                to : "/act-help/",
                statusCode : 301,
            }
        },
        '/realty/rooms_and_flats//': {
            redirect : {
                to : "/realty/all-cities/buy/vtorichka/",
                statusCode : 301,
            }
        },
        '/realty/rooms_and_flats/komnata-v-pp//': {
            redirect : {
                to : "/realty/pavlovskiy_posad/buy/vtorichka/komnata/",
                statusCode : 301,
            }
        },
        '/realty/rooms_and_flats/kvartira-1-komnatnaya//': {
            redirect : {
                to : "/realty/all-cities/buy/vtorichka/dnokomnatnye/",
                statusCode : 301,
            }
        },
        '/realty/rooms_and_flats/kvartira-1-komnatnaya-v-pp//': {
            redirect : {
                to : "/realty/pavlovskiy_posad/buy/vtorichka/dnokomnatnye/",
                statusCode : 301,
            }
        },
        '/realty/rooms_and_flats/kvartira-2-komnatnaya-v-pp//': {
            redirect : {
                to : "/realty/pavlovskiy_posad/buy/vtorichka/dvuhkomnatnye/",
                statusCode : 301,
            }
        },
        '/realty/rooms_and_flats/kvartira-3-komnatnaya//': {
            redirect : {
                to : "/realty/all-cities/buy/vtorichka/tryohkomnatnye/",
                statusCode : 301,
            }
        },
        '/realty/rooms_and_flats/kvartira-3-komnatnaya-v-pp//': {
            redirect : {
                to : "/realty/pavlovskiy_posad/buy/vtorichka/tryohkomnatnye/",
                statusCode : 301,
            }
        },
        '/realty/country_real_estate//': {
            redirect : {
                to : "/realty/all-cities/buy/zagorodnaya/",
                statusCode : 301,
            }
        },
        '/realty/commercial_real_estate//': {
            redirect : {
                to : "/realty/all-cities/buy/commerce/",
                statusCode : 301,
            }
        },
        '/realty/commercial_real_estate/offices//': {
            redirect : {
                to : "/realty/all-cities/buy/commerce/office/",
                statusCode : 301,
            }
        },
        '/realty/commercial_real_estate/svobodnoye-naznachenie//': {
            redirect : {
                to : "/realty/all-cities/buy/commerce/any_goal_room/",
                statusCode : 301,
            }
        },
        '/realty/commercial_real_estate/torgovoe-pomeshenie//': {
            redirect : {
                to : "/realty/all-cities/buy/commerce/trade_space/",
                statusCode : 301,
            }
        },
        '/realty/commercial_real_estate/zemlya//': {
            redirect : {
                to : "/realty/all-cities/buy/commerce/area/",
                statusCode : 301,
            }
        },
        '/realty/rent/rent_flats_and_romms//': {
            redirect : {
                to : "/realty/all-cities/rent/vtorichka/",
                statusCode : 301,
            }
        },
        '/realty/rent/commerc//': {
            redirect : {
                to : "/realty/all-cities/rent/commerce/",
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
