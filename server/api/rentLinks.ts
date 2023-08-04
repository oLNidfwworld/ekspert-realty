/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Вторичную',
                url: '/realty/rent/sub-ar_vtorichka'
            },
            {
                name:'Загородную',
                url: '/realty/rent/sub-ar_kommerchskaya'
            },
            {
                name:'Коммерческую',
                url: '/realty/rent/sub-ar_zagorodnaya'
            },
        ]
    }
})
