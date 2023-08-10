export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== from.path && process.client) {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
})