import {Ref} from "vue";
import {RemovableRef} from "@vueuse/shared";
import {navigateTo} from "#app";
import {useAsyncData} from "nuxt/app";
import {useApiFetch} from "~/composables/api";

export const useFilterStore = defineStore('filter', () =>{
    const filterResult = <Ref>ref([]);
    const filterType = <Ref>ref('buy');


    const filterCity = <Ref>ref('all-cities');
    const filterServiceType = <Ref>ref('buy');
    const filterImmovableType = <Ref>ref('vtorichka');
    const filterImmovableProp = <Ref>ref('all-immovable-properties');
    const filterImmovablePropParams = <Ref>ref('');
 
    const pageTitle  = ref('');

    const mapData = ref(null);

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
                    if(el.inUrl != false){
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
                    }else{
                        let tmp : string = ''
                        if(el.value.length !== 0){
                            el.value.forEach((elVal,i)=>{
                                if(i<=0){
                                    tmp  += elVal.value;
                                }else{
                                    tmp  += '-'.concat(elVal.value);
                                }
                            })
                            if(paramsPart == ''){
                                paramsPart += `?${el.name}=${String(tmp)}`
                            }else{
                                paramsPart += `&${el.name}=${String(tmp)}`
                            }
                        }
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
    const filterItemById = async (params: Object) => {
        filterResult.value = await useApiFetch('/Filter/', {
            method: 'POST',
            params: { id: params}
        })
    }
    const filterThisShitForMap = async (params: Object) => {
        await formatParams(params);
        mapData.value = await useApiFetch(`/CatalogReborn/${filterCity.value}/${filterServiceType.value}/${filterImmovableType.value}/${filterImmovableProp.value}/${filterImmovablePropParams.value}`,
            {
                query: {
                    page: `page-1`,
                    size: `10000000`
                }
            }
            )
            pageTitle.value = mapData.value.h1
    }
    return {
        setFilterServiceType,
        setFilterImmovableType,
        filterThisShitForMap,
        pageTitle, 
        filterCity,
        filterServiceType,
        mapData,
        filterImmovableProp,
        filterImmovablePropParams,
        filterImmovableType,
        filterResult, 
        filterThisShit,
        filterType,
        setFilterType,
        filterItemById,
    }
});
