/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Покупателям',
                url: '/services/customers/'
            },
            {
                name:'Продавцам',
                url: '/services/sellers/'
            },
            {
                name:'Арендаторам',
                url: '/services/tenants/'
            },
            {
                name:'Арендодателям',
                url: '/services/lessors/'
            },
            {
                name:'Срочный выкуп',
                url: '/services/srochnyy-vykup-kvartir/'
            },
            {
                name:'Ипотека',
                url: '/services/mortpage/'
            },
        ]
    }
})
