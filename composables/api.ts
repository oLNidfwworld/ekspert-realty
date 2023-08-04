import {useFetch} from "#app";

export const useApiFetch = (url: string, options?: FetchOptions) => {
    const config = useRuntimeConfig()
    const router = useRouter()
    return $fetch(url, {
        ...options,
        async onResponse({ request, response, options }) {
        },
        async onResponseError({ request, response, options }) {
        },

        async onRequest({ request, options }) {
            options.baseURL = config.API_BASE_URL
        },
        async onRequestError({ request, options, error }) {
            console.log(options)
        }
    })
}
export const useApiFetchWithRefresh = (url: string, options?: FetchOptions) => {
    const config = useRuntimeConfig()
    return useFetch(url, {
        ...options,
        async onResponse({ request, response, options }) {
        },
        async onResponseError({ request, response, options }) {
        },

        async onRequest({ request, options }) {
            options.baseURL = config.API_BASE_URL
        },
        async onRequestError({ request, options, error }) {
            console.log(options)
        }
    })
}
