'use client'

import { useState, useEffect } from "react"

export const ButtonSwitchTheme = () => {
    const [dark, setDark] = useState(true)
    const SwitchTheme = () => setDark(!dark)
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    }, [dark])
    return (
        <div className='buttonSwitchTheme'>
        <button 
        className={dark ? 'on' : 'off'}
        onClick={SwitchTheme}
        >
        {dark ? '🌙' : '☀️'}
        </button>
        </div>
    )
}