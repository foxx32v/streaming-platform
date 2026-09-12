import { useResetPasswordForm } from "@/src/utils"
import { ButtonLoading, FormInput, TextError, TextMessage } from "../"
import { useAuth } from "@/src/hooks"
import { IResetPassword } from "@/src/dto"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { usePageStore } from "@/src/store"

export const ForgetPasswordStageTwo = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useResetPasswordForm()
    const { ResetPassword, isLoading, error, message, status, statusCode } = useAuth()
    const searchParams = useSearchParams()
    const token = searchParams.get('tokenPass')
    const { setPage } = usePageStore()
    useEffect(() => {
        if (statusCode === 200) {
            window.history.replaceState({}, '', window.location.pathname)
        }
        setValue('resetToken', token || '')
    }, [token, setValue, statusCode])
    const onSubmit = async (body: IResetPassword) => {
        await ResetPassword({ ...body, resetToken: token ?? '' })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="forgetPasswordForm">
            <h2>Input new password</h2>
            <FormInput name='newPassword' label='Password' type='password' register={register} error={errors.newPassword} />
            <FormInput name='doublePassword' label='Confirm Password' type='password' register={register} error={errors.doublePassword} />
            {error && <TextError error={error}/>}
            {message && <TextMessage message={message}/>}
            <ButtonLoading isLoading={isLoading} type='submit' title='Send'/>
            {statusCode == 200 && <button onClick={() => setPage('register')} className='linkCenter'>return to the login</button>}
        </form>
    )
}