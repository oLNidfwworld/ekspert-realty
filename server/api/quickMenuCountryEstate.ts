/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Купить дом',
                url: '/realty/buy/house-flats-all'
            },
            {
                name:'Купить долю',
                url: '/realty/buy/part-flats-all'
            },
            // {
            //     name:'Купить участок',
            //     url: '/realty/buy/2-flats-all'
            // },
            {
                name:'Купить дачу',
                url: '/realty/buy/dacha-flats-all'
            }

        ]
    }
})
