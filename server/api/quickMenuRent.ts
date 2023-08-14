/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'1-комнатные',
                url: '/realty/all-cities/rent/vtorichka/dnokomnatnye'
            },
            {
                name:'2-комнатные',
                url: '/realty/all-cities/rent/vtorichka/dvuhkomnatnye'
            },
            {
                name:'3-комнатные',
                url: '/realty/all-cities/rent/vtorichka/tryohkomnatnye'
            },
            // {
            //     name:'Квартиры-студии',
            //     url: '/realty/buy/2-flats-all'
            // },
            {
                name:'Комнаты в квартире',
                url: '/realty/all-cities/rent/vtorichka/komnata'
            },
        ]
    }
})
