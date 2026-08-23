'use client'

import { useAuth } from "@/src/hooks"
import { useAuthStore, usePageStore } from "@/src/store"
import { useSearchParams } from "next/navigation"

export const LogoutForm  = () => {
    const { setPage } = usePageStore()
    const searchParams = useSearchParams()
    const { Logout } = useAuth()
    const { logout } = useAuthStore()

    const SendLogout = async () => {
        await Logout
        logout()
        setPage('home')
    }

    return (
        <div className="logoutForm">
            <h2>Logout</h2>
            <p className="textPrimary">Do you really want to log out?</p>
            <button onClick={SendLogout} >Logout</button>
            <button onClick={() => setPage('feed')} className="link">Cancel</button>
        </div>
    )
}