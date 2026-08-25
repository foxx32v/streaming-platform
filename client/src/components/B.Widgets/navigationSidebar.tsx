'use client'

import { usePageStore } from "@/src/store"
import { Logo, ButtonSwitchTheme, ButtonSetState } from "../"
import { useState } from "react"

export const NavigationSidebar = () => {
    const { currentPage } = usePageStore()
    const [isOpen, setOpen] = useState(true)

    const SwitchOpenState = () => {
        setOpen(!isOpen)
    }
    return (
        <div>
        <button onClick={() => {SwitchOpenState()}} className={isOpen ? 'switchOpenButton' : 'switchOpenButtonClosed'}>-</button>
        <div className={isOpen ? 'navigationSidebarClosed' : 'navigationSidebar'}>
            <div className="sidebarHeader">
                <Logo size={32} />
                <h2>Perepihotic</h2>
            </div>
            <nav className="sidebarNav">
                <ButtonSetState page='feed' title='Feed' fullWidth />
                <ButtonSetState page='trending' title='Trending' fullWidth />
                <ButtonSetState page='categories' title='Categories' fullWidth />
                <ButtonSetState page='profile' title='Profile' fullWidth />
                <ButtonSetState page='subscriptions' title='Subscriptions' fullWidth />
                <ButtonSetState page='library' title='Library' fullWidth />
                <ButtonSetState page='history' title='History' fullWidth />
                <ButtonSetState page='watchLater' title='Watch Later' fullWidth />
                <ButtonSetState page='live' title='Live' fullWidth />
            </nav>
            <div className="sidebarFooter">
                <ButtonSwitchTheme />
                <ButtonSetState page='settings' title='Settings' fullWidth />
                <ButtonSetState page='logout' title='Logout' fullWidth />
            </div>
        </div>
        </div>
    )
}