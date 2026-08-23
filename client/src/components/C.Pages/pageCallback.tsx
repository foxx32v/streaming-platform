'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore, usePageStore } from '@/src/store'
import { Loader } from '../A.Ui/loader'
import { SetCookie } from '@/src/utils'

export const PageCallback = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setAuth } = useAuthStore()
    const { setPage } = usePageStore()
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const expiresAccessToken = Number(searchParams.get('expiresAccessToken'))
    const expiresRefreshToken = Number(searchParams.get('expiresRefreshToken'))

    useEffect(() => {
        if (accessToken && refreshToken) {
            SetCookie('accessToken', accessToken, expiresAccessToken)
            SetCookie('refreshToken', refreshToken, expiresRefreshToken)
            setAuth(true)
            setPage('feed')
            router.push('/')
        } else router.push('/login')
    }, [accessToken, refreshToken, expiresAccessToken, expiresRefreshToken, router, setAuth])

    return (
        <div className="pageAuth">
            <Loader status="loading" />
            <p>Logging in...</p>
        </div>
    )
}