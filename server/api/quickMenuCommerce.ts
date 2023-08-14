/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Офисные помещения',
                url: '/realty/all-cities/all-services-types/commerce/office/'
            },
            {
                name:'Помещения свободного назначения',
                url: '/realty/all-cities/buy/commerce/any_goal_room/'
            },
            {
                name:'Торговое помещение',
                url: '/realty/all-cities/buy/commerce/trade_space/'
            },
            {
                name:'Гараж и машиноместо',
                url: '/realty/all-cities/buy/commerce/garage/'
            },
            {
                name:'Земельный участок',
                url: '/realty/all-cities/buy/commerce/area/'
            }
        ]
    }
})
