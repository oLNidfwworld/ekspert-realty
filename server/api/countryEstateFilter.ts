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
                name: 'Price',
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
                    'Павловский Посад',
                    'Орехово-Зуево',
                    'Ногинск',
                    'Электрогорск'
                ],
                value: null
            },
            {
                label: 'Площадь дома, м2',
                name: 'Square',
                type: 'multiInput',
                data: {
                    min: 0,
                    max: 9999999
                },
                value: null
            },
            {
                label: 'Площадь участка, м2',
                name: 'Square_sec',
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
                data: [
                    {name: 'Населённых пунктов (ИЖС)',value: '9e1ff630060e52cd144bab5a4d29ac38'},
                    {name: 'Сельхозназначения (СНТ, ДНП)',value: 'e19d016aa76ede57b97f10912284df7d'}
                ],
                value: []
            },
            {
                label: 'Тип дома',
                name: 'communication',
                type: 'multiSelector',
                data: [
                    {name: 'Электричество',value: '295104f8afb7acdf6d3f0c820d0642a8'},
                    {name: 'Газ',value: 'c2727c43d46884c995dd4da8db957fa3'},
                    {name: 'Вода',value: 'b82c46322f281aa7c661a8bcf42ece2c'},
                    {name: 'Канализация',value: '740f4bc687a10b6fec2525f04f5c370e'},
                    {name: 'Отопление',value: '5dbf6c492a9e9f5e57fce68f256a5ff5'}
                ],
                value: []
            }
        ]
    }
})
