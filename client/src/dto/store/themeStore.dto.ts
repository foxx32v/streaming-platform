export type themeType =
'light' | 'dark' | 'midnight'

export interface IThemeStore {
    currentTheme: themeType
    getTheme: () => themeType
    setTheme: (theme: themeType) => void
    atStart: () => void
}