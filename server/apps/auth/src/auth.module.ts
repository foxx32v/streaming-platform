import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { authGuard } from './common/helper/guards/auth.guard';
import { adminGuard } from './common/helper/guards/admin.guard';
import { GLOBAL_LIMITER } from './common/config/auth/rateLimiter.config';
import { resolve } from 'path';
import { ACCESS_TOKEN } from './common/config/auth/jwt.config';
import { GoogleStrategy, GithubStrategy } from './common/helper/strategies/';
import { googleGuard, githubGuard } from './common/helper/guards/';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: GLOBAL_LIMITER.TIMEOUT,
        limit: GLOBAL_LIMITER.COUNT,
      }],
      errorMessage: GLOBAL_LIMITER.MESSAGE,
    }),
    JwtModule.register({
      secret: ACCESS_TOKEN.SECRET,
      signOptions: { expiresIn: ACCESS_TOKEN.EXPIRES }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, authGuard, adminGuard,
    googleGuard, githubGuard,
    GoogleStrategy, GithubStrategy
  ],
  exports: [JwtModule]
})
export class AuthModule {}