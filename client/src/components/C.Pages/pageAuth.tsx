'use client'

import { useAuthStore, usePageStore } from "@/src/store"
import { HeaderAuth, LoginForm, RegisterForm, CardVerifyEmail, HomePage, FooterAuth, FeedPage, ProfilePage, TrendingPage, CategoriesPage, AboutPage, LogoutForm, NavigationSidebar, SettingsPage, ResetEmailForm, ForgetPasswordForm, ForgetPasswordStageTwo } from "@/src/components"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const PageAuth = () => {
    const { currentPage, setPage } = usePageStore()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const tokenPass = searchParams.get('tokenPass')
    const { isAuth } = useAuthStore()

    useEffect(() => {
        if (token) {setPage('cardVerify')}
        else if (tokenPass) (setPage('forgetPasswordStageTwo'))
    }, [token, tokenPass, setPage])

    useEffect(() => {
        if (isAuth) setPage('feed')
    }, [isAuth])

    useEffect(() => {
        const protectedPages = ['profile', 'trending', 'categories', 'subscriptions', 'library', 'history', 'watchLater', 'live', 'settings']
        if (!isAuth && protectedPages.includes(currentPage)) {
            setPage('login')
        }
    }, [isAuth, currentPage, setPage])

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
        case 'settings': return <SettingsPage />
        case 'resetEmail': return <ResetEmailForm/>
        case 'forgetPassword': return <ForgetPasswordForm/>
        case 'forgetPasswordStageTwo': return <ForgetPasswordStageTwo/>
        default: return <HomePage />
        }
    }

    return (
        <div className="mainPage">
            {!isAuth && <HeaderAuth/>}
            {renderPage()}
            {!isAuth && <FooterAuth/>}
            {isAuth && <NavigationSidebar/>}
        </div>
    )
}