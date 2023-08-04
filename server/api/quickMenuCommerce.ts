/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Офисные помещения',
                url: '/realty/buy/1-flats-all'
            },
            {
                name:'Помещения свободного назначения',
                url: '/realty/buy/2-flats-all'
            },
            {
                name:'Торговое помещение',
                url: '/realty/buy/2-flats-all'
            },
            {
                name:'Гараж и машиноместо',
                url: '/realty/buy/2-flats-all'
            },
            {
                name:'Земельный участок',
                url: '/realty/buy/2-flats-all'
            }
        ]
    }
})
