import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto, RefreshDto, ChangePasswordDto, ForgetPasswordDto, ResetPasswordDto, VerifyEmailDto } from './common/dto/api';
import userRepository from './common/repository/user.repository';
import * as crypto from 'crypto';
import { GetRandomColor } from './common/helper/methods/colorMethods.helper';
import { Responser } from './common/helper/utils/responser.util';
import { mailer } from './common/helper/utils/mailer/mailer.util';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  async register(dto: RegisterDto, ip: string) {
    const isUserByEmail = await userRepository.ExistsByEmail(dto.email)
    if (isUserByEmail) throw new HttpException('Email already exists', 409)
    const isUserByUserName = await userRepository.ExistsByUserName(dto.userName)
    if (isUserByUserName) throw new HttpException('Username already exists', 409)
    const linkActivation = crypto.randomUUID()
    const passwordHash = await bcrypt.hash(dto.password, 10)
    const avatarColor = GetRandomColor()
    await userRepository.CreateUser(dto.email, passwordHash, dto.userName, linkActivation, avatarColor)
    //await mailer.sendVerificationEmail(dto.email, linkActivation)
    return Responser(201, 'User registered successfully', { email: dto.email })
  }

  async login(dto: LoginDto, ip: string, userAgent: string) {
    return { message: 'Login endpoint' };
  }

  async logout(userId: string) {
    return { message: 'Logout endpoint' };
  }

  async refresh(dto: RefreshDto, ip: string) {
    return { message: 'Refresh endpoint' };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    return { message: 'Verify email endpoint' };
  }

  async resendVerification(email: string) {
    return { message: 'Resend verification endpoint' };
  }

  async forgetPassword(dto: ForgetPasswordDto) {
    return { message: 'Forgot password endpoint' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    return { message: 'Reset password endpoint' };
  }

  async changePassword(dto: ChangePasswordDto, userId: string) {
    return { message: 'Change password endpoint' };
  }

  async googleLogin() {
    return { message: 'Google login endpoint' };
  }

  async googleCallback(code: string) {
    return { message: 'Google callback endpoint' };
  }

  async githubLogin() {
    return { message: 'GitHub login endpoint' };
  }

  async githubCallback(code: string) {
    return { message: 'GitHub callback endpoint' };
  }

  async vkLogin() {
    return { message: 'VK login endpoint' };
  }

  async vkCallback(code: string) {
    return { message: 'VK callback endpoint' };
  }

  async getAllUsers(page: number, limit: number) {
    return { message: 'Get all users endpoint', page, limit };
  }

  async getUserById(id: string) {
    return { message: 'Get user by ID endpoint', id };
  }

  async changeUserRole(id: string, role: string) {
    return { message: 'Change user role endpoint', id, role };
  }

  async blockUser(id: string, reason) {
    return { message: 'Block user endpoint', id };
  }

  async unblockUser(id: string) {
    return { message: 'Unblock user endpoint', id };
  }

  async getSessions(userId: string) {
    return { message: 'Get sessions endpoint', userId };
  }

  async revokeSession(sessionId: string) {
    return { message: 'Revoke session endpoint', sessionId };
  }

  async revokeAllSessions(userId: string) {
    return { message: 'Revoke all sessions endpoint', userId };
  }

  async verifyToken(token: string) {
    return { message: 'Verify token endpoint' };
  }

  async validateToken(token: string) {
    return { message: 'Validate token endpoint' };
  }
}