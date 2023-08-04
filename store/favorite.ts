import {RemovableRef} from "@vueuse/shared";
import {skipHydrate} from "pinia";

export const useFavoriteStore = defineStore('favorite', () =>{
    const favoriteList: number[] = ref(useLocalStorage('favoriteList', []))
    const isFavorite = (id:number) => computed(()=> {
        if(favoriteList.value.find(el => el === id)){
            return true
        }
        return false
    })
    const addToFavorite = async (id:number) => {
        if(favoriteList.value.find(el => el === id)){
            favoriteList.value = favoriteList.value.filter((e:number) => {
                return e !== id;
            })
        } else {
            favoriteList.value.push(id)
        }
    };
    return {
        favoriteList: skipHydrate(favoriteList),
        addToFavorite,
        isFavorite
    }
});
