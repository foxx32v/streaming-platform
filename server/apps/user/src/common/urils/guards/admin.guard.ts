import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user) throw new UnauthorizedException('User not authenticated');
        if (user.role !== 'admin') throw new ForbiddenException('Access denied. Admin only.');
        return true;
    }
}