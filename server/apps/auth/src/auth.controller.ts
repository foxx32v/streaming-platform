import { Controller, Post, Get, Delete, Patch, Body, Query, Param, Headers, Ip, UseGuards, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshDto, ChangePasswordDto, ForgetPasswordDto, ResetPasswordDto, VerifyEmailDto, EmailDto, TokenDto, PaginationDto, BlockUserDto, UserIdDto, SessionIdDto } from './common/dto/api';
import { authGuard } from './common/helper/guards/auth.guard';
import { adminGuard } from './common/helper/guards/admin.guard';
import { Throttle } from '@nestjs/throttler';
import { throttleLoginOptions, throttleRegisterOptions, throttleAdminOptions, throttleGlobalOptions } from './common/helper/throttle.ts/options';
import { UUID } from 'crypto';
import { githubGuard, googleGuard} from './common/helper/guards';
import { OAuthUserDto, ResType, TokensType } from './common/helper/types/helperTypes';

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
  logout(@Req() req: any) {
    return this.authService.logout(req.user.id);
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

// Password recovery

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
  changePassword(@Body() dto: ChangePasswordDto, @Req() req: any) {
    return this.authService.changePassword(dto, req.user.id);
  }

// OAuth login

  @Get('google')
  @UseGuards(googleGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(googleGuard)
  async googleCallback(@Req() req: any, @Res() res: any) {
    const user = (req as any).user as OAuthUserDto
    const tokens = await this.authService.googleCallback(user)
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`);
  }

  @Get('github')
  @UseGuards(githubGuard)
  githubLogin() {}

  @Get('github/callback')
  @UseGuards(githubGuard)
  async githubCallback(@Req() req: any, @Res() res: any) {
    const user = (req as any).user as OAuthUserDto
    const tokens = await this.authService.githubCallback(user)
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`);
  }

// Admin

  @Get('users')
  @UseGuards(authGuard, adminGuard)
  @Throttle(throttleAdminOptions)
  getAllUsers(@Query() dto: PaginationDto) {
    return this.authService.getAllUsers(dto.page, dto.limit);
  }

  @Get('user/:id')
  @UseGuards(authGuard, adminGuard)
  getUserById(@Param('id') id: string) {
    return this.authService.getUserById(id);
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

// Sessions

  @Get('sessions')
  @UseGuards(authGuard)
  getSessions(@Req() req: any) {
    return this.authService.getSessions(req.user.id);
  }

  @Delete('session/:id')
  @UseGuards(authGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  revokeSession(@Param('id') sessionId: string) {
    return this.authService.revokeSession(sessionId);
  }

  @Delete('sessions')
  @UseGuards(authGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  revokeAllSessions(@Req() req: any) {
    return this.authService.revokeAllSessions(req.user.id);
  }

// Tokens

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