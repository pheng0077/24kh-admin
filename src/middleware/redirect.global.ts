export default defineNuxtRouteMiddleware((to, from) => {
    const user = userStore()

    if (to.path === '/' && user.credentials) {
        return navigateTo('/home')
    }
})
