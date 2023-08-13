/* Здесь храним свойства фильтра для раздела квартир, при необходимости сортировки поменяйте местами объекты массива */
export default defineEventHandler((event) => {
    return {
        filter: [
            {
                label: 'Объект недвижимости',
                name: 'OBJECT_TYPE',
                type: 'multiSelector',
                data: [
                    {name: 'Доли',value: 'part'},
                    {name: 'Дом/Коттедж',value: 'house'},
                    {name: 'Дача',value: 'dacha'},
                    {name: 'Земельный участок',value: 'area'}
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
                label: 'Площадь дома, м2',
                name: 'housearea',
                type: 'multiInput',
                data: {
                    min: 0,
                    max: 9999999
                },
                value: null
            },
            {
                label: 'Площадь участка, м2',
                name: 'plotarea',
                type: 'multiInput',
                data: {
                    min: 0,
                    max: 9999999
                },
                value: null
            },
            {
                label: 'Тип дома',
                name: 'earth_category',
                type: 'multiSelector',
                inUrl : false,
                data: [
                    {name: 'Населённых пунктов (ИЖС)',value: 'IJS'},
                    {name: 'Сельхозназначения (СНТ, ДНП)',value: 'SH'}
                ],
                value: []
            },
            {
                label: 'Коммуникации',
                name: 'communication',
                type: 'multiSelector',
                inUrl : false,
                data: [
                    {name: 'Электричество',value: 'electocity'},
                    {name: 'Газ',value: 'gas'},
                    {name: 'Вода',value: 'water'},
                    {name: 'Канализация',value: 'canalization'},
                    {name: 'Отопление',value: 'heating'}
                ],
                value: []
            }
        ]
    }
})
