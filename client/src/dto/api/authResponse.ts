import { sessionDto, userDto } from "..";

export interface IRegisterResponse {
    email: string;
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IRefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IGetAllUsersResponse {
    users: userDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface IVerifyTokenResponse {
    id: string;
    email: string;
    role: string;
}

export interface IValidateTokenResponse {
    valid: boolean;
    payload?: unknown;
}

export interface IGetSessionsResponse {
    sessions: sessionDto[];
}