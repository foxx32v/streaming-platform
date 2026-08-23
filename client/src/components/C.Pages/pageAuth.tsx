'use client'

import { useAuthStore, usePageStore } from "@/src/store"
import { HeaderAuth, LoginForm, RegisterForm, CardVerifyEmail, HomePage, FooterAuth, FeedPage, ProfilePage, TrendingPage, CategoriesPage, AboutPage, LogoutForm } from "@/src/components"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const PageAuth = () => {
    const { currentPage, setPage } = usePageStore()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const { isAuth } = useAuthStore()

    useEffect(() => {
        if (token) {setPage('cardVerify')}
    }, [token, setPage])

    const renderPage = () => {
    switch (currentPage) {
        case 'home': return <HomePage />
        case 'login': return <LoginForm />
        case 'logout': return <LogoutForm />
        case 'register': return <RegisterForm />
        case 'cardVerify': return <CardVerifyEmail />
        case 'feed': return <FeedPage />
        case 'profile': return <ProfilePage />
        case 'trending': return <TrendingPage />
        case 'categories': return <CategoriesPage />
        case 'about': return <AboutPage />
        default: return <HomePage />
        }
    }

    return (
        <div className="pageAuth">
            {!isAuth && <HeaderAuth/>}
            {renderPage()}
            {!isAuth && <FooterAuth/>}
        </div>
    )
}