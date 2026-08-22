'use client'

import { usePageStore } from "@/src/store"
import { HeaderAuth, LoginForm, RegisterForm, CardVerifyEmail, HomePage, FooterAuth } from "@/src/components"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const PageAuth = () => {
    const { currentPage, setPage } = usePageStore()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    useEffect(() => {
        if (token) {setPage('cardVerify')}
    }, [token, setPage])

    const renderPage = () => {
    switch (currentPage) {
        case 'home': return <HomePage />
        case 'login': return <LoginForm />
        case 'register': return <RegisterForm />
        case 'cardVerify': return <CardVerifyEmail />
        default: return <HomePage />
        }
    }

    return (
        <div className="pageAuth">
            <HeaderAuth/>
            {renderPage()}
            <FooterAuth/>
        </div>
    )
}