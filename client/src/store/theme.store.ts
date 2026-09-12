import { create } from "zustand";
import { IThemeStore, themeType } from '../dto'
import { getItem, setItem } from "../utils";

export const useThemeStore = create<IThemeStore>((set, get) => ({
    currentTheme: (getItem('currentTheme') as themeType) || 'dark',
    getTheme: () => get().currentTheme,
    setTheme: (theme) => {
        set({currentTheme: theme})
        document.documentElement.setAttribute('data-theme', theme)
        setItem('currentTheme', get().currentTheme)
    },
    initTheme: () => {
        const theme: themeType = get().currentTheme || 'dark'
        document.documentElement.setAttribute('data-theme', theme)}
}));