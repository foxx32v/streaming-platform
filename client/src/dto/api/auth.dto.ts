export interface IRegistration {
    userName: string;
    email: string;
    password: string;
    doublePassword: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IVerificationEmail {
    linkActivate: string;
}

export interface ILogout {
    userId: string;
}

export interface IRefresh {
    refreshToken: string;
}

export interface IForgetPassword {
    email: string;
}

export interface IResetPassword {
    resetToken: string;
    newPassword: string;
    doublePassword: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    doublePassword: string;
}

export interface IResendVerification {
    email: string;
}

export interface IVerifyToken {
    token: string;
}

export interface IValidateToken {
    token: string;
}

export interface IPagination {
    page?: number;
    limit?: number;
}

export interface IBlockUser {
    reason?: string;
}