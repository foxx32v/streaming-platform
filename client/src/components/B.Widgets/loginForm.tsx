'use client'

import { ButtonLoading, FormInput, Loader, TextError, TextMessage } from '../';
import { useLoginForm } from '@/src/utils/auth.validator';
import { useAuth } from '@/src/hooks/auth.hook';
import { ILogin } from '@/src/dto';
import { usePageStore } from '@/src/store';

export const LoginForm = () => {
    const { setPage } = usePageStore()
    const { register, handleSubmit, formState: { errors } } = useLoginForm()
    const { Login, isLoading, error, message, data, status, statusCode } = useAuth()

    const onSubmit = async (body: ILogin) => {
        await Login(body)
        window.location.href = '/Feed'
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='formLogin'>
            <h2>Login</h2>
            <FormInput name='email' label='Email' register={register} error={errors.email} />
            <FormInput name='password' label='Password' type='password' register={register} error={errors.password} />
            <button onClick={() => setPage('register')} className='link'>I have not account</button>
            <ButtonLoading isLoading={isLoading} type='submit' title='Login' loadingTitle='Loading...'/>
            {error && <TextError error={error}/>}
            {message && <TextMessage message={message}/>}   
        </form>
    )
}