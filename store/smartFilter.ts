import {Ref} from "vue";
import {RemovableRef} from "@vueuse/shared";
import {navigateTo} from "#app";

export const useFilterStore = defineStore('filter', () =>{
    const filterParams: RemovableRef<string> = useSessionStorage('filterParams', [])
    const filterResult = <Ref>ref([]);
    const filterType = <Ref>ref('buy');


    const filterCity = <Ref>ref('all-cities');
    const filterServiceType = <Ref>ref('buy');
    const filterImmovableType = <Ref>ref('vtorichka');
    const filterImmovableProp = <Ref>ref('all-immovable-properties');
    const filterImmovablePropParams = <Ref>ref('');

    const setFilterServiceType = async  (params: Object) => {
        filterServiceType.value = await params;
    }
    const setFilterImmovableType = async  (params: Object) => {
        filterImmovableType.value = await params;
    }

    /* Устанавливаем параметры фильтра (куприть или арендовать)*/
    const setFilterType = (params: String) => {
        filterType.value = params
    }
    const formatParams = async (params: Object) => {
        let paramsPart : string = '' ;
        let urlPart : string = '' ;
        let cityPart : string = '';
        toRaw(params).forEach((el)=>{
            switch (el.type){
                case 'multiInput':
                    const elValue = el?.value;
                    if(elValue && (elValue.min !== '') && (elValue.max !== '')){
                        if(paramsPart === ''){
                            paramsPart += `?${el.name}=${String(elValue.min)}between${String(elValue.max)}`;
                        }else{
                            paramsPart += `&${el.name}=${String(elValue.min)}between${String(elValue.max)}`;
                        }
                    }
                    break;
                case 'multiSelector':
                    el.value.forEach((elVal,i)=>{
                        if(i<=0){
                            urlPart += elVal.value;
                        }else{
                            urlPart += '-'.concat(elVal.value);
                        }
                    })
                    if(urlPart == ''){
                        urlPart = 'all-immovable-properties';
                    }
                    break;
                case 'multiSelect':
                    if(el.value !== null ){
                        cityPart = ''
                        el.value.forEach((elVal,i)=>{
                            if(i<=0){
                                cityPart += elVal;
                            }else{
                                cityPart += '-'.concat(elVal);
                            }
                        })
                        if(cityPart == ''){
                            cityPart = 'all-cities';
                        }
                    }else{
                        cityPart = 'all-cities';
                    }
                    break;
            }
        })
        filterCity.value = cityPart;
        filterImmovableProp.value = urlPart;
        filterImmovablePropParams.value =  paramsPart;
    }
    const filterThisShit = async (params: Object) => {
        await formatParams(params);
        navigateTo(`/realty/${filterCity.value}/${filterServiceType.value}/${filterImmovableType.value}/${filterImmovableProp.value}/${filterImmovablePropParams.value}`)
    }
    const nullifyFilterResult = () => {
        filterResult.value = [];
    }
    const filterItemById = async (params: Object) => {
        filterResult.value = await useApiFetch('/Filter/', {
            method: 'POST',
            params: { id: params}
        })
    }
    return {
        setFilterServiceType,
        setFilterImmovableType,
        filterCity,
        filterServiceType,

        filterParams,
        filterResult,
        nullifyFilterResult,
        filterThisShit,
        filterType,
        setFilterType,
        filterItemById,
    }
});
