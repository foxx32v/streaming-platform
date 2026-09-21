import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { GLOBAL_LIMITER, JWT_CONFIG } from './common/configs';
import { AdminGuard, AuthGuard } from './common/urils';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserConsumer } from './user.consumer';

@Module({
    imports: [
        JwtModule.register({ secret: JWT_CONFIG.ACCESS_TOKEN_SECRET }),
        ThrottlerModule.forRoot([{ ttl: GLOBAL_LIMITER.TIMEOUT, limit: GLOBAL_LIMITER.COUNT }]),
    ],
    controllers: [UserController, UserConsumer],
    providers: [
        UserService,
        AdminGuard,
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
    ],
})
export class UserModule {}