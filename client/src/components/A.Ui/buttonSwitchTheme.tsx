'use client'

import { useThemeStore } from "@/src/store"
import { useEffect } from "react"

export const ButtonSwitchTheme = () => {
    const { currentTheme, setTheme } = useThemeStore()
    const firstTheme = 'light'
    const secondTheme = 'dark'
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme)
    }, [currentTheme])
    const toggleTheme = () => {
        const newTheme = currentTheme == secondTheme ? firstTheme : secondTheme
        setTheme(newTheme)
    }
    return (
        <div className='buttonSwitchTheme'>
        <button
            className={currentTheme === secondTheme ? 'on' : 'off'}
            onClick={toggleTheme}>
            {currentTheme === 'dark' ? '🌙' : '☀️'}
        </button>
        </div>
    )
}