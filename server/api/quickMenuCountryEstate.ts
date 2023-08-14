/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Купить дом',
                url: '/realty/all-cities/buy/zagorodnaya/house/'
            },
            {
                name:'Купить долю',
                url: '/realty/all-cities/buy/zagorodnaya/part/'
            },
            // {
            //     name:'Купить участок',
            //     url: '/realty/buy/2-flats-all'
            // },
            {
                name:'Купить дачу',
                url: '/realty/all-cities/buy/zagorodnaya/dacha/'
            }

        ]
    }
})
