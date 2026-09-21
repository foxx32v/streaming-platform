'use client'

import { ButtonLoading, FormInput, Loader, TextError, TextMessage } from '../';
import { useLoginForm } from '@/src/utils/auth.validator';
import { useAuth } from '@/src/hooks/auth.hook';
import { ILogin } from '@/src/dto';
import { usePageStore } from '@/src/store';
import { useAuthStore } from '@/src/store/isAuth.store';
import { SetCookie } from '@/src/utils';

export const LoginForm = () => {
    const { setPage } = usePageStore()
    const { register, getValues, handleSubmit, formState: { errors } } = useLoginForm()
    const { Login, ResendVerification, GoogleLogin, GithubLogin, isLoading, error, message, data, status, statusCode } = useAuth()
    const { setAuth } = useAuthStore()

    const onSubmit = async (body: ILogin) => {
        const { data } = await Login(body)
        const { accessToken, refreshToken } = data
        if (accessToken && refreshToken) {
        SetCookie('accessToken', accessToken, 1/96)
        SetCookie('refreshToken', refreshToken, 7)
        }
        setAuth(true)
        setPage('profile')
    }

    const SendGoogleLogin = async () => {
        await GoogleLogin()
    }
    const SendGithubLogin = async () => {
        await GithubLogin()
    }
    const ResendVerifyEmail = async () => {
        const email = getValues('email')
        await ResendVerification({email})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='formLogin'>
            <h2>Login</h2>
            <FormInput name='email' label='Email' register={register} error={errors.email} />
            <FormInput name='password' label='Password' type='password' register={register} error={errors.password} />
            {statusCode === 401 && <button onClick={() => setPage('forgetPassword')} className='link'>Forgot your password??</button>}
            {statusCode === 404 && <button onClick={() => setPage('resetEmail')} className='link'>Forgot your email?</button>}
            <button onClick={() => setPage('register')} className='link'>I have not account</button>
            <ButtonLoading isLoading={isLoading} type='submit' title='Login' loadingTitle='Loading...'/>
            {statusCode === 403 && <ButtonLoading isLoading={isLoading} type='button' title='Send the email again' loadingTitle='Loading...' onClick={() => ResendVerifyEmail()}/>}
            {error && <TextError error={error}/>}
            {statusCode === 200 && <TextMessage message={`${message}`}/>}
            <div className="oauthButtons">
            <button onClick={SendGoogleLogin} className="googleBtn">
                Sign in with Google
            </button>
            <button onClick={SendGithubLogin} className="githubBtn">
                Sign in with GitHub
            </button>
            </div>
        </form>
    )
}