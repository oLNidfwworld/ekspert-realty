import {RemovableRef} from "@vueuse/shared";
import {skipHydrate} from "pinia";
import {Ref} from "vue";

export const useSearchStore = defineStore('search', () =>{
    const lastSearchIds: Ref<number[]>= ref([]);
    const searchQuery: Ref<string> = ref('');
    const pullToArray = async  (params : Object, searchValue : string) => {
        if(params){
            for(const key in Object.keys(params)){
                lastSearchIds.value.push(params[key].id);
            }
        }
        searchQuery.value = searchValue;
    }

    const clearResult = ()=>{
        lastSearchIds.value = [];
        searchQuery.value = ''
    }

    return {
        lastSearchIds,
        searchQuery,
        pullToArray,
        clearResult
    }
});
