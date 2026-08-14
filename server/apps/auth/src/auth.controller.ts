import { Controller, Post, Get, Delete, Patch, Body, Query, Param, Headers, Ip, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshDto, ChangePasswordDto, ForgetPasswordDto, ResetPasswordDto, VerifyEmailDto, UserIdDto, EmailDto, TokenDto, PaginationDto, BlockUserDto, SessionIdDto } from './common/dto/api';
import { authGuard } from './common/guards/auth.guard';
import { adminGuard } from './common/guards/admin.guard';
import { Throttle } from '@nestjs/throttler';
import { throttleLoginOptions, throttleRegisterOptions, throttleAdminOptions, throttleGlobalOptions } from './common/helper/throttle.ts/options';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// Auth

  @Post('register')
  @Throttle(throttleRegisterOptions)
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto, @Ip() ip: string) {
    return this.authService.register(dto, ip);
  }

  @Post('login')
  @Throttle(throttleLoginOptions)
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto, @Ip() ip: string, @Headers('user-agent') userAgent: string) {
    return this.authService.login(dto, ip, userAgent);
  }

  @Delete('logout')
  @UseGuards(authGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Body() dto: UserIdDto) {
    return this.authService.logout(dto.id);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshDto, @Ip() ip: string) {
    return this.authService.refresh(dto, ip);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('resend-verification')
  @Throttle(throttleGlobalOptions)
  @HttpCode(HttpStatus.OK)
  resendVerification(@Body() dto: EmailDto) {
    return this.authService.resendVerification(dto.email);
  }

// Восстонавление пароля

  @Post('forget-password')
  @Throttle(throttleGlobalOptions)
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ForgetPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('change-password')
  @UseGuards(authGuard)
  @HttpCode(HttpStatus.OK)
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
  @UseGuards(authGuard, adminGuard)
  @Throttle(throttleAdminOptions)
  getAllUsers(@Query() dto: PaginationDto) {
    return this.authService.getAllUsers(dto.page, dto.limit);
  }

  @Get('user/:id')
  @UseGuards(authGuard, adminGuard)
  getUserById(@Param() dto: UserIdDto) {
    return this.authService.getUserById(dto.id);
  }

  @Patch('user/:id/role')
  @UseGuards(authGuard, adminGuard)
  @HttpCode(HttpStatus.OK)
  changeUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.authService.changeUserRole(id, role);
  }

  @Post('user/:id/block')
  @UseGuards(authGuard, adminGuard)
  @HttpCode(HttpStatus.OK)
  blockUser(@Param('id') id: string, @Body() dto: BlockUserDto) {
    return this.authService.blockUser(id, dto.reason);
  }

  @Post('user/:id/unblock')
  @UseGuards(authGuard, adminGuard)
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  revokeSession(@Param() dto: SessionIdDto) {
    return this.authService.revokeSession(dto.sessionId);
  }

  @Delete('sessions')
  @UseGuards(authGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  revokeAllSessions(@Body() dto: UserIdDto) {
    return this.authService.revokeAllSessions(dto.id);
  }

// Токены

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verifyToken(@Body() dto: TokenDto) {
    return this.authService.verifyToken(dto.token);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  validateToken(@Body() dto: TokenDto) {
    return this.authService.validateToken(dto.token);
  }
}