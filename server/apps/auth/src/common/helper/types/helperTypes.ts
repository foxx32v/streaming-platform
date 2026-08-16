import { UUID } from "crypto";

export type ColorType = `#${string}${string}${string}${string}${string}${string}`

export interface TokensType {
    refreshToken: string,
    accessToken: string,
}

export class OAuthUserDto {
    'id': UUID
    'email': string
    'role': string
    'username?': string
    'picture?': string
    'provider?': string
}

export type ReqType = {
    user: OAuthUserDto,
    body: any,
    query: any,
    params: any,
    headers: any,
    ip: string,
    method: string,
    url: string,
}

export type ResType = {
    status: (code: number) => ResType,
    json: (data: any) => void,
    redirect: (url: string) => void,
    send: (data: any) => void,
}