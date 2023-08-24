/* Здесь храним свойства фильтра для раздела квартир, при необходимости сортировки поменяйте местами объекты массива */
export default defineEventHandler((event) => {
    return {
        filter: [
            {
                label: 'Объект недвижимости',
                name: 'OBJECT_TYPE',
                type: 'multiSelector',
                data: [
                    {name: 'Комната',value: 'komnata'},
                    {name: '1к',value: 'dnokomnatnye'},
                    {name: '2к',value: 'dvuhkomnatnye'},
                    {name: '3к',value: 'tryohkomnatnye'},
                    {name: '4+',value: 'chetyryohkomnatnye'}
                ],
                value: []
            },
            {
                label: 'Цена',
                name: 'pricerange',
                type: 'multiInput',
                data: {
                    min: 0,
                    max: 9999999
                },
                value: null
            },
            {
                label: 'Общая площадь, м2',
                name: 'totalarea',
                type: 'multiInput',
                data: {
                    min: 0,
                    max: 9999999
                },
                value: null
            },
            {
                label: 'Этаж',
                name: 'floors',
                type: 'multiInput',
                data: {
                    min: 0,
                    max: 99
                },
                value: null
            },
            {
                label: 'Город',
                name: 'Location',
                type: 'multiSelect',
                data: [
                    {name : 'Павловский посад', value : 'pavlovskiy_posad'},
                    {name : 'Орехово-зуево', value : 'orekhovo_zuevo'},
                    {name : 'Домодедово', value : 'domodedovo'},
                    {name : 'Мытищи', value : 'mytishchi'},
                ],
                value: null
            },
            {
                label: 'Тип дома',
                name: 'housetype',
                type: 'multiSelector',
                inUrl : false,
                data: [
                    {name: 'кирпичный',value: 'brick'},
                    {name: 'монолитно-кирпичный',value: 'monolite_brick'},
                    {name: 'панельный',value: 'panel'},
                    {name: 'блочный',value: 'block'}
                ],
                value: []
            },
            {
                label: 'Ипотека',
                name: 'ipoteka',
                type: 'multiSelector',
                inUrl : false,
                data: [
                    {name: 'Есть возможность',value: 't'}
                ],
                value: []
            },
        ]
    }
})
