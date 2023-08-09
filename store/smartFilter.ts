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
    const filterImmovableProp = <Ref>ref('');
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
        await params.forEach((el)=>{
            switch (el.type){
                case 'multiInput':
                    if(el.value !== null){
                        if(paramsPart === ''){
                            paramsPart += `?${el.name}=${String(el.value.min)}between${String(el.value.max)}`;
                        }else{
                            paramsPart += `&${el.name}=${String(el.value.min)}between${String(el.value.max)}`;
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
                    break;
                case 'multiSelect':
                    if(el.value !== null ){
                        filterCity.value = ''
                        el.value.forEach((elVal,i)=>{
                            if(i<=0){
                                filterCity.value += elVal;
                            }else{
                                filterCity.value += '-'.concat(elVal);
                            }
                        })
                        if(filterCity.value == ''){
                            filterCity.value = 'all-cities';
                        }
                    }else{
                        filterCity.value = 'all-cities';
                    }
                    break;
            }
        })
        console.log(filterCity.value)
    }
    const filterThisShit = async (params: Object) => {
        formatParams(params);
        navigateTo();
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
