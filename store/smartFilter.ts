import {Ref} from "vue";

export const useFilterStore = defineStore('filter', () =>{
    const filterParams: RemovableRef<string> = useSessionStorage('filterParams', [])
    const filterResult = <Ref>ref([]);
    const filterType = <Ref>ref('buy');
    const setParams = async (params: Object) => {
        filterParams.value = params
    };
    const formatParams = (params: Object) => {
        let formatted:Object = {}
        params.forEach((el) => {
            formatted[el.name] = JSON.stringify(el.value)
        }
        )
        return formatted
    }
    /* Устанавливаем параметры фильтра (куприть или арендовать)*/
    const setFilterType = (params: String) => {
        filterType.value = params
    }
    const filterThisShit = async (params: Object) => {
        await setParams(params);
        filterResult.value = await useApiFetch('/Filter/', {
            method: 'POST',
            params: { sectionCode: filterType.value, ...formatParams(params)}
        })
    }
    const nullifyFilterResult = () => {
        filterResult.value = [];
    }
    const filterItemById = async (params: Object) => {
        await setParams(params);
        filterResult.value = await useApiFetch('/Filter/', {
            method: 'POST',
            params: { id: params}
        })
    }
    return {
        filterParams,
        filterResult,
        setParams,
        nullifyFilterResult,
        filterThisShit,
        filterType,
        setFilterType,
        filterItemById
    }
});
