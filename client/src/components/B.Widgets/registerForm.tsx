'use client'

import { ButtonLoading, FormInput, Loader, TextError, TextMessage } from '../';
import { useRegisterForm } from '@/src/utils/auth.validator';
import { useAuth } from '@/src/hooks/auth.hook';
import { IRegistration, IResendVerification } from '@/src/dto';
import { usePageStore } from '@/src/store';

export const RegisterForm = () => {
    const { setPage } = usePageStore()
    const { register, handleSubmit, formState: { errors } } = useRegisterForm()
    const { Register, ResendVerification, isLoading, error, message, status, data, statusCode } = useAuth()

    const onSubmit = async (body: IRegistration) => {
        await Register(body)
    }

    const ResendVerifyEmail = async () => {
        await ResendVerification({ email: (data as any).email })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='formRegistration'>
            <h2>Registration</h2>
            <FormInput name='email' label='Email' register={register} error={errors.email} />
            <FormInput name='userName' label='Username' register={register} error={errors.userName} />
            <FormInput name='password' label='Password' type='password' register={register} error={errors.password} />
            <FormInput name='doublePassword' label='Confirm Password' type='password' register={register} error={errors.doublePassword} />
            <button onClick={() => setPage('login')} className='link'>I have account</button>
            {!message && <ButtonLoading isLoading={isLoading} type='submit' title='Register' loadingTitle='Loading...'/>}
            {message && <ButtonLoading isLoading={isLoading} type='button' title='Send the email again' loadingTitle='Loading...' onClick={() => ResendVerifyEmail()}/>}
            {error && <TextError error={error}/>}
            {message && <TextMessage message={message}/>}
        </form>
    )
}