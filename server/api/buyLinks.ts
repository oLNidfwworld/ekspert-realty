/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return { 
        links: [
            {
                name:'Вторичную',
                url: '/realty/all-cities/buy/vtorichka/'
            },
            {
                name:'Загородную',
                url: '/realty/all-cities/buy/zagorodnaya/'
            },
            {
                name:'Коммерческую',
                url: '/realty/all-cities/buy/zagorodnaya/'
            },
        ]
    }
})
