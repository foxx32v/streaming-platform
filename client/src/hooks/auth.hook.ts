import { useState } from "react"
import { authApi } from "../api"
import { IChangePassword, IForgetPassword, ILogin, ILogout, IPagination, IRefresh, IRegistration, IResendVerification, IResetPassword, IResponse, IVerificationEmail, LoaderProps } from "../dto"

export const useAuth = () => {
    const [data, SetData] = useState<unknown>(null)
    const [message, SetMessage] = useState<string|null>(null)
    const [error, SetError] = useState<null|string>(null)
    const [isLoading, SetIsLoading] = useState<boolean>(false)
    const [status, SetStatus] = useState<"loading" | "error" | "success" | null>(null)
    const [statusCode, SetStatusCode] = useState<number|null>(null)

    const Start = () => {
        SetIsLoading(true)
        SetStatus('loading')
        SetMessage(null)
        SetError(null)
        SetStatusCode(null)
    }

    const End = (res: IResponse) => {
        SetIsLoading(false)
        SetMessage(res.message ?? null)
        SetError(null)
        SetData(res.data ?? null)
        SetStatus('success')
        SetStatusCode(res.statusCode)
    }

    const IsError = (error?: null|string) => {
        SetIsLoading(false)
        SetMessage(null)
        SetError(error??null)
        SetStatus('error')
    }

    const Register = async (body: IRegistration) => {
        try {
            Start(); const res = await authApi.Register(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const Login = async (body: ILogin) => {
        try {
            Start(); const res = await authApi.Login(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const Logout = async () => {
        try {
            Start(); const res = await authApi.Logout()
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const Refresh = async (body: IRefresh) => {
        try {
            Start(); const res = await authApi.Refresh(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const ChangePassword = async (body: IChangePassword) => {
        try {
            Start(); const res = await authApi.ChangePassword(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const VerifyEmail = async (body: IVerificationEmail) => {
        try {
            Start(); const res = await authApi.VerifyEmail(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const ResendVerification = async (body: IResendVerification) => {
        try {
            Start(); const res = await authApi.ResendVerification(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const ForgetPassword = async (body: IForgetPassword) => {
        try {
            Start(); const res = await authApi.ForgetPassword(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const ResetPassword = async (body: IResetPassword) => {
        try {
            Start(); const res = await authApi.ResetPassword(body)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const GetAllUsers = async (params: IPagination) => {
        try {
            Start(); const res = await authApi.GetAllUsers(params)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const GetUserById = async (userId: string) => {
        try {
            Start(); const res = await authApi.GetUserById(userId)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const ChangeUserRole = async (userId: string, role: string) => {
        try {
            Start(); const res = await authApi.ChangeUserRole(userId, role)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const BlockUser = async (userId: string, reason?: string) => {
        try {
            Start(); const res = await authApi.BlockUser(userId, reason)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const UnblockUser = async (userId: string) => {
        try {
            Start(); const res = await authApi.UnblockUser(userId)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const GetSessions = async () => {
        try {
            Start(); const res = await authApi.GetSessions()
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const RevokeSession = async (sessionId: string) => {
        try {
            Start(); const res = await authApi.RevokeSession(sessionId)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const RevokeAllSessions = async () => {
        try {
            Start(); const res = await authApi.RevokeAllSessions()
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const VerifyToken = async (token: string) => {
        try {
            Start(); const res = await authApi.VerifyToken(token)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const ValidateToken = async (token: string) => {
        try {
            Start(); const res = await authApi.ValidateToken(token)
            End(res); return res
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const GoogleLogin = async () => {
        try {
            Start(); authApi.GoogleLogin(); End({} as IResponse)
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    const GithubLogin = async () => {
        try {
            Start(); authApi.GithubLogin(); End({} as IResponse)
        } catch (error: unknown) {
            IsError(error instanceof Error ? error.message : 'Unknown error'); throw error
        }
    }

    return {data, message, error, isLoading, status, statusCode, Register, Login, Logout, Refresh, ChangePassword, VerifyEmail, ResendVerification, ForgetPassword, ResetPassword, GetAllUsers, GetUserById, ChangeUserRole, BlockUser, UnblockUser, GetSessions, RevokeSession, RevokeAllSessions, VerifyToken, ValidateToken, GoogleLogin, GithubLogin}
}