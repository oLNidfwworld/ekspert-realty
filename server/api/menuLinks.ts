/* Здесь храним пункты меню для навигации по сайту (для шапки и подвала) */
export default defineEventHandler((event) => {
    return {
        links: [
            {
                name:'Услуги',
                url: '/services/'
            },
            {
                name:'Юр. услуги',
                url: '/act-help/'
            },
            {
                name:'Ипотека',
                url: '/services/mortpage/'
            },
            {
                name:'О компании',
                url: '/about/'
            },
            {
                name:'Контакты',
                url: '/contacts/'
            },
            {
                name:'Участки Трубицыно',
                url: '/bargaining/'
            },
        ]
    }
})
