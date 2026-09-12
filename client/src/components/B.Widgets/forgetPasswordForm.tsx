import { useAuth } from "@/src/hooks"
import { FormInput, TextMessage, TextError, ButtonLoading } from "../"
import { useForgetPasswordForm } from "@/src/utils"

export const ForgetPasswordForm = () => {
    const { ForgetPassword, message, error, isLoading } = useAuth()
    const { register, getValues, handleSubmit, formState: { errors } } = useForgetPasswordForm()

    const onSubmit = async () => {
        const email = getValues("email")
        await ForgetPassword({email})
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="forgetPasswordForm">
            <h2>Forget password ?</h2>
            <FormInput name='email' label='Email' register={register} error={errors.email} />
            {message && <TextMessage message={message}/>}
            {error && <TextError error={error}/>}
            <ButtonLoading isLoading={isLoading} title='Send'/>
        </form>
    )
}