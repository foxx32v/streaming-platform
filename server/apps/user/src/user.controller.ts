import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminGuard, Public, UserId, throttleAdminOptions } from './common/urils';
import { Throttle } from '@nestjs/throttler';
import { UpdateUserProfileDto, UpdateSettingsDto, PaginationDto, InitUserDto } from './common/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Profile
  @Post('init')
  @HttpCode(HttpStatus.CREATED)
  async init(@UserId() userId, @Body() dto: InitUserDto) {
    return this.userService.init(userId, dto.userName);
  }

  @Get('me')
  getMe(@UserId() userId: string) {
    return this.userService.getMe(userId);
  }

  @Patch('me')
  updateMe(@UserId() userId: string, @Body() dto: UpdateUserProfileDto) {
    return this.userService.updateMe(userId, dto);
  }

  @Delete('me')
  @HttpCode(HttpStatus.OK)
  deleteMe(@UserId() userId: string) {
    return this.userService.deleteMe(userId);
  }

  // Private options
  @Get('me/settings')
  getSettings(@UserId() userId: string) {
    return this.userService.getSettings(userId);
  }

  @Patch('me/settings')
  updateSettings(@UserId() userId: string, @Body() dto: UpdateSettingsDto) {
    return this.userService.updateSettings(userId, dto);
  }

  // Profile by id
  @Get(':id')
  @Public()
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  // Subscriptions
  @Post(':id/follow')
  @HttpCode(HttpStatus.CREATED)
  followUser(@UserId() followerId: string, @Param('id') followingId: string) {
    return this.userService.followUser(followerId, followingId);
  }

  @Delete(':id/follow')
  @HttpCode(HttpStatus.OK)
  unfollowUser(@UserId() followerId: string, @Param('id') followingId: string) {
    return this.userService.unfollowUser(followerId, followingId);
  }

  @Get(':id/followers')
  @Public()
  getFollowers(@Param('id') userId: string) {
    return this.userService.getFollowers(userId);
  }

  @Get(':id/following')
  @Public()
  getFollowing(@Param('id') userId: string) {
    return this.userService.getFollowing(userId);
  }

  // Stats
  @Get(':id/stats')
  @Public()
  getStats(@Param('id') userId: string) {
    return this.userService.getStats(userId);
  }

  // Admin
  @Get()
  @Throttle(throttleAdminOptions)
  @UseGuards(AdminGuard)
  getAllUsers(@Query() dto: PaginationDto) {
    return this.userService.getAllUsers(dto.page, dto.limit);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Patch(':id/role')
  @HttpCode(HttpStatus.OK)
  @Throttle(throttleAdminOptions)
  @UseGuards(AdminGuard)
  changeRole(@Param('id') userId: string, @Body('role') role: 'user' | 'admin') {
    return this.userService.changeRole(userId, role);
  }

  @Post(':id/ban')
  @Throttle(throttleAdminOptions)
  @UseGuards(AdminGuard)
  banUser(@Param('id') userId: string) {
    return this.userService.banUser(userId);
  }

  @Post(':id/unban')
  @Throttle(throttleAdminOptions)
  @UseGuards(AdminGuard)
  unbanUser(@Param('id') userId: string) {
    return this.userService.unbanUser(userId);
  }
}