import type { IApiResp } from "@/types/apiResp.interface"
import type { IUserLogin, IUserLoginResponse, IUserRegister } from "@/types/user.interface"

export default () => {
    const userSt = userStore()

    // TODO: Implement login
    const login = async (user: IUserLogin): Promise<IApiResp<IUserLoginResponse>> => {
        try {
            const resp = await useClientFetch<IApiResp<IUserLoginResponse>>('/auth/login', {
                credentials: 'include',
                method: 'POST',
                body: user
            })

            if (resp.statusCode === 200) {
                resp.data?.accessToken && userSt.setAccessToken(resp.data.accessToken)
                resp.data?.accessToken && userSt.setUser(resp.data.credentails)
                userSt.isLogin = true
            }

            return resp
        } catch (error: any) {
            console.log(error);
            return error.data
        }
    }

    // TODO: Implement register
    const register = async (user: IUserRegister) => { }

    // TODO: Implement logout
    const logout = async (): Promise<IApiResp<undefined>> => {
        try {
            const resp = await useClientFetch<IApiResp<undefined>>('auth/logout', {
                method: 'POST',
            })

            if (resp.statusCode === 200) {
                userSt.logout()
            }
            return resp
        } catch (error: any) {
            console.log("Error: ", error);
            return error.data
        }
    }

    // TODO: Implement forgotPassword
    const forgotPassword = async (email: string) => { }

    // TODO: Implement getAuthUser
    const getAuthUser = async () => {
        userSt.setIsAuthLoading(true)
        try {
            const resp = await useClientFetch<IApiResp<IUserLoginResponse>>('/auth/refresh-refresh-token', {
                credentials: 'include',
                method: 'POST'
            })

            if (resp.statusCode === 200) {
                resp.data?.accessToken && userSt.setAccessToken(resp.data.accessToken)
                resp.data?.accessToken && userSt.setUser(resp.data.credentails)
            }

            return resp
        } catch (error: any) {
            console.log("Error: ", error);
            return error.data
        } finally {
            userSt.setIsAuthLoading(false)
        }
    }

    // TODO: Implement refreshToken
    const refreshToken = async () => { }


    return { login, register, logout, forgotPassword, getAuthUser, refreshToken }
}