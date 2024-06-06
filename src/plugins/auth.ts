export default defineNuxtPlugin(async (nuxtApp) => {
    const userSt = userStore()
    const auth = useAuth()
    await auth.getAuthUser()

    addRouteMiddleware('auth', (to) => {
        if (to.path === "/auth/login" && userSt.credentials) {
            return navigateTo("/")
        }

        if (to.path !== "/auth/login" && !userSt.credentials) {
            return navigateTo("/auth/login");
        }
    }, { global: true })
})
