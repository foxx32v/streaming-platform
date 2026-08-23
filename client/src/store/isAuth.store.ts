import { create } from 'zustand'
import { IAuthStore } from '../dto/';
import { DeleteCookie } from '../utils';

export const useAuthStore = create<IAuthStore>((set) => ({
    isAuth: false,
    setAuth: (isAuth) => set({ isAuth: isAuth }),
    logout: () => {
        DeleteCookie('accessToken')
        DeleteCookie('refreshToken')
        set({ isAuth: false })
    }
}))