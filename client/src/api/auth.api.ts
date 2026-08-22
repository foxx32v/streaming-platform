import { GLOBAL_API, PATH_API } from "../configs";
import { IChangePassword, IForgetPassword, ILogin, ILogout, IPagination, IRefresh, IRegistration, IResendVerification, IResetPassword, IResponse, IVerificationEmail } from "../dto";
import { AxiosGet, AxiosPost, AxiosDelete, AxiosPut, AxiosPatch } from "./";

class AuthApi {
    async Register(body: IRegistration) {return AxiosPost<IResponse<{ email: string }>>(`${PATH_API.auth}/register`, body)}
    async Login(body: ILogin) {return AxiosPost<IResponse<{ accessToken: string, refreshToken: string }>>(`${PATH_API.auth}/login`, body)}
    async Logout() {return AxiosDelete<IResponse>(`${PATH_API.auth}/logout`, true)}
    async Refresh(body: IRefresh) {return AxiosPost<IResponse<{ accessToken: string, refreshToken: string }>>(`${PATH_API.auth}/refresh`, body)}
    async ChangePassword(body: IChangePassword) {return AxiosPost<IResponse>(`${PATH_API.auth}/change-password`, body, true)}
    async VerifyEmail(body: IVerificationEmail) {return AxiosPost<IResponse>(`${PATH_API.auth}/verify-email`, body)}
    async ResendVerification(body: IResendVerification) {return AxiosPost<IResponse>(`${PATH_API.auth}/resend-verification`, body)}
    async ForgetPassword(body: IForgetPassword) {return AxiosPost<IResponse>(`${PATH_API.auth}/forget-password`, body)}
    async ResetPassword(body: IResetPassword) {return AxiosPost<IResponse>(`${PATH_API.auth}/reset-password`, body)}
    async GetAllUsers(params: IPagination) {return AxiosGet<IResponse<{ users: any[], total: number, page: number, limit: number, totalPages: number }>>(`${PATH_API.auth}/users?page=${params.page || 1}&limit=${params.limit || 10}`, true)}
    async GetUserById(userId: string) {return AxiosGet<IResponse<any>>(`${PATH_API.auth}/user/${userId}`, true)}
    async ChangeUserRole(userId: string, role: string) {return AxiosPatch<IResponse>(`${PATH_API.auth}/user/${userId}/role`, { role }, true)}
    async BlockUser(userId: string, reason?: string) {return AxiosPost<IResponse>(`${PATH_API.auth}/user/${userId}/block`, { reason }, true)}
    async UnblockUser(userId: string) {return AxiosPost<IResponse>(`${PATH_API.auth}/user/${userId}/unblock`, {}, true)}
    async GetSessions() {return AxiosGet<IResponse<any[]>>(`${PATH_API.auth}/sessions`, true)}
    async RevokeSession(sessionId: string) {return AxiosDelete<IResponse>(`${PATH_API.auth}/session/${sessionId}`, true)}
    async RevokeAllSessions() {return AxiosDelete<IResponse>(`${PATH_API.auth}/sessions`, true)}
    async VerifyToken(token: string) {return AxiosPost<IResponse<{ id: string, email: string, role: string }>>(`${PATH_API.auth}/verify`, { token })}
    async ValidateToken(token: string) {return AxiosPost<IResponse<{ valid: boolean, payload?: any }>>(`${PATH_API.auth}/validate`, { token })}
    async GoogleLogin() {window.location.href = `${GLOBAL_API.serverUrl}/auth/google`}
    async GithubLogin() {window.location.href = `${GLOBAL_API.serverUrl}/auth/github`}
}

export const authApi = new AuthApi;