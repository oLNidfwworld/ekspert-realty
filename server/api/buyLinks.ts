/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Вторичную',
                url: '/realty/buy/sub-flats_and_rooms'
            },
            {
                name:'Новостройки',
                url: '/realty/buy/sub-novostroiky'
            },
            {
                name:'Загородную',
                url: '/realty/buy/sub-zagorodnaya'
            },
            {
                name:'Коммерческую',
                url: '/realty/buy/sub-ar_kommerchskaya'
            },
        ]
    }
})
