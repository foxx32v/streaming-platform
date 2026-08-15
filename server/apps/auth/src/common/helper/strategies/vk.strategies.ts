import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-vk';
import { STRATEGY_VK_CONFIG } from '../../config/auth/strategies.config';

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, 'vk') {
    constructor() {
        super({
            clientID: STRATEGY_VK_CONFIG.CLIENT_ID,
            clientSecret: STRATEGY_VK_CONFIG.CLIENT_SECRET,
            callbackURL: STRATEGY_VK_CONFIG.CALLBACK_URL,
            scope: STRATEGY_VK_CONFIG.SCOPE,
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
        const { email, displayName } = profile;
        const user = {
            email: email || `${displayName}@vk.com`,
            username: displayName,
            accessToken,
        };
        done(null, user);
    }
}