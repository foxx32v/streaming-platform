import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto, RefreshDto, ChangePasswordDto, ForgetPasswordDto, ResetPasswordDto, VerifyEmailDto, UserIdDto } from './common/dto/api';
import userRepository from './common/repository/user.repository';
import * as crypto from 'crypto';
import { GetRandomColor } from './common/helper/methods/colorMethods.helper';
import { Responser } from './common/helper/utils/responser.util';
import { mailer } from './common/helper/mailer/mailer.util';
import * as bcrypt from 'bcrypt';
import { jwtService } from './common/helper/jwt/jwt.helper';
import sessionsRepository from './common/repository/sessions.repository';
import { REFRESH_TOKEN } from './common/config/auth/jwt.config';
import { PayloadType, TokensType } from './common/helper/types/helperTypes';
import { Inject } from '@nestjs/common';
import { KafkaService } from '@app/kafka';

@Injectable()
export class AuthService {
  constructor(
    private readonly kafkaService: KafkaService,
  ) {}
  async register(dto: RegisterDto, ip: string) {
    if (dto.password !== dto.doublePassword) throw new HttpException('Passwords do not match', 400)
    const isUserByEmail = await userRepository.ExistsByEmail(dto.email)
    if (isUserByEmail) throw new HttpException('Email already exists', 409)
    const linkActivation = crypto.randomUUID()
    const passwordHash = await bcrypt.hash(dto.password, 10)
    const avatarColor = GetRandomColor()
    const userId = await userRepository.CreateUser(dto.email, passwordHash, linkActivation, avatarColor)
    this.kafkaService.emitUserCreated({userId: userId, userName: dto.userName})
    await mailer.sendVerificationEmail(dto.email, linkActivation)
    return Responser(201, 'You have successfully registered. Check your email.', { email: dto.email })
  }

  async login(dto: LoginDto, ip: string, userAgent: string) {
    const user = await userRepository.GetUserByEmail(dto.email)
    if (!user) throw new HttpException('user not found.', 404)
    const isMatchPassword = await bcrypt.compare(dto.password, user.passwordhash)
    if (!user.isactivate) throw new HttpException('Please verify your email before logging in', 403)
    if (!isMatchPassword) throw new HttpException('Invalid password', 401)
    const payload = {userId: user.id, email: user.email, role: user.role}
    const tokens = jwtService.generateTokens(payload)
    await userRepository.UpdateTokens(user.id, tokens)
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN.EXPIRES)
    await sessionsRepository.CreateSession(user.id, tokens.refreshToken, userAgent, ip, expiresAt)
    await mailer.welcome(user.email)
    return Responser(200, 'User successful', tokens)
  }

  async logout(userId: string) {
    const user = await userRepository.GetUserById(userId)
    if (!user) throw new HttpException('User not found', 404)
    await userRepository.DeleteTokens(userId)
    await sessionsRepository.RevokeAllSessions(userId)
    return Responser(200, 'Logout successful')
  }

  async refresh(dto: RefreshDto, ip: string) {
    let payload: any
    try {
    payload = jwtService.verifyRefreshToken(dto.refreshToken)
    } catch (error) {throw new HttpException('Invalid refresh token', 401)}
    const session = await sessionsRepository.GetSessionByRefreshToken(dto.refreshToken)
    if (!session) throw new HttpException('Session not found', 404)
    const user = await userRepository.GetUserById(payload.userId)
    if (!user) throw new HttpException('User not found', 404)
    const tokens = jwtService.generateTokens({userId: user.id, email: user.email, role: user.role})
    await userRepository.UpdateTokens(user.id, tokens)
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN.EXPIRES)
    await sessionsRepository.CreateSession(user.id, tokens.refreshToken, session.userAgent || 'unknown', ip, expiresAt)
    return Responser(200, 'Tokens refreshed successfully', tokens)
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await userRepository.GetUserByLinkActivate(dto.linkActivate)
    if (!user) throw new HttpException('Invalid or expired token', 400)
    if (user.isActivate) throw new HttpException('Email already verified', 409)
    await userRepository.ActivateUser(user.id)
    return Responser(200, 'Email verified successfully')
  }

  async resendVerification(email: string) {
    const user = await userRepository.GetUserByEmail(email)
    if (!user) throw new HttpException('User not found', 404)
    if (user.isActivate) throw new HttpException('Email already verified', 409)
    const linkActivation = crypto.randomUUID()
    await userRepository.UpdateLinkActivate(user.id, linkActivation)
    await mailer.sendVerificationEmail(email, linkActivation)
    return Responser(200, 'Verification email sent successfully')
}

  async forgetPassword(dto: ForgetPasswordDto) {
    const user = await userRepository.GetUserByEmail(dto.email)
    if (!user) throw new HttpException('User not found', 404)
    const resetToken = crypto.randomUUID()
    await userRepository.UpdateResetTokens(user.id, resetToken)
    await mailer.sendResetPasswordEmail(dto.email, resetToken)
    return Responser(200, 'Password reset email sent successfully')
}

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.newPassword !== dto.doublePassword) throw new HttpException('Passwords do not match', 400)
    const user = await userRepository.GetUserByResetToken(dto.resetToken)
    if (!user) throw new HttpException('Invalid or expired token', 400)
    const passwordHash = await bcrypt.hash(dto.newPassword, 10)
    await userRepository.ResetPassword(user.id, passwordHash)
    await userRepository.DeleteTokens(user.id)
    return Responser(200, 'Password reset successfully')
  }

  async changePassword(dto: ChangePasswordDto, userId: string) {
    const user = await userRepository.GetUserById(userId)
    if (!user) throw new HttpException('User not found', 404)
    const isMatchPassword = await bcrypt.compare(dto.oldPassword, user.passwordhash)
    if (!isMatchPassword) throw new HttpException('Current password is incorrect', 401)
    const passwordHash = await bcrypt.hash(dto.newPassword, 10)
    await userRepository.ResetPassword(user.id, passwordHash)
    return Responser(200, 'Password changed successfully')
  }

  async googleCallback(user: any, userAgent: string, ip: string) {
    return this.handleOAuthLogin(user, 'google', userAgent, ip)
  }

  async githubCallback(user: any, userAgent: string, ip: string) {
    return this.handleOAuthLogin(user, 'github', userAgent, ip)
  }

  private async handleOAuthLogin(profile: any, provider: string, userAgent: string, ip: string): Promise<TokensType> {
    let user = await userRepository.GetUserByEmail(profile.email)
    if (!user) {
        const passwordHash = await bcrypt.hash(crypto.randomUUID(), 10)
        const avatarColor = GetRandomColor()
        user = await userRepository.CreateUserOAuth(profile.email, passwordHash, provider, profile.picture || null, avatarColor)
    }
    const payload = { userId: user.id, email: user.email, role: user.role }
    const tokens: TokensType = jwtService.generateTokens(payload)
    await userRepository.UpdateTokens(user.id, tokens)
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN.EXPIRES)
    await sessionsRepository.CreateSession(user.id, tokens.refreshToken, userAgent, ip, expiresAt)
    return tokens
  }

  async getAllUsers(page: number, limit: number) {
    const users = await userRepository.GetAllUsers(page, limit)
    const total = await userRepository.CountUsers()
    return Responser(200, 'Users retrieved successfully', {users, total, page, limit, totalPages: Math.ceil(total / limit)})
  }

  async getUserById(id: string) {
    const user = await userRepository.GetUserById(id)
    if (!user) throw new HttpException('User not found', 404)
    return Responser(200, 'User retrieved successfully', user)
  }

  async changeUserRole(id: string, role: string) {
    const user = await userRepository.GetUserById(id)
    if (!user) throw new HttpException('User not found', 404)
    await userRepository.ChangeUserRole(id, role)
    return Responser(200, 'User role updated successfully')
  }

  async blockUser(id: string, reason: string) {
    const user = await userRepository.GetUserById(id)
    if (!user) throw new HttpException('User not found', 404)
    if (user.isBlocked) throw new HttpException('User already blocked', 409)
    await userRepository.ChangeBlockUser(id, true)
    await userRepository.UpdateBlockReason(id, reason)
    return Responser(200, 'User blocked successfully')
  }

  async unblockUser(id: string) {
    const user = await userRepository.GetUserById(id)
    if (!user) throw new HttpException('User not found', 404)
    if (!user.isBlocked) throw new HttpException('User is not blocked', 409)
    await userRepository.ChangeBlockUser(id, false)
    return Responser(200, 'User unblocked successfully')
  }

  async getSessions(userId: string) {
    const user = await userRepository.GetUserById(userId)
    if (!user) throw new HttpException('User not found', 404)
    const sessions = await sessionsRepository.GetSessionsByUserId(userId)
    return Responser(200, 'Sessions retrieved successfully', sessions)
  }

  async revokeSession(sessionId: string) {
    const session = await sessionsRepository.GetSessionById(sessionId)
    if (!session) throw new HttpException('Session not found', 404)
    await sessionsRepository.RevokeSession(sessionId)
    return Responser(200, 'Session revoked successfully')
  }

  async revokeAllSessions(userId: string) {
    const user = await userRepository.GetUserById(userId)
    if (!user) throw new HttpException('User not found', 404)
    await sessionsRepository.RevokeAllSessions(userId)
    return Responser(200, 'All sessions revoked successfully')
  }

  async verifyToken(token: string) {
    try {
        const payload = jwtService.verifyAccessToken(token)
        return Responser(200, 'Token is valid', payload)
    } catch (error) {throw new HttpException('Invalid token', 401)}
  }

  async validateToken(token: string) {
    try {
        const payload = jwtService.verifyAccessToken(token)
        return Responser(200, 'Token is valid', { valid: true, payload })
    } catch (error) {return Responser(401, 'Token is invalid', { valid: false })}
  }
}