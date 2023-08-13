/* Здесь храним свойства фильтра для раздела квартир, при необходимости сортировки поменяйте местами объекты массива */
export default defineEventHandler((event) => {
    return {
        filter: [
            {
                label: 'Объект недвижимости',
                name: 'OBJECT_TYPE',
                type: 'multiSelector',
                data: [
                    {name: 'Комната',value: 'room'},
                    {name: '1к',value: '1'},
                    {name: '2к',value: '2'},
                    {name: '3к',value: '3'},
                    {name: '4+',value: '4'}
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
                    {name : 'Павловский посад', value : 'pp'},
                    {name : 'Орехово-зуево', value : 'oz'},
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
