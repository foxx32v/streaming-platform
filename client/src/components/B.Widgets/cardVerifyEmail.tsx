import { useEffect } from "react"
import { IVerificationEmail } from "@/src/dto"
import { useAuth } from "@/src/hooks"
import { TextError, Loader, TextMessage, ButtonLoading } from "../"
import { useSearchParams } from "next/navigation"
import { usePageStore } from "@/src/store"

export const CardVerifyEmail = () => {
    const { setPage } = usePageStore()
    const searchParams = useSearchParams()
    const linkActivate = searchParams.get('token')
    const { VerifyEmail, error, message, isLoading } = useAuth()

    useEffect(() => {if (linkActivate) VerifyEmail({ linkActivate: linkActivate })}, [linkActivate])

    return (
        <div className="cardVerifyEmail">
            <h2>Verification Email</h2>
            {message && <Loader status='success'/>}
            {isLoading && <Loader status='loading'/>}
            {error && <Loader status='error'/>}
            {error && <TextError error={error}/>}
            {message && <TextMessage message={message}/>}
            {message && <button onClick={() => {setPage('login')}} className='link'>Login</button>}
            {isLoading && <p>Checking your mail</p>}
        </div>
    )
}