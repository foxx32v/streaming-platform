import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { STRATEGY_GOOGLE_CONFIG } from '../../config/auth/strategies.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
    // @ts-ignore
    super({
        clientID: STRATEGY_GOOGLE_CONFIG.CLIENT_ID,
        clientSecret: STRATEGY_GOOGLE_CONFIG.CLIENT_SECRET,
        callbackURL: STRATEGY_GOOGLE_CONFIG.CALLBACK_URL,
        scope: STRATEGY_GOOGLE_CONFIG.SCOPE,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
}