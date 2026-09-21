export interface TokensType {
    access_token: string;
    refresh_token: string;
}

export interface PayloadType {
    userId: string;
    email: string;
    role: 'user'|'admin'
}