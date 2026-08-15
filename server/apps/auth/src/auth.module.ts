import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { authGuard } from './common/guards/auth.guard';
import { adminGuard } from './common/guards/admin.guard';
import { GLOBAL_LIMITER } from './common/config/rateLimiter.config';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(process.cwd(), 'apps/auth/.env'),  
  }),
    ThrottlerModule.forRoot({
      throttlers: [{
      ttl: GLOBAL_LIMITER.TIMEOUT,
      limit: GLOBAL_LIMITER.COUNT,
      }],
      errorMessage: GLOBAL_LIMITER.MESSAGE,
  }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'default-secret',
      signOptions: { expiresIn: '15m' }
  })],
  controllers: [AuthController],
  providers: [AuthService, authGuard, adminGuard],
  exports: [JwtModule]
})
export class AuthModule {}