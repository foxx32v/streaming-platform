import { verify } from 'jsonwebtoken';
import { JWT_CONFIG } from "../../configs";
import { PayloadType } from '../';

export class JwtService {
    getPayload(accessToken: string): PayloadType|null {
        try {return verify(accessToken, `${JWT_CONFIG.ACCESS_TOKEN_SECRET}`) as PayloadType
        } catch {return null}
    }
}

export const jwtService = new JwtService();