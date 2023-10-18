
import {Ref} from "vue";

export const useBargainingStore = defineStore('barg', () => {

    const lookOutObject : Ref<Object> = ref(null);

    const setLookOutObject = (newValue : Object) => {
        lookOutObject.value = newValue;
    }

    return {
        lookOutObject,
        setLookOutObject
    }
})