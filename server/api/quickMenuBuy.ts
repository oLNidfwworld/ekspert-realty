/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'1-комнатные',
                url: '/realty/buy/1-flats-all'
            },
            {
                name:'2-комнатные',
                url: '/realty/buy/2-flats-all'
            },
            {
                name:'3-комнатные',
                url: '/realty/buy/3-flats-all'
            },
            // {
            //     name:'Квартиры-студии',
            //     url: '/realty/buy/2-flats-all'
            // },
            {
                name:'Комнаты в квартире',
                url: '/realty/buy/room-flats-all'
            },
        ]
    }
})
