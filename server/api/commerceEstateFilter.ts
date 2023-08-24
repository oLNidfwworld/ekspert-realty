/* Здесь храним свойства фильтра для раздела квартир, при необходимости сортировки поменяйте местами объекты массива */
export default defineEventHandler((event) => {
    return {
        filter: [
            {
                label: 'Объект недвижимости',
                name: 'OBJECT_TYPE',
                type: 'multiSelector',
                data: [
                    {name: 'Офисное помещение',value: 'office'},
                    {name: 'Помещение свободного назначения',value: 'any_goal_room'},
                    {name: 'Торговое помещение',value: 'trade_space'},
                    {name: 'Складское помещение',value: 'warehouse'},
                    {name: 'Гараж и машиноместо',value: 'garage'},
                    {name: 'Земельный участок',value: 'area'},
                    {name: 'Отдельно стоящее здание',value: 'separate_building'},
                    {name: 'Производственное помещение',value: 'factory_room'},
                    {name: 'Гостиничная недвижимость',value: 'hotel_real_estate'},
                    {name: 'Помещение под автосервис',value: 'pomesh_autoservice'},
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
                    {name : 'Павловский посад', value : 'pavlovskiy_posad'},
                    {name : 'Орехово-зуево', value : 'orekhovo_zuevo'},
                    {name : 'Домодедово', value : 'domodedovo'},
                    {name : 'Мытищи', value : 'mytishchi'},
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
            }
        ]
    }
})
