'use client'

import { useThemeStore } from "@/src/store"
import { useEffect } from "react"

export const ButtonSwitchTheme = () => {
    const { currentTheme, setTheme } = useThemeStore()

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme)
    }, [currentTheme])
    const toggleTheme = () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
    }
    return (
        <div className='buttonSwitchTheme'>
        <button
            className={currentTheme === 'dark' ? 'on' : 'off'}
            onClick={toggleTheme}>
            {currentTheme === 'dark' ? '🌙' : '☀️'}
        </button>
        </div>
    )
}