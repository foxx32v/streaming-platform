import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { STRATEGY_GITHUB_CONFIG } from '../../config/auth/strategies.config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super(STRATEGY_GITHUB_CONFIG);
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
        const { username, emails } = profile;
        const user = {
            email: emails?.[0]?.value || `${username}@github.com`,
            username,
            accessToken,
        }
    done(null, user)
    }
}