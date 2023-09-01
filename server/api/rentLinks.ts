/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Вторичную',
                url: '/realty/all-cities/rent/vtorichka/'
            },
            {
                name:'Загородную',
                url: '/realty/all-cities/rent/zagorodnaya/'
            },
            {
                name:'Коммерческую',
                url: '/realty/all-cities/rent/zagorodnaya/'
            },
        ]
    }
})
