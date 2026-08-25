import { create } from 'zustand'
import { IAuthStore, IRefresh } from '../dto/'
import { DeleteCookie, GetCookie, SetCookie } from '../utils'
import { authApi } from '../api'

export const useAuthStore = create<IAuthStore>((set, get) => ({
    isAuth: false,
    setAuth: (isAuth) => set({ isAuth }),
    logout: () => {
        DeleteCookie('accessToken')
        DeleteCookie('refreshToken')
        set({ isAuth: false })
    },
    checkTokens: () => {
        const accessToken = GetCookie('accessToken')
        const refreshToken = GetCookie('refreshToken')
        const hasTokens = !!(accessToken && refreshToken)
        set({ isAuth: hasTokens })
        return hasTokens
    },
    initAuth: async () => {
    const accessToken = GetCookie('accessToken')
    const refreshToken = GetCookie('refreshToken')
    if (!accessToken || !refreshToken) {
        set({ isAuth: false })
        return false
    } try {
        const res = await authApi.Refresh({ refreshToken })
        if (res?.data?.accessToken && res?.data?.refreshToken) {
            SetCookie('accessToken', res.data.accessToken, 1/96)
            SetCookie('refreshToken', res.data.refreshToken, 7)
            set({ isAuth: true })
            return true}
        set({ isAuth: false })
        return false
    } catch(error) {
        console.log(error)
        set({ isAuth: false })
        return false
        }
    }
}))