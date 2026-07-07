import { Controller, Post, Get, Delete, Patch, Body, Query, Param, Headers, Ip, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshDto, ChangePasswordDto, ForgetPasswordDto, ResetPasswordDto, VerifyEmailDto } from './common/dto';
import { authGuard } from './common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// Аунтификация

  @Post('register')
  register(@Body() dto: RegisterDto, @Ip() ip: string) {
    return this.authService.register(dto, ip);
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Ip() ip: string, @Headers('user-agent') userAgent: string) {
    return this.authService.login(dto, ip, userAgent);
  }

  @Delete('logout')
  @UseGuards(authGuard)
  logout(@Body() dto: { userId: string }) {
    return this.authService.logout(dto.userId);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto, @Ip() ip: string) {
    return this.authService.refresh(dto, ip);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('resend-verification')
  resendVerification(@Body() dto: { email: string }) {
    return this.authService.resendVerification(dto.email);
  }

// Восстонавление пароля

  @Post('forget-password')
  forgotPassword(@Body() dto: ForgetPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('change-password')
  @UseGuards(authGuard)
  changePassword(@Body() dto: ChangePasswordDto, @Query('userId') userId: string) {
    return this.authService.changePassword(dto, userId);
  }

// Вход через штуки

  @Get('google')
  googleLogin() {
    return this.authService.googleLogin();
  }

  @Get('google/callback')
  googleCallback(@Query('code') code: string) {
    return this.authService.googleCallback(code);
  }

  @Get('github')
  githubLogin() {
    return this.authService.githubLogin();
  }

  @Get('github/callback')
  githubCallback(@Query('code') code: string) {
    return this.authService.githubCallback(code);
  }

  @Get('vk')
  vkLogin() {
    return this.authService.vkLogin();
  }

  @Get('vk/callback')
  vkCallback(@Query('code') code: string) {
    return this.authService.vkCallback(code);
  }

// Администрирование

  @Get('users')
  @UseGuards(authGuard)
  getAllUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return this.authService.getAllUsers(page, limit);
  }

  @Get('user/:id')
  @UseGuards(authGuard)
  getUserById(@Param('id') id: string) {
    return this.authService.getUserById(id);
  }

  @Patch('user/:id/role')
  @UseGuards(authGuard)
  changeUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.authService.changeUserRole(id, role);
  }

  @Post('user/:id/block')
  @UseGuards(authGuard)
  blockUser(@Param('id') id: string) {
    return this.authService.blockUser(id);
  }

  @Post('user/:id/unblock')
  @UseGuards(authGuard)
  unblockUser(@Param('id') id: string) {
    return this.authService.unblockUser(id);
  }

// Сессии

  @Get('sessions')
  @UseGuards(authGuard)
  getSessions(@Query('userId') userId: string) {
    return this.authService.getSessions(userId);
  }

  @Delete('session/:id')
  @UseGuards(authGuard)
  revokeSession(@Param('id') sessionId: string) {
    return this.authService.revokeSession(sessionId);
  }

  @Delete('sessions')
  @UseGuards(authGuard)
  revokeAllSessions(@Body() dto: { userId: string }) {
    return this.authService.revokeAllSessions(dto.userId);
  }

// Токены

  @Post('verify')
  verifyToken(@Body() dto: { token: string }) {
    return this.authService.verifyToken(dto.token);
  }

  @Post('validate')
  validateToken(@Body() dto: { token: string }) {
    return this.authService.validateToken(dto.token);
  }
}