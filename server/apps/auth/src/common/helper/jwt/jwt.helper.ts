import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../config/auth/jwt.config";
import { PayloadType, TokensType } from '../types/helperTypes';

export class JwtService {
    generateTokens(payload: PayloadType): TokensType {
        const refreshToken = sign(payload, REFRESH_TOKEN.SECRET, {expiresIn: REFRESH_TOKEN.EXPIRES})
        const accessToken = sign(payload, ACCESS_TOKEN.SECRET, {expiresIn: ACCESS_TOKEN.EXPIRES})
        return { refreshToken, accessToken }
    }
    verifyAccessToken(token: string) {
        return verify(token, ACCESS_TOKEN.SECRET)
    }

    verifyRefreshToken(token: string) {
        return verify(token, REFRESH_TOKEN.SECRET)
    }

    getPayload(accessToken): PayloadType {
        return verify(accessToken, ACCESS_TOKEN.SECRET) as PayloadType
    }
}

export const jwtService = new JwtService();