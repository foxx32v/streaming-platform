import { useState } from "react"
import { authApi } from "../api"
import { IChangePassword, IForgetPassword, ILogin, ILogout, IPagination, IRefresh, IRegistration, IResendVerification, IResetPassword, IResponse, IVerificationEmail, IError, IRegisterResponse, ILoginResponse, IRefreshResponse, IGetAllUsersResponse, IVerifyTokenResponse, IValidateTokenResponse, userDto, sessionDto } from "../dto"

type AuthData =
    | IRegisterResponse
    | ILoginResponse
    | IRefreshResponse
    | IGetAllUsersResponse
    | userDto
    | sessionDto[]
    | IVerifyTokenResponse
    | IValidateTokenResponse
    | null

export const useAuth = () => {
    const [data, SetData] = useState<AuthData>(null)
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
        SetData(res.data as AuthData)
        SetStatus('success')
        SetStatusCode(res.statusCode)
    }

    const IsError = (error?: null|string, statusCode?: number|null) => {
        SetIsLoading(false)
        SetMessage(null)
        SetError(error??null)
        SetStatus('error')
        SetStatusCode(statusCode??null)
    }

    const Register = async (body: IRegistration): Promise<IResponse<IRegisterResponse>> => {
        try {
            Start(); const res = await authApi.Register(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const Login = async (body: ILogin): Promise<IResponse<ILoginResponse>> => {
        try {
            Start(); const res = await authApi.Login(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const Logout = async (): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.Logout()
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const Refresh = async (body: IRefresh): Promise<IResponse<IRefreshResponse>> => {
        try {
            Start(); const res = await authApi.Refresh(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const ChangePassword = async (body: IChangePassword): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.ChangePassword(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const VerifyEmail = async (body: IVerificationEmail): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.VerifyEmail(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const ResendVerification = async (body: IResendVerification): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.ResendVerification(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const ForgetPassword = async (body: IForgetPassword): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.ForgetPassword(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const ResetPassword = async (body: IResetPassword): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.ResetPassword(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetAllUsers = async (params: IPagination): Promise<IResponse<IGetAllUsersResponse>> => {
        try {
            Start(); const res = await authApi.GetAllUsers(params)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetUserById = async (userId: string): Promise<IResponse<userDto>> => {
        try {
            Start(); const res = await authApi.GetUserById(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const ChangeUserRole = async (userId: string, role: string): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.ChangeUserRole(userId, role)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const BlockUser = async (userId: string, reason?: string): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.BlockUser(userId, reason)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const UnblockUser = async (userId: string): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.UnblockUser(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetSessions = async (): Promise<IResponse<sessionDto[]>> => {
        try {
            Start(); const res = await authApi.GetSessions()
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const RevokeSession = async (sessionId: string): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.RevokeSession(sessionId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const RevokeAllSessions = async (): Promise<IResponse> => {
        try {
            Start(); const res = await authApi.RevokeAllSessions()
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const VerifyToken = async (token: string): Promise<IResponse<IVerifyTokenResponse>> => {
        try {
            Start(); const res = await authApi.VerifyToken(token)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const ValidateToken = async (token: string): Promise<IResponse<IValidateTokenResponse>> => {
        try {
            Start(); const res = await authApi.ValidateToken(token)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GoogleLogin = async (): Promise<void> => {
        try {
            Start(); authApi.GoogleLogin(); End({} as IResponse)
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GithubLogin = async (): Promise<void> => {
        try {
            Start(); authApi.GithubLogin(); End({} as IResponse)
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    return {data, message, error, isLoading, status, statusCode, Register, Login, Logout, Refresh, ChangePassword, VerifyEmail, ResendVerification, ForgetPassword, ResetPassword, GetAllUsers, GetUserById, ChangeUserRole, BlockUser, UnblockUser, GetSessions, RevokeSession, RevokeAllSessions, VerifyToken, ValidateToken, GoogleLogin, GithubLogin}
}