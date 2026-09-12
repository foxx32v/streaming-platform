'use client'

import { useEffect } from "react"
import { useAuth } from "@/src/hooks"
import { TextError, Loader, TextMessage, ButtonLoading } from "../"
import { useSearchParams } from "next/navigation"
import { usePageStore } from "@/src/store"

export const CardVerifyEmail = () => {
    const { setPage } = usePageStore()
    const searchParams = useSearchParams()
    const linkActivate = searchParams.get('token')
    const { VerifyEmail, error, message, isLoading, statusCode, status } = useAuth()

    useEffect(() => {
        if (statusCode === 200) {
            window.history.replaceState({}, '', window.location.pathname)
        }
        if (linkActivate)
        VerifyEmail({ linkActivate: linkActivate })
    }, [linkActivate, statusCode])

    return (
        <div className="cardVerifyEmail">
            <h2>Verification Email</h2>
            <Loader status={status}/>
            {error && <TextError error={error}/>}
            {message && <TextMessage message={message}/>}
            {message && <button onClick={() => {setPage('login')}} className='link'>Login</button>}
            {isLoading && <p>Checking your mail</p>}
        </div>
    )
}